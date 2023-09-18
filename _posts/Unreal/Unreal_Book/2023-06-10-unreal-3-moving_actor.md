---
title:  "움직이는 액터 제작"
excerpt: "Unreal Engine Ch.3"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Book
tags:
  - Unreal
  - Actor

toc: true
toc_sticky: true

use_math: true

date: 2023-06-10
last_modified_at: 2023-06-10
---
> '이득우의 언리얼 c++ 게임 개발의 정석' 책을 참고하여 작성한 포스트입니다.

---

> 1. 프로그래밍 환경을 편하게 만들어줄 매크로를 설정하고,
> 2. 게임에서 액터가 어떻게 생성되고,
> 3. 액터에서 어떤 이벤트가 발생하는 지 본다
> 4. 무브먼트 컴포넌트를 이용해 로직 없이 움직임을 구현한다.

---

## 로깅 환경의 설정
- 액터의 생성 과정을 먼저 알아보기 위해 편리한 로깅 환경을 먼저 구축해보자.

### 출력 로그 윈도우
- ```UE_LOG``` 매크로로 로깅 환경을 구축한다..

```cpp
UE_LOG(카테고리, 로깅 수준, 형식 문자열, 인자 ...)
```
- 생성된 로그는 파일 혹은 **출력 로그** 윈도우를 통해 확인 가능하다.
- 파일은 프로젝트의 Saved->Logs->log확장자 파일에 있다.

### 로그 카테고리
- 모든 로그는 카테고리별로 분류된다.
- 에디터 처음 시작했을 때에도 로그가 쌓여 있으니 이 로그를 보면 에디터가 어떻게 초기화되는 지 알 수 있겠지?

### 로깅 수준
- 메시지(log), 경고(warning), 에러(error) 로 로그의 중요도가 나뉜다.
- **에디터 개인설정** -> **외형** 섹션에서 색상 변경 가능하다.

### 로그 필터
- 필터를 이용해 깔끔하게 봐도 된다.

### 형식 문자열
- 로그 매크로는 다양한 데이터를 하나의 문자열로 조합해 출력하도록 C 언어의 ```printf``` 함수와 같은 형식 문자열 기능을 지원한다.
- 문자열 사용할 때 주의할 점이 있다.
    - 문자열은 모든 플랫폼에서 2바이트 문자열을 지원하는 ```TEXT``` 매크로를 사용하는 것이 좋다.
    - 문자열을 관리하는 기본 클래스로 ```FString``` 클래스를 제공하는데, 
    -  ```FString```으로 선언된 변수에서 문자열 정보를 얻어오려면 반드시 *연산자를 앞에 지정해줘야 한다.

    ```cpp
    FString::Printf(TEXT("Actor name: %s, ID : %d, Location X : %.3f"),
        *GetName(), ID, GetActorLocation().x);
    
    /* 출력 결과 - Actor Name : Fountain2_8, ID : 0, Location X : 410.000 */
    ```

### 로깅을 위한 공용 매크로 설정
- 나만의 로그 카테고리를 만들어 보자..
- 로그 카테고리 선언을 하기 위한 두 개의 매크로가 있다.
- 하나는 선언부, 다른 하나는 구현부에 사용된다.
- 게임 모듈명으로 된 헤더 파일과 소스 파일에 각각 선언하는 것이 일반적이다.
- ArenaBattle.h, ArenaBattle.cpp에 각각 선언해 주자.

- ArenaBattle.h

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "EngineMinimal.h"

DECLARE_LOG_CATEGORY_EXTERN(ArenaBattle, Log, All);

```

- ArenaBattle.cpp

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.

#include "ArenaBattle.h"
#include "Modules/ModuleManager.h"

DEFINE_LOG_CATEGORY(ArenaBattle);
IMPLEMENT_PRIMARY_GAME_MODULE( FDefaultGameModuleImpl, ArenaBattle, "ArenaBattle" );
```

- 분수대 액터 선언에서 ```EngineMinimal.h```를 ```ArenaBattle.h```로 바꿔주자.
- 게임 시작 후 가장 먼저 실행하는 액터의 함수는 ```BeginPlay```다.

```cpp
// Called when the game starts or when spawned
void AFountain::BeginPlay()
{
	Super::BeginPlay();
	
    UE_LOG(ArenaBattle, Warning, TEXT("Actor Name : %s, ID : %d,
        Location X : %.3f"), *GetName(), ID, GetActorLocation().X);
}
```

