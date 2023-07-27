---
title:  "[Unreal Engine] 향상된 입력 시스템"
excerpt: "Enhanced Input System"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - EnhancedInput

toc: true
toc_sticky: true

use_math: true

date: 2023-07-03
last_modified_at: 2023-07-27
---
> 언리얼 공식 document 일부를 정리한 내용입니다.

---

# 핵심 개념

> 향상된 입력 시스템에는 네 가지 주요 개념이 있다.

- 입력 액션
  - 향상된 입력 시스템과 프로젝트 코드 사이의 커뮤니케이션 링크
- 입력 매핑 컨텍스트(Input Mapping Context)
  - 사용자의 입력을 액션으로 매핑하며 각 사용자에 대해 동적으로 추가, 제거 및  우선순위를 지정함
- 모디파이어(Modifiers)
  - 사용자 디바이스의 원본 입력 값을 조절함.
  - 각 입력 액션의 원시 입력(raw input)과 관련된 모디파이어를 얼마든지 가질 수 있다.
  -  일반적인 모디파이어로는 데드존, 다수 프레임에서 입력 스무딩, 입력 벡터를 로컬에서 월드 스페이스로 변환, 기타 플러그인에 포함되는 것들이 있다.
  -  자신만의 모디파이어를 생성할 수도 있다.
- 트리거
  - 모디파이어 이후 입력 값이나 다른 입력 액션의 출력 규모를 사용하여 입력 액션을 활성화할지 여부를 결정함

# 입력 액션
- 입력 액션을 트리거하려면 입력 매핑 컨텍스트에 포함시키고 해당 입력 매핑 컨텍스트를 로컬 플레이어의 향상된 입력 로컬 플레이어 서브시스템(Enhanced Input Local Player Subsystem) 에 추가해야 한다.
- 폰 클래스가 트리거된 입력 액션에 반응하게 하려면 SetupPlayerInputComponent에서 해당 폰 클래스를 적절한 유형의 트리거 이벤트(Trigger Event) 에 바인딩해야 한다. 

## 샘플 코드
- SetupPlayerInputComponent를 오버라이드하여 입력 액션인 MyInputAction과 MyOtherInputAction을 핸들러 함수에 바인딩한다.

```cpp
 if (UEnhancedInputComponent* PlayerEnhancedInputComponent =  
     Cast<UEnhancedInputComponent>(PlayerInputComponent))
 {
    // UInputAction*을 핸들러 함수 및 관심 대상인 
    // 각종 ETriggerEvent에 바인딩하는 방법은 여러 가지이다.

    // 액션 버튼을 누를 때와 같이 MyInputAction이 시작될 때
    // 틱에서 핸들러 함수를 호출한다.
    if (MyInputAction)
    {
        PlayerEnhancedInputComponent->BindAction(
          MyInputAction, ETriggerEvent::Started, this, 
          &AMyPawn::MyInputHandlerFunction);
    }

    // 이동 키를 길게 누를 때 등 입력 조건이 충족되면
    // 모든 틱에서 이름으로 핸들러 함수(UFUNCTION)를 호출함
    if (MyOtherInputAction)
    {
        PlayerEnhancedInputComponent->BindAction(
          MyOtherInputAction, ETriggerEvent::Triggered, this,
          TEXT("MyOtherInputHandlerFunction")
        );
    }
 }
```

## 핸들러 함수
- 향상된 입력 플러그인을 사용하는 경우 입력 액션만 바인딩해야 한다.
- 입력 액션을 바인딩할 때는 다음과 같은 네 가지 핸들러 함수 시그니처 가운데 하나를 선택하면 된다.

반환 값

- 파라미터 : ()
  - 향상된 입력 시스템으로부터 추가 정보가 필요하지 않은 단순한 사례에 적합

- 파라미터 : (const FInputActionValue& ActionValue)
  - 입력 액션의 현재 값에 대해 접근 가능

- 파라미터 : (const FInputActionInstance& ActionInstance)
  - 입력 액션의 현재 값, 트리거 이벤트 유형, 연관성 있는 타이머에 대해 접근 가능

