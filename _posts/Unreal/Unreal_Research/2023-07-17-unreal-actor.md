---
title:  "[언리얼 엔진] 액터"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Actor

toc: true
toc_sticky: true

use_math: true

date: 2023-07-17
last_modified_at: 2023-07-17
---

> https://docs.unrealengine.com/5.2/ko/actors-in-unreal-engine/

---

# 액터
- 레벨에 배치할 수 있는 오브젝트이고, 트랜스폼을 지원하지만 직접 저장하지는 않는다.

# 액터 생성
- AActor 클래스 인스턴스를 생성하려면 SpawnActor() 등을 사용하여 Spawn 하면 된다.

# 컴포넌트
- 액터는 컴포넌트를 담는 그릇이라 볼 수 있다.
- RootComponent 프로퍼티는 루트 역할을 하는 컴포넌트를 나타낸다.

## UActorComponent 
- 베이스 컴포넌트이며, 액터의 일부로 포함가능하다.
- Tick 가능
- 월드의 특정 지점에 존재하는 것은 아님.

## USceneComponent
- 트랜스폼이 있는 액터 컴포넌트.
- 트랜스폼은 위치, 회전, 스케일로 정의되는 월드 상의 포지션을 나타냄
- 계층 구조 형태로 서로에게 붙일 수 있음

## UPrimitiveComponent
- 그래픽적 표현이 있는(메시 또는 파티클시스템 같은) 씬 컴포넌트. 피직스, 콜리전 세팅 등이 들어 있음

# 틱
- 액터를 업데이트 하는 방법이다.
- 매 프레임 또는 최소 또는 사용자 정의 간격마다 틱을 하여 동작이나 계산을 업데이트함
- 액터는 기본적으로 Tick() 함수
- ActorComponent 는 TickComponent()

# 액터의 수명 주기

## 디스크에서 로드
- 이미 레벨에 있는 액터에 대해, LoadMap 이나 AddToWorld 가 호출될 때 발생

1. PostLoad
  - 디스크에서 로드 완료 후 serialize 된 액터에 의해 호출됨
  - 커스텀 버전이나 픽스 작업은 여기서.
  - PostActorCreated 와 상호 배제됨

2. InitializeActorsForPlay
  - 플레이용 액터 초기화

3. RouteActorInitialize
  - 액터 초기화 경로 변경. 초기화되지 않은 액터에 대해 호출됨  
  1. PreInitializeComponents  
    - 액터의 컴포넌트에 InitializeComponent 호출 전 호출  
  2. InitializeComponent  
    - 액터에 정의된 각 컴포넌트 생성용 헬퍼 함수  
  3. PostInitializeComponents  
    - 액터 컴포넌트 초기화 완료 후 호출
		
4. BeginPlay
  - 레벨이 시작되면 호출됨

## 에디터에서 플레이
- 디스크에서 로드와 비슷.
- 액터를 디스크에서 로드하기 보다는 에디터에서 복사해 옴

## 스폰
- 액터를 스폰(인스턴싱) 할 때 .

1. SpawnActor 호출
2. PostSpawnInitialize 호출
3. PostActorCreated
  - 스폰된 액터의 생성 이후 호출
  - 생성자 등이 옴
  - PostLoad 와 상호 배제적

4. ExecuteConstruction
  - OnConstruction 
    - 액터의 생성 지점
    - 블루프린트 액터가 컴포넌트를 만들고 블루프린트 변수를 초기화함
5. PostActorConstruction
  - PreInitializeComponents
  - InitializeComponent
  - PostInitializeComponents
6. OnActorSpawned
  - 액터 스폰 시 UWorld에 방송됨
7. BeginPlay

## 디퍼드 스폰
- "Expose on Spawn" 설정된 프로퍼티가 있으면 액터는 디퍼드(유예시켯다 나중에 한번에) 스폰 가능함

# 액터 소멸
## 게임 플레이 도중
- Destory 
  - 게임플레이가 계속 진행중일 떄 게임에서 수동으로 호출.
  - 액터는 킬 대기 상태가 되며, 레벨의 액터 배열에서 제거됨
- Endplay
  - 액터의 수명이 막바지에 다다랐음을 보증하기 위해 여러 곳에서 호출됨
  - 다음과 같은 경우에 호출됨
    - Destroy 명시적 호출
    - 에디터에서 플레이 종료
    - Level Transition
    - 액터가 들어있는 스트리밍 레벨 언로드
    - 액터의 수명 만료
    - 어플리케이션 종료

- 액터는 RF_PendingKill 마킹되며, 다음 컬렉션 주기 동안 deallocate 된다.
- pendingkill 을 수동 검사하기 보다는 FWeakObjectPtr<AActor>를 사용하면 좋다

- OnDestory
  - legacy


# AActor 관련 메서드들

### AActor::GetDebugName
- Retrieves actor's name used for logging, or string "NULL" if Actor is null

```cpp
static FString GetDebugName
(
    const AActor * Actor
)
```

### AActor::GetActorForwardVector
- 액터의 forward (X) 단위벡터를 리턴한다.

```cpp
FVector GetActorForwardVector() const
```