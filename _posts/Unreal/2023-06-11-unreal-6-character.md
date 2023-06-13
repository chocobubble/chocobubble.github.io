---
title:  "캐릭터의 제작과 컨트롤"
excerpt: "Unreal Engine Ch.6"
excerpt_separator: "<!--more-->"
categories:
  - Unreal
tags:
  - Unreal
  - Charcter

toc: true
toc_sticky: true

use_math: true

date: 2023-06-11
last_modified_at: 2023-06-11
---
> '이득우의 언리얼 c++ 게임 개발의 정석' 책을 참고하여 작성한 포스트입니다.

---

캐릭터 모델을 기반으로 움직이는 캐릭터를 제작한다. 
{: .notice--success}

---

## 캐릭터 모델
- **캐릭터** 모델은 인간형 폰을 좀 더 효과적으로 제작하게 해주는 모델이다.
- C++  클래스 Character 를 생성해보자.
- 이 클래스는 ```ACharacter``` 클래스를 상속받고 있다. 
- 타고 올라가보면 ```ACharacter``` 클래스는 ```APawn``` 클래스를 상속받고 있다.
- 앞서 만들었던 ```ABPawn``` 클래스와 비슷하게 Capsule, SkeletalMesh 컴포넌트를 사용하고 있으며,
- CharacterMovement 라는 컴포먼트로 움직임을 관리함을 볼 수 있다.
- 그리고 private으로 선언된 컴포넌트의 포인터를 상속받은 클래스들이 접근할 수 있도록,
- ```GetCapsuleComponent```, ```GetMesh```, ```GetCharacterMovement``` 함수를 제공하고 있다.
- 앞서의 폰과 비슷하게 코드를 작성해본다.

```cpp
// ABCharacter.h

// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "ArenaBattle.h"
#include "GameFramework/Character.h"
#include "ABCharacter.generated.h"

UCLASS()
class ARENABATTLE_API AABCharacter : public ACharacter
{
	GENERATED_BODY()

public:
	// Sets default values for this character's properties
	AABCharacter();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	UPROPERTY(VisibleAnywhere, Category = Camera)
	USpringArmComponent* SpringArm;

	UPROPERTY(VisibleAnywhere, Category = Camera)
	UCameraComponent* Camera;

private:
	void UpDown(float NewAxisValue);
	void LeftRight(float NewAxisValue);
};


// ABCharacter.cpp

// Fill out your copyright notice in the Description page of Project Settings.


#include "ABCharacter.h"

// Sets default values
AABCharacter::AABCharacter()
{
 	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SPRINGARM"));
	Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("CAMERA"));

	SpringArm->SetupAttachment(GetCapsuleComponent());
	Camera->SetupAttachment(SpringArm);

	GetMesh()->SetRelativeLocationAndRotation(FVector(0.0f, 0.0f, -88.0f), FRotator(0.0f, -90.0f, 0.0f));
	SpringArm->TargetArmLength = 400.0f;
	SpringArm->SetRelativeRotation(FRotator(-15.0f, 0.0f, 0.0f));

	static ConstructorHelpers::FObjectFinder<USkeletalMesh> SK_CARDBOARD(TEXT("/Script/Engine.SkeletalMesh'/Game/InfinityBladeWarriors/Character/CompleteCharacters/SK_CharM_Cardboard.SK_CharM_Cardboard'"));
	if(SK_CARDBOARD.Succeeded())
	{
		GetMesh()->SetSkeletalMesh(SK_CARDBOARD.Object);
	}

	GetMesh()->SetAnimationMode(EAnimationMode::AnimationBlueprint);

	static ConstructorHelpers::FClassFinder<UAnimInstance> WARRIOR_ANIM(TEXT("/Script/Engine.AnimBlueprint'/Game/Animations/WarriorAnimBlueprint.WarriorAnimBlueprint_C'"));
	if(WARRIOR_ANIM.Succeeded())
	{
		GetMesh()->SetAnimInstanceClass(WARRIOR_ANIM.Class);
	}
}

// Called when the game starts or when spawned
void AABCharacter::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void AABCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void AABCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis(TEXT("UpDown"), this, &AABCharacter::UpDown);
	PlayerInputComponent->BindAxis(TEXT("LeftRight"), this, &AABCharacter::LeftRight);
}

void AABCharacter::UpDown(float NewAxisValue)
{
	AddMovementInput(GetActorForwardVector(), NewAxisValue);
}

void AABCharacter::LeftRight(float NewAxisValue)
{
	AddMovementInput(GetActorRightVector(), NewAxisValue);
}

```