- 파라미터 : (FInputActionValue ActionValue, float ElapsedTime, float TriggeredTime)
  - 이름으로 UFunction에 동적으로 바인딩할 때 사용되는 시그니처.
  - 파라미터는 선택 사항이다.

- 입력 액션에는 블루프린트 스크립팅에 노출되는 내장 이벤트가 있어 입력 액션 이벤트 액세스를 제공하기 위한 패스스루 함수를 만들 필요가 없다.

- 일반적인 핸들러 함수 예시는 다음과 같다.

```cpp
 void AMyPawn::MyFirstAction(const FInputActionValue& Value)
 {
    // 핸들러 함수가 실행되고 있음을 확인해 주는 디버그 로그 출력
    UE_LOG(LogTemp, Warning, TEXT("%s called with Input Action Value %s (magnitude %f)"), TEXT(__FUNCTION__), *Value.ToString(), Value.GetMagnitude());
    // GetType() 함수를 사용하여 값의 유형을 결정하고, [] 연산자를 0~2 사이의 인덱스와 함께 사용하여 데이터에 액세스하면 된다.
 }
```

- 대부분은 void (const FInputActionValue&) 시그니처를 사용하면된다. 입력 액션을 핸들러 함수와 바인딩하면 폰이 트리거된 특정 방식에 따라 반응하게 만들 수 있다.
- Started
  - 가장 일반적인 트리거 유형은 버튼을 누른 즉시 한 번 발생하는
- Triggered
  - 입력을 누르고 있는 동안 매 프레임마다 지속적으로 액션이 발생
- 기타
  - 전체 목록은 Plugins/EnhancedInput/ETriggerEventETriggerEvent의 API 레퍼런스 페이지에서 볼 수 있다.

# 입력 매핑 컨텍스트(Input Mapping Context)
- 하나 이상의 입력 액션을 트리거하는 규칙이다.
- 기본 구조는 최상위 레벨의 입력 액션 목록을 갖춘 계층구조이다. 
- 입력 액션 레벨 아래에는 키, 버튼, 움직임 축 등 각 입력 액션을 트리거할 수 있는 사용자 입력 목록이 있다. 
- 하단 레벨에는 각 사용자 입력에 대한 입력 트리거와 입력 모디파이어 목록이 있다. 여기서는 입력의 원본 값을 어떻게 필터링하고 프로세스할지, 어떤 제한을 충족해야 계층구조 상위의 입력 액션을 주도할 수 있는지 결정한다.
- 입력은 다수의 입력 모디파이어와 입력 트리거를 가질 수 있다. 이는 각 단계의 출력을 다음 단계의 입력으로 사용하여 순차적으로 평가된다.

- 복잡한 프로젝트는 다수의 입력 매핑 컨텍스트가 있어야 더 잘 작동한다. 
- 예를 들어 수영하고, 걷고, 차량을 운전할 수 있는 캐릭터에는 항상 사용 가능하며 항상 동일한 사용자 입력에 매핑되는 일반 액션에 대한 입력 매핑 컨텍스트와 각 이동 방식에 대한 별개의 입력 매핑 컨텍스트가 있을 수 있다. 
- 차량 관련 입력 액션을 별도의 입력 매핑 컨텍스트에 배치하고, 이를 로컬 플레이어가 차량에 타면 추가했다가 차량에서 내리면 제거할 수 있다. 
- 이렇게 하면 적절하지 않은 입력 행동이 실행되지 않게 하여 버그를 줄이고 CPU 사이클의 낭비를 막을 수 있다. 
- 또한 상호 배타적인 입력 매핑 컨텍스트를 통해 서로 다른 입력 액션에 사용되는 사용자 입력 간의 입력 콜리전을 피할 수 있다. 

- 드롭다운 목록에서 다수의 입력 바인딩을 이용할 수 있다. 입력 바인딩을 더 빠르게 선택하려면 드롭다운 왼쪽의 작은 버튼을 누른 다음 바인딩하고 싶은 키나 버튼을 누르면된다.

