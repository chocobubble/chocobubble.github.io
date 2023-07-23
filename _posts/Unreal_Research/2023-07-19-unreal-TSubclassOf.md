---
title:  "[언리얼 엔진] TSubclassOf vs UClass"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - TSubclassOf

toc: true
toc_sticky: true

use_math: true

date: 2023-07-19
last_modified_at: 2023-07-19
---

> https://docs.unrealengine.com/5.0/ko/typed-object-pointer-properties-in-unreal-engine/

---

# TSubclassOf
- UClass 유형의 안전성을 보장해 주는 템플릿 클래스.
- 특정 클래스의 파생 클래스만 선택되도록 제한한다.
- 비호환 TSubclassOf 유형을 서로 할당하려고 하면, 컴파일 오류가 발생한다.
- UClass 를 할당하려는 경우 실행시간에 검증하며, 실패할 경우 nullptr

```cpp
UPROPERTY(EditDefaultsOnly, Category=Damage)
UClass* DamageType; // 에디터에서 아무 UClass나 선택 가능

UPROPERTY(EditDefaultsOnly, Category=Damage)
TSubclassOf<UDamageType> DamageType; // UDamageType 파생 클래스만 선택 가능

UClass* ClassA = UDamageType::StaticClass();

TSubclassOf<UDamageType> ClassB;

ClassB = ClassA; // Performs a runtime check

TSubclassOf<UDamageType_Lava> ClassC;

ClassB = ClassC; // Performs a compile time check

```