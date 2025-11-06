# 코발트 (Cobalt) - NestJS + Next.js 리빌드

> 당신이 사랑하는 것을 저장하세요

## 📋 프로젝트 개요

이 저장소는 원본 [Cobalt](https://github.com/imputnet/cobalt) 프로젝트를 한국 사용자 경험에 맞게 재구성한 것입니다. 기존 Node.js/Express
기반 API와 Vite 프론트엔드를 NestJS 백엔드와 Next.js 프론트엔드로 전면 교체했습니다.

### 주요 특징

- 🇰🇷 **완전한 한국어 UI**: Next.js 앱 라우터 기반의 현대적 인터페이스
- ⚙️ **NestJS 백엔드**: 환경 변수 기반 설정과 ValidationPipe로 안정적인 API 제공
- 🌐 **Cobalt Upstream 연동**: 공식 Cobalt API에 요청을 전달해 최신 다운로드 기능 사용
- 🧪 **TypeScript 전면 적용**: 엄격한 타입 체크와 DTO 검증을 통한 안전한 코드
- 🚀 **동시 개발 모드**: 단일 명령(`pnpm dev`)으로 백엔드와 프론트엔드를 동시에 실행

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                       pnpm workspace                        │
├───────────────────────────┬─────────────────────────────────┤
│ NestJS Backend (3001)     │ Next.js Frontend (3000)        │
│ apps/backend              │ apps/frontend                  │
│ - /api/downloads          │ - / (App Router)               │
│ - ConfigModule + DTO      │ - API 연동 클라이언트          │
└───────────────────────────┴─────────────────────────────────┘
```

## 📁 프로젝트 구조

```
cobalt/
├── apps/
│   ├── backend/                # NestJS API 서버
│   │   ├── src/
│   │   │   ├── download/       # 다운로드 엔드포인트 모듈
│   │   │   ├── health/         # 헬스 체크 엔드포인트
│   │   │   └── config/         # 환경 변수 구성
│   │   ├── package.json
│   │   └── tsconfig*.json
│   └── frontend/               # Next.js 프론트엔드
│       ├── app/                # App Router 페이지/컴포넌트
│       ├── package.json
│       └── next.config.ts
├── packages/                   # (선택) 원본 cobalt 하위 패키지
├── package.json                # 워크스페이스 및 루트 스크립트
├── pnpm-workspace.yaml         # 워크스페이스 설정
└── README.md                   # 현재 문서
```

## ⚙️ 개발 환경 준비

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 모드 실행

```bash
pnpm dev
```

- NestJS 백엔드: <http://localhost:3001/api>
- Next.js 프론트엔드: <http://localhost:3000>
- 두 프로세스는 `concurrently`로 묶여 동일한 터미널에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
pnpm build
```

- 백엔드: `apps/backend/dist`
- 프론트엔드: `.next`

### 4. 개별 앱 실행/관리

```bash
pnpm --filter @cobalt/backend start:dev   # NestJS 개발 모드
pnpm --filter @cobalt/frontend dev        # Next.js 개발 모드
pnpm --filter @cobalt/backend build       # NestJS 빌드
pnpm --filter @cobalt/frontend build      # Next.js 빌드
```

## 🔧 환경 변수

| 변수 | 기본값 | 설명 |
| --- | --- | --- |
| `PORT` | `3001` | NestJS 서버 포트 |
| `COBALT_API_URL` | `https://api.cobalt.tools` | 업스트림 Cobalt API 주소 |
| `FRONTEND_ORIGIN` | `*` | CORS 허용 오리진 |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3001/api` | 프론트엔드에서 사용하는 API 주소 |

`apps/backend`는 NestJS `ConfigModule`과 Joi 검증을 사용하여 환경 변수를 안전하게 로드합니다.

## 🎨 프론트엔드 하이라이트

- App Router 기반의 단일 페이지 구성
- 폼 검증 및 사용자 친화적인 오류 메시지
- JSON 결과를 그대로 확인할 수 있는 미니 결과 패널

## 🩺 헬스 체크

- `GET /api/health` → `{ status: 'ok', timestamp: '...' }`
- 서비스 모니터링 또는 로드밸런서 헬스 체크 용도로 사용할 수 있습니다.

## 🛠️ 스택 버전

- **NestJS**: 최신 10.x 릴리스
- **Next.js**: 14.2+ (App Router)
- **TypeScript**: 5.5+
- **pnpm workspace**: 단일 저장소에서 백엔드/프론트엔드 관리

## 📄 라이선스

이 프로젝트는 원본 Cobalt 라이선스를 따르며, 한국어 지역화를 위한 수정 사항은 동일한 라이선스로 배포됩니다.