-  입력 매핑 컨텍스트를 채우면 폰의 플레이어 컨트롤러와 연결된 로컬 플레이어에게 이를 추가할 수 있다. 이를 위해 PawnClientRestart 함수를 오버라이드하고 다음과 같은 코드 블록을 추가한다.

```cpp
 // 유효한 플레이어 컨트롤러가 있는지 확인한다.
 if (APlayerController* PC = Cast<APlayerController>(GetController()))
 {
    // 향상된 입력 로컬 플레이어 서브시스템을 플레이어 컨트롤러와 관련된 로컬 플레이어로부터 가져온다
    if (UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PC->GetLocalPlayer()))
    {
        // PawnClientRestart가 액터의 수명에서 2회 이상 실행될 수 있으므로 잔여 매핑을 우선 제거한다.
        Subsystem->ClearAllMappings();

        // 각 매핑 컨텍스트를 우선순위 값과 함께 추가한다. 높은 값이 낮은 값에 우선한다.
        Subsystem->AddMappingContext(MyInputMappingContext, MyInt32Priority);
    }
 }
```
- 입력 매핑 컨텍스트를 추가하면 폰이 SetupPlayerInputComponent에 바인딩했거나 블루프린트 스크립팅 사용자가 구성한 입력 액션 이벤트에 반응할 수 있게 된다. 
- 게임플레이 도중 이용 가능한 입력 매핑 컨텍스트를 변경하는 이벤트가 발생하면 ClearAllMappings, AddMappingContext, RemoveMappingContext를 사용하여 이용 가능한 명령 세트를 동적으로 업데이트할 수 있다. 

# 입력 모디파이어(Input Modifier)
- 언리얼 엔진이 수신한 원본 입력을 입력 트리거로 전달하기 전에 변경하는 프리 프로세서이다.
-  향상된 입력 플러그인에는 다양한 입력 모디파이어가 포함된다. 이 모디파이어들은 축 순서 변경, '데드존' 구현, 축 입력을 월드 스페이스로 변환 등 다양한 작업을 수행한다. 
- 입력 매핑 컨텍스트 내의 입력 액션과 연결된 각 입력은 사용자가 정의한 일련의 입력 모디파이어 시리즈를 통과한 이후에 해당 입력의 입력 트리거로 진행한다. 
- 입력 모디파이어는 목록에 나열된 순서대로 적용되며 각 입력 모디파이어의 출력 값은 다음 입력 모디파이어의 입력 값이 된다. 
- 존재하지 않는 입력 모디파이어가 프로젝트에 필요하다면 UInputModifier 클래스를 직접 만들 수 있다.

# 입력 트리거(Input Trigger)
-  사용자 입력이 입력 모디파이어 목록을 통과한 뒤 입력 매핑 컨텍스트 내에서 해당되는 입력 액션을 활성화할지 여부를 결정한다. 
- 대다수 입력 트리거는 최소 활성화 값을 확인하고 짧은 탭, 길게 누르기, 일반적인 '누르기' 또는 '놓기' 이벤트와 같은 패턴을 검증하여 입력 자체를 분석한다.
- 이 규칙에서 한 가지 예외는 다른 입력 액션이 트리거되어야 하는 'Chorded Action' 입력 트리거이다. 
- 기본으로 입력에 대한 사용자 활동은 모든 틱에서 트리거된다. 
-  향상된 입력 플러그인에 존재하지 않는 입력 트리거가 프로젝트에 필요하다면 UInputTrigger 클래스를 직접 만들 수 있다.

## 트리거 종류 
- UInputTriggerDown
  - 입력이 작동한계치를 넘어서면 트리거가 발동된다.
  - 바인딩된 트리거가 없는 경우 작동한계치가 0을 넘는 입력이 디폴트이다.
- UInputTriggerPressed
  - 입력이 작동한계치를 초과했을 때 한번만 발동된다.
- UInputTriggerHold
  - 
- UInputTriggerHoldAndRelease
  - HoldTimeThreshold초 이상 작동한 후 입력이 release 되면 트리거 발동
- UInputTirggerPulse
  - 입력이 작동되는 동안 특정 시간 단위로 트리거 발동

# 디버그 명령
- showdebug enhancedinput