---
title:  "[언리얼 엔진] Character Movement Component"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - CharacterMovementComponent

toc: true
toc_sticky: true

use_math: true

date: 2023-07-22
last_modified_at: 2023-07-22
---

# UCharacterMovementComponent
- 캐릭터 소유자를 위한 이동 로직을 다룰 수 있게 해준다.
- UPawnMovementComponent, IRVOAvoidanceInterface, INetworkPredictionInterface 를 상속받는다.
- walking, falling, swimming, flying, custum 등의 이동을 지원한다.
- 이동은 현재 velocity와 acceleration에 영향을 받는다.	
- acceleration은 매 프레임마다 input vector에 따라 업데이트 된다.

## 멤버 변수
### CharacterOwner
- CharacterMovementComponent가 속한 ACharacter* 

### MaxWalkSpeed
- walking 할 때 최대 속력


## 멤버 함수
### AddForce
- 캐릭터에 힘을 가한다.
- 매 틱마다 축적되며, 여러 함수에 중첩되는 것도 가능하다.
- 즉각적인 힘을 가하고 싶다면 AddImpulse 를 사용해야 한다.

```cpp
virtual void AddForce
(
    FVector Force
)
```
### AddImpulse
- 즉각적인 힘을 가하는 것으로, 보통 한번만 적용된다.
- 힘을 계속 가하고 싶다면 AddForce를 이용하자.
- bVelocityChange는 mass 에 의해 Impulse가 영향을 받는 지 결정함


```cpp
virtual void AddImpulse
(
    FVector Impulse,
    bool bVelocityChange
)
```

### GetCharacterOwner
- UpdatedComponent 소유 ACharacter* 를 반환

```cpp
ACharacter * GetCharacterOwner() const
```
