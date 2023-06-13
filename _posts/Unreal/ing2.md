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

