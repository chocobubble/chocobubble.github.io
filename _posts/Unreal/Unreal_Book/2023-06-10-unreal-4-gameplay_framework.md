---
title:  "게임플레이 프레임워크"
excerpt: "Unreal Engine Ch.4"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Book
tags:
  - Unreal
  - GamePlay
  - Framework

toc: true
toc_sticky: true

use_math: true

date: 2023-06-10
last_modified_at: 2023-06-10
---
> '이득우의 언리얼 c++ 게임 개발의 정석' 책을 참고하여 작성한 포스트입니다.

---

언리얼 엔진에서 게임이 시작되려면 게임의 규칙, 게임에 입장하는 플레이어, 플레이어가 조종하는 액터가 있어야 한다.  
각각 GameMode, PlayerController, Pawn 이라고 한다.
{: .notice--success}

---

## 게임 모드
- 게임을 만드는 작업은 크게 1.레벨을 구성하는 작업, 2.게임플레이를 설계하는 작업 으로 나눌 수 있다.
- 레벨을 구성하는 작업은 앞서 살펴 보았고,
- 게임플레이를 설계하는 작업을 위해 **게임플레이 프레임워크**라는 시스템이 있다.
- 실습에 앞서 현재 작업중인 레벨을 다른 이름으로 저장해 복사하고, 복사한 레벨을 프로젝트설정->맵&모드 섹션에서 시작 레벨로 지정한다.
- 이 맵&모드에서 게임모드도 확인 가능하다.
- Selected GameMode -> Default Pawn Class 가 폰의 타입을 지정하는 것이고, 돋보기를 누르면 폰의 정체를 확인 가능하다.
- GameModeBase, Pawn 클래스를 부모로 하는 액터를 각각 c++ 클래스로 생성하자
- 맵&모드에서 게임모드를 방금 생성한 ABGameMode로 바꾸면, 폰은 DefaultPawn이 된다.
- 플레이 중 shift+f1 키를 눌러 마우스 포커싱을 뺄 수 있다.
- 아웃라이너 윈도우에서 DefaultPawn이 있다. DefaultPawn은 노란색으로 표시되고 있다.
- 레벨을 구성하는 액터는 흰색이고, 게임 플레이 중 생성된 액터는 노란색으로 표시된다고 했었죠.
- 방금 생성한 ABPawn이 생성되기 위해서는 게임모드의 설정을 변경해야 한다.
- ABGameMode에 생성자 코드를 아래와 같이 추가한다.
- ```EngineMinimal.h```와 앞서 만든 로그 매크로를 참조하기 위해 ```CoreMinimal.h```를 ```ArenaBattle.h```로 변경한다.

```cpp
// ABGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
#include "ArenaBattle.h"
#include "GameFramework/GameModeBase.h"
#include "ABGameMode.generated.h"

/**
 * 
 */
UCLASS()
class ARENABATTLE_API AABGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	AABGameMode();
	
};

```

- 다음으로 맵&모드 에서 폰의 속성을 ```ABPawn``` 으로 바꿔준다.
- 멀티 플레이를 고려하면 폰이 여럿 생성되어야 하므로 액터가 아닌 클래스 정보를 기반으로 폰을 생성하는 것이 합리적이다.
- 언리얼 오브젝트의 클래스 정보는 언리얼 헤더 툴에 의해 자동으로 생성되며,
- 이는 언리얼 오브젝트마다 자동으로 생성된 ```StaticClass```라는 스태틱 함수를 호출해 가져올 수 있다.

```cpp
// ABGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.


#include "ABGameMode.h"
#include "ABPawn.h"

AABGameMode::AABGameMode()
{
    DefaultPawnClass = AABPawn::StaticClass();
}
```
- 빌드하고 에디터를 보면 DefaultPawnClass 가 AABPawn으로 바뀌어 있다.

<br>

## 플레이어의 입장
- 플레이어 입장 시 게임모드는 폰뿐 아니라 PlayerController라는 특별한 액터도 함께 배정한다.
- 플레이어 컨트롤러는 폰을 조종하는 역할을 맡는다.
- 한번 배정된 플레이어 컨트롤러는 변경할 수 없다.
- 폰은 이 플레이어 컨트롤러에게 조종당하는 액터이다.
- 조종당하는 폰은 다른 폰으로 변경될 수도 있다.
- 플레이어가 플레이어 컨트롤러를 통해 폰을 조종하는 행위를 **빙의(Possess)**라고 한다.
- '플레이' 버튼을 통해 플레이어가 입장하면, 다음과 같은 순서로 관련된 액터들이 생성되고 게임플레이를 위한 설정이 갖춰진다.
    1. 플레이어 컨트롤러의 생성
    2. 플레이어 폰의 생성
    3. 플레이어 컨트롤러가 플레이어 폰을 Possess
    4. 게임의 시작
