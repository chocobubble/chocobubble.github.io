---
title:  "폰의 제작과 조작"
excerpt: "Unreal Engine Ch.5"
excerpt_separator: "<!--more-->"
categories:
  - Unreal
tags:
  - Unreal
  - Pawn

toc: true
toc_sticky: true

use_math: true

date: 2023-06-10
last_modified_at: 2023-06-10
---
> '이득우의 언리얼 c++ 게임 개발의 정석' 책을 참고하여 작성한 포스트입니다.

---

생성한 폰을 조작하기 위해 프로젝트의 입력을 설정하고, 폰 무브먼트 컴포넌트를 사용한다.  
애니메이션 블루프린트로 애니메이션 설정도 가능하다.
{: .notice--success}

---

## 폰의 구성 요소
- 인간형 폰을 제작하기 위해 고려해야 하는 요소는 다음과 같다.
    - 시각적 요소
        - 애니메이션 기능이 필요하다.
        - 애니메이션을 재생하도록 리깅(rigging) 데이터를 추가한 메시를 **스켈레탈 메시**라고한다.
        - **스켈레탈 메시 컴포넌트**가 관리한다.
    - 충돌 요소
        - 애니메이션에 따라 스켈레탈 메시가 변하므로 충돌 컴포넌트를 별도로 사용하는 것이 좋다.
    - 움직임 요소
        - 폰 무브먼트 컴포넌트를 이용한다.
        - ```FloatingPawnMovement```와 ```CharacterMovement``` 두 가지가 있다.
    - 내비게이션(Navigation)
        - 목적지를 알려주면 목적지까지 이동하는 길 찾기 기능
    - 카메라 출력

- 폰을 제작해 보자. 사용할 컴포넌트는 다음과 같다
    - Capsule
        - 충돌 컴포넌트이고, 움직임을 담당할 것이므로 루트로 설정해준다.
    - SkeletalMesh
        - 캐릭터 애셋을 보여주고, 애니메이션도 담당한다.
        - 제작시 사용한 좌표계와 다를 수 있으니 맞춰주고,
        - 액터의 기준 위치랑 캐릭터 애셋의 기준 위치(pivot)를 조절해서 맞춰준다.
    - FloatingPawnMovement
        - 중력을 고려하지 않은 간단한 움직임 구현
    - SpringArm
        - 삼인칭 시점으로 카메라 구도를 편리하게 설정할 수 있는 부가 컴포넌트 (??)
    - Camera
        - SpringArm의 자식으로 설정하고 트랜스폼 정보를 초기화하면 자동으로 SpringArm의 끝에 걸린다(?)

```cpp
// ABPawn.h

...
#include "GameFramework/FloatingPawnMovement.h"

UCLASS()
class ARENABATTLE_API AABPawn : public APawn
{  
    ...

public:
    ...
    	UPROPERTY(VisibleAnywhere, Category=Collision)
	UCapsuleComponent* Capsule;

	UPROPERTY(VisibleAnywhere, Category=Visual)
	USkeletalMeshComponent* Mesh;

	UPROPERTY(VisibleAnywhere, Category=Movement)
	UFloatingPawnMovement* Movement;

	UPROPERTY(VisibleAnywhere, Category=Camera)
	USpringArmComponent* SpringArm;

	UPROPERTY(VisibleAnywhere, Category=Camera)
	UCameraComponent* Camera;
};

// ABPawn.cpp

...

AABPawn::AABPawn()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	Capsule = CreateDefaultSubobject<UCapsuleComponent>(TEXT("CAPSULE"));
	Mesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("MESH"));
	Movement = CreateDefaultSubobject<UFloatingPawnMovement>(TEXT("MOVEMENT"));
	SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SPRINGARM"));
	Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("CAMERA"));

	RootComponent = Capsule;
	Mesh->SetupAttachment(Capsule);
	SpringArm->SetupAttachment(Capsule);
	Camera->SetupAttachment(Capsule);

	Capsule->SetCapsuleHalfHeight(88.0f); // 캡슐의 높이
	Capsule->SetCapsuleRadius(34.0f); // 캡슐의 둘레
	// 에셋과의 기준 위치 차이를 메꿈
	Mesh->SetRelativeLocationAndRotation(FVector(0.0f, 0.0f, 95.0f), FRotator(0.0f, -90.0f, 0.0f));
	// 카메라의 지지대의 길이를 4m로..
	SpringArm->TargetArmLength = 400.0f;
	SpringArm->SetRelativeRotation(FRotator(-15.0f, 0.0f, 0.0f));

	static ConstructorHelpers::FObjectFinder<USkeletalMesh> SK_CARDBOARD(TEXT("/Script/Engine.SkeletalMesh'/Game/InfinityBladeWarriors/Character/CompleteCharacters/SK_CharM_Cardboard.SK_CharM_Cardboard'"));
	if(SK_CARDBOARD.Succeeded())
	{
		Mesh->SetSkeletalMesh(SK_CARDBOARD.Object);
	}
}

...

```

