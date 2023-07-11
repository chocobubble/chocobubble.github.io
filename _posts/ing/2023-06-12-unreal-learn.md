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
- Initial velocity (instantaneous vertical acceleration) when jumping.

```cpp
float 	JumpZVelocity
```	

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
- min, max 범위에서만 수치가 정해진다.
- min 보다 낮으면 값이 min으로, max 보다 크면 값이 max가 된다.

```cpp
template<class T>
static T Clamp
(
    const T X,
    const T Min,
    const T Max
)
```

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
- Makes a montage jump to a named section. If Montage reference is NULL, it will do that to all active montages.

```cpp
void Montage_JumpToSection
(
    FName SectionName,
    const UAnimMontage * Montage
)
```

### ABCHECK(FMath::IsWithinInclusive<int32>(Section, 1, 4), NAME_None);
네임 테이블에 이름이 존재하지 않는 경우, FName 의 Index 가 NAME_None 으로 설정됩니다. 참고로 일반 스트링에 하듯이 NULL 포인터 검사를 하지는 않습니다.

### return FName(*FString::printf(TEXT("Attack%d"), Section));
FName 생성하기
FName TestHUDName = FName(TEXT("ThisIsMyTestFName"));

### TBaseMulticastDelegate< void, ParamTypes... >::AddLambda
- Adds a C++ lambda delegate technically this works for any functor types, but lambdas are the primary use case

```cpp
template<typename FunctorType, typename... VarTypes>
FDelegateHandle AddLambda
(
    FunctorType && InFunctor,
    VarTypes... Vars
)
```




### NextAttackCheck 노티파이의 위치가 한 섹션이 끝나는 지점에 가까워질수록 노티파이실행->다음섹션 명령을 내려도 OnMontageEnded 가 실행되서 콤보가 안될 확률이 높다.


# Chapter 9

### FHitResult HitResult;
- Structure containing information about one hit of a trace, such as point of impact and surface normal at that point.

### FCollisionQueryParams Params(NAME_None, false, this);
- Structure that defines parameters passed into collision function
```
FCollisionQueryParams
(
    FName InTraceTag,
    bool bInTraceComplex,
    const AActor* InIgnoreActor
)
```
### UWorld::SweepSingleByChannel
- Sweep a shape against the world and return the first blocking hit using a specific channel

```cpp
bool SweepSingleByChannel
(
    struct FHitResult & OutHit,
    const FVector & Start,
    const FVector & End,
    const FQuat & Rot,
    ECollisionChannel TraceChannel,
    const FCollisionShape & CollisionShape,
    const FCollisionQueryParams & Params,
    const FCollisionResponseParams & ResponseParam
) const
```

### FQuat::Identity
- Identity quaternion.

### FCollisionShape::MakeSphere(50.0f;)
- Collision Shapes that supports Sphere, Capsule, Box, or Line

```
namespace ECollisionShape
{
    enum Type
    {
        Line,
        Box,
        Sphere,
        Capsule,
    }
}
```


### TWeakObjectPtr
- 약 포인터?

### struct FDamageEvent
Event used by AActor::TakeDamage and related functions

### virtual float AActor::TakeDamage(float DamageAmount, FDamageEvent const & DamageEvent, AController * EventInstigator, AActor * DamageCauser)
virtual float APawn::TakeDamage(float Damage, FDamageEvent const & DamageEvent, AController * EventInstigator, AActor * DamageCauser)
- FDamageEvent DamageEvent
- HitResult.GetActor()->TakeDamage(CharacterStat->GetAttack(), DamageEvent, GetController(), this);

### can be damaged
- 에디터 상 속성. 언체크하면 무적?

### AActor::SetActorEnableCollision
- Allows enabling/disabling collision for the whole actor

```
void SetActorEnableCollision
(
    bool bNewActorEnableCollision
)
```


### #include "DrawDebugHelpers.h"

### DrawDebugCapsule
- Draw a capsule using the LineBatcher

