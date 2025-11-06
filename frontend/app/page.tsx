'use client';

import { useEffect, useState } from 'react';

type WelcomePayload = {
  name: string;
  version: string;
  description: string;
};

export default function HomePage() {
  const [data, setData] = useState<WelcomePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = (await response.json()) as WelcomePayload;
        setData(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    load();
  }, []);

  return (
    <main className="container">
      <section>
        <h1>Cobalt Downloader</h1>
        <p className="lead">
          Unified NestJS backend and Next.js frontend running together with a single developer command.
        </p>
      </section>

      {data && (
        <section className="card">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p className="meta">Version {data.version}</p>
        </section>
      )}

      {error && (
        <section className="card error">
          <h2>Unable to reach backend</h2>
          <p>{error}</p>
          <p className="meta">Ensure the API is running on port 3001.</p>
        </section>
      )}
    </main>
  );
}
