ULyraGameplayAbility_Jump::ULyraGameplayAbility_Jump(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)


### FRichCurve::AddKey
- Add a new key to the curve with the supplied Time and Value. Returns the handle of the new key.

```cpp
virtual FKeyHandle AddKey
(
    float InTime,
    float InValue,
	// When true, the value will be treated like a rotation value in degrees, and will automatically be unwound to prevent flipping 360 degrees from the previous key
    const bool bUnwindRotation,
	// Optionally can specify what handle this new key should have, otherwise, it'll make a new one
    FKeyHandle KeyHandle
)
```

### FRichCurve::Eval
- Evaluate this rich curve at the specified time

```cpp
virtual float Eval
(
    float InTime,
    float InDefaultValue
) const
```
### FMath::IsNearlyEqual
- Checks if two floating point numbers are nearly equal.
- returns true if A and B are nearly equal

```cpp
static bool IsNearlyEqual
(
    float A,
    float B,
    // Maximum allowed difference for considering them as 'nearly equal'
    float ErrorTolerance
)
```