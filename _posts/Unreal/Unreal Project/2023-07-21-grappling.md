---
title:  "그래플링 훅"
excerpt: "Grappling Hook"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Grappling Hook

toc: true
toc_sticky: true

use_math: true

date: 2023-07-21
last_modified_at: 2023-08-02
---
> 개인 프로젝트의 그래플링 훅 구현 내용입니다.  

---

# 개요
- 그래플링 훅..

# 구상
## 플레이어
1. Grappling Hook 가능한 상태인지 확인
	- Grappling Hook 도중
	- .... 장전중?
2. 플레이어 위치로부터 조준점 방향으로 Grappling Hook Range 길이만큼 LineTrace
	- Hook	발사 구현
3. Collision Location이 Grappling Hook이 가능하면,
4. 플레이어 위치로부터 Collision Location 까지 Hook 연결
5. 목적지까지 이동 Lerp 시작.
	- bIsGrappling = true
6. 시작 시 공중으로 살짝 띄우고 목적지까지 발사..
	- ACharacter::LaunchCharacter 활용하기.
```cpp
// Set a pending launch velocity on the Character.

virtual void LaunchCharacter
(
    FVector LaunchVelocity,
    bool bXYOverride,
    bool bZOverride
)
```

7. LaunchCharacter 가 잘 작동하지 않는 경우에 Lerp를 이용한 SetActorLocation으로 이동
8. 종료 조건
	- Grappling 중 장애물과 충돌
	- 목적지에서 GrapplingStopDistance 만큼 떨어진 거리 도달 시
	- 그 외 에러로 인한 무한 Grappling 방지 위한 Grappling 최대 시간 초과 시 
		- 우선 목표는 Grappling 최대 시간 : 1초
		- 

# 구현 과정 중 생긴 문제들
- 