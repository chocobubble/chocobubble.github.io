---
title:  "[개념들] 언리얼 엔진 5"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - ing
tags:
  - Unreal
  - Animation

toc: true
toc_sticky: true

use_math: true

date: 2023-06-12
last_modified_at: 2023-06-12
---


### UAnimInstance::NativeUpdateAnimation
- Anim Instance 에서 틱마다 호출되는 가상함수

### UABAnimInstance::TryGetPawnOwner
- 애님 인스턴스를 제어하는 소유자를 폰 소유자로 간주하고 반환. (?)
- 없을 경우 유효한 컨트롤러 확인 후 반환 (?)
- 이마저도 없으면 nullptr 반환

### GetVelocity()
- Returns velocity in cm/s (Unreal Units/second) of the rootcomponent if it is either using physics or has an associated MovementComponent

```virtual FVector GetVelocity() const```

### ::IsValid(...)
- Return true if the object is usable: non-null and not pending kill or garbage
- Test validity of object

```cpp
bool IsValid
(
    const UObject * Test
)
```

### GetCharacterMovement()
- Returns CharacterMovement subobject

```UCharacterMovementComponent * GetCharacterMovement() const```

### UCharacterMovementComponent::JumpZVelocity
float 	JumpZVelocity	Initial velocity (instantaneous vertical acceleration) when jumping.

### 폰의 무브먼트 컴포넌트
- IsFalling(), IsSwimming(), IsCrouching(), IsMoveOnGround()
### 캐릭터의 무브먼트 컴포넌트?

### Cast<AChracter>(...)

```cpp
auto Character = Cast<AChracter>(Pawn);
        if(Character)
```

### OnMontageEnded
- 애니메이션 몽타주 재생이 끝나면 발동하는 델리게이트.


### UABAnimInstance 전방선언?

### Montage_Play

### AnimNotify_노티파이명
- 애니메이션 재생시 재생 구간에 위치한 노티파이를 호출하게 되면, 위 이름의 멤버 함수를 찾아 호출한다
- 멤버 함수를 찾으려면 반드시 UFUNCTION 매크로가 지정돼야 하겠죠

### FMath::IsWithinInclusive<int32>(CurrentCombo, 0, MaxCombo - 1)
- TestValue가 MinValue ~ MaxValue 안에 포함 되는 지 여부

```cpp
template<class U>
static bool IsWithinInclusive
(
    const U & TestValue,
    const U & MinValue,
    const U & MaxValue
)
```


### FMath::Clamp<int32>(CurrentCombo + 1, 1, MaxCombo);
- 
Syntax

template<class T>
static T Clamp
(
    const T X,
    const T Min,
    const T Max
)

Remarks



### DECLARE_MULTICAST_DELEGATE(FOnNextAttackCheckDelegate);

Multi-cast DelegatesDelegates that can be bound to multiple functions and execute them all at once.
ON THIS PAGE
Declaring Multi-Cast Delegates

Binding Multi-Cast Delegates

Multi-Cast Execution

Multi-cast delegates have most of the same features as single-cast delegates. They only have weak references to objects, can be used with structs, can be copied around easily, etc.
Just like regular delegates, multi-cast delegates can be loaded/saved, and triggered remotely; however, multi-cast delegate functions cannot use return values. They are best used to easily pass a collection of delegates around.

Events are a specialized type of multi-cast delegate with restricted access to the Broadcast(), IsBound(), and Clear() functions.

Declaring Multi-Cast Delegates
Multi-cast delegates are declared in the same manner as you declare standard delegates except they use the macro variations specific to multi-cast delegates.

Declaration Macro

Description

DECLARE_MULTICAST_DELEGATE[_RetVal, ...]( DelegateName )

Creates a multi-cast delegate.

DECLARE_DYNAMIC_MULTICAST_DELEGATE[_RetVal, ...]( DelegateName )

Creates a dynamic multi-cast delegate.

Binding Multi-Cast Delegates
Multicast delegates can have multiple functions bound that all get called when the delegate fires. As a result, the binding functions are more array-like in semantics.

Function

Description

Add()

Adds a function delegate to this multi-cast delegate's invocation list.

AddStatic()

Adds a raw C++ pointer global function delegate.

AddRaw()

Adds a raw C++ pointer delegate. Raw pointer does not use any sort of reference, so may be unsafe to call if the object was deleted out from underneath your delegate. Be careful when calling Execute()!

AddSP()

Adds a shared pointer-based (fast, not thread-safe) member function delegate. Shared pointer delegates keep a weak reference to your object.

AddUObject()

Adds a UObject-based member function delegate. UObject delegates keep a weak reference to your object.

Remove()

