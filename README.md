# 🍽️ Duksung Diet Recommender (assign2)

> 사용자 입력을 기반으로 *mbti별 하루조언**을 하는 웹 기반 서비스입니다.  
> 프론트엔드와 백엔드는 각각 HTML/JS와 Node.js(Express)로 구현되어 있으며, Vercel을 통해 배포되었습니다.

---

## 🚀 배포 주소

- **웹 서비스:** [https://assign2-woo218.vercel.app](https://assign2-woo218.vercel.app)  
- **백엔드 API (예정):** 별도 배포 예정 또는 로컬에서 실행

---

## 📁 주요 폴더 구조
## 📁 주요 폴더 구조

assign2/
├── index.html # 메인 웹 페이지
├── duksungAI.js # 프론트엔드 JavaScript
├── api/ # Node.js API 서버
│ ├── duksungAI.js
│ └── test.js
├── duksung_diner/ # 추가 서브페이지
│ └── index.html
├── vercel.json # Vercel 배포 설정
├── package.json # 프로젝트 의존성 정보
├── .env # 환경 변수 파일 (비공개)
├── .gitignore # Git 제외 파일 설정
└── README.md # 프로젝트 설명 파일 (본 문서)


---

## 🛠 사용 기술

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **배포:** Vercel (정적 호스팅), GitHub
- **기타:** 환경 변수 관리, 모듈 시스템, REST API 설계

---

## 💻 로컬 실행 방법

### 1. 백엔드 서버 실행

```bash
cd api
node duksungAI.js

👩🏻‍💻 개발자

이름: Yeonwoo Woo
GitHub: @woo218


