import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '코발트 다운로드 도구',
  description: '한국어 사용자에 맞춘 미디어 다운로드 도구'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