- 그리고 이 캐릭터 클래스를 게임 모드에서 기본 폰으로 설정해준다

```cpp
// ABGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.


#include "ABGameMode.h"
//#include "ABPawn.h"
#include "ABCharacter.h"
#include "ABPlayerController.h"

AABGameMode::AABGameMode()
{
    //DefaultPawnClass = AABPawn::StaticClass();
    DefaultPawnClass = AABCharacter::StaticClass();
    PlayerControllerClass = AABPlayerController::StaticClass();
}

void AABGameMode::PostLogin(APlayerController* NewPlayer)
{
    ABLOG(Warning, TEXT("PostLogin Begin"));
    Super::PostLogin(NewPlayer);
    ABLOG(Warning, TEXT("PostLogin End"));
}
```

- 폰 모델과 대부분 비슷하나, 캐릭터 무브먼트에서 차이점이 발생한다.
    1. 점프와 같은 중력을 반영한 움직임을 제공한다.
    2. 다양한 움직임 설정이 가능하다. 기어가기, 날아가기 등
    3. 멀티 플레이 네트워크 환경에서 캐릭터들의 움직임을 자동으로 동기화한다


<br>

## 컨트롤 회전의 사용
- 폰이 관리하는 속성 중 대표적인 것은 **속도(velocity)**다.
- 폰의 현재 이동상태를 알려주는 중요한 데이터다.
- 플레이어 컨트롤러는 **컨트롤 회전(control Rotation)**이라는 속성을 제공ㅎ나다.
- 마우스 움직임에 따라 폰이 회전해야 할 목표 회전 값을 설정하고, 일정한 속도로 회전하는 기능을 제작해보자.
- 마우스의 움직임은 삼인칭 템플릿에서 제공하는 Turn과 LookUp의 축(axis) 입력 설정을 사용해 받아올 수 있다.
- 프로젝트 설정 -> 입력 -> Axis Manager 에서 확인 혹은 설정하면 된다.
- 입력 값에 따라 회전하도록 ```AddControllerInputYaw```, ```AddControllerInputRoll```, ```AddControllerInputPitch``` 가 있다.
- Turn 은 Z축 회전, LookUp은 Y축 회전에 대응되므로, 각각 연동해보자

```cpp
// ABCharacter.h

...

private:
	void Turn(float NewAxisValue);
	void LookUp(float NewAxisValue);
    
    ...

// ABCharacter.cpp

...

// Called to bind functionality to input
void AABCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis(TEXT("UpDown"), this, &AABCharacter::UpDown);
	PlayerInputComponent->BindAxis(TEXT("LeftRight"), this, &AABCharacter::LeftRight);
	PlayerInputComponent->BindAxis(TEXT("Turn"), this, &AABCharacter::Turn);
	PlayerInputComponent->BindAxis(TEXT("LookUp"), this, &AABCharacter::LookUp);
}

...

void AABCharacter::Turn(float NewAxisValue)
{
	AddControllerYawInput(NewAxisValue);
}

void AABCharacter::LookUp(float NewAxisValue)
{
	AddControllerPitchInput(NewAxisValue);
}

```

- 플레이 해보면 마우스 상하 이동은 안먹히고, 좌우만 먹힌다.
- 틸드(~) 키를 눌러 콘솔 명령어 입력 창을 띄우고 ```displayall PlayerController ControlRotation``` 을 입력하면,
- 뷰포트 왼쪽 상단에 현재 플레이어 컨트롤러의 컨트롤 회전(contorl rotation) 값이 보인다.
- ABPlayerController 액터를 보면 트랜스폼 회전 값과 화면에 나오는 컨트롤 회전 값이 일치함을 알 수 있다.
- 캐릭터 모델은 기본으로 컨트롤 회전의 Yaw 회전(Z축 회전) 값과 폰의 Yaw 회전이 서로 연동돼 있다.
- 액터의 폰 섹션을 보면 'Use Controller Rotation Yaw' 가 체크되어 있음을 볼 수 있다.
- 그래서 좌우 회전(Z축 회전)은 먹히지만 상하는 영향을 주지 않는 것이다.

<br>

## 삼인칭 컨트롤 구현(GTA 방식)
- 기존의 흰색 마네킹이 움직이던 것을 구현해 본다
    - 이동: 현재 보는 시점을 기준으로 상하, 좌우 방향 이동. 카메라는 회전 x
    - 캐릭터 회전: 캐릭터 이동 방향으로 마네킹이 회전함
    - 지지대 길이 : 450cm
    - 카메라 회전: 마우스 상하좌우 이도엥 따라 카메라 지지대가 상하좌우로 회전
    - 카메라 줌: 카메라 시선과 캐릭터 사이에 장애물이 감지되면 캐릭터가 보이도록 카메라를 장애물 앞으로 줌인