- 플레이 버튼을 누르면 **출력 로그** 윈도우에 배치한 fountain 액터의 수만큼 로그가 출력될 것이다.
- 좀 더 정보를 보기 위해 발생한 함수 이름과 코드 라인을 함께 출력하는 매크로를 제작해 보자.
    - ```ABLOG_S```
        - 코드가 들어있는 파일 이름과 함수, 그리고 라인 정보를 추가해 로그를 남긴다.
        - 로그를 사용한 함수의 실행 시점을 파악할 때 유용하다
    -  ```ABLOG```
        - 정보에 형식 문자열로 추가 정보를 지정해 로그를 남긴다.
- ```ArenaBattle.h``` 아래 부분에 아래 내용을 추가하고,
- ```Fountain.cpp```의 ```BeginPlay``` 도 수정해준다.

```cpp
#define ABLOG_CALLINFO (FString(__FUNTION__) + TEXT("(") + FString::FromInit(__LINE_) + TEXT(")"))
#define ABLOG_S(Verbosity) UE_LOG(ArenaBattle, Verbosity, TEXT("%s"), *ABLOG_CALLINFO)
#define ABLOG(Verbosity, Format, ...) UE_LOG(ArenaBattle, Verbosity, TEXT("%s %s"),
                                         *ABLOG_CALLINFO, *FString::Printf(Format, ##__VA_ARGS__))
```

```cpp
ABLOG_S(Warning);
ABLOG(Warning, TEXT("Actor Name : %s, ID : %d, Location X : %.3f"), *GetName(), ID, GetActorLocation().X);
```
- Warning 대신 Log를 사용하면 보통의 로깅 수준이 되겠죠

<br>

## Assertion(어설션)
- <u>반드시 확인하고 넘어가야 하는 점검 코드</u>를 의미 한다.
- 대표적인 어설션 구문으로 ```check``` 가 있다.
- ```check``` 안의 조건을 통과하지 못하면 크래시 화면이 뜨고 언리얼 에디터는 종료된다.
- 어설션 기능이 효과적으로 발휘되려면 디버깅 정보를 파악할 수 있는 디버깅 기호가 엔진에 있어야 한다.
- 언리얼 라이브러리에서 엔진 옵션을 선택해 디버깅 기호를 설치해 주자. (뭔데 50기가?)
- 에디터를 종료하고 띄우는 시간이 매우 오래 걸리니 가볍게 경고만 내리는 ```ensure``` 쪽으로 하자..

<br>

## 액터의 주요 이벤트 함수
- **액터는 게임 콘텐츠를 이루는 단위 구성 요소**이다!!
- 액터는 준비되는 과정에서 모든 컴포넌트의 세팅이 완료 되어야 한다.
- 모든 컴포넌트의 세팅이 완료되면 언리얼 엔진은 액터의 ```PostInitializeComponents``` 함수를 호출한다.
- 준비 후 액터는 게임에 참여하는 데 이때 액터의 ```BeginPlay``` 함수가 호출되고,
- 매 프레임마다 액터의 ```Tick``` 함수가 호출된다.
- 액터가 게임에서 퇴장하면 메모리에서 소멸되는데, 퇴장할 때 ```EndPlay``` 함수를 호출한다.
- 언리얼엔진이 위 함수들처럼 자동으로 호출하는 중요한 함수를 여기서는 **이벤트 함수**라 부르고 설명한다.
- 이벤트함수가 언제 호출되는지 로그를 통해 보자!

```cpp
//fountain.h
...
protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
	virtual void PostInitializeComponents() override;
```

- override 가 없어도 상속은 잘 하지만, 그래도 키워드를 알려주는게 좋겠죠
- 이 이벤트 함수들은 가상 함수(virtual function)로 선언돼 있다.
- 그리고 부모 클래스인 액터의 가상 함수 로직에는 중요한 로직들이 있으니,
- 상속받은 자식 클래스에서 필요 로직 구현할 때는 그보다 <u>먼저 부모 클래스 함수에 있는 중요한 로직을 실행해야 한다.</u>

