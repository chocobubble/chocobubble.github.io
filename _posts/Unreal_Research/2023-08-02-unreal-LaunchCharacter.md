---
title:  "[언리얼 엔진] LaunchCharacter"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - LaunchCharacter

toc: true
toc_sticky: true

date: 2023-08-02
last_modified_at: 2023-08-02
---

> 언리얼의 LaunchCharacter 관련 내용을 정리하였습니다.

---

# ACharacter::LaunchCharacter
- 캐릭터에 launch velocity를 설정해 둔다.
- velocity는 다음 CharacterMovementComponent tick에서 진행되며,
- 캐릭터의 상태가 Falling으로 설정된다.
- bXYOverride, bZOverride 는 true 값일 경우 캐릭터의 Velocity에 더해지지 않고 교체된다.

## 소스코드

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.

void ACharacter::LaunchCharacter(FVector LaunchVelocity, bool bXYOverride, bool bZOverride)
{
	UE_LOG(LogCharacter, Verbose, TEXT("ACharacter::LaunchCharacter '%s' (%f,%f,%f)"), *GetName(), LaunchVelocity.X, LaunchVelocity.Y, LaunchVelocity.Z);

	if (CharacterMovement)
	{
		FVector FinalVel = LaunchVelocity;
		const FVector Velocity = GetVelocity();

		if (!bXYOverride)
		{
			FinalVel.X += Velocity.X;
			FinalVel.Y += Velocity.Y;
		}
		if (!bZOverride)
		{
			FinalVel.Z += Velocity.Z;
		}

		CharacterMovement->Launch(FinalVel);

		OnLaunched(LaunchVelocity, bXYOverride, bZOverride);
	}
}
```

### UCharacterMovementComponent::Launch
- CharacterMovementComponent의 PendingLaunchVelocity 값을 LaunchVel(파라미터) 로 설정한다.

```cpp
virtual void Launch
(
    FVector const & LaunchVel
)
```