```
void DrawDebugCapsule
(
    const UWorld * InWorld,
    FVector const & Center,
    float HalfHeight,
    float Radius,
    const FQuat & Rotation,
    FColor const & Color,
    bool bPersistentLines,
    float LifeTime,
    uint8 DepthPriority,
    float Thickness
)

	FVector TraceVec = GetActorForwardVector() * AttackRange;
	FVector Center = GetActorLocation() + TraceVec * 0.5f;
	float HalfHeight = AttackRange * 0.5f + AttackRadius;
	FQuat CapsuleRot = FRotationMatrix::MakeFromZ(TraceVec).ToQuat();
	FColor DrawColor = bResult ? FColor::Green : FColor::Red;
	float DebugLifeTime = 5.0f;

	DrawDebugCapsule(GetWorld(),
		Center,
		HalfHeight,
		AttackRadius,
		CapsuleRot,
		DrawColor,
		false,
		DebugLifeTime);
```


# chapter 10

### USkinnedMeshComponent::DoesSocketExist
- Return true if socket with the given name exists

```
virtual bool DoesSocketExist
(
    FName InSocketName
) const
```



### USceneComponent::SetupAttachmen
- Initializes desired Attach Parent and SocketName to be attached to when the component is registered. Generally intended to be called from its Owning Actor's constructor and should be preferred over AttachToComponent when a component is not registered.
Weapon->SetupAttachment(GetMesh(), WeaponSocket);

```
void SetupAttachment
(
    USceneComponent * InParent,
    FName InSocketName
)
```



### Weapon->SetCollisionProfileName(TEXT("NoCollision"));
Syntax

virtual void SetCollisionProfileName
(
    FName InCollisionProfileName,
    bool bUpdateOverlaps
)

Remarks

Set Collision Profile Name This function is called by constructors when they set ProfileName This will change current CollisionProfileName to be this, and overwrite Collision Setting

### auto CurWeapon = GetWorld()->SpawnActor<AABWeapon>(FVector::ZeroVector, FRotator::ZeroRotator);

### CurWeapon->AttachToComponent(GetMesh(), FAttachmentTransformRules::SnapToTargetNotIncludingScale, WeaponSocket)
- Attaches the RootComponent of this Actor to the supplied component, optionally at a named socket. It is not valid to call this on components that are not Registered.

```
void AttachToComponent
(
    USceneComponent * Parent, // parent to attach to
    // how to handle transforms and welding when attaching
    const FAttachmentTransformRules & AttachmentRules,
    // optional socket to attach on the parent
    FName SocketName
)
```
-> SnapToTargetIncludingScale: Snap the actor component to the new parent. This calculates the relative scale of the component that is being attached; so that it keeps the same scale. Essentially this is taking in the scale given and using that. (This one is usually used to attach a weapon to the character mesh.)

-> SnapToTargetNotIncludingScale: This Does the same as the above, but ignores the scale param of the given relative or world transform.



### 	UPROPERTY(VisibleAnywhere, Category = Box)
	UBoxComponent* Trigger;


### Trigger->SetBoxExtent(FVector(40.0f, 42.0f, 30.0f));
- Change the box extent size. This is the unscaled size, before component scale is applied.

```
void SetBoxExtent
(
    FVector InBoxExtent,
    bool bUpdateOverlaps
)
```

### 	UFUNCTION()
	void OnCharacterOverlap(UPrimitiveComponent* OverlappedComp, AActor* OtherActor, UPrimitiveComponent* OtherComp,
		int32 OtherBodyIndex, bool bFromSweep, FHitResult& SweepResult);

### UPrimitiveComponent
- PrimitiveComponents are SceneComponents that contain or generate some sort of geometry, generally to be rendered or used as collision data.

### 	UPROPERTY(EditInstanceOnly, Category = Box)
	TSubclassOf<class AABWeapon> WeaponItemClass;

    TSubclassOf 는 UClass 유형의 안전성을 보장해 주는 템플릿 클래스입니다. 예를 들어 디자이너가 대미지 유형을 지정하도록 해주는 프로젝타일 클래스를 제작중이라 가정합시다. 그냥 UPROPERTY 유형의 UClass 를 만든 다음 디자이너가 항상 UDamageType 파생 클래스만 할당하기를 바라거나, TSubclassOf 템플릿을 사용하여 선택지를 제한시킬 수도 있습니다. 그 차이점은 아래 코드와 같습니다:

/** type of damage */
UPROPERTY(EditDefaultsOnly, Category=Damage)
UClass* DamageType;
Vs.

