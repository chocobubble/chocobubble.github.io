---
title:  "애니메이션 시스템의 설계"
excerpt: "Unreal Engine Ch.7"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Book
tags:
  - Unreal
  - Animation

toc: true
toc_sticky: true

use_math: true

date: 2023-06-11
last_modified_at: 2023-07-02
---
> '이득우의 언리얼 c++ 게임 개발의 정석' 책을 참고하여 작성한 포스트입니다.

---

애님 인스턴스 클래스를 c++로 제작하고, 캐릭터의 상태에 기반하게 작동시킨다.
{: .notice--success}

---

# 애니메이션 블루프린트

- 애니메이션 블루프린트는 시각적 도구를 사용해 설계하는 Anim Graph, 
- 블루프린트의 기반을 이루는 Anim Instance로 구성된다.
    - Anim Instance
        - 스켈레탈 메시를 소유하는 폰의 정보를 받아 애님 그래프가 참조할 데이터를 제공한다.
        - 블루프린트와 C++로 제작가능하다.
    - Anim Graph
        - Anim Instance의 변수 값에 따라 변화하는 애니메이션 시스템을 설계한다.
        - 블루프린트만 가능하다.
- AnimInstance 클래스를 부모로하는 클래스를 새로 생성하자.
- 블루프린트에서 접근 가능하려면 키워드를 BlueprintReadOnly 혹은 BlueprintReadWrite 를 사용해 주어야 한다.

```cpp

// ABAnimInstance.h

// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "ArenaBattle.h"
#include "Animation/AnimInstance.h"
#include "ABAnimInstance.generated.h"

/**
 * 
 */
UCLASS()
class ARENABATTLE_API UABAnimInstance : public UAnimInstance
{
	GENERATED_BODY()
	
public:
	UABAnimInstance();

private:
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category=Pawn, Meta=(AllowPrivateAccess=true))
	float CurrentPawnSpeed;
};
```

- 언리얼 내 모든 블루프린트 작업 공간에는 툴바에 있는 클래스 세팅을 통해 블루프린트의 부모 클래스를 변경할 수 있다.
- 블루프린트 메뉴에서 '상속된 변수 표시' 버튼을 누르면 UPROPERTY 매크로로 노출한 변수 값을 애님 그래프에서 이용 가능하다.
- 변수를 작업 공간에 드래그하면 해당 변수의 get, set 메뉴가 있는 노드가 생성된다.
- CurrentPawnSpeed에 따라 애니메이션을 변경해 줄 것이므로, get 노드로부터 마우스를 드래그 해 작업 공간에서 버튼을 떼고 나오는 탭에서
- float 간 크기를 비교하는 부등호 기호 노드를 선택하면 된다. 노드의 비교 결과는 빨간색의 boolean 유형으로 나온다.
- 빨간색 결과 핀에서 동일하게 드래그해서 작업공간에서 버튼을 떼면 나오는 탭에서 'bool로 포즈를 블렌딩합니다' 노드를 선택해준다.
- true 포즈에 run animation, false 포즈에 idle animation을 연결하고 결과를 최종 애니메이션 포즈에 연결하면 끝이다.
- 우측 하단? '애님 프리뷰 에디터'에서 수치를 조절하면 프리뷰 화면에 위치한 캐릭터의 애니메이션이 바뀌는 것을 확인할 수 있다.

> 애니메이션 블렌딩이란, 개념적으로, 하나의 캐릭터 또는 스켈레탈 메시에 둘 이상의 애니메이션이 부드럽게 전환되도록 만드는 것


# 폰과 데이터 연동
- 애님 인스턴스 클래스는 틱마다 호출되는 **NativeUpdateAnimation** 함수를 가상 함수로 제공한다.
- TryGetPawnOwner()를 이용해 폰에 접근 가능하다. 접근 전 폰 객체가 유효한지 점검해주는 함수이다.

```cpp
void UABAnimInstance::NativeUpdateAnimation(float DeltaSeconds)
{
    Super::NativeUpdateAnimation(DeltaSeconds);

    auto Pawn = TryGetPawnOwner();
	
	if(::IsValid(Pawn))
    {
        CurrentPawnSpeed = Pawn->GetVelocity().Size();
	}
}
```

### UABAnimInstance::TryGetPawnOwner
- 애님 인스턴스를 제어하는 소유자를 폰 소유자로 간주하고 반환. (?)
- 없을 경우 유효한 컨트롤러 확인 후 반환 (?)
- 이마저도 없으면 nullptr 반환  
{: .notice--info}

