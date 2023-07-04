---
title:  "LSCharacter 클래스"
excerpt: "base character"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - character

toc: true
toc_sticky: true

use_math: true

date: 2023-07-02
last_modified_at: 2023-07-02
---
> 개인 프로젝트의 캐릭터 클래스 관련 내용입니다.  
> Copyright Epic Games, Inc. All Rights Reserved.
---


# 코드 관련 내용들

### UObject::CreateDefaultSubobject
- Create a component or subobject, allows creating a child class and returning the parent class.

```cpp
template<class TReturnType, class TClassToConstructByDefault>
TReturnType * CreateDefaultSubobject
(
    FName SubobjectName,
    bool bTransient
)
```

### ConstructorHelpers::FObjectFinder

```cpp
struct COREUOBJECT_API ConstructorHelpers
{
public:
	template<class T>
	struct FObjectFinder : public FGCObject
	{
		T* Object;
		FObjectFinder(const TCHAR* ObjectToFind, uint32 InLoadFlags = LOAD_None)
		{
			CheckIfIsInConstructor(ObjectToFind);
			FString PathName(ObjectToFind);
			StripObjectClass(PathName,true);

			Object = ConstructorHelpersInternal::FindOrLoadObject<T>(PathName, InLoadFlags);
			ValidateObject( Object, PathName, ObjectToFind );
		}
		bool Succeeded() const
		{
			return !!Object;
		}

		virtual void AddReferencedObjects( FReferenceCollector& Collector ) override
		{
			Collector.AddReferencedObject(Object);
		}

		virtual FString GetReferencerName() const override
		{
			return TEXT("FObjectFinder");
		}
	};
    ...
```

### ACharacter::GetMesh
- Returns Mesh subobject

```cpp
USkeletalMeshComponent * GetMesh() const
```

### EAnimationMode
- SetAnimationMode 에 인자로 들어가는 값. 

```cpp
namespace EAnimationMode
{
    enum Type
    {
        AnimationBlueprint, // 애니메이션 블루프린트
        AnimationSingleNode, // 단일 애니메이션
        AnimationCustomMode, // 사용자 지정 유형이며 AnimInstance를 그대로 유지함?
    }
}
```

### USkeletalMeshComponent::SetAnimationMode
- 블루프린트 모드가 아닌 애니메이션 모드일 때 애니메이션을 컨트롤 (하는 인터페이스?)

```cpp
void SetAnimationMode
(
    EAnimationMode::Type InAnimationMode
)
```

### bUsePawnControlRotation
- If this component is placed on a pawn, should it use the view/control rotation of the pawn where possible? When disabled, the component will revert to using the stored RelativeRotation of the component.

```cpp
uint32 bUsePawnControlRotation: 1
```

## line trace

### UWorld::LineTraceSingleByChannel
- Trace a ray against the world using a specific channel and return the first blocking hit
- #include "Engine/World.h"
- hit 하면 true 반환
- 결과는 FHitResult 로 받으면 된다.
- FHitResult의 멤버 변수 Actor를 약포인터로 선언해서 미 참조시 가비지 컬렉터에 의해 자동으로 제거 되게 했다.
- 약 포인터로 지정된 액터에 접근하기 전에 IsValid 함수로 액터가 유효한지 먼저 파악해야 한다.

```cpp
bool LineTraceSingleByChannel
(
    struct FHitResult & OutHit,
    const FVector & Start,
    const FVector & End,
    ECollisionChannel TraceChannel,
    const FCollisionQueryParams & Params,
    const FCollisionResponseParams & ResponseParam
) const
```
- OutHit
	- First blocking hit found
- Start
	-	Start location of the ray
- End
	-	End location of the ray
- TraceChannel
	-	The 'channel' that this ray is in, used to determine which components to hit
- Params
	- 	Additional parameters used for the trace
- ResponseParam
	-	ResponseContainer to be used for this trace

### DrawDebugLine
```cpp
void DrawDebugLine(
	const UWorld* InWorld, 
	FVector const& LineStart, 
	FVector const& LineEnd, 
	FColor const& Color,
	bool bPersistentLines = false, 
	float LifeTime=-1.f, 
	uint8 DepthPriority = 0, 
	float Thickness = 0.f
);
```


# enhanced input

- debug commands
    - 'showdebug enhancedinput'


# Animation Blueprint