/** type of damage */
UPROPERTY(EditDefaultsOnly, Category=Damage)
TSubclassOf<UDamageType> DamageType;
두 번째 선언에서, 템플릿 클래스는 에디터의 프로퍼티 창에 UDamageType 파생 클래스만 선택되도록 합니다. 첫 번째 선언에서는 아무 UClass 나 선택할 수 있습니다. 아래 그림에서 확인됩니다.

### NewWeapon->SetOwner(this);

- Set the owner of this Actor, used primarily for network replication.

```
virtual void SetOwner
(
    AActor * NewOwner
)
```

### OnSystemFinished
- Called when the particle system is done.
- delegate 같음

```
FOnSystemFinished OnSystemFinished
```
- dynamic delegate 에는 UFUNCTION 함수를 사용해야 하므로 람다식 표현 함수는 바인딩 할 수 없다.

### UParticleSystemComponentA 
- particle emitter.

### UObject::CreateDefaultSubobjectCreate

- a component or subobject, allows creating a child class and returning the parent class.

```
template<class TReturnType, class TClassToConstructByDefault>
TReturnType * CreateDefaultSubobject
(
    FName SubobjectName,
    bool bTransient
)
```

### UParticleSystemComponent::SetTemplate
- Change the ParticleSystem used by this ParticleSystemComponent

```
void SetTemplate
(
    class UParticleSystem * NewTemplate
)
```

### UParticleSystem
- ParticleSystem is a complete particle effect that contains any number of ParticleEmitters
- By allowing multiple emitters in a system, the designer can create elaborate particle effects that are held in a single system.
- Once created using Cascade, a ParticleSystem can then be inserted into a level or created in script.

```
class UParticleSystem : public UFXSystemAsset
```


### Effect->bAutoActivate = false
- 자동 재생을 막아줌

### USceneComponent::SetHiddenInGame
- Changes the value of bHiddenInGame, if false this will disable Visibility during gameplay

```
void SetHiddenInGame
(
    bool NewHidden,
    bool bPropagateToChildren
)
```

### bPropagateToChildren
- If set to true all of the global transforms of the children of this bone will be recalculated based on their local transforms.
-  Note: This is computationally more expensive than turning it off.

```
[UPROPERTY](Programming/UnrealArchitecture/Reference/Properties)(Meta=(Input, Constant))
bool bPropagateToChildren
```

### AActor::SetActorEnableCollision
- Allows enabling/disabling collision for the whole actor

### USceneComponent::SetVisibilitySet
- visibility of the component, if during game use this to turn on/off


### SetVisibility vs SetHiddenInGame


# chapter 11

### GameInstance
- high-level manager object for an instance of the running game. Spawned at game creation and not destroyed until game instance is shut down. Running as a standalone game, there will be one of these. Running in PIE (play-in-editor) will generate one of these per PIE instance.

```
class UGameInstance :
    public UObject,
    public FExec
```


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

### FString CharacterDataPath = TEXT("/Script/Engine.DataTable'/Game/Book/GameData/ABCharacterData.ABCharacterData'");
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
- 주기적으로 TickNode 호출함

### Interval - UBTService


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

- 반경 내 모든 캐릭터 감지
- 감지된 모든 캐릭터는 TArray 로 전달

### DrawDebugSphere(World, Center, DetectRadius, 16, FColor::Red, false, 0.2f;);

### virtual void PossessedBy(AController* NewController) override;

### IsPlayerControlled()
- 캐릭터를 조종하는 컨트롤러가 플레이어 컨트롤러인지 리턴하는 함수

### GetCharacterMovement()->MaxWalkSpeed

### UBTDecorator_IsInAttackRange();



### virtual bool CalculateRawConditionValue(UBehaviorTreeComponent& OnwenrComp, uint8* NodeMemory) const override;

### Cast<AABCharacter>(OwnerComp.GetBlackboardComponent()->GetValueAsObject(AABAIController::TargetKey));

### Target->GetDistanceTo(ControllingPawn) <= 200.0f

### UBTTask_Attack()

### 7
UBTTaskNode_Attack::UBTTaskNode_Attack()
{
    bNotifyTick = true;
}

