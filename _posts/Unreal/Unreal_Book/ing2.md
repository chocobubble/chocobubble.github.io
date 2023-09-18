## APawn::AddMovementInput
- Syntax

```cpp
virtual void AddMovementInput
(
    FVector WorldDirection,
    float ScaleValue,
    bool bForce
)
```

- WorldDirection에 ScaleValue 수치를 적용한 벡터 방향으로 폰을 움직인다.
- ScaleValue 값이 음수라면 반대 방향으로 폰을 움직인다.
- 움직임은 Tick함수에서 구현된다? Character와 DefaultPawn 같은 자식 클래스는 자동으로 입력값을 받아 움직인다

## FInputModeGameOnly
- FInputModeDataBase 는 다음 세 Input Mode structure들을 위한 추상 클래스이다.
    - FInputModeGameAndUI
        - UI가 사용자 입력에 응답할 수 있는 structure이며, 
        - UI가 이를 처리하지 않으면 플레이어 입력, 플레이어 컨트롤러가 응답함.
	- FInputModeGameOnly
        - 플레이어 입력, 플레이어 컨트롤러만 사용자 입력에 응답하는 structure
	- FInputModeUIOnly
        - UI만 사용자 입력에 응답하는 structure
- SetInputMode(param) 에 param으로 원하는 Input Mode structre를 넣어 적용한다.


## EAnimationMode
- SetAnimationMode 에 인자로 들어가는 값. 

```cpp
namespace EAnimationMode
{
    enum Type
    {
        AnimationBlueprint, // 애니메이션 블루프린트
        AnimationSingleNode, // 단일 애니메이션
        AnimationCustomMode, // 사용자 지정 유형이며 AnimInstance를 그대로 유지함?
    }
}
```

## USkeletalMeshComponent::SetAnimationMode
- 블루프린트 모드가 아닌 애니메이션 모드일 때 애니메이션을 컨트롤 (하는 인터페이스?)

```cpp
void SetAnimationMode
(
    EAnimationMode::Type InAnimationMode
)
```

## ConstructorHelpers::FClassFinder::Succeeded

```bool Succeeded()```


###	SpringArm->bUsePawnControlRotation = true;

USpringArmComponent->bUsePawnControlRotation ('폰 제어 회전 사용' 프로퍼티)
SpringArm 컴포넌트의 폰 제어 회전 사용 속성을 설정하면 컨트롤 회전에 따라 실시간으로 폰의 스프링암의 트랜스폼이 회전한다. SpringArm 컴포넌트는 폰과 카메라를 연결하기 때문에 카메라가 폰을 공전하듯이 거리를 유지하며 회전하는 것처럼 보인다. 피치/요/롤 각 방향에 대한 상속을 해제하면 해당 방향에 대한 카메라 회전이 제한된다.

UCameraComponent->bUsePawnControlRotation
위 SpringArm 컴포넌트의 속성과 같은 이름이지만 Camera 컴포넌트에 속했기 때문에 별개의 동작을 위한 속성이다. 기본적으로 폰이 SpringArm 컴포넌트를 가진다면 폰이 SpringArm 컴포넌트의 부모로, SpringArm이 Camera 컴포넌트의 부모로 설정된다.

따라서 카메라의 움직임은 스프링암에 종속되는데, 스프링암이 폰 제어 회전 사용 속성 설정이 되어있지 않다면 컨트롤 회전의 제어에서 벗어난 스프링암에 따라 카메라도 컨트롤 회전의 영향을 받지 않는다. 하지만 Camera 컴포넌트의 bUsePawnControlRotation 속성을 설정해주면 카메라가 스프링암의 제어에서 벗어나 컨트롤 회전의 영향을 받으면서 폰이 바라보는 방향으로 카메라를 회전시킨다.

###		SpringArm->bInheritPitch = true;

###		SpringArm->bInheritRoll = true;

###		SpringArm->bInheritYaw = true;


## FRotationMatrix

## GetCharacterMovement()

## FRotationMatrix::MakeFromX(DirectionToMove).Rotator()
- Builds a rotation matrix given only a XAxis. Y and Z are unspecified but will be orthonormal. XAxis need not be normalized.

```cpp
static FMatrix MakeFromX
(
    FVector const & XAxis
)
```


MakeFromX
```cpp
///////////// RotationMatrix.h

/** Builds a rotation matrix given only a XAxis. Y and Z are unspecified but will be orthonormal. XAxis need not be normalized. */
static CORE_API FMatrix MakeFromX(FVector const& XAxis);


///////////// UnrealMath.cpp

FMatrix FRotationMatrix::MakeFromX(FVector const& XAxis)
{
	FVector const NewX = XAxis.GetSafeNormal();

	// try to use up if possible
	FVector const UpVector = ( FMath::Abs(NewX.Z) < (1.f - KINDA_SMALL_NUMBER) ) ? FVector(0,0,1.f) : FVector(1.f,0,0);

	const FVector NewY = (UpVector ^ NewX).GetSafeNormal();
	const FVector NewZ = NewX ^ NewY;

	return FMatrix(NewX, NewY, NewZ, FVector::ZeroVector);
}
```
이 함수는 입력 파라미터 벡터를 X축으로 하여 새로운 기저를 구축하고, 그 기저로의 회전 행렬을 리턴한다. 
'^' 연산자는 cross product로 연산자 오버라이딩 되어 있다.

### FMath::FInterpTo
- Interpolate float from Current to Target. Scaled by distance to Target, so it has a strong start speed and ease out.

```cpp
template<typename T1, typename T2, typename T3, typename T4>
static auto FInterpTo
(
    T1 Current,
    T2 Target,
    T3 DeltaTime,
    T4 InterpSpeed
)
```

### FMath::RInterpTo
- Interpolate rotator from Current to Target. Scaled by distance to Target, so it has a strong start speed and ease out.

```cpp
static FRotator RInterpTo
(
    const FRotator & Current,
    const FRotator & Target,
    float DeltaTime,
    float InterpSpeed
)
```


# unreal -7

### Meta=(AllowPrivateAccess=true)
- 변수가 private으로 설정되어 있어도 에디터에서 보이게 해줌.