### GetVelocity()
- Returns velocity in cm/s (Unreal Units/second) of the rootcomponent if it is either using physics or has an associated MovementComponent  
```virtual FVector GetVelocity() const```
{: .notice--info}

::IsValid(...)
- Return true if the object is usable: non-null and not pending kill or garbage
- Test validity of object  
```cpp
bool IsValid
(
    const UObject * Test
)
```
{: .notice--info}

FVector::Size
- Get the length (magnitude) of this vector.  
{: .notice--info}


# 스테이트 머신의 제작
- 애니메이션 블루프린트의 애님 그래프는 state machine 기능을 제공한다.
- 스테이트에 지정된 동작을 반복 수행한다.
- 애님 그래프의 빈 공간에 '스테이트 머신 새로 추가'를 눌러 새로 생성해주고 결과를 '최종 애니메이션 포즈'에 연결해 주자.
- 더블 클릭하면 스테이트 머신 편집 화면이 나온다.
- 하나의 스테이트에서 다른 스테이트로 이동하기 위한 조건을 트랜지션(transition, 언리얼 에서는 '룰'이라고 함)이라 불리는 단방향 화살표로 표현한다.
- 테두리에서 다른 테두리까지 드래그하면 생긴다.
- 상태를 원하는 만큼 만들고 상태를 더블 클릭해 해당 상태에 적용되는 애니메이션을 세팅해주면 된다.

# 점프 기능의 구현
- ACharacter 클래스에는 Jump 멤버 함수가 있어, 입력과 바인딩할 수 있다. 입력과 연동하면 캐릭터의 점프 기능이 바로 완성된다.
- JumpZVelocity 값 변경을 통해 점프 높이 조절이 가능하다.
- 현재 캐릭터의 움직임을 파악하기 위해 폰의 무브먼트 컴포넌트가 제공하는 함수들이 있다.
	- IsFalling()
		- 공중에 떠 있는지
	- IsSwimming()
	- IsCrouching()
		- 현재 (쭈그리고)앉아있는지
	- IsMoveOnGround()
		- 땅에서 이동 중인지
- ground 스테이트와 jump 스테이트를 만들고 양방향 트랜지션을 추가한다.
- 트랜지션을 클릭하면 조건을 설정할 수 있다.
- IsInAir 변수를 드래그해 노드를 생성하고 jump 스테이트로 가는 트랜지션은 true일 때,
- ground 스테이트로 가는 트랜지션은 false 일 때 되게 설정한다. 중간에 NOT Boolean 노드를 만들어 반전시키면 된다.

```cpp
// ABCharacter.cpp
GetCharacterMovement()->JumpZVelocity = 800.0f;

PlayerInputComponent->BindAction(TEXT("Jump"), EInputEvent::IE_Pressed, this, &AABCharacter::Jump);

//ABAnimInstance.cpp
auto Character = Cast<ACharacter>(Pawn);
if(Character)
{
	IsInAir = Character->GetMovementComponent()->IsFalling();
}
```

### GetCharacterMovement()
- Returns CharacterMovement subobject

```UCharacterMovementComponent * GetCharacterMovement() const```

### UCharacterMovementComponent::JumpZVelocity
- Initial velocity (instantaneous vertical acceleration) when jumping.

```cpp
float 	JumpZVelocity
```	

# 애니메이션 리타겟
- 다른 스켈레톤 구성을 가진 캐릭터의 애니메이션 교환은 불가능하지만,
- 인간형 캐릭터의 경우는 스켈레톤의 구성이 달라도 애니메이션 교환이 가능하도록 Animation Retarget 기능이 제공된다.

# 점프의 구현
- 점프 구현을 위해 스테이트들을 ground, jumpstart, jumploop, jumpend 로 구분한다 했을 때,
- jumpstart와 jumpend 애니메이션은 한 번만 재생되어야 하므로 디테일에서 'loop animation' 옵션을 꺼주어야 한다.
- 트랜지션 조건에서 'time remaining' 노드를 통해 애니메이션 재생이 끝나갈 때 즘 다른 상태로 넘겨주어도 되지만,
- 트랜지션 노드에서 제공하는 'Automatic Rule Based on Sequence Player in State' 옵션을 체크하면 애니메이션 종료 시 자동으로 스테이트가 전환된다.

