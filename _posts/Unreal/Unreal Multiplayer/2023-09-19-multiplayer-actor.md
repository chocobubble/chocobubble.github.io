---
title:  "[Unreal] 멀티플레이어 액터"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Multiplayer
tags:
  - Unreal
  - Multiplayer

toc: true
toc_sticky: true

use_math: true

date: 2023-09-19
last_modified_at: 2023-09-19
---

# 권한에 따른 구분
- 서버에서의 역할은 ENetRole::ROLE_Authority 이다.
- 이를 이용해 서버에서만 작동하게 하는 코드를 구현할 수 있다.

```cpp
if(GetLocalRole() == ENetRole::ROLE_Authority()) 
{
	//...
}
```

- 혹은 HasAuthority() 로 대신할 수 있다.
- replicate 할 수 있게 설정하려면
	- bReplicates = true;


# 서버에서 하면 좋은 것들
## 충돌
- 상호작용 같은 충돌은 서버에서 제어하고 클라에서 하지 않게 구현하면 좋다.


# Replicate
## Replicate Variables
- 포인터 등의 변수가 replicate 된다는 의미는 서버에서 변수가 변경될 때 모든 클라이언트에서도 변경된다는 의미이다.
- replication은 변수가 변할 때만 작동한다.
### 사용법
- 원하는 변수에 UPROPERTY(Replicated) 매크로를 붙여준다.
- GetLiftimeReplicatedProps() 함수를 이용하고,
- DOREPLIFETIME 매크로를 이용해 설정한다.

### 조건식 property replication
- 프로퍼티가 일단 replication 등록되면 해제할 수 없다.
- 조건을 넣고 싶다면 DOREPLIFETIME_CONDITION을 사용한다.
- 예시  
```cpp
void AActor::GetLifetimeReplicatedProps( TArray< FLifetimeProperty > & OutLifetimeProps ) const
{
    DOREPLIFETIME_CONDITION( AActor, ReplicatedMovement, COND_SimulatedOnly);
}
```

- 위의 예시의 경우 액터의 시뮬레이션 사본이 있는 클라이언트에만 replicate 된다. 

## REP NOtices
- 메서드를 Replicate할 때 쓴다.
- UFUNCTION()을 이용하고,
- 함수명 앞에 OnRep_을 붙인다.
- 그리고 이 함수에 의해 변하는 replicate 된 변수에
	- ```UPROPERTY(Replicated)``` 를 ```UPROPERTY(ReplicatedUsing = OnRep_함수이름)``` 로 바꿔준다
- rep notify는 서버에서 호출되지 않는다.

## 로컬만
- 하고 싶다면
- if(IsLocallyControlled()) 를 이용해 준다.


# Actor attach
- 장비 습득 같은 로직도 서버에서 관리하게 해주면 좋다.
- USkeletalMeshSocket -> AttachActor(AActor, Mesh)
- AActor -> SetOwner(OwnerActor)
## component
- component 를 replicate 해주고 싶다면
	- component->SetIsReplicated(true)


# RPC
- remote procedure call
- 한 머신에서 호출되고 다른 머신에서 실행되는 호출
- 클라에서 호출하면 서버에서 동작하게 해주는 느낌

## 사용법
- RPC 메서드는 UFUNCTION(Server, Reliable) 등의 매크로를 붙여주면 됨.
- cpp file에서 메서드 이름 뒤에 _Implementation 붙여주어야 함
- 이 함수는 서버에서만 호출되는 함수가 되므로, 서버인지 확인하는 작업은 생략해도 된다.
- 클라가 호출하는 코드는 뒤에 _Implementation 붙은 메서드가 아닌 원래의 메서드를 적어주면 된다.
	- 그럼 RPC를 보냄


## reliable vs unreliable
- reliable
	- 서버가 RPC를 받지 못하면 RPC를 다시 보낸다.
- unreliable
	- 다시 보내지 않음

## 기타
- 언리얼에서 RPC 메서드의 매크로를 Server로 설정해두었을 때 클라, 서버 누가 보내던 Server에서 실행된다.
	- 따라서 이 메서드에서 굳이 서버인지 확인하는 코드를 넣지 않아도 됨

# 기타
- SetOwner()
	- AActor에서 replicate 되어 있다.
- bIsCrouched 도 replicated 되어 있다
- OnRep_IsCrouced() 도 선언되어 있음

