---
title:  "각종 에러들 해결 방법"
excerpt: "Unreal Project"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Error

toc: true
toc_sticky: true


date: 2023-08-01
last_modified_at: 2023-08-02
---
> 개인 프로젝트의 에러 해결과 관련된 내용입니다.  
---

# NewObject로 생성한 오브젝트에서 GetWorld() 가 nullptr 을 반환하는 에러
- UObject::GetWorld()는 Outer 의 GetWorld()를 불러오기 때문에,
- NewObject로 생성 시 Outer 파라미터를 지정해주지 않으면 nullptr을 반환한다.
- NewObject로 생성 시 Outer 파라미터를 설정해 주면 된다!

```cpp
class UWorld* UObject::GetWorld() const
{
	if (UObject* Outer = GetOuter())
	{
		return Outer->GetWorld();
	}

#if DO_CHECK
	if (IsInGameThread())
	{
		bGetWorldOverridden = false;
	}
#endif
	return nullptr;
}
```

## 발생한 에러
- 인벤토리에 넣을 아이템을 UObject를 상속한 클래스로 만들었다. 
- 런타임 중에 아이템 생성하기 위해 NewObject를 파라미터 없이 사용하였다.
- 이후 아이템 스탯 설정을 위해 GameInstance를 GetWorld()를 이용하여 가져왔다.
- 여기서 에러가 발생했다.

```cpp
void ULSInventoryComponent::SetDefaultWeapon()
{
	ULSWeaponDefinition* WeaponDefinition1 = NewObject<ULSWeaponDefinition>();
	WeaponDefinition1->SetWeaponDefinitionData(EWeaponType::RIFLE, 3);
	...
}

void ULSWeaponDefinition::SetWeaponDefinitionData(EWeaponType WeaponTypeParam, int32 ItemLevel)
{
	...
	ULSGameInstance* LSGameInstance = Cast<ULSGameInstance>(UGameplayStatics::GetGameInstance(GetWorld()));	

	// error
	WeaponBaseData = LSGameInstance->GetLSWeaponData(WeaponItemLevel);
	....
}
```

## 해결 방법
- GetWorld()를 통해 실제 World를 가리킬 수 있도록 Outer 파라미터를 다음과 같이 설정해 주었다.

```cpp
void ULSInventoryComponent::SetDefaultWeapon()
{
	ULSWeaponDefinition* WeaponDefinition1 = NewObject<ULSWeaponDefinition>(this);
	...
}

```




# 
- CharacterStat 이 nullptr 인데 SetNewLevel(FinalLevel) 에 접근해서 다음 에러 발생.. 
	- Exception has occurred: W32/0xC0000005
	- Unhandled exception thrown: read access violation.
	- this was nullptr.

```cpp
void ALSMonster::SetCharacterState(ECharacterState NewState)
{	
	...
	CharacterStat->SetNewLevel(FinalLevel);
	...
}

void ULSCharacterStatComponent::SetNewLevel(int32 NewLevel)
{
	// Error happens.
	ULSGameInstance* LSGameInstance = Cast<ULSGameInstance>(UGameplayStatics::GetGameInstance(GetWorld()));
	...
}

```

# similarly
- ItemBox 가 nullptr 인데 GetWeaponItem 메서드에서 WeaponItem에 접근해 에러 발생
- nullptr 체크를 못해줬음..

```cpp
void ALSCharacter::Interact(const FInputActionValue& Value)
{
	...
	ALSItemBox* ItemBox = Cast<ALSItemBox>(HitResult.GetActor());
	//LSCHECK(ItemBox != nullptr);

	WeaponDefinition = ItemBox->GetWeaponItem();
	...
}
...
ULSWeaponDefinition* ALSItemBox::GetWeaponItem()
{
	// Error
	LSCHECK(WeaponItem != nullptr, nullptr);
	return WeaponItem;
}
```





# 
- InventoryComponent의 WeaponList의 모든 원소가 nullptr인데
- EquipmentComponent의 WeaponInstanceList에는 제대로 인스턴스화 된 객체 원소 둘이 들어가 있었다.

- 아래 코드와 비슷한 현상 같음
```cpp
int* somefunc() {
    int a = 9;
    int* aptr = &a;
	int* bptr = aptr;
    cout<<"bptr : "<< bptr << endl;
    cout <<"*bptr  : " << *bptr <<endl;
    cout<<"aptr : "<< aptr << endl;
    cout<<"*aptr : " << *aptr << endl;
    return aptr;
}

int main() {
    int* bptr = somefunc();
    cout<<"bptr : "<< bptr << endl;
    cout <<"*bptr  : " << *bptr <<endl;
    return 0;
}
/*
bptr : 0x61fdcc
*bptr  : 9
aptr : 0x61fdcc
*aptr : 9
bptr : 0x61fdcc
*bptr  : 0
*/
```





```cpp
void ULSInventoryComponent::SetDefaultWeapon()
{
	TObjectPtr<ULSWeaponDefinition> WeaponDefinition1 = NewObject<ULSWeaponDefinition>(this);
	WeaponDefinition1->SetWeaponDefinitionData(EWeaponType::RIFLE, 3);
	ALSWeaponInstance* WeaponInstance1 = WeaponDefinition1->InstantiateWeapon();
	LSCHECK(EquipmentManager != nullptr);
	EquipmentManager->EquipWeapon(WeaponInstance1);
	AddWeaponToInventory(WeaponDefinition1);
}
void ULSInventoryComponent::AddWeaponToInventory(TObjectPtr<ULSWeaponDefinition> WeaponDefinition)
{
	LSCHECK(WeaponDefinition != nullptr);
	if(CurrentInventoryCapacity == MaxInventoryCapacity)
	{
		LSLOG(Warning, TEXT("Inventory is Full"));
		return;
	}
	else
	{
		LSLOG(Warning, TEXT("Inventory is not Full"));
	}
	int32 num = 0;
	for(TObjectPtr<ULSWeaponDefinition> Weapon : WeaponList)
	{
		if(Weapon == nullptr)
		{
			LSLOG(Warning, TEXT("loop %d times"), num);
			Weapon = WeaponDefinition;
			LSCHECK(Weapon != nullptr);
			CurrentInventoryCapacity += 1;
			LSLOG(Warning, TEXT("Adding Weapon to Weapon List in Inventory success"));
			break;
		}
		num++;
	}
}
```


# GetMesh()->GetAnimInstance() nullptr 에러
- GetMesh()->GetAnimInstance() 전에 GetMesh()->SetSkeletalMesh()를 해주지 않아서 nullptr을 반환하는 것 같다.
- 자세한건 더 알아보자.\


# bind error
- 델리게이트에 bind 에러 발생 시 UFUNCITON() 을 빼먹진 않았는 지 확인하기