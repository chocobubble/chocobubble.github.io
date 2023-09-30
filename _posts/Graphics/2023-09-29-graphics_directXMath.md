---
title:  "[Graphics] DirectX 개요"
excerpt: "DirectX"
excerpt_separator: "<!--more-->"
categories:
  - Graphics
tags:
  - Graphics
  - DirectX

toc: true
toc_sticky: true

use_math: true

date: 2023-09-29
last_modified_at: 2023-09-29
---

# 개요

# COM
- Component Object Model
- ComPtr은 COM 에서 사용하는 스마트 포인터

## ComPtr 생성법
- c++과는 다름
- ```Microsoft::WRL::ComPtr<ID3D11Device> device```
- D3D11CreateDevice(.) 로 오브젝트 생성
- 포인터 복사는 ```device.As(&포인터명)```
- 포인터 get은 ```m_device.Get()```
- release 는 ```m_device.Reset()```
    - nullptr 대입보다는 위를 사용하기.
- 이중포인터 get은 ```.GetAddressOf()```


# D3D
- 외부 하드웨어, 네트워크 등 초기화 시에는 잘 초기화 되었는 지 꼭 확인해 주어야 한다.

# hlsl
- high-level shader language의 약자
- 대체로 c언어와 비슷하다
- float4 는 x,y,z,w 혹은 r,g,b,a로 접근할 수 있다
  - xy, rg 등으로 여러 변수를 묶어서 반환도 가능(swizzling)
- ```: POSITION``` 등은 semantics 

# register
## parameters
- b 
  - constant buffer
- t
  - texture and  texture buffer
- c
  - buffer offset
- s
  - sampler
- u
  - unordered access view

# 에러들
- inputelement의 문자열 오타안내게 주의하기