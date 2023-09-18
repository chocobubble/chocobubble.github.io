---
title:  "character stat 클래스"
excerpt: "character stat"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - stat

toc: true
toc_sticky: true

use_math: true

date: 2023-07-05
last_modified_at: 2023-07-05
---
> 개인 프로젝트의 스탯 클래스 관련 내용입니다.  
> Copyright Epic Games, Inc. All Rights Reserved.
---

# 
- ActorComponent를 부모 클래스로 하는 스탯 관리를 할 클래스



### virtual void InitializeComponent() override;
- 액터의 PostInitializeComponents에 대응하는 컴포넌트의 함수
- 사용하려면 생성자에서 bWantsInitializeComponent 값을 true로 설정해주어야 함