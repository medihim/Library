# 메디힘 전략 라이브러리 · 통합 배포 패키지

## 1. 패키지 목적

기존 루트에 있던 `가설 종류 및 현업 적용` 문서와 `메디힘 6축 사업 진단 프레임워크`를 하나의 접속 게이트와 사업전략 섹션 아래에 통합한 GitHub Pages 배포 구조입니다.

- 접속번호: `3370`
- 메인 진입: `/index.html`
- 사업전략 섹션: `/library/business-strategy/`
- 가설 유형: `/library/business-strategy/hypothesis-types/`
- 6축 사업 진단: `/library/business-strategy/six-axis-business-diagnosis/`

## 2. 폴더 구조

```text
/
├─ index.html
├─ README.md
├─ 404.html
├─ .nojekyll
├─ 가설_종류_및_현업_적용.html                  # 기존 URL 호환용 리다이렉트
├─ 메디힘_6축_사업진단_프레임워크.html          # 기존 URL 호환용 리다이렉트
├─ assets/
│  ├─ medihim_ippeo_logo.png
│  ├─ css/
│  │  └─ document.css
│  └─ js/
│     ├─ documents.js
│     ├─ library.js
│     └─ document-search.js
└─ library/
   └─ business-strategy/
      ├─ index.html
      ├─ hypothesis-types/
      │  ├─ index.html
      │  ├─ source.md
      │  └─ download.docx
      └─ six-axis-business-diagnosis/
         ├─ index.html
         ├─ source.md
         └─ download.docx
```

## 3. GitHub 업로드 방법

1. 기존 저장소의 파일을 백업합니다.
2. 이 패키지 폴더 안의 **내용 전체**를 저장소 루트에 업로드합니다. 상위 폴더 자체를 한 단계 더 올리지 마십시오.
3. 커밋 후 `Settings → Pages`로 이동합니다.
4. Source를 `Deploy from a branch`로 선택합니다.
5. Branch는 `main`, Folder는 `/(root)`로 설정합니다.
6. 배포 URL에서 접속번호 `3370`을 입력하고 두 개 카드와 개별 문서를 확인합니다.

## 4. 새 문서 추가 방법

### 4.1 문서 폴더 생성

```text
library/<section>/<document-slug>/
├─ index.html
├─ source.md
└─ download.docx
```

### 4.2 게이트 카드 등록

`assets/js/documents.js`의 `documents` 배열에 객체를 추가합니다.

```javascript
{
  id: 'strategy-003',
  title: '새 문서 제목',
  section: 'business-strategy',
  categories: ['사업전략', '운영'],
  description: '문서 설명',
  note: '카드 하단 행동 문구',
  meta: ['8개 섹션', '2026.07 업데이트'],
  href: 'library/business-strategy/new-document/',
  status: '운영 중'
}
```

## 5. 운영 원칙

- 루트에는 게이트, 공통 리소스, 리다이렉트 파일만 둡니다.
- 실제 문서는 `library/주제/문서/` 구조로 저장합니다.
- 문서의 주 저장 위치는 하나만 두고 복수 분류는 `categories` 태그로 처리합니다.
- HTML 파일명은 각 문서 폴더의 `index.html`로 통일합니다.
- 폴더명은 영문 소문자와 하이픈을 사용합니다.

## 6. 보안 유의사항

접속번호 방식은 정적 웹페이지의 접근 편의 기능이며 강한 인증이 아닙니다. 민감한 개인정보, 환자정보, 계약정보, 원가정보는 GitHub Pages에 게시하지 마십시오.
