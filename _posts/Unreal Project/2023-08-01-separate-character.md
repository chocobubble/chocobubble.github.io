---
title:  "character 클래스 분리"
excerpt: "Unreal Project"
excerpt_separator: "<!--more-->"
categories:
  - project
tags:
  - Unreal
  - Project
  - Character

toc: true
toc_sticky: true

date: 2023-08-01
last_modified_at: 2023-08-01
---
> 개인 프로젝트의 캐릭터와 관련된 내용입니다.  
---

# 개요
- character 클래스 하나로 플레이어와, 몬스터의 요소를 같이 구현하다보니 클래스 안의 내용이 방대해져 유지보수가 어려워져,
- character 클래스를 부모로 하는 player, monster 자식 클래스들로 분리해 character 클래스의 사이즈를 줄이려고 했습니다.

# 과정
- 분리 시도 전 character 클래스입니다.
- 내용이 길어 헤더파일만 실었습니다.

```cpp
...
DECLARE_MULTICAST_DELEGATE(FOnAttackEndDelegate);

UCLASS()
class LOOTERSHOOTER_API ALSCharacter : public ACharacter
{
	GENERATED_BODY()

public:
	// Sets default values for this character's properties
	ALSCharacter();

	void SetCharacterState(ECharacterState NewState);
	ECharacterState GetCharacterState() const;

	int32 GetExp() const;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input")
	UInputMappingContext* InputMapping;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* MoveAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* JumpAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* LookAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* ShootAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* MeleeAttackAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* AutoRunAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* AimAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* GrapplingHookAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* ReloadAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* EquipFirstWeaponAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* EquipSecondWeaponAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* EquipThirdWeaponAction;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Enhanced Input", meta = (AllowPrivateAccess = "true"))
	UInputAction* InteractAction;

	UPROPERTY()
	ULSAnimInstance* LSAnim;

	UPROPERTY(VisibleInstanceOnly, BlueprintReadOnly, Category = Attack, meta = (AllowPrivateAccess = "true"))
	float AttackRange;

	UPROPERTY(VisibleInstanceOnly, BlueprintReadOnly, Category = Interact, meta = (AllowPrivateAccess = "true"))
	float InteractRange = 800.0f;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	virtual void PostInitializeComponents() override;
	virtual void PossessedBy(AController* NewController) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	UPROPERTY(VisibleAnywhere, Category = Weapon)
	USkeletalMeshComponent* RifleWeapon;

	// #include "GameFramework/SpringArmComponent.h"
	UPROPERTY(VisibleAnywhere, Category = Camera)
	USpringArmComponent* SpringArm;

	// #include "Camera/CameraComponent.h"
	UPROPERTY(VisibleAnywhere, Category = Camera)
	UCameraComponent* Camera;

	UPROPERTY(VisibleAnywhere, Category = Resource)
	ULSResourceManageComponent* ResourceManager;

	UPROPERTY(VisibleAnywhere, Category = Defense)
	ULSDefenseComponent* DefenseManager;

	UPROPERTY(VisibleAnywhere, Category = UI)
	UWidgetComponent* HPBarWidget;

	UPROPERTY(VisibleAnywhere, Category = Equipment)
	ULSEquipmentComponent* EquipmentManager;

	UPROPERTY(VisibleAnywhere, Category = Inventory)
	ULSInventoryComponent* InventoryManager;

	UPROPERTY()
	ULSGameInstance* LSGameInstance;

	virtual float TakeDamage(float DamageAmount, FDamageEvent const & DamageEvent, AController * EventInstigator, AActor * DamageCauser);

	bool CanSetWeapon();
	void SetWeapon(ALSWeaponInstance* NewWeapon);

	UPROPERTY(VisibleAnywhere, Category=Weapon)
	ALSWeaponInstance* CurrentWeapon;

	UPROPERTY(VisibleAnywhere, Category = Stat)
	class ULSCharacterStatComponent* CharacterStat;

	void Attack();

	UFUNCTION()
	void OnAttackMontageEnded(UAnimMontage* Montage, bool bInterrupted);


	bool CanShoot(EAmmoType AmmoType);

	FOnAttackEndDelegate OnAttackEnd;

	float GetFinalAttackRange() const;
	float GetFinalAttackDamage() const;
	float GetFinalInteractRange() const;

private:
	void JumpAct(const FInputActionValue& Value);
	void Move(const FInputActionValue& Value);
	void Look(const FInputActionValue& Value);
	void Shoot(const FInputActionValue& Value);
	void MeleeAttack(const FInputActionValue& Value);
	void OnRunning(const FInputActionValue& Value);
	void EndRunning(const FInputActionValue& Value);
	void OnAiming(const FInputActionValue& Value);
	void EndAiming(const FInputActionValue& Value);
	void GrapplingHook(const FInputActionValue& Value);
	void Reload(const FInputActionValue& Value);
	void EquipFirstWeapon(const FInputActionValue& Value);
	void EquipSecondWeapon(const FInputActionValue& Value);
	void EquipThirdWeapon(const FInputActionValue& Value);
	
	void Interact(const FInputActionValue& Value);

	void AttackCheck();

	void InteractCheck();

	void OnAssetLoadCompleted();

	void DropItem();

	void SetCharacterStateDead();

	// debug line
	void ShowDebugLine(FVector Dir);

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Attack, meta = (AllowPrivateAccess = "true"))
	bool bIsAttacking;

	FSoftObjectPath CharacterAssetToLoad = FSoftObjectPath(nullptr);
	TSharedPtr<struct FStreamableHandle> AssetStreamingHandle;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	ECharacterState CurrentState;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	bool bIsPlayer;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	bool bIsReloading = false;


	UPROPERTY()
	ALSAIController* LSAIController;

	UPROPERTY()
	ALSPlayerController* LSPlayerController;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float DeadTimer;

	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float TestTimer = 0.1f;

	FTimerHandle DeadTimerHandle = { };
	FTimerHandle ReloadTimerHandle = { };

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float ArmLengthTo = 0.0f;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float ArmLengthOnAiming = 200.0f;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float ArmLengthOnIdle = 450.0f;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	float ArmLengthChangingSpeed = 3.0f;

	UPROPERTY(Transient, VisibleInstanceOnly, BlueprintReadOnly, Category = State, meta = (AllowPrivateAccess = "true"))
	FVector ToAimDirection;
};
```

- 분리를 위해, player와 monster의 공통부분은 character 클래스에 유지하고,
- 각각의 고유 속성은 각각의 클래스로 구현하려 했습니다.

## 공통 부분
- TakeDamage

## Player 부분
- Input 관련
- State
- player stat
- Camera

## Monster 부분
- State
- Monster Stat


# 검토 결과
- 공통부분은 거의 미미하고 있더라도 player와 monster에 차이를 두어야 하는 부분이 포함되는 경우가 많았기 때문에
- 완전히 분리하여 구현하기로 결정했습니다.