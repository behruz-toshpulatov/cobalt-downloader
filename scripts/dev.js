#!/usr/bin/env node
const { spawn } = require('node:child_process');
const path = require('node:path');

const processes = [];

function run(binName, args, options) {
  const binPath = path.join('node_modules', '.bin', process.platform === 'win32' ? `${binName}.cmd` : binName);
  const child = spawn(binPath, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  processes.push(child);
  child.on('exit', (code, signal) => {
    if (signal === 'SIGTERM' || signal === 'SIGINT') {
      return;
    }

    if (code !== 0) {
      console.error(`Process ${binName} exited with code ${code}`);
      shutdown(code ?? 1);
    }
  });

  child.on('error', (error) => {
    console.error(`Unable to start ${binName}:`, error.message);
    shutdown(1);
  });

  return child;
}

function shutdown(code = 0) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(code), 200);
}

process.once('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down...');
  shutdown(0);
});

process.once('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down...');
  shutdown(0);
});

function main() {
  run('ts-node-dev', ['--respawn', '--transpile-only', '--project', 'backend/tsconfig.json', 'backend/src/main.ts'], {
    env: { ...process.env, PORT: process.env.PORT ?? '3001' },
    cwd: process.cwd(),
  });

  run('next', ['dev', 'frontend', '--port', process.env.FRONTEND_PORT ?? '3000'], {
    env: { ...process.env, NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api' },
    cwd: process.cwd(),
  });
}

main();
