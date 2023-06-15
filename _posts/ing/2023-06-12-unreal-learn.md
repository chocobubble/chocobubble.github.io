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


### Broadcast()

### DECLARE_MULTICAST_DELEGATE(FOnNextAttackCheckDelegate);

### FName GetAttackMontageSectionName(int32 Section);

### Montage_JumpToSection(GetAttackMontageSectionName(NewSection), AttackMontage);

### ABCHECK(FMath::IsWithinInclusive<int32>(Section, 1, 4), NAME_None);

### return FName(*FString::printf(TEXT("Attack%d"), Section));

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