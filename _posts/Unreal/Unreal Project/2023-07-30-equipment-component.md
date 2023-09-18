---
title:  "장착 무기 관리"
excerpt: "Unreal Project"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Equipment

toc: true
toc_sticky: true

use_math: true

date: 2023-07-30
last_modified_at: 2023-07-30
---
> 개인 프로젝트의 장착한 무기들 관리와 관련된 내용입니다.  
---

# 개요
- 캐릭터가 장착한 무기들은 캐릭터에 부착된 LSEquipmentComponent를 통해 관리됩니다.
- 인벤토리에서 장착 혹은 무기 습득 시 무기는 LSWeaponInstance 액터로 생성되어 캐릭터에 부착됩니다.
- 장착 해제 시 무기 액터는 파괴됩니다.
- 캐릭터 생성 시 장착한 무기가 없는 경우 default 무기 액터를 하나 생성하여 장착해 줍니다.
  - 생성자에서 구현?