import { DownloadForm } from './components/download-form';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <p className="inline-flex rounded-full border border-indigo-500/60 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
          Beta
        </p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          코발트 미디어 다운로드
        </h1>
        <p className="text-base text-slate-300">
          한국어에 최적화된 Next.js + NestJS 기반의 미디어 다운로드 도구입니다. URL을 입력하고 원하는 옵션을 선택해
          보세요.
        </p>
      </header>

      <DownloadForm />

      <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-white">지원 기능</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• YouTube, TikTok, Instagram 등 다양한 플랫폼 지원</li>
            <li>• 오디오만 추출 또는 영상 다운로드</li>
            <li>• 고해상도 품질 및 다양한 포맷 선택</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">사용 팁</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• 안정적인 다운로드를 위해 최신 URL을 사용하세요.</li>
            <li>• 포맷을 지정하지 않으면 자동으로 최적의 품질을 제공합니다.</li>
            <li>• API 서버 주소는 환경 변수로 쉽게 변경할 수 있습니다.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
