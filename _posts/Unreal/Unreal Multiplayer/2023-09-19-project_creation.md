---
title:  "[Unreal] 프로젝트 생성"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal
tags:
  - Unreal
  - Multiplayer

toc: true
toc_sticky: true

use_math: true

date: 2023-09-19
last_modified_at: 2023-09-19
---

# seamless travel
## seamless vs non-seamless travel
### non-seamless
- 클라는 서버와 연결을 하고 끊음을 반복함.
- 사용처
	- 맵을 처음 로딩할 때
	- 서버에 처음 연결할 때
	- 멀티 게임을 종료하고 새로 시작할 때

### seamless
- 클라와 서버가 연결을 끊지 않음.
- 재연결 이슈를 피할 수 있음
- bUseSeamlessTravel
- 맵이 항상 로드되어 있어야 함.
	- 그러기 위해서 transition map 필요?
		- 전환 맵을 이용해 이미 사용한 맵을 해체하기 전에 로드함
		- 그럼 두 맵이 공존할 필요 없음.

# travel in Multiplayer
- UWorld::ServerTravel
	- 서버만.
	- 서버가 다른 레벨로 점프함.
	- 클라가 다 따라옴
	- 서버가 APlayerControler::ClientTravel 호출

## APlayerControler::ClientTravel
- 클라에서 호출되면 클라가 새 서버로 이동함
- 서버에서 호출하면 새로운 맵으로 player들이 이동함

### 
- 플레이어가 로그인 할 때마다 GameMode::PostLogin 호출됨

## transition level
- 작을 수록 좋음
- 빈 공간으로 하자.
- 맵&모드에서 설정 가능


# Network Role
- 클라 입장에선 client controlling pawn, server, client not controlling pawn 이 있겠죠.
- 언리얼 엔진에는 ENetRole 로 구분함
	- ENetRole::ROLE_Authority
		- 서버 머신
	- ENetRole::ROLE_SimulatedProxy
		- 클라가 조종하지 않는 폰
	- ENetRole::ROLE_AutonomousProxy
		- 클라가 조종하는 폰
	- ENetRole::ROLE_None
		- role이 정의되지 않은 액터
- APawn->GetLocalRole() 로 구함
	- 이 경우 서버는 모든 폰 다 ROLE_Authority 인 것으로 보임
- APawn->GetRemoteRole() 로 구하면
	- 서버는 자기는 ROLE_AutonomousProxy, 다른 폰은 ROLE_SimulatedProxy로 보임
	- 클라들은 모두 ROLE_Authority로 보임

## Local Role

## Remote Role


### FString SomeString = FString::Printf(TEXT("some thing: %s"), *Str);