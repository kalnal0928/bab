# 🍽️ 급식 조회 시스템

한국교육개발원의 급식 API를 활용하여 학교 급식 정보를 쉽게 조회할 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **학교 검색**: 학교명으로 학교를 검색하고 선택
- **급식 조회**: 선택한 학교의 아침, 점심, 저녁 급식 정보 조회
- **날짜 선택**: 원하는 날짜의 급식 정보 확인
- **영양 정보**: 급식의 칼로리 및 영양 정보 표시
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 사용 가능

## 🚀 사용 방법

1. **학교 검색**
   - 학교명을 입력하고 검색 버튼을 클릭하거나 Enter 키를 누릅니다
   - 검색 결과에서 원하는 학교를 클릭하여 선택합니다

2. **날짜 및 식사 종류 선택**
   - 원하는 날짜를 선택합니다 (기본값: 오늘)
   - 아침, 점심, 저녁 중 원하는 식사 종류를 선택합니다

3. **급식 조회**
   - "급식 조회" 버튼을 클릭하여 선택한 조건의 급식 정보를 확인합니다

## 🛠️ 기술 스택

- **HTML5**: 웹 페이지 구조
- **CSS3**: 스타일링 및 반응형 디자인
- **JavaScript (ES6+)**: 동적 기능 및 API 통신
- **한국교육개발원 급식 API**: 급식 데이터 제공

## 📁 파일 구조

```
├── index.html          # 메인 HTML 파일
├── style.css           # CSS 스타일 파일
├── script.js           # JavaScript 로직 파일
├── api.txt             # API 키 파일
├── key.txt             # API 파라미터 설명 파일
└── README.md           # 프로젝트 설명서
```

## 🔧 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd bab-1
   ```

2. **로컬 서버 실행**
   - Python을 사용하는 경우:
     ```bash
     python -m http.server 8000
     ```
   - Node.js를 사용하는 경우:
     ```bash
     npx http-server
     ```
   - 또는 VS Code의 Live Server 확장 프로그램 사용

3. **브라우저에서 접속**
   ```
   http://localhost:8000
   ```

## 📱 반응형 디자인

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

## 🔑 API 정보

이 프로젝트는 한국교육개발원의 급식 API를 사용합니다:

- **API 키**: `f7de58f2a99e4ed8b2f5c3c122268a1a`
- **기본 URL**: `https://open.neis.go.kr/hub`
- **사용 API**:
  - 학교 정보 조회: `/schoolInfo`
  - 급식 정보 조회: `/mealServiceDietInfo`

## 🎨 디자인 특징

- **모던한 UI**: 그라데이션 배경과 카드 기반 레이아웃
- **사용자 친화적**: 직관적인 인터페이스와 명확한 시각적 피드백
- **접근성**: 키보드 네비게이션 지원 및 스크린 리더 호환
- **애니메이션**: 부드러운 전환 효과와 호버 애니메이션

## 🐛 문제 해결

### CORS 오류가 발생하는 경우
- 로컬 서버를 사용하여 실행하세요
- 브라우저의 CORS 정책으로 인해 파일을 직접 열면 API 호출이 차단될 수 있습니다

### API 호출이 실패하는 경우
- 인터넷 연결을 확인하세요
- API 키가 유효한지 확인하세요
- 학교명을 정확히 입력했는지 확인하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**참고**: 이 프로젝트는 한국교육개발원의 공개 API를 사용하여 제작되었습니다. API 사용량 제한이나 정책 변경에 따라 서비스가 영향을 받을 수 있습니다. 