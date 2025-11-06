'use client';

import { useEffect, useMemo, useState } from 'react';

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api').replace(/\/$/, '');

type MetadataPayload = {
  name: string;
  version: string;
  description: string;
  docsPath: string;
};

type HealthPayload = {
  status: 'ok';
  timestamp: string;
};

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export default function HomePage() {
  const [metadata, setMetadata] = useState<MetadataPayload | null>(null);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const errors: string[] = [];

      const [metadataResult, healthResult] = await Promise.allSettled([
        fetchJson<MetadataPayload>(`${apiBaseUrl}/meta`, controller.signal),
        fetchJson<HealthPayload>(`${apiBaseUrl}/health`, controller.signal),
      ]);

      if (metadataResult.status === 'fulfilled') {
        setMetadata(metadataResult.value);
      } else if (!controller.signal.aborted) {
        errors.push(metadataResult.reason instanceof Error ? metadataResult.reason.message : 'Failed to load metadata');
      }

      if (healthResult.status === 'fulfilled') {
        setHealth(healthResult.value);
      } else if (!controller.signal.aborted) {
        errors.push(healthResult.reason instanceof Error ? healthResult.reason.message : 'Failed to load health status');
      }

      if (!controller.signal.aborted) {
        setError(errors.length ? errors.join(' | ') : null);
      }
    }

    void load();

    return () => controller.abort();
  }, []);

  const docsUrl = useMemo(() => {
    if (!metadata) {
      return null;
    }

    try {
      const url = new URL(apiBaseUrl);
      const normalizedPath = metadata.docsPath.startsWith('/') ? metadata.docsPath : `/${metadata.docsPath}`;
      url.pathname = normalizedPath;
      url.search = '';
      url.hash = '';
      return url.toString();
    } catch (err) {
      return metadata.docsPath;
    }
  }, [metadata]);

  return (
    <main className="container">
      <section>
        <h1>Cobalt Downloader</h1>
        <p className="lead">
          Unified NestJS backend and Next.js frontend running together with a single developer command.
        </p>
      </section>

      {metadata && (
        <section className="card">
          <header className="card-header">
            <h2>{metadata.name}</h2>
            {docsUrl && (
              <a className="button" href={docsUrl} target="_blank" rel="noreferrer">
                Open API docs
              </a>
            )}
          </header>
          <p>{metadata.description}</p>
          <p className="meta">Version {metadata.version}</p>
        </section>
      )}

      {health && (
        <section className="card status-card">
          <h2>Backend status</h2>
          <div className="status">
            <span className="status-indicator" aria-hidden />
            <span className="status-text">{health.status.toUpperCase()}</span>
          </div>
          <p className="meta">Last checked {new Date(health.timestamp).toLocaleString()}</p>
        </section>
      )}

      {error && (
        <section className="card error">
          <h2>Connectivity issues</h2>
          <p>{error}</p>
          <p className="meta">Ensure the API is running on port 3001 and reachable at {apiBaseUrl}.</p>
        </section>
      )}
    </main>
  );
}
