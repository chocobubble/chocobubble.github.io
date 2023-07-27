---
title:  "[Unreal Engine] Transform"
excerpt: "Transform"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Transform
  - Rotator
  - Vector
  - Quaternion

toc: true
toc_sticky: true

use_math: true

date: 2023-07-16
last_modified_at: 2023-07-27
---
> 언리얼 공식 document 일부를 정리한 내용입니다.

---

# FVector
### FVector::Rotation
- FVector의 방향으로부터 FRotator를 구해 리턴
- yaw와 pitch를 설정한다. roll은 vector로 부터 구할 수 없으므로 0으로 설정.

```cpp
FRotator Rotation() const
```

# 언리얼 엔진의 회전
## FRotator
- 회전 정보를 보관하는 컨테이너이다.
- 모든 회전 값은 degrees 로 저장된다.
- struct 구조체 이다.

### 멤버 변수
- Pitch
	- y축 회전
- Yaw
	- z축 회전
- Roll
	- x축 회전

### 생성자
- FRotator(float InPitch, float InYaw, float InRoll)




## FQuat
- 3차원 공간에서 회전을 표현하는 부동 소수점 quaternion 이다.
- struct 구조체이다.
- 멤버 변수로 x, y, z, w 가 있으며 각 축을 나타낸다.
- quaternion 간의 결합은 오른쪽에서 왼쪽 순서이다. C = A * B 인 경우 B 먼저.

### 멤버 함수
- normalize()
	- 단위 quaternion으로 만듬.