### 88
EBTNodeResult::Type UBTTask_Attack::ExecuteTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory)
{
    EBTNodeResult::Type Result = Super::ExecuteTask(OwnerComp, NodeMemory);
    return EBTNodeResult::Type InProgress;
}
void UBTTask_Attack::TickTask(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory, float DeltaSeconds)
{
    Super::TickTask(OwnerComp, NodeMemory, DeltaSeconds);
    FinishLatentTask(OwnerComp, EBTNodeResult::Succeeded);
}

### 9
FVector LookVector = Target->GetActorLocation() - ABCharacter->GetActorLocation();
    LookVector.Z = 0.0f;
    FRotator TargetRot = FRotationMatrix::MakeFromX(LookVector).Rotator();
    ABCharacter->SetActorRotation(FMath::RInterpTo(ABCharacter->GetActorRotation(), TargetRot, GetWorld()->GetDeltaSeconds(), 2.0f));

### Simple parallel composite



# Ch. 13

### 주 게임 모듈(Primary Game Module)

###  FSoftObjectPath

### UCLASS(config=ArenaBattle)

### UPROPERTY(config)

### 클래스 기본 객체
- GetDefault 함수로 가져올 수 있다.

### FStreamableManager
- 비동기 방식으로 애셋 로딩.
- 하나만 활성화하는게 좋음

### FStreamableManager StreamableManager;
### FSoftObjectPath CharacterAssetToLoad = FSoftObjectPath(nullptr);

### TSharedPtr<struct FStreamableHandle> AssetStreamingHandle;




### int32 RandIndex = FMath::RandRange(0, DefaultSettings->CharacterAssets.Num() - 1);


### AssetStreamingHandle = ABGameInstance->StreamableManager.RequestAsyncLoad(CharacterAssetToLoad,
				FStreamableDelegate::CreateUObject(this, &AABCharacter:;OnAssetLoadCompleted));


### ABCHECK(Mesh->DoesSocketExist(GateSocket));

### void OnConstruction(const FTransform& Transform) override;

### OnTriggerBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitrResult &SweepResult)

### NewGateTrigger -> ComponentTags.Add(GateSocket);

### ABCHECK(OverlappedComponent->ComponentTags.Num() == 1);

### FName(*ComponentTag.ToString().Left(2));

### FCollisionQueryParams CollisionQueryParam(NAME_None, false, this);

### FCollisionObjectQueryParams ObjectQueryParam(FCollisionObjectQueryParams::InitType::AllObjects);

### bool bResult = GetWorld()->OverlapMultiByObjectType(
		OverlapResults,
		NewLocation,
		FQuat::Identity,
		ObjectQueryParam,
		FCollisionShape::MakeSphere(775.0f),
		CollisionQueryParam
	);

### FTimerHandle SpawnNPCTimerHandle = {};
	FTimerHandle SpawnItemBoxTimerHandle = {};

### GetWorld()->GetTimerManager().SetTimer(SpawnNPCTimerHandle, FTimerDelegate::CreateUObject(this, &AABSection::OnNPCSpawn), EnemySpawnTime, false)

### GetWorld()->GetTimerManager().SetTimer(SpawnItemBoxTimerHandle, FTimerDelegate::CreateLambda([this]()->void {
			FVector2D RandXY = FMath::RandPointInCircle(600.0f);
			GetWorld()->SpawnActor<AABItemBox>(GetActorLocation() + FVector(RandXY, 30.0f), FRoatator::ZeroRotator);
		}), ItemBoxSpawnTime, false);


# ch.14

### UENUM(BlueprintType)
- 블루 프린트와 호환되는 enum

### UPROPERTY(Transient)
- Transient는 프로퍼티 지정자 중 하나이다.
- 휘발성이 되어(serialize 되지 않음) 저장 또는 로드되지 않는다. 이런 식의 지정자가 붙은 프로퍼티는 로드 시간에 0 으로 채워진다.

### GetDefault
- Get default object of a class.  
```cpp
template<typename T>
const T * GetDefault()
```

```
FORCEINLINE TOptional<int32> GetDefault() const
{
	return bHasDefaultValue ? TOptional<int32>(DefaultValue) : TOptional<int32>();
}
```

### GetGameInstance()
```
UGameInstance* FLocalPlayerContext::GetGameInstance() const
{
	if (UWorld* WorldPtr = GetWorld())
	{
		return WorldPtr->GetGameInstance();
	}

	return nullptr;
}
```

