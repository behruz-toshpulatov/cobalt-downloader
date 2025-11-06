'use client';

import { useMemo, useState } from 'react';

interface DownloadResponse {
  url: string;
  filename?: string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

export function DownloadForm() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('');
  const [audioOnly, setAudioOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DownloadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api';
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!url.trim()) {
      setError('다운로드할 URL을 입력해 주세요.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${apiEndpoint}/downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          format: format.trim() || undefined,
          audioOnly
        })
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || '다운로드 요청에 실패했습니다.');
      }

      const data = (await response.json()) as DownloadResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '예기치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
    >
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-200">
          다운로드 URL
        </label>
        <input
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-slate-200">
            포맷 (선택)
          </label>
          <input
            id="format"
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            placeholder="mp4, mp3, opus..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="audioOnly"
            type="checkbox"
            checked={audioOnly}
            onChange={(event) => setAudioOnly(event.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
          />
          <label htmlFor="audioOnly" className="text-sm text-slate-200">
            오디오만 다운로드
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {isLoading ? '다운로드 링크 생성 중…' : '다운로드 링크 생성'}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm">
          <h3 className="font-semibold text-slate-100">다운로드 결과</h3>
          <pre className="overflow-x-auto text-xs text-slate-300">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
