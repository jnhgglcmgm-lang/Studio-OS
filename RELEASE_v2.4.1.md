# Studio OS v2.4.1 — Version Guard & Safe Import

## Base
Studio OS v2.4.0 · Patch Engine Complete

## Goal
Patch Import 순서와 관계없이 프로젝트는 항상 가장 최신 버전 상태를 유지한다.

## Included
- Latest-version-wins Version Guard
- 구버전 Project Patch 차단
- 같은 버전은 generatedAt 기준 Safe Merge
- 이미 롤백된 프로젝트는 최신 Patch 재업로드 시 Recovery 허용
- Project ID보다 프로젝트 이름을 우선해 로컬 프로젝트를 안전하게 매칭
- Project / Development / Workspace 동기화 시 로컬 Project ID 유지
- Master/Version Asset의 구버전 롤백 방지
- Import History에 UPDATE / RECOVERY / SAME_VERSION / BLOCKED / SKIPPED 상태 기록
- 우리집캐디 v0.1 legacy seed를 최초 생성 전용으로 수정

## UI Policy
v2.4.0의 기존 UI·레이아웃·컴포넌트 배치를 유지한다. Version Guard 상태는 기존 Patch Preview 내부에만 표시한다.

## Recovery Test
현재 BECO/우리집캐디가 과거 Patch로 롤백된 상태라면 v2.4.1 실행 후 최신 S2.0 / v0.4.0 Patch를 다시 Preview → 적용한다. Import History에 최신 버전 기록이 남아 있어도 실제 상태가 낮으면 RECOVERY로 적용된다.