- SpringArm 컴포넌트를 이용하면 삼인칭 시점의 카메라 설정 구현에 편한다.
- ```ABCharacter``` 클래스에 ```SetControlMode``` 멤버 함수를 넣어 삼인칭 조작 관련된 기능을 설정해본다.

```cpp
// ABCharcter.h

...

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	void SetControlMode(int32 ControlMode);

...

// ABCharacter.cpp

...

AABCharacter::AABCharacter()
{
    ...

	SetControlMode(0);
}

...

void AABCharacter::SetControlMode(int32 ControlMode)
{
	if (ControlMode == 0)
	{
		SpringArm->TargetArmLength = 450.0f;
		SpringArm->SetRelativeRotation(FRotator::ZeroRotator);
		SpringArm->bUsePawnControlRotation = true;
		SpringArm->bInheritPitch = true;
		SpringArm->bInheritRoll = true;
		SpringArm->bInheritYaw = true;
		SpringArm->bDoCollisionTest = true;
		bUseControllerRotationYaw = false;
	}
}

...

```

- 실행해보면 마우스 움직임에 따라 캐릭터는 회전하지 않고, 카메라 지지대만 회전한다.
- 이제 카메라 방향을 중심으로 움직이도록 이동 방향을 변경해 주자.
- 컨트롤 회전(FRotator)에 따라 캐릭터 이동 방향(FVector)를 구해주면 된다.
- 설정한 스프링암의 회전 값이 컨트롤 회전 값과 동일하므로 컨트롤 회전 값이 카메라가 바라보는 방향이라 볼 수 있다.
- 회전 행렬을 생성하고 캐릭터가 움직일 방향 값을 구해 보자.
- 시선 방향은 X축, 우측 방향은 Y축이다.

```cpp
// ABChracter.cpp

...

void AABCharacter::UpDown(float NewAxisValue)
{
	//AddMovementInput(GetActorForwardVector(), NewAxisValue);
	AddMovementInput(FRotationMatrix(GetControlRotation()).GetUnitAxis(EAxis::X), NewAxisValue);
}

void AABCharacter::LeftRight(float NewAxisValue)
{
	//AddMovementInput(GetActorRightVector(), NewAxisValue);
	AddMovementInput(FRotationMatrix(GetControlRotation()).GetUnitAxis(EAxis::Y), NewAxisValue);
}

...

```

- 카메라의 시선 방향으로 움직이지만, 아직 회전 기능이 없어 캐릭터가 회전하지 않는다.
- 캐릭터가 움직이는 방향으로 캐릭터를 자동으로 회전시켜주는 캐릭터 무브먼트 컴포넌트의 ```OrientRotationToMove``` 기능이 있다.

```cpp
//ABCharacter.cpp

...

void AABCharacter::SetControlMode(int32 ControlMode)
{
	if (ControlMode == 0)
	{
        ...

		GetCharacterMovement()->bOrientRotationToMovement = true;
		GetCharacterMovement()->RotationRate = FRotator(0.0f, 720.0f, 0.0f);
    }
}

...

```

## 삼인칭 컨트롤 구현(디아블로 방식)
- 디아블로는 고정된 삼인칭 시점에서 캐릭터를 따라다니는 방식이다.
    - 캐릭터의 이동: 상하좌우 키를 조합해 캐릭터가 이동할 방향 결정
    - 캐릭터의 회전: 캐릭터는 입력한 방향으로 회전
    - 카메라 길이: 800cm
    - 카메라 회전: 고정 시선으로 45도
    - 카메라 줌: 없음. 장애물이 있으면 외곽선 처리
- SetControlMode 의 인자 값을 분리해서 구현해 본다. 
- 입력 모드를 구분하도록 열거형을 선언하고, 상하 좌우 키를 조합할 벡터 변수도 추가한다.
- <u>UPROPERTY를 사용하지 않는 FVector와 같은 값 타입 변수들은 항상 초기 값을 미리 지정하는 것이 안전하다!!</u>
- 입력 이벤트가 발생하면 DirectionToMove 멤버 변수를 업데이트 하고,
- 이후 발생하는 Tick 로직에서 최종 멤버 변수를 참고해 이동시킨다.
- 입력의 Axis 이벤트와 Tick 이벤트는 모두 매 프레임마다 호출되므로,
- 입력 함수를 먼저 호출하고, Tick 함수를 호출하도록 해주어야 한다.
- 그리고 현재 캐릭터가 45도 단위로 끊어져 회전하는데, 
- 캐릭터 무브먼트의 bUseControllerDesiredRotation 속성을 체크하면 컨트롤 회전이 가리키는 방향으로 캐릭터가 부드럽게 회전한다.
- bUseControllerRotationYaw 속성을 해제하고 위 속성을 지정한다.

