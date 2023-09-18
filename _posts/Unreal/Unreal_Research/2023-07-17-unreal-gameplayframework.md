---
title:  "[언리얼 엔진] 게임플레이 프레임워크"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Gameplay Framework

toc: true
toc_sticky: true

use_math: true

date: 2023-07-17
last_modified_at: 2023-07-17
---

> https://docs.unrealengine.com/5.2/ko/gameplay-framework-in-unreal-engine/

---

# 월드의 플레이어, 아군, 적군
## 폰
- 월드의 대리인 역할을 하는 Actor
- Controller 에 의해 possess 한다.

## 캐릭터
- 인간형 pawn
- capsulecomponent, charactermovementcomponent 가 기본적으로 포함됨

## Controller
- Pawn 에 대한 지시를 담당하는 Actor
- 보통 AIController, PlayerController 가 있음

### PlayerController
- Pawn 과 사람 플레이어를 잇는 인터페이스

### AIController
- Pawn을 제어하는 의지를 시뮬레이션으로 재현한 것

# 정보 표시
## HUD(heads-up display)
- 머리 위에 뜨는 화면 표시기 등.
- PlayerController에 보통 하나씩 있음

## Camera
- 플레이어의 눈을 나타냄

# 게임의 규칙
## GameMode
- 게임의 규칙이나 승리 조건 등이 포함됨
- 서버에만 존재

## GameState
- 접속된 플레이어 목록, 점수, 완료한 퀘스트 목록 등의 게임 상태
- 서버와 모든 클라이언트에 존재

## PlayerState
- 게임 참여자의 상태
- AI에는 없음
- 플레이어 이름, 점수 등


# 게임플레이 타이머
## 타이머 관리
- 타이머는 글로벌 FTimerManager 타입의 TimeManager에서 관리한다.
- Game Instance 오브젝트와 World 에 존재한다.
- 타이머를 셋업하는 데 사용되는 함수로 ```SetTimer```와 ```SetTimerForNextTick``` 이 대표적이다.
- 둘다 오버로드가 다수 있으며, 오브젝트 또는 함수 델리게이트에 붙을 수도 있고, 일정 간격마다 반복되도록 할 수도 있다.
- 호출한 오브젝트가 소멸하면 타이머는 자동 취소된다.
- 타임 매니저 접근은 AActor의 함수 GetWorldTimerManager를 이용하면 된다. 글로벌 타이머 매니저에 접근하려면 UGameInstance의 함수 GetTimerManager를 사용하면 된다.

## 타이머 설정 및 해제
- SetTimer 함수는 딜레이 후 함수나 델리게이트를 호출하는 타이머를 설정한다.
- FTimerHandle 타입의 TimerHandle을 채운다.
- 시간 간격이 아닌 다음 프레임에 실행되도록 설정하고 싶으면 SetTimerForNextTick을 호출하면 된다. 이 경우 TimerHandle을 채우지 않는다.
- 타이머를 해제하려면 FTimerHandle을 FTimerManager의 함수인 ClearTime에 전달하면 된다.
- 특정 오브젝트에 연관된 모든 타이머는 ClearAllTimersForObject 호출로 해제 가능하다.
- SetTimer를 0 이하의 속도로 호출한다는 것은 ClearTime을 호출한다는 것과 같다.

### FTimerManager::SetTimer

```cpp
void SetTimer
(
    FTimerHandle& InOutHandle,
    UserClass* InObj, 
    typename FTimerDelegate::TMethodPtr< UserClass > InTimerMethod, 
    float InRate, 
    bool InbLoop = false, 
    float InFirstDelay = -1.f
)
```

### 샘플 예시

```cpp
    void AMyActor::BeginPlay()
    {
        Super::BeginPlay();

        // Call RepeatingFunction once per second, starting two seconds from now.
        GetWorldTimerManager().SetTimer(MemberTimerHandle, this, &AMyActor::RepeatingFunction, 1.0f, true, 2.0f);
    }

    void AMyActor::RepeatingFunction()
    {
        // Once we've called this function enough times, clear the Timer.
        if (--RepeatingCallsRemaining <= 0)
            {
                GetWorldTimerManager().ClearTimer(MemberTimerHandle);
                // MemberTimerHandle can now be reused for any other Timer.
            }
        // Do something here...
    }
```