- 플레이어 컨트롤러를 하나 생성하고 비슷하게 생성자를 수정해준다.

```cpp
// ABGameMode.cpp

...
#include "ABPlayerController.h"

AABGameMode::AABGameMode()
{
    DefaultPawnClass = AABPawn::StaticClass();
    PlayerControllerClass = AABPlayerController::StaticClass();
}
```

- 플레이어가 게임에 입장하는 것을 **로그인(login)**이라 한다.
- 로그인 과정에서 플레이어에게 할당할 플레이어 컨트롤러가 생성된다.
- 로그인을 완료하면 게임 모드의 ```PostLogin``` 이벤트 함수가 호출되는데 ,
- 이 함수에서 폰을 생성하고 플레이어 컨트롤러가 폰에 빙의하는 작업이 이루어진다.
- 빙의 진행 시점은 플레이어 컨트롤러의 ```Possess```,  폰의 ```PossessedBy``` 함수로 확인 가능하다.
- 로그로 함 보자

```cpp
// ABGameMode.h

...

UCLASS()
class ARENABATTLE_API AABGameMode : public AGameModeBase
{
    ...

	virtual void PostLogin(APlayerController* NewPlayer) override;
};

// ABGameMode.cpp

...

void AABGameMode::PostLogin(APlayerController* NewPlayer)
{
    ABLOG(Warning, TEXT("PostLogin Begin"));
    Super::PostLogin(NewPlayer);
    ABLOG(Warning, TEXT("PostLogin End"));
}

// ABPlayerController.h

// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "ArenaBattle.h"
#include "GameFramework/PlayerController.h"
#include "ABPlayerController.generated.h"

UCLASS()
class ARENABATTLE_API AABPlayerController : public APlayerController
{
	GENERATED_BODY()

public:
	virtual void PostInitializeComponents() override;
	virtual void OnPossess(APawn* aPawn) override;
};

//ABPlayerController.cpp

// Fill out your copyright notice in the Description page of Project Settings.


#include "ABPlayerController.h"

void AABPlayerController::PostInitializeComponents()
{
    Super::PostInitializeComponents();
    ABLOG_S(Warning);
}

void AABPlayerController::OnPossess(APawn* aPawn)
{
    ABLOG_S(Warning);
    Super::OnPossess(aPawn);
}

// ABPawn.h

// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "ArenaBattle.h"
#include "GameFramework/Pawn.h"
#include "ABPawn.generated.h"

UCLASS()
class ARENABATTLE_API AABPawn : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	AABPawn();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	virtual void PostInitializeComponents() override;
	virtual void PossessedBy(AController* NewController) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

};

// ABPawn.cpp

// Fill out your copyright notice in the Description page of Project Settings.


#include "ABPawn.h"

// Sets default values
AABPawn::AABPawn()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AABPawn::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void AABPawn::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

void AABPawn::PostInitializeComponents()
{
	Super::PostInitializeComponents();
	ABLOG_S(Warning);
}

void AABPawn::PossessedBy(AController* NewController)
{
	ABLOG_S(Warning);
	Super::PossessedBy(NewController);
}

// Called to bind functionality to input
void AABPawn::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

``` 
- 실행해 보면 플레이어컨트롤러가 먼저 생성되고, 폰이 생성되고, 플레이어 컨트롤러가 포제스 함을 알 수 있다.
- 폰의 Auto Possess Player 속성을 이용하면 폰을 새롭게 생성하지 않더라도 이미 배치되어 있는 폰에 플레이어 컨트롤러가 빙의 가능하다.
- ThirdPersonBP 폴더 -> BluePrint 폴더 안의 마네킹을 배치하고 디테일 윈도우의 Auto Possess Player 항목을 Player 0 으로 바꿔보자.
- player0은 로컬 플레이어다. 플레이 버튼을 누르면 게임 모드는 ABPawn 액터를 생성하지 않고,
- 대신 플레이어 컨트롤러에게 방금 배치한 액터에 빙의하라는 명령을 내린다.

> 블루프린트로 제작된 폰을 기본 폰으로 사용하고 싶으면, 블루프린트 애셋의 클래스 정보를 넘겨주면 된다.  
> '_C' 경로를 사용하면 블루프린트 애셋의 클래스 정보를 가져올 수 있다.  
> 아래처럼 하면 된다.
```cpp
static ConstructorHelpers::FClassFinder<APawn> BP_PAWN_C(TEXT("
    /Script/Engine.Blueprint'/Game/ThirdPerson/
    Blueprints/BP_ThirdPersonCharacter.BP_ThirdPersonCharacter_C'"));
if(BP_PAWN_C.Succeeded())
{
    DefaultPawnClass = BP_PAWN_C.Class;
}
```
