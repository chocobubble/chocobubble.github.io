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



# enhanced input

- debug commands
    - 'showdebug enhancedinput'