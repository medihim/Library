/*
  메디힘 전략 라이브러리 문서 레지스트리
  새 문서를 추가할 때 아래 배열에 객체를 추가합니다.
  href는 루트 index.html 기준 상대경로입니다.
*/
const documents = [
  {
    id: 'strategy-001',
    title: '가설 종류 및 현업 적용',
    section: 'business-strategy',
    categories: ['사업전략', '마케팅', '가설검증'],
    description: '시장가설, 고객가설, 문제가설부터 전환가설과 경제성가설까지 스타트업과 마케팅 현장에서 활용하는 가설의 종류와 검증 기준을 정리합니다.',
    note: '생각을 검증 가능한 문장으로 바꾸는 방법',
    meta: ['10개 섹션', '22개 가설 유형', '2026.06 업데이트'],
    href: 'library/business-strategy/hypothesis-types/',
    status: '운영 중'
  },
  {
    id: 'strategy-002',
    title: '메디힘 6축 사업 진단 프레임워크',
    section: 'business-strategy',
    categories: ['사업전략', '사업진단', 'MSO'],
    description: '메디힘의 해외환자 유치·병원 성장형 MSO 사업을 시장 지속성, 문제 이해도, 시장 확장성, 전환력, 획득 재현성, 경제성의 6개 축으로 진단합니다.',
    note: '현재 사업을 20/30점으로 진단하고 우선과제를 확인',
    meta: ['6개 진단축', '20/30점', '2026.06 업데이트'],
    href: 'library/business-strategy/six-axis-business-diagnosis/',
    status: '운영 중'
  }
];