Removes a function from this multi-cast delegate's invocation list (performance is O(N)). Note that the order of the delegates may not be preserved!

RemoveAll()

Removes all functions from this multi-cast delegate's invocation list that are bound to the specified UserObject. Note that the order of the delegates may not be preserved!

RemoveAll() will remove all registered delegates bound to the provided pointer. Keep in mind that Raw delegates that are not bound to an object pointer will not be removed by this function!

See DelegateSignatureImpl.inl (located in ..\UE4\Engine\Source\Runtime\Core\Public\Delegates\) for the variations, arguments, and implementations of these functions.

Multi-Cast Execution
Multi-cast delegates allow you to attach multiple function delegates, then execute them all at once by calling the multi-cast delegate's Broadcast() function. Multi-cast delegate signatures are not allowed to use a return value.

It is always safe to call Broadcast() on a multi-cast delegate, even if nothing is bound. The only time you need to be careful is if you are using a delegate to initialize output variables, which is generally very bad to do.

The execution order of bound functions when calling Broadcast() is not defined. It may not be in the order the functions were added.

Function

Description

Broadcast()

Broadcasts this delegate to all bound objects, except to those that may have expired.

### Montage_JumpToSection(GetAttackMontageSectionName(NewSection), AttackMontage);

### ABCHECK(FMath::IsWithinInclusive<int32>(Section, 1, 4), NAME_None);
네임 테이블에 이름이 존재하지 않는 경우, FName 의 Index 가 NAME_None 으로 설정됩니다. 참고로 일반 스트링에 하듯이 NULL 포인터 검사를 하지는 않습니다.

### return FName(*FString::printf(TEXT("Attack%d"), Section));
FName 생성하기
FName TestHUDName = FName(TEXT("ThisIsMyTestFName"));

### .AddLambda

### NextAttackCheck 노티파이의 위치가 한 섹션이 끝나는 지점에 가까워질수록 노티파이실행->다음섹션 명령을 내려도 OnMontageEnded 가 실행되서 콤보가 안될 확률이 높다.


# Chapter 9

### FHitResult HitResult;

### FCollisionQueryParams Params(NAME_None, false, this);

### SweepSingleByChannel

### FQuat::Identity

### FCollisionShape::MakeSphere(50.0f;)

### TWeakObjectPtr
- 약 포인터?

### struct FDamageEvent
Event used by AActor::TakeDamage and related functions

### virtual float AActor::TakeDamage(float DamageAmount, FDamageEvent const & DamageEvent, AController * EventInstigator, AActor * DamageCauser)
virtual float APawn::TakeDamage(float Damage, FDamageEvent const & DamageEvent, AController * EventInstigator, AActor * DamageCauser)

### virtual float TakeDamage(float DamageAmount, struct FDamageEvent const & DamageEvent, class AController* EventInstigator, AActor* DamageCauser) override;

### can be damaged

### SetActorEnableCollision(false);

### #include "DrawDebugHelpers.h"

### FQuat CapsuleRot = FRotationMatrix::MakeFromZ(TraceVec).ToQuat();

### FColor DrawColor = bResult ? FColor::Green : FColor::Red;


# chapter 10

## 	FName WeaponSocket(TEXT("hand_rSocket"));
	if (GetMesh()->DoesSocketExist(WeaponSocket))
	{
		Weapon = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("WEAPON"));
  }


### Weapon->SetupAttachment(GetMesh(), WeaponSocket);

### Weapon->SetCollisionProfileName(TEXT("NoCollision"));

### auto CurWeapon = GetWorld()->SpawnActor<AABWeapon>(FVector::ZeroVector, FRotator::ZeroRotator);

### CurWeapon->AttackToComponent(GetMesh(), FAttachmentTransformRules::SnapToTargetNotIncludingScale, WeaponSocket)

### 	UPROPERTY(VisibleAnywhere, Category = Box)
	UBoxComponent* Trigger;


### Trigger->SetBoxExtent(FVector(40.0f, 42.0f, 30.0f));

### 	UFUNCTION()
	void OnCharacterOverlap(UPrimitiveComponent* OverlappedComp, AActor* OtherActor, UPrimitiveComponent* OtherComp,
		int32 OtherBodyIndex, bool bFromSweep, FHitResult& SweepResult);

### 	Trigger->OnComponentBeginOverlap.AddDynamic(th8is, &AABItemBox::OnCharacterOverlap);

### 	UPROPERTY(EditInstanceOnly, Category = Box)
	TSubclassOf<class AABWeapon> WeaponItemClass;

### 		NewWeapon->AttachToComponent(GetMesh(), FAttachmentTransformRules::SnapToTargetNotIncludingScale, WeaponSocket);
		NewWeapon->SetOwner(this);


