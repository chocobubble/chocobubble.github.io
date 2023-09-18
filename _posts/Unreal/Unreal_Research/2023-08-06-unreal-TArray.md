---
title:  "[언리얼 엔진] Container"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - TArray

toc: true
toc_sticky: true

date: 2023-08-06
last_modified_at: 2023-08-06
---

> 언리얼의 Container 관련 내용을 정리하였습니다.

---

# TArray
- 다음과 같이 정의한다.
```cpp
TArray<int32> IntArray;
```

- 다음과 같이 TArray를 채울 수 있다.
```cpp
IntArray.Init(10, 5);
// IntArray == [10,10,10,10,10]
```