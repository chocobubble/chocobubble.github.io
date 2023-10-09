---
title:  "[Unreal] 멀티플레이어 개요"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Multiplayer
tags:
  - Unreal
  - Multiplayer

toc: true
toc_sticky: true

use_math: true

date: 2023-09-19
last_modified_at: 2023-09-19
---

# 멀티플레이어 모델
1. peer-to-peer
2. client-server
3. unreal-engine


- 단일 컴퓨터에서 실행되는 화면 분할은 네트워크가 필요없는 로컬 멀티플레이어이다.
- 멀티플레이어 게임에선 두 플레이어가 게임에 변경 사항을 입력하므로 두 개 이상의 게임 인스턴스가 각각 별도의 시스템에서 실행된다.
- 이런 변경 정보가 게임의 다른 인스턴스로 전송돼야 한다.
- 이런 정보를 공유하는 방법들이 다음과 같다
	1. peer-to-peer(P2P)
		- 정보가 다른 컴퓨터로 직접 보내진다.
		- 단점
			- 플레이어가 많아지면 많은 양의 데이터가 보내진다..
			- 각 게임의 인스턴스의 정식 버전이 없다.
				- 각 인스턴스마다 버전이 다 다를 수 있음
	2. client-server
		- 단일 시스템은 서버로 지정되고 다른 모든 시스템은 클라이언트로 지정된다.
		- 모든 클라이언트는 서버와만 대화한다.
		- 각 클라는 다른 컴퓨터가 아닌 서버와 정보 송수신 위한 대역폭 요구 사항만 충족하면 된다.
		- 서버가 올바른 버전을 주도한다.
		- 구현 방법
			1. 플레이어 머신 중 하나가 서버 역할을 하는 방법
			2. 전용 서버를 이용하는 방법
				- dedicated-server
				- reliable 시뮬레이션만 처리
				- 데이터를 클라이언트의 대규모 멀티플레이어로 복제 가능
				- mmo 등
	3. 언리얼 엔진
		- authoritative client server
		- 한 컴퓨터는 항상 서버로 동작하고 다른 컴퓨터는 클라로 연결됨
		- 싱글 플레이어 게임도 클라 서버 모델을 이용함.
			- 클라와 서버가 같은 머신인 것임


# 언리얼 엔진에서 멀티플레이어 테스트 
- 에디터의 재생 버튼 바로 옆에 재생 모드를 변경할 수 있는 세 개의 점이 있다.
- 여기서 멀티플레이어 인스턴스 수를 늘리고, net mode 에서 play as listen server를 체크해 준다.


# LAN network
- 여러 대의 컴퓨터가 단일 라우터에 연결되어 있을 때,
- 로컬 IP 주소를 통해 같은 네트워크 내 다른 컴퓨터에 접근 가능하다.


# 멀티플레이어 관련 메서드

## UWorld->ServerTravel(string)
- travel to another level

## UWorld->ClientTravel(FString, ...)


# IP 주소
## 로컬 IP 주소
- 로컬 네트워크 라우터에서 컴퓨터에 할당한 주소.
- 이 주소들은 로컬 네트워크 내 다른 컴퓨터만 볼 수 있다.
	- 밖에선 연결 불가능

## 외부 IP 주소
- 라우터는 인터넷 서비스 제공자(ISP)와 연결되어 있다.
- ISP는 라우터에 외부 또는 공용 IP주소를 할당한다.
- 이 IP는 인터넷의 다른 모든 사용자에게 표시된다.

## 리슨 서버
- 전용 서버를 설치하려면 시간과 돈이 든다.
- 플레이어가 많아 질수록 비용이 증가한다.
- 이를 리슨 서버로 해결한다.
- 한 플레이어가 게임을 시작하고 리슨 서버로 설정된다.
	- 이후 서버를 호스팅하기 위한 서비스를 통해 연결된 플레이어들에게 신호를 보낸다.

# 언리얼 엔진 온라인 서브시스템
- 하나의 코드 베이스만 이용한다.
- 이를 이요해 서비스에 연결한다.
- 다른 플랫폼 특정 코드는 다 추상화 되었으므로 unreal 코드 만 사용해도 된다.
- 게임을 다른 서비스로 보내기 위해 코드를 변경할 필요가 없다.
- 온라인 플랫폼 서비스의 기능에 엑세스 하는 방법을 제공한다.
	- 온라인 플랫폼 서비스란 스팀 엑박라이브 같은 것들.
	- 각 플랫폼에는 친구, 업적, 매치 메이킹 세션 설정 등을 지원하는 자체 서비스 세트가 있는데,
	- 온라인 서브 시스템은 이런 다양한 서비스를 처리할 수 있도록 인터페이스가 구현되어 있다.

# 세션 인터페이스
- 게임 세션을 생성, 관리, 파괴 등을 한다.
- 게임 세션은 서버에서 실행되는 게임의 인스턴스이다.
- 아무 플레이어나 접속하게 하거나, 초대 받은 플레이어만 접속하게 설정 가능하다.