## 폰의 조작
- 플레이어 입력은 가상 입력 설정을 사용하면 다양한 기기와 멀티 플랫폼에 대응 가능하다.
- 프로젝트 세팅 -> 입력 설정에서 설정할 수 있고, Bindings 섹션을 보면 Action Mappings 와 Axis Mappings가 있다.
    - Axis Mappings(축 매핑)
        - 조이스틱 레버의 신호를 설정
        - 중립이면 0, 끝이면 1 혹은 -1
        - 아무 키도 누르지 않으면 0의 값이 지속적 발생
    - Action Mappings(액션 매핑)
        - 조이스틱 버튼의 신호 설정
        - 눌렀을 때와 뗄 때만 신호 전달
- 축, 액션 매핑 종료???
- 적절히 입력 설정을 해주고, 코드를 작성해보자.
- 입력 설정 처리를 위해 ```InputComponent```라는 언리얼 오브젝트가 있다.
- 이를 이용해 폰의 멤버 함수와 입력 설정을 **연결(binding)**시키면, 입력 신호는 자동으로 폰의 멤버 함수의 인자로 전달된다.
- 연결하는 함수는 폰의 ```SetupInputComponent``` 함수다.
- ```InputComponent```는 ```BindAxis```와 ```BindAction```이라는 두 함수를 제공한다.
- 먼저 폰이 레버 신호를 받을 수 있도록 ```BindAxis``` 함수를 사용해 입력 설정의 이름과 이를 연동할
- 언리얼 오브젝트의 인스터스의 함수 포인터를 지정한다.

```cpp
// ABPawn.h

...

private:
	void UpDown(float NewAxisValue);
	void LeftRight(float NewAxisValue);


// ABPawn.cpp

...

// Called to bind functionality to input
void AABPawn::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis(TEXT("UpDown"), this, &AABPawn::UpDown);
	PlayerInputComponent->BindAxis(TEXT("LeftRight"), this, &AABPawn::LeftRight);
}

void AABPawn::UpDown(float NewAxisValue)
{
	ABLOG(Warning, TEXT("%f"), NewAxisValue);
}

void AABPawn::LeftRight(float NewAxisValue)
{
	ABLOG(Warning, TEXT("%f"), NewAxisValue);
}

```
- 아직은 입력 값이 로그에 찍히는 것만 확인이 가능하다.
- 움직임으로 바꿔주기 위해 폰 무브먼트 컴포넌트의 ```AddMovementInput``` 함수를 사용하자.
- 이동할 방향을 ```WorldDirection```에 지정해야 한다. (월드 좌표계를 기준으로 하는 방향 벡터 데이터를 전달해 줘야함)
- ```GetActorForwardVector``` 함수를 사용해 월드 좌표계 기준 액터의 전진 방향의 벡터 데이터를 얻을 수 있다.

```cpp
// ABPawn.cpp
...

void AABPawn::UpDown(float NewAxisValue)
{
    AddMovementInput(GetActorForwardVector(), NewAxisValue);
    }

void AABPawn::LeftRight(float NewAxisValue)
{
	AddMovementInput(GetActorRightVector(), NewAxisValue);
}

//ABPlayerController.h

...

UCLASS()
class ARENABATTLE_API AABPlayerController : public APlayerController
{
    ...

protected:
	virtual void BeginPlay() override;
}

//ABPlayerController.cpp

...

void AABPlayerController::BeginPlay()
{
    Super::BeginPlay();

    FInputModeGameOnly InputMode;
    SetInputMode(InputMode);
}

```

