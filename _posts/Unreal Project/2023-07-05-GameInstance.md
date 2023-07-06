---
title:  "LSGameInstance 클래스"
excerpt: "Game Instance"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Game Instance

toc: true
toc_sticky: true

use_math: true

date: 2023-07-05
last_modified_at: 2023-07-05
---
> 개인 프로젝트의 게임 인스턴스 관련 내용입니다.  
> Copyright Epic Games, Inc. All Rights Reserved.
---

#
- GameInstance 를 부모 클래스로 하는 LSGameInstance를 생성한다.
- 프로젝트세팅의 맵&모드에서 인스턴스를 바꿔준다.

ULSGameInstance::ULSGameInstance()
{
    FString CharacterDataPath = TEXT("/Script/Engine.DataTable'/Game/Book/GameData/LSCharacterData.LSCharacterData'");
    static ConstructorHelpers::FObjectFinder<UDataTable> DT_LSCHARACTER(*CharacterDataPath);
    LSCHECK(DT_LSCHARACTER.Succeeded());
    LSCharacterTable = DT_LSCHARACTER.Object;
    LSCHECK(LSCharacterTable->GetRowMap().Num() > 0)
}

void ULSGameInstance::Init()
{
    Super::Init();
    
}

FLSCharacterData* ULSGameInstance::GetLSCharacterData(int32 Level)
{
    return LSCharacterTable->FindRow<FLSCharacterData>(*FString::FromInt(Level), TEXT(""));
}