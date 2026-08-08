# Studio OS v2.3.7.1 Hotfix

## 목적
Patch Center의 기존 UI는 그대로 유지하고 생성 버튼의 실제 다운로드 기능만 복구합니다.

## 수정
- Development Patch 생성 버튼 동작 복구
- Release Patch 생성 버튼 동작 복구
- Daily Closing 생성 버튼 동작 복구
- 누락된 `downloadBlob()` 호환 레이어 추가 (`downloadText()` 재사용)
- Daily Closing 생성 메타데이터를 v2.3.7.1 기준으로 정렬
- Patch 생성 실패 시 오류 토스트/console 로그 추가

## 유지
- UI/레이아웃/스타일 변경 없음
- 기존 LocalStorage/IndexedDB 데이터 구조 변경 없음
- Patch Import 검증 스키마 유지
  - `studio-os-project-patch-v1`
  - `studio-os-daily-closing-v1`

## 확인 순서
1. Experience → Patch Center 이동
2. 프로젝트 선택
3. Development Patch 생성 → `.studioospatch.json` 다운로드 확인
4. Release Patch 생성 → `.studioospatch.json` 다운로드 확인
5. Daily Closing 생성 → `.dailyclosing.json` 다운로드 확인
6. 생성한 파일을 우측 Import에서 선택 → Preview 검증
