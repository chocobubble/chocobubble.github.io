---
title:  "[Graphics] 수학"
excerpt: "DirectX"
excerpt_separator: "<!--more-->"
categories:
  - Graphics
tags:
  - Graphics
  - Math

toc: true
toc_sticky: true

use_math: true

date: 2023-09-23
last_modified_at: 2023-09-23
---

# 벡터
- 

## dot product(scalar product)
- 점곱, 내적 이라고도 부름.
- 결과가 scalar로 나옴

### 결과의 의미
- a(1, 2), b(3, 4) 가 있을 때
	- 1 * 3 + 2 * 4 = 11
- 

## cross product(vector product)
- 외적,
- 결과가 vector로 나옴


## 평면의 normal vector 회전
- 물체를 회전시킬 때는 평면의 normal vector도 같이 회전 시켜 주어야 한다.
- scaling이 포함되어 있는 경우 normal vector도 똑같이 scaling하면 원하는 normal vector로 변환되지 않음.
  - 회전행렬의 inverse의 transpose를 곱해주면 됨