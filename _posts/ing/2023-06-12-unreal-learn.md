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


### NativeUpdateAnimation

### TryGetPawnOwner

### GetVelocity()

### ::IsValid(...)

### GetCharacterMovement()

### JumpZVelocity

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

### FMath::Clamp<int32>(CurrentCombo + 1, 1, MaxCombo);

### Broadcast()

### DECLARE_MULTICAST_DELEGATE(FOnNextAttackCheckDelegate);

### FName GetAttackMontageSectionName(int32 Section);

### Montage_JumpToSection(GetAttackMontageSectionName(NewSection), AttackMontage);

### ABCHECK(FMath::IsWithinInclusive<int32>(Section, 1, 4), NAME_None);

### return FName(*FString::printf(TEXT("Attack%d"), Section));

### .AddLambda

### NextAttackCheck 노티파이의 위치가 한 섹션이 끝나는 지점에 가까워질수록 노티파이실행->다음섹션 명령을 내려도 OnMontageEnded 가 실행되서 콤보가 안될 확률이 높다.
