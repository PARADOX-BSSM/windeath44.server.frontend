// 스택 저장/복원 설정
// 저장에서 제외하고 싶은 태스크 이름을 아래 Set에 추가하세요.
export const STACK_EXCLUDE_NAMES = new Set<string>([
  // 예: 'props필요한태스크명',
]);

// 스택 저장을 허용할 태스크와 로컬스토리지 키 매핑
// 현재는 설까기만 영속 스택을 사용합니다.
export const STACK_KEY_MAP: Record<string, string> = {
  설까기: 'stack-sulkkagi',
};

// 관리 대상 스택 키 (과거에 사용하던 키 포함)
export const STACK_ALL_KEYS = Array.from(
  new Set([
    ...Object.values(STACK_KEY_MAP),
    'stack-추모관',
    'stack-추모관 신청',
    'stack-추모관 수정 요청',
    'stack-memorial-pr-default',
    'stack-memorial-application',
    'stack-memorial',
  ]),
);