### AssetStreamingHandle = ABGameInstance->SteramableManager.RequestAsyncLoad(CharacterAssetToLoad, FStreamableDelegate::CreateUObject(this, &AABCharacter::OnAssetLoadCompleted));

### auto BehaviorTreeComponent = Cast<UBehaviorTreeComponent>(BrainComponent);
BehaviorTreeComponent->StopTree(EBTStopMode::Safe);

### auto CharacterWidget = Cast<UABCharacterWidget>(HPBarWidget->GetUserWidgetObject());

### CharacterWidget->BindCharacterStat(CharacterStat);

### GetCharacterMovement()->MaxWalkSpeed = 600.0f;

### ABPlayerController->RestartLevel();
- Restarts the current level

```
void APlayerController::RestartLevel()
{
	if( GetNetMode()==NM_Standalone )
	{
		ClientTravel( TEXT("?restart"), TRAVEL_Relative );
	}
}
```

### UPROPERTY(Transient)
- Transient는 프로퍼티 지정자 중 하나이다.
- 휘발성이 되어(serialize 되지 않음) 저장 또는 로드되지 않는다. 이런 식의 지정자가 붙은 프로퍼티는 로드 시간에 0 으로 채워진다.

### TSubclassOf
- UClass 유형의 안전성을 보장해 주는 템플릿 클래스이다.
- c++ 수준에서의 유형 안전성도 확보해 준다.
- 비 호환 TSubclassOf 유형을 서로에게 할당하려는 순간 컴파일 오류가 발생한다.

```cpp
UClass* ClassA = UDamageType::StaticClass();

TSubclassOf<UDamageType> ClassB;

ClassB = ClassA; // Performs a runtime check

TSubclassOf<UDamageType_Lava> ClassC;

ClassB = ClassC; // Performs a compile time check
```

### AController::GetPlayerState
- this controller's PlayerState cast to the template type, or NULL if there is not one. May return null if the cast fails.

```cpp
/**
* @return this controller's PlayerState cast to the template type, or NULL if there is not one.
* May return null if the cast fails.
*/
template < class T >
T* GetPlayerState() const
{
	return Cast<T>(PlayerState);
}
```

###  HUDWidget  = CreateWidget<UABHUDWidget>(this, HUDWidgetClass);

```cpp
template<typename WidgetT, typename OwnerT>
WidgetT * CreateWidget
(
    OwnerT * OwningObject,
    TSubclassOf< UUserWidget > UserWidgetClass,
    FName WidgetName
)
```

### UUserWidget::AddToViewport
- Adds it to the game's viewport and fills the entire screen, unless SetDesiredSizeInViewport is called to explicitly set the size.

```cpp
void AddToViewport
(
    // The higher the number,
    // the more on top this widget will be.
    int32 ZOrder
)
```

### HPBar = Cast<UProgressBar>(GetWidgetFromName(TEXT("pbHP")));

### UUserWidget::GetWidgetFromName
- The uobject widget corresponding to a given name

```cpp
UWidget* GetWidgetFromName
(
    const FName& Name
) const
```

### UTextRenderComponent::SetText
- Change the text value and signal the primitives to be rebuilt
- Fstring 버전은 deprecated 되었음
```cpp
void SetText
(
    const FText& Value
)
```

### GetWorld()->GetTimerManager().ClearTime(SpawnNPCTimerHandle);
	auto KeyNPC = GetWorld()->SpawnActor<AABCharacter>(GetActorLocation() + FVector::UpVector * 88.0f, FRotator::ZeroRotator);

### APawn.LastHitBy
- Controller of the last Actor that caused us damage.

```cpp
AController * LastHitBy
```

### GetPlayerControllerIterator
- 현재 게임에 참여 중인 플레이어 컨트롤러의 목록을 반환함? 얻을 수 있음
- Returns an iterator for the player controller list.

```cpp
FConstPlayerControllerIterator GetPlayerControllerIterator() const
```

### GetWorld()->GetAuthGameMode()
- 게임 실행 중에 게임 모드의 포인터를 가져오는 함수.
- 멀티 플레이 게임에서 게임 모드는 게임을 관리하는 방장 역할을 하며 겡미에서 중요한 데이터를 인증하는 권한을 가진다.
/**
	 * Returns the current Game Mode instance, which is always valid during gameplay on the server.
	 * This will only return a valid pointer on the server. Will always return null on a client.
	 */
	AGameModeBase* GetAuthGameMode() const { return AuthorityGameMode; }