### OnSystemFinished
- dynamic delegate 에는 UFUNCTION 함수를 사용해야 하므로 람다식 표현 함수는 바인딩 할 수 없다.

### void OnEffectFinished(class UParticleSystemComponent* PSystem);

### Effect->SetTemplate(P_CHESTOPEN.Object);
- Effect = CreateDefaultSubobject<UParticleSystemComponent>(TEXT("EFFECT"));

### Effect->bAutoActivate

### Effect->Activate(true);

### Box->SetHiddenInGame(true, true);

### SetActorEnableCollision(false);

### Effect->OnSystemFinished.AddDynamic(this, &AABItemBox::OnEffectFinished);

### 2
```cpp
void AABItemBox::OnEffectFinished(UParticleSystemComponent* PSystem)
{
	Destroy();
}
```

### SetVisibility vs SetHiddenInGame


# chapter 11

### GameInstance

### USTRUCT(BlueprintType)
struct FABChracterData : public FTableRowBase
{
	GENERATED_USTRUCT_BODY()
}

### #include "Engine/DataTable.h"

### 카테고리 "" 쓸때와 아닐 때의 차이?

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Data")
	int32 Level;

### FABCharacterData* GetABCharacterData(int32 Level);

### 3
	UPROPERTY()
	class UDataTable* ABCharacterTable;

### FStrign CharacterDataPath = TEXT("/Script/Engine.DataTable'/Game/Book/GameData/ABCharacterData.ABCharacterData'");
    static ConstructorHelpers::FObjectFinder<UDataTable> DT_ABCHARACTER(*CharacterDataPath);

###  ABCHECK(ABCharacterTable->GetRowMap().Num() > 0)

### ABLOG(Warning, TEXT("DropExp of Level 20 ABCharacter : %d"), GetABCharacterData(20)->DropExp);

### ABCharacterTable->FindRow<FABCharacterData>(*FString::FromInt(Level), TEXT(""));

### virtual void InitializeComponent() override;
- characterComponent 에서!

### bWantsInitializeComponent = true;
- InitializeComponent 함수를 호출하기 위해서 이 불값이 참이어야 한대

### UPROPERTY(Transient, VisibleInstanceOnly, Category = Stat, Meta = (AllowPrivateAccess = true))
- Transient는 언리얼 오브젝트의 직렬화(serialization)에서 제외시키는 기능
- 게임 시작 때마다 변경되니까..

### struct FABCharacterData* CurrentStatData = nullptr;

### HitResult.GetActor()->TakeDamage(CharacterStat->GetAttack(), DamageEvent, GetController(), this);


### auto ABGameInstance = Cast<UABGameInstance>(UGameplayStatics::GetGameInstance(GetWorld()));

### UWidgetComponent
- 액터에 UI 위젯을 부착하는 클래스

```cpp
UPROPERTY(VisibleAnywhere, Category = UI)
	class UWidgetComponent* HPBarWidget;
```
- UMG 모듈을 추가해야 한다!

### UI - 위젯 블루프린트 
- Screen 모드
  - UI 위젯이 항상 플레이어를 향해 바라봄
  - ```HPBarWidget->SetWidgetSpace(EWidgetSpace::Screen);```
- ```#include "Components/WidgetComponent.h"```

### ```static ConstructorHelpers::FClassFinder<UUserWidget> UI_HUD(TEXT```

### HPBarWidget->SetWidgetClass(UI_HUD.Class);
		HPBarWidget->SetDrawSize(FVector2D(150.0f, 50.0f));

### UI의 로직은 애님 인스턴스와 유사하게 디자이너라는 공간에서 진행한다.
- UI의 로직은 애님 인스턴스와 유사하게 c++ 클래스에서 미리 만들어 제공할 수 있는데,
- 위젯 블루프린트가 사용하는 기반 c++ 클래스는 UserWidget  이다.

### KINDA_SMALL_NUMBER
- float의 값을 0 과 비교할 때는 무시 가능한 오차를 측정할 때 KINDA_SMALL_NUMBER 매크로를 사용하면 좋다.

###  UI와 캐릭터가 다른 액터라면 약 포인터를 사용하는 것이 바람직하다?

### void BindCharacterStat(class UABCharacterStatComponent* NewCharacterStat);

### TWeakObjectPtr<class UABCharacterStatComponent> CurrentCharacterStat;

### 위젯 초기화.
- BeginPlay 에서 위젯 초기화한다.

```cpp
	auto CharacterWidget = Cast<UABCharacterWidget>(HPBarWidget->GetUserWidgetObject());
	if(nullptr != CharacterWidget)
	{
		CharacterWidget->BindCharacterStat(CharacterStat);
	}
```