```cpp
//ABCharacter.h

...

protected:
    ...

	EContorlMode CurrentControlMode = EControlMode::GTA;
	FVector DirectionToMove = FVector::ZeroVector;
...

//ABCharcter.cpp

...

AABCharacter::AABCharacter()
{
    ...
    SetControlMode(EControlMode::DIABLO);
}

...

void AABCharacter::SetControlMode(EControlMode NewControlMode)
{
	CurrentControlMode = NewControlMode;

	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		SpringArm->TargetArmLength = 450.0f;
		SpringArm->SetRelativeRotation(FRotator::ZeroRotator);
		SpringArm->bUsePawnControlRotation = true;
		SpringArm->bInheritPitch = true;
		SpringArm->bInheritRoll = true;
		SpringArm->bInheritYaw = true;
		SpringArm->bDoCollisionTest = true;
		bUseControllerRotationYaw = false;
		GetCharacterMovement()->bOrientRotationToMovement = true;
		GetCharacterMovement()->bUseControllerDesiredRotation = false;
		GetCharacterMovement()->RotationRate = FRotator(0.0f, 720.0f, 0.0f);
		break;
	case EControlMode::DIABLO:
		SpringArm->TargetArmLength = 800.0f;
		SpringArm->SetRelativeRotation(FRotator(-45.0f, 0.0f, 0.0f));
		SpringArm->bUsePawnControlRotation = false;
		SpringArm->bInheritPitch = false;
		SpringArm->bInheritRoll = false;
		SpringArm->bInheritYaw = false;
		SpringArm->bDoCollisionTest = false;
		bUseControllerRotationYaw = false;
		GetCharacterMovement()->bOrientRotationToMovement = false;
		GetCharacterMovement()->bUseControllerDesiredRotation = true;
		GetCharacterMovement()->RotationRate = FRotator(0.0f, 720.0f, 0.0f);
		break;
	}
}

// Called every frame
void AABCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	switch(CurrentControlMode)
	{
	case EControlMode::DIABLO:
		if (DirectionToMove.SizeSquared() > 0.0f)
		{
			GetController()->SetControlRotation(FRotationMatrix::MakeFromX(DirectionToMove).Rotator());
			AddMovementInput(DirectionToMove);
		}
		break;
	}

}

...

void AABCharacter::UpDown(float NewAxisValue)
{
	//AddMovementInput(GetActorForwardVector(), NewAxisValue);
	//AddMovementInput(FRotationMatrix(GetControlRotation()).GetUnitAxis(EAxis::X), NewAxisValue);
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		AddMovementInput(FRotationMatrix(FRotator(0.0f, GetControlRotation().Yaw, 0.0f)).GetUnitAxis(EAxis::X), NewAxisValue);
		break;
	case EControlMode::DIABLO:
		DirectionToMove.X = NewAxisValue;
		break;
	}
}

void AABCharacter::LeftRight(float NewAxisValue)
{
	//AddMovementInput(GetActorRightVector(), NewAxisValue);
	//AddMovementInput(FRotationMatrix(GetControlRotation()).GetUnitAxis(EAxis::Y), NewAxisValue);
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		AddMovementInput(FRotationMatrix(FRotator(0.0f, GetControlRotation().Yaw, 0.0f)).GetUnitAxis(EAxis::Y), NewAxisValue);
		break;
	case EControlMode::DIABLO:
		DirectionToMove.Y = NewAxisValue;
		break;
	}
}

void AABCharacter::Turn(float NewAxisValue)
{
	//AddControllerYawInput(NewAxisValue);
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		AddControllerYawInput(NewAxisValue);
		break;
	}
}

void AABCharacter::LookUp(float NewAxisValue)
{
	//AddControllerPitchInput(NewAxisValue);
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		AddControllerPitchInput(NewAxisValue);
		break;
	}
}

```

