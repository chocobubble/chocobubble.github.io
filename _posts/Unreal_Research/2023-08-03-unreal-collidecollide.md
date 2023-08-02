---
title:  "[언리얼 엔진] Collision "
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Collision

toc: true
toc_sticky: true

date: 2023-08-03
last_modified_at: 2023-08-03
---
> 언리얼의 Collision 관련 내용을 정리하였습니다.

---
<br><br>

# Collision 개요
- Collide 가능한 모든 객체는 Object Type을 가지며, 다른 Object Type들과 어떻게 상호작용할 지 정의한 일련의 Collide Responses를 가지고 있다.
- 각 Object Type에 따라 어떻게 Collide 할 지 결정할 수 있다.

## 상호 작용
- Blocking
	- Block으로 설정된 두 액터 사이에 발생.
	- Event hit을 발동시키고 싶다면 'Simulation Generate Hit Events' 를 활성화 해야 한다.
- Overlap
	- 서로 Ignore 인 것처럼 보이지만, Overlap Events를 발동시킴
	- 한쪽이 Block 이어도 Overlap Event 발생 가능
	- 하지만 한 쪽이 Ignore 면 안된다.

## 충돌
### Block + Block
- 두 물체의 Collision이 block 으로 설정되어 있다면, 단순 충돌만 한다.
- 하지만 한 쪽에 'Simulation Generate Hit Events'를 활성화 시키면 충돌 시 스스로 충돌 이벤트를 발생시킨다.

### Overlap + Ignore
- 'Generates Overlap Events' 를 활성화 시키지 않으면, 서로 무시한다.
- 활성화 시키면 ReceiveBeginOverlap 와 ReceiveEndOverlap 이벤트를 발생시킨다.
- Collision Event가 필요한 것이 아니라면 성능 향상을 위해 비활성화 하는 것이 좋다.

---

<br><br>


# Collide 메서드들
## UWorld::OverlapMultiByChannel
- collision channel을 사용 하여 특정 위치에 특정 형상으로 Overlap 되는 모든 요소들의 집합을 결정한다.  
```cpp
bool OverlapMultiByChannel
(
    TArray< struct FOverlapResult > & OutOverlaps,
    const FVector & Pos,
    const FQuat & Rot,
    ECollisionChannel TraceChannel,
    const FCollisionShape & CollisionShape,
    const FCollisionQueryParams & Params,
    const FCollisionResponseParams & ResponseParam
) const
```

- 충돌 결과가 있으면 true 반환
- OutOverlaps
	- Overlap된 물체들의 배열
- Pos	
	- CollisionShape의 센터 위치. 월드 좌표이다.
- TraceChannel	
	- 원하는 물체와 hit 할 수 있게 결정해 주는 channel
- CollisionShape	
	- Box, Sphere, Capsule 가 있다.
- Params	
	- trace에 사용할 수 있는 추가적인 parameters
	- default 값 : FCollisionQueryParams::DefaultQueryParam
	- 특정 Actor 를 무시하고 싶을 때
```cpp	
FCollisionQueryParams
(
    FName InTraceTag,
    bool bInTraceComplex,
    const AActor* InIgnoreActor
)
```

- ResponseParam	
	- trace에 사용할 수 있는 ResponseContainer
	- default : FCollisionResponseParams::DefaultResponseParam


## UWorld::LineTraceSingleByObjectType
- Line Trace를 통해 원하는 object type를 가진 처음 blocking 되는 물체를 리턴.  
```cpp
bool LineTraceSingleByObjectType
(
    struct FHitResult & OutHit,
    const FVector & Start,
    const FVector & End,
    const FCollisionObjectQueryParams & ObjectQueryParams,
    const FCollisionQueryParams & Params
) const
```

- hit 되면 true 반환
- FCollisionObjectQueryParams
	- 찾으려는 object types array 


### UWorld::LineTraceSingleByChannel
- channel을 활용한 line trace

```cpp
LineTraceSingleByChannel
(
    FHitResult& OutHit,
    const FVector& Start,
    const FVector& End,
    ECollisionChannel TraceChannel,
    const FCollisionQueryParams& Param...,
    const FCollisionResponseParams& Re...
)
```

### ECollisionChannel	
- collision 에 사용되는 채널들이다.
- GameTraceChannel 들은 유저가 만드는 채널들이다.
	- object channel, trace channel 을 합쳐 총 18개만 생성 가능하다.
- 충돌체에는 반드시 하나의 콜리전 채널이 설정되어 있어야 한다.
- 기본으로 주어지는 기본 콜리전 채널은 다음과 같다.
	- WorldStatic
		- 정적 배경 액터에 사용
		- 주로 스태틱메시 액터에 있는 스태틱메시 컴포넌트에 사용
	- WorldDynamic
		- 움직이는 액터에 사용하는 콜리전.
		- 블루프린트에 속한 스태틱메시 컴포넌트에 사용
	- Pawn
		- 플레이어가 조종하는 물체에 주로 사용
		- 캐릭터의 충돌을 담당하는 캡슐 컴포넌트에 설정
	- Visibility
		- 배경 물체가 시각적으로 보이는지 탐지하는 데 확인(폰은 제외)
		- 마우스로 물체를 선택하는 Picking 기능 구현할 때 사용
	- Camera
		- 카메라 설정을 위해 카메라와 목표물 간에 장애물이 있는지 탐지 용도
	- PhysicsBody
		- 물리 시뮬레이션으로 움직이는 컴포넌트에 설정
	- Vehicle
	- Destructible

```cpp
enum ECollisionChannel
{
    ECC_WorldStatic,
    ECC_WorldDynamic,
    ECC_Pawn,
    ECC_Visibility,
    ECC_Camera,
    ECC_PhysicsBody,
    ECC_Vehicle,
    ECC_Destructible,
    ECC_EngineTraceChannel1,
    ECC_EngineTraceChannel2,
    ECC_EngineTraceChannel3,
    ECC_EngineTraceChannel4,
    ECC_EngineTraceChannel5,
    ECC_EngineTraceChannel6,
    ECC_GameTraceChannel1,
    ECC_GameTraceChannel2,
    ECC_GameTraceChannel3,
    ECC_GameTraceChannel4,
    ECC_GameTraceChannel5,
    ECC_GameTraceChannel6,
    ECC_GameTraceChannel7,
    ECC_GameTraceChannel8,
    ECC_GameTraceChannel9,
    ECC_GameTraceChannel10,
    ECC_GameTraceChannel11,
    ECC_GameTraceChannel12,
    ECC_GameTraceChannel13,
    ECC_GameTraceChannel14,
    ECC_GameTraceChannel15,
    ECC_GameTraceChannel16,
    ECC_GameTraceChannel17,
    ECC_GameTraceChannel18,
    ECC_OverlapAll_Deprecated,
    ECC_MAX,
}
```