# Cloudflare R2 업로드 가이드

Unity WebGL 게임 파일을 Cloudflare R2에 업로드하는 방법입니다.

## 사전 준비

### 1. Wrangler CLI 설치

```bash
npm install -g wrangler
```

### 2. Cloudflare 로그인

```bash
wrangler login
```

브라우저가 열리면 Cloudflare 계정으로 로그인합니다.

## R2 버킷 생성

### 방법 1: Cloudflare 대시보드 사용

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 접속
2. 왼쪽 메뉴에서 **R2** 클릭
3. **Create bucket** 클릭
4. 버킷 이름 입력 (예: `unity-game-assets`)
5. 지역 선택 (자동 추천 사용)
6. **Create bucket** 클릭

### 방법 2: Wrangler CLI 사용

```bash
wrangler r2 bucket create unity-game-assets
```

## 파일 업로드

### 자동 업로드 (권장)

프로젝트 루트에서 스크립트를 실행합니다:

```bash
./scripts/upload-to-r2.sh unity-game-assets
```

이 스크립트는 다음 파일들을 자동으로 업로드합니다:
- `Build/*.br` - 압축된 게임 데이터 파일
- `Build/*.js` - 로더 스크립트
- `index.html` - 메인 HTML 파일
- `TemplateData/*` - Unity 템플릿 리소스
- `StreamingAssets/*` - 스트리밍 에셋 (있는 경우)

### 수동 업로드

개별 파일을 업로드하려면:

```bash
# 예시: data 파일 업로드
wrangler r2 object put unity-game-assets/unity/Project_HG/Build/Project_HG.data.br \
  --file=public/unity/Project_HG/Build/Project_HG.data.br

# 예시: index.html 업로드
wrangler r2 object put unity-game-assets/unity/Project_HG/index.html \
  --file=public/unity/Project_HG/index.html
```

## Public Access 설정

R2 버킷을 공개적으로 접근 가능하게 설정합니다.

### 방법 1: R2.dev Subdomain 사용 (간단)

1. Cloudflare Dashboard > R2 > 버킷 선택
2. **Settings** 탭 클릭
3. **Public Access** 섹션에서 **Allow Access** 활성화
4. **R2.dev subdomain** 활성화
5. 생성된 URL 확인 (예: `https://pub-xxxxx.r2.dev`)

### 방법 2: Custom Domain 연결 (프로덕션 권장)

1. Cloudflare Dashboard > R2 > 버킷 선택
2. **Settings** 탭 클릭
3. **Custom Domains** 섹션에서 **Connect Domain** 클릭
4. 도메인 입력 (예: `cdn.yourdomain.com`)
5. DNS 레코드 자동 생성 확인

## Cloudflare Pages 환경 변수 설정

### 로컬 개발 환경 (.env)

```bash
# 로컬에서는 이 변수를 설정하지 않으면 자동으로 local 파일 사용
# VITE_UNITY_GAME_URL=
```

### Cloudflare Pages 프로덕션 환경

1. Cloudflare Dashboard > Pages > 프로젝트 선택
2. **Settings** > **Environment variables** 클릭
3. **Add variable** 클릭
4. 다음 값 입력:
   - **Variable name**: `VITE_UNITY_GAME_URL`
   - **Value**: `https://pub-xxxxx.r2.dev/unity/Project_HG/index.html`
   - **Environment**: Production (또는 Preview도 선택)
5. **Save** 클릭

## 파일 업데이트

Unity 게임을 업데이트할 때:

```bash
# 1. Unity에서 새로운 빌드 생성
# 2. public/unity/Project_HG/ 폴더에 복사
# 3. R2에 다시 업로드
./scripts/upload-to-r2.sh unity-game-assets

# 4. Cloudflare Pages 재배포 (자동 또는 수동)
```

## CORS 설정 (필요한 경우)

만약 CORS 오류가 발생하면:

1. Cloudflare Dashboard > R2 > 버킷 선택
2. **Settings** 탭 클릭
3. **CORS Policy** 섹션에서 다음 설정 추가:

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## 비용

Cloudflare R2 무료 플랜:
- **저장 공간**: 10 GB/월
- **Class A 작업** (쓰기): 1,000,000 요청/월
- **Class B 작업** (읽기): 10,000,000 요청/월
- **송신 대역폭**: 무료 (Cloudflare 네트워크 내부)

Unity WebGL 게임 (약 35MB)은 무료 플랜으로 충분합니다!

## 문제 해결

### "Wrangler not found" 오류

```bash
npm install -g wrangler
```

### "Not authenticated" 오류

```bash
wrangler login
```

### 파일 업로드 실패

```bash
# 파일 존재 확인
ls -lh public/unity/Project_HG/Build/

# 권한 확인
chmod +x scripts/upload-to-r2.sh
```

### R2 URL이 작동하지 않음

1. Public Access가 활성화되었는지 확인
2. 올바른 URL을 사용하는지 확인 (R2.dev 또는 custom domain)
3. 브라우저 개발자 도구에서 네트워크 탭 확인