```cpp
// Fountain.cpp

void AFountain::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
    Super::EndPlay(EndPlayReason);
    ABLOG_S(Warning);
}

void AFountain::PostInitializeComponents()
{
    Super::PostInitializeComponents();
    ABLOG_S(Warning);
}

```
- 출력 로그 윈도우를 보면 ```PostInitializeComponents``` -> ```BeginPlay``` -> ```EndPlay```
- 순임을 알 수 있다.


<br>

## 움직이는 액터의 설계
- ```Tick``` 함수로 액터의 움직임을 구현해 보자.
- 틱 함수는 **화면을 만들어내는 렌더링 프레임 단위**로 동작한다.
- 이전 렌더링 프레임으로부터 현재 렌더링 프레임까지 소요된 시간은 ```Tick``` 함수의
- 인자인 ```DeltaSeconds```를 통해 알 수 있다. 컴터 성능, 현재 레벨 복잡도에  따라 제각각 이겠죠.
- 이제 fountain을 z축을 기준으로 회전시켜 보자.
- 그러기 위해서 속도 정보를 값 유형으로 넣고 에디터에서 편집가능하게 ```UPROPERTY``` 매크로에 ```EditAnyWhere``` 키워드를 넣자.
- OOP의 데이터 은닉(information hiding) 측면에서 이 변수를 private으로 설정하면 예측가능하게도 컴파일 과정에서 문제가 생긴다.
- 에디터에서 수정하려면 매크로에 ```AllowPrivateAccess```라는 **META 키워드**를 추가해야 한다.
- 그러면 에디터에서 편집과 동시에 데이터 은닉을 통한 프로그래밍 영역에서 캡슐화(encapsulation)가 가능해진다.

```cpp
private:
    UPROPERTY(EditAnywhere, Category=Stat, Meta = (AllowPrivateAccess = true))
    float RotateSpeed;
```

- ```AddActorLocalRotation``` 함수를 사용해 fountain이 틱마다 회전하도록 해보자.
- 언리얼 엔진은 이동과 스케일을 위한 정보에 ```FVector```를 사용하고,
- 회전에는 ```FRotator```를 사용한다.
- ```FRotator```는 회전 값을 지정하는 데이터이며, 차례대로 Pitch, Yaw, Roll 요소다.
    - Pitch : 좌우 기준 회전. 언리얼 엔진에선 Y축 회전
    - Yaw : 상하 기준 회전. 언리얼 엔진에선 z축 회전
    - Roll : 정면 기준 회전. 언리얼 엔진에선 X축 회전
- ```DeltaTime```은 프레임 타임 정보를 나타내며 초당 일정한 속도로 fountain을 회전시키게 해준다.

```cpp
AFountain::AFountain()
{
    ...
    RotateSpeed = 30.0f;
}
...
void AFountain::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	AddActorLocalRotation(FRotator(0.0f, RotateSpeed * DeltaTime, 0.0f));
}
...
```


> UPROPERTY 매크로 구문 내에서 사용하는 키워드 값들은 언리얼 엔진에서 지정한 문법이다!  
> 이 키워드들은 컴파일 진행하기 전 **언리얼 헤더 툴(unreal header tool)**이라는 프로그램에 의해 분석되고,  
> 이 매크로들을 분석한 결과로 generated라는 이름의 추가 코드를 자동으로 생성한다.  
> 그래서 generated 코드까지 묶어 소스 코드를 컴파일 하는 것이다.  
> 언리얼 헤더 툴이 생성하는 코드는 Source 폴더가 아닌 Intermediate 폴더에 저장된다.


### 시간 관련 함수들
- 언리얼 엔진에서 시간을 관리하는 주체는 월드다.  
- 월드에는 시간 관리자(TimeManager)가 있어 이를 통해 다양한 시간 값들을 얻을 수 있다.  
- 틱 함수 인자의 DeltaSeconds 값은 ```GetWorld()->GetDeltaSeconds()```를 통해 얻을 수 있다.  
- 틱 함수가 아닌 곳에서 유용하게 쓰일 수 있다.  
    - ```GetWorld()->GetTimeSeconds()```
        - 게임 시작 후 현재까지 경과된 시간
    - ```GetWorld()->GetUnpausedTimeSeconds()```
        - 게임 중지한 시간을 제외한 경과 시간
    - ```GetWorld()->GetRealTimeSeconds()```
        - 현실 세계의 경과 시간
    - ```GetWorld()->GetAudioTimeSeconds()```
        - 게임을 중지한 시간을 제외한 현실 세계의 경과 시간


