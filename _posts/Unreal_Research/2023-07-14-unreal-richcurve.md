- Unreal Engine의 FRichCurve는 곡선의 모양을 표현하는 데 사용되는 데이터 구조입니다. FRichCurve는 곡선의 시작점, 끝점, 그리고 그 사이의 컨트롤 포인트로 구성됩니다. FRichCurve는 곡선의 모양을 조절하기 위해 다양한 함수를 제공합니다. 예를 들어, FRichCurve::AddKey 함수를 사용하여 곡선에 새로운 컨트롤 포인트를 추가할 수 있습니다. FRichCurve::RemoveKey 함수를 사용하여 곡선에서 컨트롤 포인트를 제거할 수 있습니다. FRichCurve::SetKey 함수를 사용하여 곡선의 특정 컨트롤 포인트의 값을 변경할 수 있습니다.


FRichCurve의 시작점과 끝점은 다음과 같이 정해집니다.

시작점은 곡선의 첫 번째 컨트롤 포인트입니다.
끝점은 곡선의 마지막 컨트롤 포인트입니다.
FRichCurve는 곡선의 시작점과 끝점을 사용하여 곡선의 모양을 표현합니다. 곡선의 시작점과 끝점은 곡선의 컨트롤 포인트의 위치와 값을 사용하여 결정됩니다.

FRichCurve의 시작점과 끝점은 곡선의 모양을 조절하는 데 중요한 역할을 합니다. 곡선의 시작점과 끝점을 조정하여 곡선의 모양을 부드럽게 만들거나, 곡선의 모양을 뾰족하게 만들 수 있습니다.




- linear interpolation
    - 선형 보간..




    UENUM(BlueprintType)
enum ERichCurveInterpMode : int
{
	/** Use linear interpolation between values. */
	RCIM_Linear UMETA(DisplayName = "Linear"),
	/** Use a constant value. Represents stepped values. */
	RCIM_Constant UMETA(DisplayName = "Constant"),
	/** Cubic interpolation. See TangentMode for different cubic interpolation options. */
	RCIM_Cubic UMETA(DisplayName = "Cubic"),
	/** No interpolation. */
	RCIM_None UMETA(Hidden)
};


UENUM(BlueprintType)
enum ERichCurveTangentMode : int
{
	/** Automatically calculates tangents to create smooth curves between values. */
	RCTM_Auto UMETA(DisplayName="Auto"),
	/** User specifies the tangent as a unified tangent where the two tangents are locked to each other, presenting a consistent curve before and after. */
	RCTM_User UMETA(DisplayName="User"),
	/** User specifies the tangent as two separate broken tangents on each side of the key which can allow a sharp change in evaluation before or after. */
	RCTM_Break UMETA(DisplayName="Break"),
	/** No tangents. */
	RCTM_None UMETA(Hidden)
};

### FMath::GetMappedRangeValueClamped
- For the given Value clamped to the [Input:Range] inclusive, returns the corresponding percentage in [Output:Range] Inclusive.

```cpp
static float GetMappedRangeValueClamped
(
    const FVector2D & InputRange,
    const FVector2D & OutputRange,
    const float Value
)
```