- FRotationMatrix는 회전된 좌표계 정보를 저장하는 행렬이다.  
- GTA 에서는 FRotator 값으로 회전 행렬을 생성하고, 이를 토대로 변환된 좌표계의 x y 축 방향을 가져왔다.
- 디아블로 방식에서는 거꾸로 하나의 벡터 값과 이에 직교하는 나머지 두 축을 구해 회전 행렬을 생성하고,
- 이와 일치하는 FRotator 값을 얻어 왔다.
- 벡터로부터 회전 행렬을 구축하는 명령은 MakeFromX, Y, Z가 있는데, 
- 두 축의 입력을 합산한 최종 벡터 방향과 캐릭터의 시선 방향(x축)이 일치해야 하므로 MakeFromX를 사용했다.


## 컨트롤 설정의 변경
- 특정 키 입력에 따 두 가지 조작 방식이 전환되도록 해본다.
- 프로젝트 설정 -> 입력 -> 에서 액션 매핑을 새로 하나 추가하고 원하는 키를 할당한다.
- 이 키가 입력될 때마다 SetControlMode 함수에 다른 인자 값이 들어가도록 해준다.
- 액션 매핑 입력 설정과 연동하는 함수는 ```BindAction``` 이다.
- 이 함수의 부가 인자로 눌렸는 지(EInputEvent::IE_Pressed), 떼어졌는지(EInputEvent::IE_Released) 지정 가능하다.

```cpp
// ABCharacter.h

...
private:
    ...
    void ViewChange();
...

// ABCharacter.cpp

...

void AABCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    ...

    PlayerInputComponent->BindAction(TEXT("ViewChange"), EInputEvent::IE_Pressed, this, &AABCharacter::ViewChange);
}

...

void AABCharacter::ViewChange()
{
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		SetControlMode(EControlMode::DIABLO);
		break;
	case EControlMode::DIABLO:
		SetControlMode(EControlMode::GTA);
		break;
	}
}

```

- 이제 컨트롤 방식 바뀔때 마다 카메라가 부드럽게 전환되도록 해주자
- SpringArm의 길이와 회전 값이 목표 값까지 서서히 변경되도록 FMath 클래스의 InterpTo 명령어를 사용한다.
- InterpTo 명령어는 지정한 속력으로 목표 지점까지 진행하되, 목표 지점까지 도달하면 그 값에서 멈춘다.
    - FInterpTo : float형
    - VInterpTo : Vector형
    - RInterpTo : Rotator형

```cpp
// AABCharacter.h

...

private:
    ...

	float ArmLengthTo = 0.0f;
	FRotator ArmRotaionTo = FRotator::ZeroRotator;
	float ArmLengthSpeed = 0.0f;
	float ArmRotationSpeed = 0.0f;

...

//AABCharacter.cpp

AABCharacter::AABCharacter()
{
    ...

	ArmLengthSpeed = 3.0f;
	ArmRotationSpeed = 10.0f;
}

...
void AABCharacter::SetControlMode(EControlMode NewControlMode)
{
	CurrentControlMode = NewControlMode;

	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		//SpringArm->TargetArmLength = 450.0f;
		//SpringArm->SetRelativeRotation(FRotator::ZeroRotator);
		ArmLengthTo = 450.0f;
        ...
        
	case EControlMode::DIABLO:
		//SpringArm->TargetArmLength = 800.0f;
		//SpringArm->SetRelativeRotation(FRotator(-45.0f, 0.0f, 0.0f));
		ArmLengthTo = 800.0f;
		ArmRotaionTo = FRotator(-45.0f, 0.0f, 0.0f);

        ...
    }
}

void AABCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	SpringArm->TargetArmLength = FMath::FInterpTo(SpringArm->TargetArmLength, ArmLengthTo, DeltaTime, ArmLengthSpeed);

	switch(CurrentControlMode)
	{
	case EControlMode::DIABLO:
		SpringArm->SetRelativeRotation(FMath::RInterpTo(SpringArm->GetRelativeRotation(), ArmRotationTo, DeltaTime, ArmRotationSpeed));
		break;
    }
}

...

void AABCharacter::ViewChange()
{
	switch (CurrentControlMode)
	{
	case EControlMode::GTA:
		GetController()->SetControlRotation(GetActorRotation());
		SetControlMode(EControlMode::DIABLO);
		break;
	case EControlMode::DIABLO:
		GetController()->SetControlRotation(SpringArm->GetRelativeRotation());
		SetControlMode(EControlMode::GTA);
		break;
	}
}

...

```
- 컨트롤 회전 값은 GTA 방식에서는 SpringArm의 회전에 사용하고, 디아블로 방식에서는 캐릭터의 방향에 사용했다.
