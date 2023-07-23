---
title:  "[언리얼 엔진] Time"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Time
  - TimerManager

toc: true
toc_sticky: true

use_math: true

date: 2023-07-20
last_modified_at: 2023-07-21
---

# Time
- UWorld는 여러 시간을 관리한다.

## TimeSeconds
- 게임이 시작되고 난 뒤 지난 시간.
- 게임의 정지, IS의 증가, 제한 등이 적용된다.

### UWorld::GetTimeSeconds


<br>
<br>
---

# TimerManager
- 게임 내 글로벌 타이머를 관리한다.

# 주요 메서드

## SetTimer
### parameters
- FTimerHandle& InOutHandle
    - 
- UserClass* InObj
    - 타이머 함수를 호출할 객체
- typename FTimerDelegate::TMethodPtr< UserClass > InTimerMethod
    - template <class UserClass>
    - 타이머가 발동할 때 호출할 메서드
- float InRate  
    - 타이머가 설정되고 발동하기 까지의 시간. 초 단위이다.
    - 0.0f 보다 작을 경우 기존의 타이머를 제거한다
- bool InbLoop 
    - true 면 rate 간격 동안 계속 발동.
    - false 면 한번만 발동.
- float InFirstDelay
    - 타이머의 첫 실행까지의 시간. 초 단위
    - 0.0f 보다 작을 경우  InRate 적용.
    - default 값은 -1.f

### methods

```cpp
template< class UserClass >
void SetTimer(FTimerHandle& InOutHandle, UserClass* InObj, typename FTimerDelegate::TMethodPtr< UserClass > InTimerMethod, float InRate, bool InbLoop = false, float InFirstDelay = -1.f)	{...}

template< class UserClass >
void SetTimer(FTimerHandle& InOutHandle, UserClass* InObj, typename FTimerDelegate::TConstMethodPtr< UserClass > InTimerMethod, float InRate, bool InbLoop = false, float InFirstDelay = -1.f)	{...}

/** 일반적인 델리게이트를 받는 버전. */
void SetTimer(FTimerHandle& InOutHandle, FTimerDelegate const& InDelegate, float InRate, bool InbLoop, float InFirstDelay = -1.f)	{...}

/** dynamic delegate 받는 버전 UFunctions 같은 애들 */
void SetTimer(FTimerHandle& InOutHandle, FTimerDynamicDelegate const& InDynDelegate, float InRate, bool InbLoop, float InFirstDelay = -1.f)	{...}

/** delegate 을 받지 않는 버전 */
void SetTimer(FTimerHandle& InOutHandle, float InRate, bool InbLoop, float InFirstDelay = -1.f) {...}

/** TFunction을 받는 버전 */
void SetTimer(FTimerHandle& InOutHandle, TFunction<void(void)>&& Callback, float InRate, bool InbLoop, float InFirstDelay = -1.f ) {...}
```

- 예시

```cpp
GetWorld()->GetTimerManager().SetTimer(DeadTimerHandle, FTimerDelegate::CreateLambda([this]()->void { // do something
	}), DeadTimer, false);
```