### NativeConstruct 함수

### UI 생성은 플레이어 컨트롤러의   BeginPlay 에서 호출됨

### ```#include "Components/ProgressBar.h"```

### ```NewCharacterStat->OnHPChanged.AddUObject(this, &UABCharacterWidget::UpdateHPWidget);```

### HPProgressBar->SetPercent(CurrentCharacterStat->GetHPRatio());


# chapter 12

### AIController C++ Class

### 	AIControllerClass = AABAIController::StaticClass();
- pawn.h 
	
### AutoPossessAI = EAutoPossessAI::PlacedInWorldOrSpawned;
- pawn.h

### HPProgressBar = Cast<UProgressBar>(GetWidgetFromName(TEXT("PB_HPBar")));

### 네브메시 바운드 볼륨
- 창 - 액터배치 - 볼륨 - 네브메시 바운드 볼륨
- 뷰포트에 배치 후 사이즈 조절하고 P를 누르면 초록색으로 내비 메시 영역이 보임

### GetWorld()->GetTimerManager().SetTimer(RepeatTimerHandle, this, &AABAIController::OnRepeatTimer, RepeatInterval, true);

### GetWorld()->GetTimerManager().ClearTimer(RepeatTimerHandle);

### 빌드.cs에 NavigationSystem 추가해주어야 함
- #include "NavigationSystem.h"
#include "Blueprint/AIBlueprintHelperLibrary.h"
도 선언 해주어야 한다.

### UNavigationSystemV1* NavSystem = UNavigationSystemV1::GetnavigationSystem(GetWorld());

###     FNavLocation NextLocation;
    if (NavSystem->GetRandomPointInNavigableRadius(FVector::ZeroVector, 500.0f, NextLocation))

###         UAIBlueprintHelperLibrary::SimpleMoveToLocation(this, NextLocation.Location);
        ABLOG(Warning, TEXT("Next Location : %s"), *NextLocation.Location.ToString());

### AIModule
- Behavior tree 관련 기능을 사용하기 위한 모듈

### class UBlackboardData* BBAsset;

### #include "BehaviorTree/BehaviorTree.h"
#include "BehaviorTree/BlackboardData.h"

###     if (UseBlackboard(BBAsset, Blackboard))
    {
        if (!RunBehaviorTree(BTAsset))
        {
            ABLOG(Error, TEXT("AIController couldn't run behavior tree!"));
        }
    }
}

### 55

    UBlackboardComponent* BlackboardComp = Blackboard.Get();
    if (UseBlackboard(BBAsset, BlackboardComp))
    {
        this->Blackboard = BlackboardComp;
        Blackboard->SetValueAsVector(HomePosKey, InPawn->GetActorLocation());

        if (!RunBehaviorTree(BTAsset))
        {
            ABLOG(Error, TEXT("AIController couldn't run behavior tree!"));
        }
    }

###  BTTaskNode

	UBTTask_FindPatrolPos();

	virtual EBTNodeResult::Type ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) override;

### 6
EBTNodeResult::Type UBTTask_FindPatrolPos::ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory)
{
    EBTNodeResult::Type Result = Super::ExecuteTask(OwnerComp, NodeMemory);
}

### EBTNodeResult::Failed;

### auto ControllingPawn = OwnerComp.GetAIOwner()->GetPawn();

###  UNavigationSystemV1* NavSystem = UNavigationSystemV1::GetNavigationSystem(ControllingPawn->GetWorld());

### FVector Origin = OwnerComp.GetBlackboardComponent()->GetValueAsVector(AABAIController::HomePosKey);

### OwnerComp.GetBlackboardComponent()->SetValueAsVector(AABAIController::PatrolPosKey, NextPatrol.Location);

### BTService C++ class

### UBTService_Detect();

### virtual void TickNode(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory, float DeltaSeconds) override;

###     UWorld* World = ControllingPawn->GetWorld();
    FVector Center = ControllingPawn->GetActorLocation();

### TArray

### FCollisionQueryParams CollisionQueryParam(Name_None, false, ControllingPawn);

### 67

    bool bResult = World->OverlapMultiByChannel(
        OverlapResults,
        Center,
        FQuat::Identity;
        ECollisionChannel::ECC_GameTraceChannel2;
        FCollisionShape::MakeSphere(DetectRadius);
        CollisionQueryParam
    );
}

### DrawDebugSphere(World, Center, DetectRadius, 16, FColor::Red, false, 0.2f;);

### virtual void PossessedBy(AController* NewController) override;

### IsPlayerControlled()

### GetCharacterMovement()->MaxWalkSpeed