<br>

## 무브먼트 컴포넌트 활용
- **움직임이라는 요소를 분리해 액터와 별도로 관리하는 프레임워크**이다.
- 위의 틱 함수 없이도 움직이는 액터 제작 가능하다.
- ```RotatingMovement```을 활용해 위의 코드를 수정해보자

```cpp
// Fountain.h
...
#include "Gameframework/RotatingMovementComponent.h"

UCLASS()
class ARENABATTLE_API AFountain : public AActor
{
    ...
    
	UPROPERTY(VisibleAnywhere)
	URotatingMovementComponent* Movement;
}

// Fountain.cpp

...
AFountain::AFountain()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = false;

	Movement = CreateDefaultSubobject<URotatingMovementComponent>(TEXT("MOVEMENT"));

    ...
    
	Movement->RotationRate = FRotator(0.0f, RotateSpeed, 0.0f);
}
...
```

- 무브먼트 컴포넌트는 액터의 현재 위치와 관계없이 액터에 지정된 움직임 기능을 제공하므로,
- <u>위치 정보가 필수적인 다른 컴포넌트들과 달리 독립적으로 액터에 부착된다.</u>
- 에디터에서 보면 분리된 영역에 표시된다.
- 트랜스폼 정보가 필수적인 컴포넌트를 **씬 컴포넌트(scene component)**,
- 무브먼트 컴포넌트처럼 기능만 제공하는 컴포넌트를 **액터 컴포넌트(actor component)** 라고 한다.

정확히는 씬 컴포넌트는 액터 컴포넌트를 상속받아 트랜스폼 정보를 추가한 클래스다.
{: .notice--info}


### 무브먼트 컴포넌트 종류들
- ```FloatingPawnMovement```
    - 중력의 영향을 받지 않는 액터의 움직임
- ```RotatingMovement```
    - 지정한 속도로 액터 회전
- ```InterpMovement```
    - 지정한 위치로 액터 이동
- ```ProjectileMovement```
    - 중력의 영향을 받는 액터의 움직임



## 프로젝트의 재구성
- 액터 추가는 쉽지만 제거 메뉴는 없다. 즉, 수동으로 제거해야 한대!
- 그 전에, .vscode, Binaries, Intermediate 폴더와 ArenaBattle.sln 파일을 제거해 보자.
- 이후 uproject 파일을 우클릭하고 generate visual studio project files 메뉴를 선택하면 자동으로 비주얼 스튜디오 솔루션을 생성한다.
- 생성된 비주얼 스튜디오를 열고 컴파일하면, Binaries 폴더가 생성되고, 빌드가 완료되면 해당 폴더 안에 에디터가 사용할 DLL 파일이 생긴다.
- 이것들이 가능한 이유는 언리얼 빌드 툴(unreal build tool) 때문이다. 얘가 게임 프로젝트의 폴더 구조와 파일을 분석해 솔루션 파일과 프로젝트 파일을 생성한다.
- Source 폴더를 분석하며 솔루션 파일을 생성하고, 솔루션 파일에서 참조할 프로젝트 파일은 Intermediate 폴더의 ProjectFiles 폴더에 생성한다.
- 액터를 제거하려면 Source 폴더에서 관련 파일을 지우고 비주얼 스튜디오 프로젝트를 재생성해야 한다.
    1. Source 폴더 내에 위치한 Fountain.h 와 cpp 파일을 제거한다.
    2. 비주얼 스튜디오 프로젝트를 재생성한다.
    3. 에디터를 열면 자동으로 메시지 로그 윈도우가 뜨며 레벨 로딩에 에러가 발생했음을 알려준다.
    4. 무시하고 플레이 버튼을 눌러보면 제거한 액터를 제외한 나머지는 잘 작동한다.
    5. 액터를 더이상 사용하지 않을 거면, 레벨에 변경 사항을 발생시키고 레벨을 저장한다.
    6. 다음 로딩에는 에러 발생하지 않는다.

> 재생성 과정에서 게임 프로젝트 ArenaBattle이 아닌 언리얼 소스가 담긴 UE 프로젝트가 시작 프로젝트로 설정되는 일이 종종 생긴다.  
> 이럴 경우 ArenaBattle 프로젝트를 우클릭하고 시작 프로젝트로 설정 메뉴를 선택해 해결하면 된다.