# ch.15

### SaveGame - C++ class
- 게임 데이터 저장 로딩 간편하게 구현 도와줌
- 플랫폼 별로 알맞은 최적의 장소에 데이터 저장해 주며,
- 에디터에서 저장하는 경우 프로젝트의 saved-savegames 폴더에 저장된다.

### auto ABSaveGame = Cast<UABSaveGame>(UGameplayStatics::LoadGameFromSlot(SaveSlotName, 0));
    if (nullptr == ABSaveGame)
    {
        ABSaveGame = GetMutableDefault<UABSaveGame>();
    }

### UGameplayStatics::LoadGameFromSlot
- Load the contents from a given slot.

```cpp
static USaveGame * LoadGameFromSlot
(
    const FString & SlotName,
    // For some platforms, master user index to identify the user doing the loading.
    const int32 UserIndex
)
```

### GetMutableDefault
- Gets the mutable default object of a class.
- returns Class default object (CDO)

```cpp
template<class T>
T * GetMutableDefault
(
    UClass* Class
)
```

### SaveGameToSlot(NewPlayerData, SaveSlotName, 0)
### UGameplayStatics::SaveGameToSlot
- Save the contents of the SaveGameObject to a platform-specific save slot/file.
- 성공하면 true 반환

```cpp
static bool SaveGameToSlot
(
    USaveGame * SaveGameObject,
    const FString & SlotName,
    const int32 UserIndex
)
```


### UABSaveGame* NewPlayerData = NewObject<UABSaveGame>();
- 언리얼 오브젝트 생성 시 NewObject 명령을 사용하며,
- 이렇게 생성된 오브젝트를 더이상 사용하지 않으면 가비지 컬렉터가 탐지해
- 자동으로 소멸시킨다.

```cpp
template<class T>
T * NewObject
(
    UObject * Outer,
    const UClass * Class,
    FName Name,
    EObjectFlags Flags,
    UObject * Template,
    bool bCopyTransientsFromClassDefaults,
    FObjectInstancingGraph * InInstanceGraph,
    UPackage * ExternalPackage
)
```

### 저장 데이터 없애고 싶으면 savegames 폴더에서 해당 파일을 삭제하면 됨.

### CurrentWeapon->DetachFromActor(FDetachmentTransformRules::KeepWorldTransform);
- AABWeapon* CurrentWeapon;

### AActor::DetachFromActor
- Detaches the RootComponent of this Actor from any SceneComponent it is currently attached to.

```cpp
void DetachFromActor
(
    // How to handle transforms when detaching.
    const FDetachmentTransformRules & DetachmentRules
)
```

### TSubclassOf<class UUserWidget> UIWidgetClass;

### UIWidgetInstance = CreateWidget<UUserWidget>(this, UIWidgetClass);
```cpp
template<typename WidgetT, typename OwnerT>
WidgetT * CreateWidget
(
    OwnerT * OwningObject,
    TSubclassOf< UUserWidget > UserWidgetClass,
    FName WidgetName
)
```

### FInputModeUIOnly Mode;
### FInputModeUIOnly
- Data structure used to setup an input mode that allows only the UI to respond to user input.

```cpp
struct FInputModeUIOnly : public FInputModeDataBase
```

### Mode.SetWidgetToFocus(UIWidgetInstance->GetCachedWidget());

### FInputModeUIOnly::SetWidgetToFocus
- Widget to focus

```cpp
FInputModeUIOnly& SetWidgetToFocus
(
    TSharedPtr< SWidget > InWidgetToFocus
)
```

### SWidget
- Abstract base class for Slate widgets.

### UWidget::GetCachedWidget
- Gets the last created widget does not recreate the gc container for the widget if one is needed

```cpp
TSharedPtr< SWidget > GetCachedWidget() const
```

### SetInputMode(Mode);
### APlayerController::SetInputMode
- Setup an input mode.
```cpp
virtual void SetInputMode
(
    const FInputModeDataBase & InData
)
```