## 세션 lifetime
1. create session
2. wait for players to join
3. register players
4. start session
5. play
6. end session
7. unregister players
8. update session or destroy session


## session interface functions
- CreateSession()
- FindSession()
- JoinSession()
- StartSession()
- DestroySession()

# Delegates
- 델리게이트는 함수를 저장하고, broadcast 한다.
- 그러기 위해서 델리게이트에 callback 함수들을 bind 해 둔다.
- 델리게이트가 fire되면 연결된 함수가 호출 된다.
- &ThisClass 로 대치 가능

## 세션에서는?
- 세션 인터페이스가 세션을 생성하면 스팀 같은 곳에서 세션을 생성해준다?
- 세션 인터페이스 델리게이트로
	- FOnCreateSessionCompleteDelegate 등이 있다.
	- FOnFindSessionCompleteDelegate

- 첫 로컬 플레이어를 호스트로 하려면
	- UWorld->GetFirstLocalPlayerFromController() 이용


# Net Update Frequency
- 얼마나 액터가 자주 replicated 되는지 설정 한다
- 단위는 초 단위이고, 이를 통해 Net Update Time 이 결정된다.

# Min Net Update Frequency
- replicated 된 property가 변경되지 않고 오랜 시간이 지났을 때 이 수치에 따라 일정 시간 간격으로 한번은 업데이트 되게 한다.


# Game Framework
## Game mode
- server only
- default class들을 관리한다
- 게임 룰 결정
- 게임 경과 시간 등 state 관리

## Game State
- server and all clients
- 게임의 상태 관리
	- 플레이어들의 점수, 팀 점수, 팀 리더 등 
- player state 관리

## Player State
- server and all clients
- 플레이어들의 state 
	- 플레이어 점수 등
	- 총, 탄약 등

## Player Controller
- server and all clients
- HUD 에 접근, 업데이트

## Pawn
- server and all clients

## Hud, Widget
- Client

<br><br>

# Syncing Time
- 클라와 서버의 시간을 동기화하려면 클라이언트는 서버의 현재 시간을 알아야 한다.
- 클라는 서버가 게임을 시작하고 나서 시간이 어느정도 지난 후 참가한다.
	- 따라서 클라에서 단순히 World에서 GetTimeSeconds를 하면 서버와 시간이 맞지 않는다.
- 해결하려면 GetServerTime() 메서드를 이용한다.
	- 그래도 네트워킹 시간이 있기 때문에 정확하진 않다.
- 클라에서 서버에 도착하는 시간과 서버에서 클라에 도착하는 시간을 합친 시간을 Round-Trip Time 이라 한다.
	- 대략적으로 이 값을 반으로 나눈 값을 GetServerTime() 에 더해 시간을 동기화한다.
	- Round-Trip Time은 현재 클라이언트의 시간에서 요청을 보낸 시간을 빼주면 된다.

<br><br>

# Game Mode vs Game Mode Base
- Game Mode Base
	- Default classes
	- spawns player's pawn
	- restart players
	- restart the game
- Game Mode
	- match State
	- handling match states
	- custom match states
- 즉, match state를 이용하지 않는다면 game mode base로 충분하다.

## match state
- EnteringMap
- WaitingToStart
- InProgress
- WaitingPostMatch
- LeavingMap
- Aborted

- hasMatchStarted()
- HasMatchEnded()
- GetmatchState()
- SetMatchState()
- OnMatchStateSet()
- StartMatch()

## Delayed Start
- bDelayedStart 
- 절차
	- WaitingToStart 상태에서 대기
		- WarmupTime
	- StartMatch() 호출
		- InProgress 상태가 됨
		- Spawn Character

# ping
- packet internet(or inter-network) groper
- 네트워크를 통해 상대의 접근 여부를 조사하기 위한 프로그램.
- 요청하고 응답까지 걸리는 시간을 알 수 있다.

# Lag Compensation
- lag이 없는 것처럼 해주는 기능
- 언리얼 엔진에서는
	- extrapolation 으로 이동을 예측하고
	- interpolation 을 통해 부드럽게 이동시킨다.
	- rubber banding 이라 부른다.

## server-side rewind
- 서버는 플레이어의 움직임에 따른 위치들을 저장한다.
- 클라이언트의 사격 등이 발생했을 때 서버에 요청하고,
- 서버는 rewind 해서 해당 시각의 위치를 찾아 유효한지 판단한다.

## Client-side Prediction
- 클라이언트의 정보가 서버에 도달하는 시간은 Round-Trip Time 의 반이다.
- 

### Reconciliation
1. 클라이언트가 먼저 움직이고 나서,
2. RPC를 보내고 저장한다.
3. 서버로부터 응답을 받고,
4. 응답에 따라 위치를 수정한다.
5. 처리된 RPC들을 제거한다.
6. 처리되지 않은 RPC들에 따라 움직임을 처리한다.