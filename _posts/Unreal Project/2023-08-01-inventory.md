---
title:  "Inventory 구현"
excerpt: "Unreal Project"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Inventory

toc: true
toc_sticky: true

date: 2023-08-01
last_modified_at: 2023-08-09
---
> 개인 프로젝트의 인벤토리와 관련된 내용입니다.  
---

# 개요
- 인벤토리는 플레이어가 소지한 무기, 장신구, 모듈들을 관리합니다.
- Inventory Component 클래스를 구현하여 플레이어에 부착했습니다.
- 성능 향상을 위해 인벤토리 속 아이템들은 실제 액터로 구현하지 않고, 데이터만 보관한 클래스로 구현했습니다.
- 인벤토리 속 아이템을 실제 장착할 시에 액터 인스턴스를 생성하여 Equipment Component에서 관리하게 했고,
- 인벤토리 속 아이템의 데이터는 변하지 않게 했습니다.


# 성능 향상을 위해 구현한 점
- 인벤토리 속 아이템들은 실제 액터로 구현하지 않고, 데이터만 보관한 클래스로 구현했습니다.

# UML
![image](https://github.com/chocobubble/Test/assets/100405650/77df4ade-effd-4206-b128-b60b748aaf6f)