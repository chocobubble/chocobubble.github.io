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