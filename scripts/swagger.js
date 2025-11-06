#!/usr/bin/env node

const { spawn } = require("node:child_process");
const { once } = require("node:events");
const process = require("node:process");

const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const managedProcesses = [];
let shuttingDown = false;

const setExitCode = (code) => {
    if (code === undefined || code === null) {
        return;
    }

    if (typeof process.exitCode !== "number" || process.exitCode === 0) {
        process.exitCode = code;
    }
};

const shutdown = (code = 0, signal = "SIGINT") => {
    setExitCode(code);

    if (shuttingDown) {
        return;
    }

    shuttingDown = true;

    for (const { child } of managedProcesses) {
        if (!child.killed) {
            child.kill(signal);
        }
    }
};

const spawnManaged = (name, args) => {
    const child = spawn(pnpmCommand, args, {
        stdio: "inherit",
        env: process.env,
        shell: false,
    });

    child.on("error", (error) => {
        console.error(`[swagger] failed to start ${name}:`, error);
        shutdown(1);
    });

    const exitPromise = (async () => {
        try {
            const [code, signal] = await once(child, "close");
            return { name, code, signal };
        } catch (error) {
            return { name, error };
        }
    })();

    managedProcesses.push({ child, name, exitPromise });
    return { child, name, exitPromise };
};

const handleSignal = (signal) => {
    shutdown(0, signal);
};

process.on("SIGINT", handleSignal);
process.on("SIGTERM", handleSignal);

(async () => {
    const spawned = [
        spawnManaged("api", ["--dir", "api", "start"]),
        spawnManaged("frontend", ["--dir", "vite-frontend", "dev"]),
    ];

    const exitPromises = spawned.map(({ exitPromise }) => exitPromise);

    const firstExit = await Promise.race(exitPromises);

    if (!shuttingDown) {
        if (firstExit.error) {
            shutdown(1);
        } else {
            const { code, signal } = firstExit;
            if (code && code !== 0) {
                console.error(`[swagger] ${firstExit.name} exited with code ${code}`);
                shutdown(code);
            } else if (signal) {
                console.warn(`[swagger] ${firstExit.name} exited due to signal ${signal}`);
                shutdown(0, signal);
            } else {
                shutdown(0);
            }
        }
    }

    await Promise.all(exitPromises);
})();
