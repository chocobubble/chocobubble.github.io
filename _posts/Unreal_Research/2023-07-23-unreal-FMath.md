---
title:  "[언리얼 엔진] FMath"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - FMath

toc: true
toc_sticky: true

use_math: true

date: 2023-07-23
last_modified_at: 2023-07-23
---

> 언리얼의 FMath 클래스 중 필요한 부분을 정리하였다.

## FMath::FRandRange
- InMin, InMax 사이의 수 중 랜덤 숫자를 반환한다.
- InMin, InMax 포함.

```cpp
static float FRandRange
(
    float InMin,
    float InMax
)
```