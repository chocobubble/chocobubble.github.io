---
title:  "각종 에러들 해결 방법"
excerpt: "Unreal Project"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Error

toc: true
toc_sticky: true


date: 2023-08-01
last_modified_at: 2023-08-01
---
> 개인 프로젝트의 에러 해결과 관련된 내용입니다.  
---

# NewObject로 생성한 오브젝트에서 GetWorld() 가 nullptr 을 반환하는 에러
- UObject::GetWorld()는 Outer 의 GetWorld()를 불러오기 때문에,
- NewObject로 생성 시 Outer 파라미터를 지정해주지 않으면 nullptr을 반환한다.
- NewObject로 생성 시 Outer 파라미터를 설정해 주면 된다!

```cpp
class UWorld* UObject::GetWorld() const
{
	if (UObject* Outer = GetOuter())
	{
		return Outer->GetWorld();
	}

#if DO_CHECK
	if (IsInGameThread())
	{
		bGetWorldOverridden = false;
	}
#endif
	return nullptr;
}
```