---
title:  "애니메이션 시스템의 설계"
excerpt: "Unreal Engine Ch.7"
excerpt_separator: "<!--more-->"
categories:
  - Unreal
tags:
  - Unreal
  - Animation

toc: true
toc_sticky: true

use_math: true

date: 2023-06-11
last_modified_at: 2023-06-11
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