> 폰을 조종하기 위한 입력 로직은 폰 클래스에 구현하는 것이 일반적이다.  
> 하지만 입력 시스템은 중간에 플레이어 컨트롤을 거쳐 폰에 전달되기 때문에,  
> 플레이어 컨트롤러에서 특정 입력을 처리하는 코드를 구현하면 그 입력은 폰에 전달되지 않는다.

<br>

## 애니메이션의 설정
- 콘텐츠 브라우저에 폴더를 하나 만들고 **임포트** 버튼을 눌러 원하는 애니메이션을 가져온다.
- **애니메이션 임포트** 설정 창이 뜨면, 적용 원하는 스켈레톤 애셋을 고른다.
- 콘텐츠 브라우저에 추가가 완료되면 **모두 저장** 버튼을 눌러 확실하게 저장해 준다.
- 애니메이션 중 하나를 더블 클릭하면 애니메이션을 확인할 수 있는 창이 뜬다.
- **프리뷰 씬 세팅** 메뉴 선택 후 원하는 다른 캐릭터로 애니메이션을 재생해 볼 수 있다.
- 코드로 작성하기 위해 원하는 애니메이션의 경로를 복사하자.
- 이번엔 생성자 코드에서 애셋을 로드하지 않고, ```BeginPlay``` 함수에서 로딩해 보겠다.
- 게임 실행 중에 애셋을 로드하는 명령어는 ```LoadObject<타입>```이다.

```cpp
//ABPawn.cpp

...

// Called when the game starts or when spawned
void AABPawn::BeginPlay()
{
	Super::BeginPlay();
	Mesh->SetAnimationMode(EAnimationMode::AnimationSingleNode);
	UAnimationAsset* AnimAsset = LoadObject<UAnimationAsset>(nullptr, TEXT("Game/Animations/WarriorRun.WarriorRun"));
	if(AnimAsset != nullptr)
	{
		Mesh->PlayAnimation(AnimAsset, true);
	}
	
}

...
```

- 게임의 규모가 커진다면 코드로 애니메이션을 재생하는 것은 관리적인 한계에 부딪힌다.
- 체계적으로 애니메이션 시스템 설계를 도와주는 **애니메이션 블루프린트**를 사용해 보자
- 방금 만든 애니메이션 폴더에 애니메이션 블루프린트를 만들자.
- 원하는 스켈레탈 애셋을 선택하고 저장 후 더블 클릭해 애니메이션 블루프린트를 연다.
- **애님 그래프(Anim Graph)** 작업 환경을 통해 애니메이션을 설계한다.
- 우측 하단의 '에셋 브라우저' 선택 후 원하는 애니메이션을 애님 그래프 위에 끌어다 놓는다.
- 애니메이션 재생 노드에서 사람 모양의 핀을 최종 애니메이션 노드에 드래그해 연결하고,
- '컴파일과 저장'을 누르면, 프리뷰 인스턴스 디버깅에 의해 왼쪽 프리뷰에서 해당 애니메이션이 재생된다.
- 이런 애니메이션 시스템은 **애님 인스턴스(Anim Instance)** 라는 클래스로 관리한다.
- 스켈레탈 메시 컴포넌트는 자신이 관리하는 캐릭터의 애니메이션을 이 애님 인스턴스에 위임하는 구조로 설계돼 있다.
- 스켈레탈 메시가 이 애니메이션 블루프린트를 실행시키려면 블루프린트 애셋의 클래스 정보를 인스턴스 속성에 지정해주어야 한다.
- '_C'를 이용해 클래스 정보를 등록하고 인스턴스를 생성하여 애니메이션을 관리하도록 동작시키자.
- 앞서 만든 ```BeginPlay``` 코드 제거하고 생성자에 블루프린트 애니메이션 관련 코드를 넣자.

```cpp
// ABPawn.cpp

...
AABPawn::AABPawn()
{   
    ...

	Mesh->SetAnimationMode(EAnimationMode::AnimationBlueprint);
	static ConstructorHelpers::FClassFinder<UAnimInstance> WARRIOR_ANIM(TEXT("/Script/Engine.AnimBlueprint'/Game/Animations/WarriorAnimBlueprint.WarriorAnimBlueprint_C'"));
	if(WARRIOR_ANIM.Succeeded())
	{
		Mesh->SetAnimInstanceClass(WARRIOR_ANIM.Class);
	}

}

...
```