### FInputModeUIOnly
- Inheritance Hierarchy
	- FInputModeDataBase
	    - FInputModeUIOnly

### APlayerController.bShowMouseCursor
- Whether the mouse cursor should be displayed.
- bShowMouseCursor = true;

### TActorIterator<액터 타입>
- 현재 월드에 있는 특정 타입을 상속받은 액터의 목록 가져올 수 있음
- Template actor iterator. Misc. Iterator types

```cpp
template<typename ActorType>
class TActorIterator : public TActorIteratorBase< TActorIterator< ActorType > >
```

### UFUNCTION(BlueprintCallable)
- 함수를 블루프린트에서 사용 가능하도록 해줌

### virtual void NativeConstruct() override;
-  AddToViewport가 외부에서 호출될 때 UI 위젯이 초기화 되며 호출된다.

### UButton
- The button is a click-able primitive widget to enable basic interaction, you can place any other widget inside a button to make a more complex and interesting click-able element in your UI.

```cpp
class UButton : public UContentWidget
```

### UButton.OnClicked
- Called when the button is clicked

```cpp
FOnButtonClickedEvent OnClicked
```

### 34
FString Charactername = TextBox->GetText().ToString();
if (CharacterName.Len() <= 0 || CharacterName.Len() > 10) return;

### STextBlock::GetText
- Gets the text assigned to this text block

```cpp
const FText & GetText() const
```

### STextBlock
- A simple static text widget


### UGameplayStatics::OpenLevel
- Travel to another level

```cpp
static void OpenLevel
(
    const UObject * WorldContextObject,
    // 	the level to open
    FName LevelName,
    // if true options are reset, if false options are carried over from current level
    bool bAbsolute,
    // a string of options to use for the travel URL
    FString Options
)
```


### 33
	FInputModeGameOnly GameInputMode;
	FInputModeUIOnly UIInputMode;

### APlayerController::SetPause
- Locally try to pause game (call serverpause to pause network game); returns success indicator.

```cpp
virtual bool SetPause
(
    bool bPause,
    FCanUnpause CanUnpauseDelegate
)
```

### auto ABPlayerController = Cast<AABPlayerController>(GetOwningPlayer());

### UUserWidget::GetOwningPlayer
- Gets the player controller associated with this UI.
- Returns the player controller that owns the UI.

```cpp
virtual APlayerController * GetOwningPlayer() const
```

### UUserWidget::RemoveFromParent
- Removes the widget from its parent widget.
- If this widget was added to the player's screen or the viewport it will also be removed from those containers.

```cpp
virtual void RemoveFromParent()
```

### FConstPawnIterator It = GetWorld()->GetPawnIterator()
- Imitation iterator class that attempts to provide the basic interface that FConstPawnIterator previously did when a typedef of TArray<TWeakObjectPtr<APawn>>::Iterator.
- In general you should prefer not to use this iterator and instead use TActorIterator<APawn> or TActorRange<APawn> (or the desired more derived type). This iterator will likely be deprecated in a future release.

```cpp
class FConstPawnIterator
```

### UWorld::GetPawnIterator
- Deprecated
- The PawnIterator is an inefficient mechanism for iterating pawns. Please use TActorIterator instead.

```cpp
FConstPawnIterator GetPawnIterator() const
```

### TActorIterator
- Template actor iterator. Misc. Iterator types

```cpp
template<typename ActorType>
class TActorIterator : public TActorIteratorBase< TActorIterator< ActorType > >
```

### APawn::TurnOff
- Freeze pawn - stop sounds, animations, physics, weapon firing

```cpp
virtual void TurnOff()
```

### for (FConstPlayerControllerIterator It = GetWorld()->GetPlayerControllerIterator(); It; ++It)

### UWorld::GetPlayerControllerIterator
- Returns an iterator for the player controller list.

```cpp
FConstPlayerControllerIterator GetPlayerControllerIterator() const
```

### UI 위젯의 NativeConstruct 함수는 AddToViewport 함수가 외부에서 호출될 때 UI 위젯이 초기화되면서 호출된다.
- 그래서 플레이어 컨트롤러의 ShowResultUI 함수에서 AddToViewport 함수를 호출하기 전에 미리 UI 위젯이 게임스테이트의 정보를 읽어들일 수 있도록 바인딩을 설정해야 한다.       