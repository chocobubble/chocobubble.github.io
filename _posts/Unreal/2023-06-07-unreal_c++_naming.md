---
title:  "언리얼 코딩 표준 "
excerpt: "coding"
excerpt_separator: "<!--more-->"
categories:
  - ing
tags:
  - Unreal
  - code

toc: true
toc_sticky: true

date: 2023-06-07
last_modified_at: 2023-06-09
---

언리얼 엔진 코딩 표준 및 규칙 중 필요한 부분을 정리하였습니다.
{: .notice--info}

## 클래스 체계
- 퍼블릭 인터페이스에서 먼저 선언한 후 클래스의 프라이빗 구현을 한다.

## 저작권 고지
- 배포용으로 에픽에서 제공한 모든 소스 파일(.h, .cpp, .xaml, etc.)은 파일 첫 번째 줄에 저작권 고지를 포함해야 한다. 저작권 고지의 포맷은 다음과 정확히 일치해야 한다!!!  
```
// Copyright Epic Games, Inc. All Rights Reserved.
```
이 줄이 누락되거나 올바른 양식으로 작성되지 않을 경우 CIS에서 오류를 생성하고 실패한다.

## 명명 규칙

모든 코드 및 코멘트는 미국 영어의 철자법 및 문법을 사용해야 한다.
{: .notice--info}

- 각 단어의 첫 번째 글자(타입 이름 또는 변수 이름)는 대문자여야 하며, 일반적으로 단어 사이에는 언더스코어를 사용하지 않는다.
- 타입 이름에는 추가적으로 대문자로 이루어진 접두사를 포함하여 변수 이름과 구분한다. 
- 템플릿 클래스에는 접두사 T를 포함한다.
- ```UObject``` 에서 상속받는 클래스에는 접두사 U를 포함한다.
- ```AActor``` 에서 상속받는 클래스에는 접두사 A를 포함한다.
- ```SWidget``` 에서 상속받는 클래스에는 접두사 S를 포함한다.
- 추상적 인터페이스인 클래스에는 접두사 I를 포함한다.
- 에픽의 개념이 유사한 클래스 타입( ```TModels``` 타입 특성에 첫 번째 argument로 사용)에는 접두사 C를 포함한다.
- 열거형에는 접두사 E를 포함한다.
- 부울 변수는 접두사 b를 포함한다(예: ```bPendingDestruction``` 또는 ```bHasFadedIn``` ).
- 그 외 대부분의 클래스는 접두사 F를 포함한다. 그러나 일부 서브시스템은 다른 글자를 사용하기도 한다.
- Typedef의 경우 해당 타입에 적합한 접두사를 사용한다. 예를 들어 구조체의 typedef인 경우 F, ```UObject``` 의 typedef인 경우 U를 사용한다.
- 특정 템플릿 인스턴스화의 typedef는 더 이상 템플릿이 아니며, 다음과 같이 알맞은 접두사를 붙여야 한다.  
```
typedef TArray <FMytype> FArrayOfMyTypes;
```

- UnrealHeaderTool의 경우 대부분 올바른 접두사가 필요하므로, 접두사를 제공하는 것이 중요하다.
- 이러한 템플릿 파라미터를 기반으로 하는 타입 템플릿 파라미터 및 중첩된 타입 에일리어스는 타입 카테고리를 알 수 없으므로 상기 접두사 규칙의 대상이 아니다.
- 설명적인 용어 뒤에는 Type 접미사를 사용하는 것이 좋다.
- In 접두사를 사용하여 템플릿 파라미터를 에일리어스와 구분한다.  
```cpp
template <typename InElementType>
class TContainer
{
public:
    using ElementType = InElementType;
};
```

- 타입 및 변수 이름은 명사이다.
- 메서드 이름은 메서드의 이펙트를 설명하거나, 이펙트가 없는 메서드의 반환 값을 설명하는 동사이다.
- 매크로 이름은 모두 대문자로 구성되고, 단어가 언더스코어로 분리되며, 접두사 ```UE_``` 가 사용되어야 한다(네임스페이스 참조).

- 변수, 메서드, 클래스 이름은 명확하고 확실하며, 내용을 파악할 수 있어야 한다. 
- 이름의 범위가 넓을수록 올바르고 내용을 파악할 수 있는 이름을 사용해야 한다.

- 변수의 의미에 대한 코멘트를 제공할 수 있도록 모든 변수는 한 번에 하나씩 선언해야 한다. 변수 앞에 여러 줄 또는 한 줄의 코멘트를 사용할 수 있으며, 변수 그룹화를 위한 빈 줄은 선택사항이다.

- 부울을 반환하는 모든 함수는 ```IsVisible()``` 또는 ```ShouldClearBuffer()``` 등의 true/false 질문을 해야 한다.

- 프로시저(반환 값이 없는 함수)는 강한 동사 뒤에 오브젝트를 붙여 써야 한다. 메서드의 오브젝트가 그 안에 있는 오브젝트일 때는 예외이며, 이 경우 오브젝트는 컨텍스트에서 이해된다. 'Handle' 및 'Process' 등의 모호한 동사로 시작하는 이름은 피해야 한다.

- 필수 사항은 아니지만, 함수 파라미터가 참조로 전달된 후 함수가 그 값에 쓸 것으로 예상되는 경우 이름 앞에 접두사 'Out'을 추가할 것을 권장한다. 이렇게 하면 이 아규먼트에 전달되는 값이 함수로 대체된다는 것을 확실히 알 수 있다.

- In 또는 Out 파라미터도 부울인 경우 ```bOutResult``` 와 같이 In/Out 접두사 앞에 'b'를 붙인다.

- 값을 반환하는 함수는 어떤 값을 반환하는지 이름을 보고 정확히 알 수 있어야 한다. 

### 예시

```
float TeaWeight;
int32 TeaCount;
bool bDoesTeaStink;
FName TeaName;
FString TeaFriendlyName;
UClass* TeaClass;
USoundCue* TeaSound;
UTexture* TeaTexture;
```

## 포터블 C++ 코드
- ```bool``` - 부울 값(부울 크기 추정 금지). ```BOOL``` 은 컴파일되지 않다.
- ```TCHAR``` - character(문자) (TCHAR 크기 추정 금지)
- ```uint8``` - unsigned byte(부호 없는 바이트) (1바이트)
- ```int8``` - signed byte(부호 있는 바이트) (1바이트)
- ```uint16``` - unsigned 'shorts'(부호 없는 'short') (2바이트)
- ```int16``` - signed 'short'(부호 있는 'short')(2바이트)
- ```uint32``` - unsigned int(부호 없는 int) (4바이트)
- ```int32``` - signed int(부호 있는 int) (4바이트)
- ```uint64``` - unsigned 'quad word'(부호 없는 '쿼드 단어') (8바이트)
- ```int64``` - signed 'quad word'(부호 있는 '쿼드 단어') (8바이트)
- ```float``` - 단정밀도 부동 소수점(4바이트)
- ```double``` - 배정밀도 부동 소수점(8바이트)
- ```PTRINT``` - 포인터를 가질 수 있는 정수(PTRINT 크기 추정 금지)

- C++의 ```int``` 및 부호 없는 ```int``` 타입(플랫폼에 따라 크기가 변할 수 있으나 항상 최소 너비는 32비트로 보장됨)은 정수 너비가 중요치 않은 경우라면 코드에서 사용해도 괜찮다. 명시적으로 크기가 정해진 타입은 여전히 시리얼라이즈 또는 리플리케이트된 포맷으로 사용해야 한다.

## 표준 라이브러리 사용
- 동일한 API에서 UE 언어와 표준 라이브러리 언어를 혼합하여 사용하지 않도록 한다.

- ```<atomic>``` 
    - 새 코드로 사용해야 하며 터치 시 기존 코드는 이주해야 한다. Atomic은 지원되는 모든 플랫폼에서 완전히 효율적으로 구현되어야 한다. 에픽의 자체 ```TAtomic``` 은 부분적으로만 구현되며 에픽에서 이를 유지보수하고 개선할 예정이 없다.

- ```<type_traits>``` 
    - 레거시 UE 특성과 표준 특성 간에 겹치는 부분이 있는 경우 사용해야 한다. 특성은 종종 정확도를 위해 컴파일러 고유 속성으로 구현되며, 컴파일러는 표준 특성을 파악하여 이를 일반 C++로 처리하는 대신 보다 빠른 컴파일 경로를 선택할 수 있다. 한 가지 우려되는 사항은 UE 특성이 보통 ```Value``` static 또는 ```Type``` typedef를 갖는 반면, 표준 특성은 ```value``` 및 ```type``` 을 사용하게 되어 있다. 이는 중요한 차이점으로, 컴포지션 특성에 의해 특정 문법(예: ```std::conjunction``` )이 필요하기 때문이다. 에픽에서 추가하는 새 특성은 컴포지션을 지원하기 위해 소문자 ```value``` 또는 ```type``` 으로 작성되고, 기존 특성은 대/소문자를 모두 지원하도록 업데이트된다.

- ```<initializer_list>``` 
    - 중괄호로 묶인 이니셜라이저 문법을 지원하기 위해 사용되어야 한다. 이는 언어와 표준 라이브러리가 겹치는 경우에 해당되며, 이를 지원해야 할 경우 대안은 없다.

- ```<regex>``` 
    - 직접적으로 사용할 수도 있지만 에디터 전용 코드 내에 캡슐화해서 사용해야 한다. 자체 정규 표현식 솔루션을 구현할 계획은 없다.

- ```<limits>``` 
    - ```std::numeric_limits``` 를 온전히 사용할 수 있다.

- ```<cmath>``` 
    - 이 헤더의 모든 부동 소수점 함수를 사용할 수 있다.

- ```<cstring>``` 
    - ```memcpy()``` 및 ```memset()``` 는 명확한 퍼포먼스상의 이점이 있을 경우 각각 ```FMemory::Memcpy``` 및 ```FMemory::Memset``` 대신 사용할 수 있다.

- 표준 컨테이너와 스트링은 interop 코드를 제외하고는 사용하지 말아야 한다.


## 코멘트
코멘트는 소통에 매우 중요하다. 다음 섹션에서는 코멘트에 대해 몇 가지 유의할 점을 상세하게 설명한다(출처: Kernighan Pike의 The Practice of Programming).

### 가이드라인
- 코드 자체만으로도 뜻을 알 수 있도록 코드를 작성한다.

```
// 나쁜 예:
t = s + l - b;

// 좋은 예:
TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;
```
- 도움이 되는 코멘트를 작성한다.

```
// 나쁜 예:
// Leaves 증가
++Leaves;

// 좋은 예:
// 찻잎이 더 있다는 것을 알았다.
++Leaves;
```
- 나쁜 코드에는 코멘트를 다는 대신 다시 작성한다.

```
// 나쁜 예:
// 잎의 총 개수는
// 작은 잎과 큰 잎을 더한 것에서
// 둘 다인 것을 뺀 것이다.
t = s + l - b;

// 좋은 예:
TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;
```
- 모순된 코드를 작성하지 않다.

```
// 나쁜 예:
// Leaves는 절대 증가하지 않음!
++Leaves;

// 좋은 예:
// 찻잎이 더 있다는 것을 알았다.
++Leaves;
```

### Const 정확도
- Const는 문서이자 컴파일러 지시어(directive)이므로, 모든 코드는 const 정확도를 맞추어야 한다.

- pass-by-value 파라미터는 궁극적으로 컨테이너 안으로 이동하지만('이동 semantic' 참고) 이는 매우 드문 경우이다.

예시:
```
void FBlah::SetMemberArray(TArrayFString InNewArray)
{
    MemberArray = MoveTemp(InNewArray);
}
```

- 포인터가 가리키는 것이 아니라 포인터 자체를 const로 만들 때는 끝에 const 키워드를 넣다. 레퍼런스는 어떤 방식으로도 '재할당' 불가하며, 같은 방법으로 const로 만들 수 없다.

예시:
```
// const 포인터에서 const 이외 오브젝트 - 포인터로의 재할당은 불가하나, T는 여전히 수정 가능한다.
T* const Ptr = ...;

// 틀림
T& const Ref = ...;
```
- 복잡한 타입에 대한 이동 semantic이 제한되며 내장된 타입에는 컴파일 경고가 발생하므로 반환 타입에는 const를 사용하지 않는다. 이 규칙은 반환 타입 자체에만 적용되며, 포인터의 타깃 타입 또는 반환되는 레퍼런스에는 적용되지 않는다.

예시:
```
// 나쁜 예 - const 배열 반환
const TArray<FString> GetSomeArray();

// 좋은 예 - const 배열로의 레퍼런스 반환
const TArray<FString>& GetSomeArray();

// 좋은 예- const 배열로의 포인터 반환
const TArray<FString>* GetSomeArray();

// 나쁜 예 - const 배열로의 const 포인터 반환
const TArray<FString>* const GetSomeArray();
```

### 예시 포맷
- JavaDoc 기반 시스템을 사용하여 코드에서 코멘트를 자동으로 추출한 뒤 문서를 만들기 때문에, 특수한 코멘트 포맷 규칙 몇 가지를 따라야 한다.

- 다음 예시는 **클래스**, **메서드**, **변수** 코멘트의 포맷이다. 기억할 것은, 코멘트는 코드를 설명해야 한다는 것이다. 코드는 구현을 설명하고, 코멘트는 그 의도를 설명한다. 코드 한 줄의 의도를 바꾸더라도 반드시 코멘트를 업데이트해야 한다.

- 지원되는 파라미터 코멘트 스타일은 두 가지로, 아래 코드의 경우 ```Steep``` 과 ```Sweeten``` 메서드로 표시된다. ```Steep``` 이 사용하는 ```@param``` 스타일은 전형적인 여러 줄 스타일이지만, 단순 함수의 경우 Sweeten의 예시처럼 파라미터와 반환 값 문서를 함수에 대한 설명 코멘트로 통합하는 것이 보다 깔끔할 수 있다. ```@see``` 또는 ```@return``` 과 같은 특수 코멘트 태그는 주요 설명에 이어 새 줄을 시작할 때만 사용해야 한다.

- 메서드 코멘트는 딱 한 번, 메서드가 <u>퍼블릭으로 선언되는 곳</u>에 포함해야 한다. 메서드 코멘트는 호출자와 연관될 수 있는 메서드 오버라이드 관련 정보를 포함하여 메서드 호출자에 대한 정보만을 담아야 한다. 메서드 구현에 대한 세부 사항이나 호출자와 연관되지 않은 오버라이드는 메서드 구현 안에 코멘트를 달아야 한다.

```
/** 마실 수 있는 오브젝트에 대한 인터페이스이다. */
class IDrinkable
{
public:
    /**
     * 플레이어가 이 오브젝트를 마실 때 호출된다.
     * @param OutFocusMultiplier - 반환되면 마신 사람의 포커스에 적용할 배수를 포함한다.
     * @param OutThirstQuenchingFraction - 반환되면 마신 사람의 갈증이 해소되는 프랙션을 포함한다(0-1).
     * @warning 마실 것이 적절히 준비된 이후에만 호출하세요.     
     */
    virtual void Drink(float& OutFocusMultiplier, float& OutThirstQuenchingFraction) = 0;
};

/** 차 한 잔이다. */
class FTea : public IDrinkable
{
public:
    /**
     * 우려내는 데 사용한 물의 용량과 온도가 주어진 경우 차에 대한 델타-맛 값을 계산한다.
     * @param VolumeOfWater - 우려내는 데 사용한 물의 양(mL)이다.
     * @param TemperatureOfWater - 물의 온도(켈빈)이다.
     * @param OutNewPotency - 우리기가 시작된 이후의 차의 효능으로, 0.97에서 1.04까지이다.
     * @return - 차 농도의 변화를 분당 차 맛 단위(TTU)로 반환한다.
     */
    float Steep(
        const float VolumeOfWater,
        const float TemperatureOfWater,
        float OutNewPotency
    );

    /** 차에 감미료를 추가한다. 같은 당도를 내는 데 필요한 자당의 그램으로 측정한다. */
    void Sweeten(const float EquivalentGramsOfSucrose);

    /** 일본에서 판매되는 차의 가치(엔화 단위)이다. */
    float GetPrice() const
    {
        return Price;
    }

    virtual void Drink(float& OutFocusMultiplier, float& OutThirstQuenchingFraction) override;

private:
    /** 엔화 단위 가격이다. */
    float Price;

    /** 현재 당도로, 자당 그램 단위이다. */
    float Sweetness;
};

float FTea::Steep(const float VolumeOfWater, const float TemperatureOfWater, float& OutNewPotency)
{
    ...
}

void FTea::Sweeten(const float EquivalentGramsOfSucrose)
{
    ...
}

void FTea::Drink(float& OutFocusMultiplier, float& OutThirstQuenchingFraction)
{
    ...
}
```
- 클래스 코멘트에 포함되는 것은 다음과 같다.
    - 이 클래스가 해결하는 문제에 대한 설명
    - 이 클래스를 생성한 이유

- 이러한 여러 줄의 메서드 코멘트 부분이 뜻하는 바는 다음과 같다.  

- **함수의 목적:**
    -  ```이 함수가 해결하는 문제``` 를 설명한다. 위에서 설명한 것처럼 코멘트는 ```의도``` 를 설명하며, 코드는 ```구현``` 을 설명한다.

- **파라미터 코멘트:** 각 파라미터는 다음을 포함해야 한다.
    - 측정 단위
    - 예상되는 값 범위
    - '불가능한' 값
    - 상태/오류 코드의 의미

- **반환 코멘트:** 
    - 예상되는 반환 값을 출력 변수로만 문서화한다. 중복을 피하기 위해, 함수의 목적이 오로지 이 값을 반환하는 것이고 그 부분이 함수 목적에 명시화된 경우 명시적 @return 코멘트는 사용하지 말아야 한다.
- **추가 정보:** 
    - ```@warning``` , ```@note``` , ```@see``` , ```@deprecated``` 를 사용하여 관련된 추가 정보를 문서화할 수 있다. 각각은 나머지 코멘트에 이어 별도의 줄에 선언해야 한다.

## 최신 C++ 언어 문법
- 언리얼 엔진이 빌드 시 요구하는 최소 언어 버전은 C++17이다.

- 아래에 지원되는 최신 C++ 컴파일러 기능으로 명시된 것 이외의 컴파일러 전용 언어 기능에 대해서는, 프리프로세서 매크로나 조건문에 래핑한 경우가 아니라면 사용하지 말아야 하며, 래핑했다 하더라도 신중하게 사용해야 한다.

### static_assert
- 이 키워드는 컴파일 시간 어서트가 필요한 경우 사용할 수 있다.

### override 및 final
- 이 키워드들은 사용할 수 있을 뿐만 아니라, 사용을 강력히 권한다. 빠진 부분이 다수 있을 수 있으나, 서서히 수정될 예정이다.

### nullptr
- ```nullptr``` 은 모든 경우 C 스타일 ```NULL``` 매크로 대신 사용해야 한다.

### 'auto' 키워드
- 아래 몇 가지 예외를 제외하면 C++ 에서 ```auto``` 를 사용해서는 안 된다. 초기화하려는 타입은 항상 명시해 주어야 한다. 즉, 읽는 사람에게 타입이 명확하게 보여야 한다는 뜻이다. 

- 또한 C++17의 구조체 바인딩 기능도 실질적으로 variadic ```auto``` 이므로 사용해서는 안 된다.

- ```auto``` 를 사용해도 되는 경우는 다음과 같다.
    - 변수에 람다를 바인딩해야 하는 경우. 람다 타입은 코드로 표현할 수 없기 때문이다.
    - 이터레이터 변수의 경우. 단, 이터레이터 타입이 매우 장황하여 가독성에 악영향을 미치는 경우에 한한다.
    - 템플릿 코드에서 표현식의 타입을 쉽게 식별할 수 없는 경우. 고급 사용 사례이다.

- 코드를 읽는 사람에게 타입을 명확하게 알리는 것은 매우 중요하다. 

- ```auto``` 를 사용해도 괜찮다는 확신이 든다면, 항상 해당 타입에 const, &, *를 정확히 사용해야 한다. 그래야만 `auto` 를 통해 원하는 추론 타입을 이끌어낼 수 있다.

### 범위 기반 for
- 코드의 가독성과 유지보수성 향상에 도움이 되므로 사용을 추천한다. 기존 ```TMap``` 이터레이터를 사용하는 코드를 이주할 때는, 기존 이터레이터 타입 메서드였던 ```Key()``` 및 ```Value()``` 함수가 이제 단순히 내재된 키 값 ```TPair``` 의 ```Key``` 및 ```Value``` 필드가 되었음에 유의해야 한다.

예시:
```
TMap<FString, int32> MyMap;

// 기존 스타일
for (auto It = MyMap.CreateIterator(); It; ++It)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), It.Key(), *It.Value());
}

// 새 스타일
for (TPair<FString, int32> Kvp : MyMap)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), *Kvp.Key, Kvp.Value);
}
```

- 몇몇 독립형 이터레이터 타입에서 범위로 대체한 것도 있다.

예시:
```
// 기존 스타일
for (TFieldIterator<UProperty> PropertyIt(InStruct, EFieldIteratorFlags::IncludeSuper); PropertyIt; ++PropertyIt)
{
    UProperty* Property = *PropertyIt;
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property->GetName());
}

// 새 스타일
for (UProperty* Property : TFieldRange<UProperty>(InStruct, EFieldIteratorFlags::IncludeSuper))
{
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property->GetName());
}
```

### 람다 및 익명 함수   
- 람다는 자유롭게 사용할 수 있다. 람다를 최적으로 사용하려면 길이상 두 구문 정도가 되어야 한다. 특히 규모가 더 큰 표현식이나 구문의 일부로 사용될 때, 예를 들면 범용 알고리즘의 술부(predicate)에 사용될 때는 더욱 그렇다.

예시:
```
// 이름에 단어 'Hello'가 포함된 첫 번째 Thing을 검색한다.
Thing* HelloThing = ArrayOfThings.FindByPredicate([](const Thing& Th){ return Th.GetName().Contains(TEXT("Hello")); });

// 배열을 이름 역순으로 정렬한다.
Algo::Sort(ArrayOfThings, [](const Thing& Lhs, const Thing& Rhs){ return Lhs.GetName() > Rhs.GetName(); });
```
- 스테이트풀 람다는 자주 사용하는 경향이 있는 함수 포인터에 할당할 수 없다는 점에 유의

- 사소하지 않은 람다는 일반 함수와 같은 방식으로 문서화해야 한다. 코멘트를 몇 줄에 걸쳐 나눠 적어도 된다.

- 자동 캡처보다는 명시적(explicit) 캡처를 사용해야 한다(```[&]``` 및 ```[=]``` ). 대규모 람다와 지연(deferred) 실행에 사용되는 경우 가독성, 유지보수성, 퍼포먼스 측면에서 특히 중요하다. 작성자의 의도를 선언하므로 코드 리뷰 과정에서 실수를 더욱 쉽게 잡아낼 수 있다. 잘못된 캡처는 부정적인 결과를 낳을 수 있으며, 추후 코드 유지보수 과정에서 문제가 될 확률이 높다.
- 람다 실행이 지연된 경우 포인터 참조 캡처와 포인터 값 캡처가 때때로 허상 참조를 유발할 수 있다(```this``` 포인터 포함).
- 값 캡처는 지연되지 않은 람다에 불필요한 사본을 만드는 경우 퍼포먼스상의 우려가 발생할 수 있다.
- 잘못 캡처된 UObject 포인터는 가비지 컬렉터에 보이지 않다. ```[=]``` 가 람다에 모든 것의 별도 사본이 있다는 인상을 주기는 하지만, 자동 캡처는 멤버 변수가 참조된 경우 묵시적으로 ```this``` 를 캡처한다.

- 대규모 람다이거나 다른 함수 호출의 결과를 반환할 때는 명시적 반환 타입을 사용해야 한다. 다음과 같이 ```auto``` 키워드와 동일한 방식으로 고려해야 한다.

```
// 여기에는 반환 타입이 없어 반환 타입이 명확하지 않다.
auto Lambda = []() -> FMyType
{
    return SomeFunc();
}
```
- 지연되지 않은 사소한 람다는 Sort 호출처럼 semantic이 명확하므로 명시하더라도 장황해질 뿐이다. 이러한 경우 자동 캡처와 묵시적 반환 타입을 사용해도 된다.

- 다음과 같이 C++14의 캡처 이니셜라이저 기능을 사용할 수도 있다.

```
TUniquePtr<FThing> ThingPtr = MakeUnique<FThing>();
AsyncTask([UniquePtr = MoveTemp(UniquePtr)]()
{
    // 여기에 UniquePtr 사용
});
```

### 강 - 타입 Enum
- Enum 클래스는 항상 일반 열거형이든 ```UENUM``` 이든 기존 네임스페이스 열거형을 대체하여 사용해야 한다. 예를 들면 다음과 같다.

```
// 기존 열거형
UENUM()
namespace EThing
{
    enum Type
    {
        Thing1,
        Thing2
    };
}

// 새 열거형
UENUM()
enum class EThing : uint8
{
    Thing1,
    Thing2
}
```

- 이는 ```UPROPERTY``` 로도 지원되며, 기존 ```TEnumAsByte``` 우회법을 대체한다. 열거형 프로퍼티는 바이트뿐만 아니라 어떤 크기라도 될 수 있다.

```
// 기존 프로퍼티
UPROPERTY()
TEnumAsByte<EThing::Type> MyProperty;

// 새 프로퍼티
UPROPERTY()
EThing MyProperty;
```
- 그러나 블루프린트에 노출되는 열거형은 여전히 ```uint8``` 기반이어야 한다.

### 이동 semantic
- ```TArray``` , ```TMap``` , ```TSet``` , ```FString``` 과 같은 모든 주요 컨테이너 타입에는 move 컨스트럭터와 move 할당 연산자가 있다. 이러한 타입을 값으로 전달/반환할 때 종종 자동으로 사용되지만, ```std::move``` 의 UE 해당 버전인 ```MoveTemp``` 를 통해 명시적으로 호출 가능한다.

- 값으로 컨테이너나 스트링을 반환하는 것은 보통 임시로 복사하는 비용이 없어 표현성에 이득이 될 수 있다. 

### 디폴트 멤버 이니셜라이저
- 디폴트 멤버 이니셜라이저는 클래스 자체 내에서 클래스 디폴트값을 정의하는 데 사용할 수 있다.
```
UCLASS()
class UTeaOptions : public UObject
{
    GENERATED_BODY()

public:
    UPROPERTY()
    int32 MaximumNumberOfCupsPerDay = 10;

    UPROPERTY()
    float CupWidth = 11.5f;

    UPROPERTY()
    FString TeaType = TEXT("Earl Grey");

    UPROPERTY()
    EDrinkingStyle DrinkingStyle = EDrinkingStyle::PinkyExtended;
};

```
- 코드를 이런 식으로 작성했을 때의 장점은 다음과 같다.
    - 여러 컨스트럭터에 걸쳐 이니셜라이저를 복제할 필요가 없다.
    - 초기화 순서와 선언 순서가 섞일 일이 없다.
    - 멤버 타입, 프로퍼티 플래그, 디폴트값이 모두 한 곳에 있으므로 가독성과 유지보수성에 좋다.
- 그러나 다음과 같은 단점도 있다.
    - 디폴트값을 변경하면 모든 종속 파일을 리빌드해야 한다.
    - 헤더는 엔진 패치 릴리즈에서 변경할 수 없으므로, 가능한 픽스 종류가 제한될 수 있다.
    - 이런 방식으로 초기화시킬 수는 없는 것들도 있다. 예를 들면 베이스 클래스, ```UObject``` 서브오브젝트, 앞서 선언한(forward-declared) 타입으로의 포인터, 컨스트럭터 아규먼트에서 추론해 낸 값, 여러 단계에 걸쳐 초기화된 멤버 등은 이런 방식으로 초기화시킬 수 없다.
    - 헤더에 약간의 이니셜라이저를 두고 나머지는 .cpp 파일의 컨스트럭터에 두게 되면 가독성과 유지보수성에 좋지 않을 수 있다.

## 코드 포맷
### 중괄호
- 다음 예시와 같이 단일 구문 블록에도 항상 중괄호를 포함시키자.

```
if (bThing)
{
    return;
}
```
### If - Else
- if-else 문의 각 실행 블록은 중괄호로 묶어야 한다.

```
if (bHaveUnrealLicense)
{
    InsertYourGameHere();
}
else
{
    CallMarkRein();
}
```

- 여러 갈래의 if 문에서 각각의 else if 문은 첫 번째 if 문과 같은 양만큼 들여쓰기해야 한다. 그래야 읽는 사람이 구조를 쉽게 이해할 수 있다.
```
if (TannicAcid < 10)
{
    UE_LOG(LogCategory, Log, TEXT("Low Acid"));
}
else if (TannicAcid < 100)
{
    UE_LOG(LogCategory, Log, TEXT("Medium Acid"));
}
else
{
    UE_LOG(LogCategory, Log, TEXT("High Acid"));
}
```

### 탭 및 들여쓰기
- 코드 들여쓰기 표준이다.
    - 실행 블록별로 코드를 들여쓴다.
    - 줄 시작 부분의 공백에는 스페이스가 아니라 탭을 사용한다. 탭 크기는 4자로 설정한다. 그래도 탭을 스페이스 몇 칸으로 지정했는지와 무관하게 코드 줄을 맞추기 위해 스페이스를 써야 할 때가 있다. 예를 들면, 탭 이외의 문자에 코드 줄을 맞출 필요가 있는 경우이다.

### Switch 문
- 빈 케이스(동일한 코드를 갖는 다중 케이스)를 제외하면, switch 케이스 문에서는 다음 케이스로 넘어간다는 것을 명시적으로 밝혀 주어야 한다. 각각의 경우마다 break를 넣거나, falls through 코멘트를 달자!! 다른 코드 제어 전송 명령(return, continue 등)도 괜찮다.

- 디폴트 케이스는 항상 만들어 두고, 다른 사람이 그 뒤에 새로운 케이스를 추가할 때에 대비해 break도 넣어 주자!

```
switch (condition)
{
    case 1:
        ...
        // falls through

    case 2:
        ...
        break;

    case 3:
        ...
        return;

    case 4:
    case 5:
        ...
        break;

    default:
        break;
}
```

## 네임스페이스
- 네임스페이스를 사용하여 클래스, 함수 및 변수를 구성할 수 있다. 
- 대부분의 UE 코드는 현재 글로벌 네임스페이스에 래핑되어 있지 않다. 특히나 서드 파티 코드를 사용하거나 포함할 때는 전역 범위에서 충돌이 일어나지 않도록 주의를 기울여야 한다.
- 언리얼 헤더 툴에는 네임스페이스가 지원되지 않으므로, ```UCLASS``` , ```USTRUCT``` 등을 정의할 때는 사용할 수 없다.
- ```UCLASS``` , ```USTRUCT``` 등이 아닌 새 API는 적어도 ```UE::``` 네임스페이스에 배치해야 하며, 이상적으로는 중첩된 네임스페이스(예: ```UE::Audio::``` )를 사용하는 것이 좋다.  누구에게나 공개되는 API의 일부가 아닌 구현 세부 정보를 포함하는 데 사용되는 네임스페이스는 ```Private``` 네임스페이스(예: ```UE::Audio::Private::``` )에 들어가야 한다.
- ```Using``` 선언:
    - 전역 범위에는 .cpp 파일에서도 ```using``` 선언을 넣지 않다('unity' 빌드 시스템에 문제가 생깁니다).
    - 다른 네임스페이스 안이나 함수 바디 안에는 ```using``` 선언을 넣어도 괜찮다.
    - 네임스페이스 안에 ```using``` 선언을 넣는 경우, 동일 이동 단위 내 해당 네임스페이스의 다른 곳으로 이어지게 된다. 일관성만 있으면 괜찮을 것이다.
    - 위의 규칙을 따라야만 헤더 파일에서 ```using``` 선언을 안전하게 사용할 수 있다.
- 앞서 선언된 타입은 각각의 네임스페이스 안에서 선언해야 한다는 점에 유의하자. 그렇지 않으면 링크 오류가 발생한다.
- 하나의 네임스페이스 안에 다수의 클래스/타입을 선언할 경우 다른 전역 범위의 클래스에서 사용하기 어려울 수 있다(예를 들면, 함수 시그니처는 클래스 선언에 나타날 때 명시적 네임스페이스를 사용해야 한다).
- ```using``` 선언을 사용하여 네임스페이스 안의 특정 변수만 자신의 범위로 에일리어싱할 수 있다(예: using ```Foo::FBar``` ). 그러나 언리얼 코드에서는 보통 그렇게 하지 않다.
- 매크로는 네임스페이스 내에 있을 수 없지만, 대신 ```UE_``` 접두사를 붙이면 된다(예: ```UE_LOG``` ).

## 물리적 종속성
- 파일 이름에는 가급적 접두사를 붙이지 않아야 한다. 예를 들면 ```UScene.cpp``` 보다는 ```Scene.cpp``` 가 좋다. 이렇게 하면 원하는 파일을 식별하는 데 필요한 글자 수가 줄어들어 Workspace Whiz나 Visual Assist와 같은 툴에서 Open File in Solution 등의 기능을 쉽게 사용할 수 있다.
- 모든 헤더는 ```#pragma once``` 지시어(directive)로 복수의 include를 방지해야 한다. 참고로 에픽이 사용하는 모든 컴파일러는 ```#pragma once``` 를 지원한다.

```
#pragma once
//파일 콘텐츠
```

- 헤더 include 대신 전방 선언(forward declaration)이 가능한 경우 그렇게 한다.
- include할 때는 가능한 한 세밀하게 한다. 예를 들면, Core.h를 include하지 말고 Core의 헤더 중 정의가 필요한 특정 부분을 include한다.
- 세밀한 include 작업을 쉽게 하기 위해, 필요한 헤더는 전부 직접 include한다.
- 자신이 include한 다른 헤더에 의해 간접적으로 include되는 헤더에 의존하지 않다.
- 다른 헤더를 통해 include시키기보다는 필요한 것을 전부 include하세요.
- 모듈에는 Private과 Public 소스 디렉터리가 있다. 다른 모듈이 필요로 하는 정의는 Public 디렉터리의 헤더에 있어야 한다. 그 외 모든 것은 Private 디렉터리에 있어야 한다. 참고로 기존 언리얼 모듈의 경우 이 디렉터리는 'Src' 및 'Inc'라고 불리기도 한다. 그러나 이는 동일한 방식으로 프라이빗 코드와 퍼블릭 코드를 구분하기 위함일 뿐이지, 헤더 파일을 소스 파일과 구분하기 위함은 아니다.
- 큰 함수는 논리적 하위 함수로 나눈다. 컴파일러 최적화의 한 분야가 바로 공통 하위 표현식 삭제이다. 함수가 클수록 그 식별을 위해 컴파일러가 할 일이 많아진다. 그러면 빌드 시간이 크게 늘어나게 된다.
- 인라인 함수는 사용하지 않는 파일에 있어도 강제로 리빌드시킨다. 인라인 함수는 사소한 접근자에만, 또는 프로파일링을 통해 이득이 있는 것으로 보일 때만 사용해야 한다.
- ```FORCEINLINE``` 사용에 있어서는 훨씬 더 보수적이어야 한다. 모든 코드와 로컬 변수는 호출 중 함수로 확장되어, 큰 함수에서 발생하는 것과 동일한 빌드 시간 문제가 생깁니다.

## 캡슐화
- 클래스 멤버는 클래스의 public/protected 인터페이스 일부가 아니면 거의 항상 private으로 선언해야 한다. 상황에 따라 적절히 판단하되, 

- 더 이상 파생시킬 클래스가 아닌 경우 final을 사용한다.

## 일반적인 스타일 문제
- 종속성 거리를 최소화 한다. 코드가 특정 값을 갖는 변수에 의존할 때는, 변수를 사용하기 직전에 그 값을 설정한다. 바로 다음 줄에 사용한다면 변수 초기화를 왜 그렇게 했는지, 어디서 사용되는지를 명확히 할 수 있다.
- 메서드는 가급적 하위 메서드로 분할한다. 세밀한 부분부터 시작해서 큰 그림을 재구성하기보다는, 큰 그림을 먼저 그린 후 필요한 세밀한 부분을 자세히 살펴보는 것이 더 쉬울 수도 있다. 마찬가지로, 모든 코드가 통째로 들어 있는 메서드보다는 이름을 잘 지어 둔 다수의 하위 메서드를 연속적으로 호출하는 단순한 메서드를 이해하는 것이 더 수월.
- 함수 선언이나 함수 호출 위치에서 함수의 이름과 아규먼트 목록에 선행되는 괄호 사이에 스페이스를 추가하지 않는다.
- 컴파일러 경고에 주의를 기울인다. 컴파일러 경고 메시지는 무언가 잘못되었다는 것을 뜻하므로 컴파일러가 경고하는 내용을 고쳐야 한다. 전혀 처리할 수 없다면 ```#pragma``` 로 억제할 수는 있지만, 이는 최후의 수단이어야 한다.
- 파일 끝에 빈 줄 하나를 만든다. 모든 .cpp 및 .h 파일은 빈 줄이 있어야 gcc와 함께 제대로 작동한다.
- 디버그 코드는 전반적으로 유용하고 잘 다듬어진 상태가 아니라면 체크인하지 말아야 한다. 디버그 코드가 다른 코드와 섞이면 다른 코드를 읽기가 힘들어진다.
- 스트링 리터럴 주변에는 항상 ```TEXT()``` 매크로를 사용하자. 그렇게 하지 않으면 코드가 리터럴에서 ```FStrings``` 을 생성하는 경우 원치 않는 스트링 변환 프로세스가 유발된다.
- 루프에서의 동일 연산 반복을 피하자. 공통된 하위 표현식은 루프 밖으로 빼서 중복 계산을 피한다. 경우에 따라 statics를 활용하여 전역 범위에서의 함수 호출을 대상으로 하는 중복 연산을 피할 수 있는데, 스트링 리터럴에서의 ```FName``` 생성 등을 예로 들 수 있다.
- 핫 리로드 기능을 염두에 두자. 종속성을 최소화하여 반복작업 시간을 줄이다. 리로드 동안 변할 확률이 있는 함수에는 인라인 또는 템플릿을 사용하지 않다. 리로드 동안 그대로 남아 있을 것에만 statics를 사용해야 한다.
- 복잡한 표현식은 중간 변수를 사용하여 간소화하세요. 복잡한 표현식을 중간 변수에 할당된 하위 표현식으로 나누고, 부모 표현식 내에서 하위 표현식의 의미를 설명하는 이름을 지정하면 이해하기 더 쉬워집니다. 예를 들면 다음과 같다.

```
if ((Blah->BlahP->WindowExists->Etc && Stuff) &&
    !(bPlayerExists && bGameStarted && bPlayerStillHasPawn &&
    IsTuesday()))
{
    DoSomething();
}
```

```이러한 코드는 다음으로 대체해야 함```

```
const bool bIsLegalWindow = Blah->BlahP->WindowExists->Etc && Stuff;
const bool bIsPlayerDead = bPlayerExists && bGameStarted && bPlayerStillHasPawn && IsTuesday();
if (bIsLegalWindow && !bIsPlayerDead)
{
    DoSomething();
}
```
- 포인터와 레퍼런스의 스페이스는 그 오른쪽에 딱 한 칸만 두어야 한다. 그래야 특정 타입에 대한 모든 포인터나 레퍼런스에 빠르게 **Find in Files** 를 사용할 수 있다.
- 다음은 사용 가능
```
FShaderType* Ptr
```
- 다음은 사용해서는 안 된다
```
FShaderType *Ptr
FShaderType * Ptr
```
- 변수 음영은 허용되지 않는다. C++에서는 외부 영역에서의 변수를 섀도잉하는 것이 가능하지만, 이는 읽는 사람에게 모호할 수 있다. 예를 들어, 다음 멤버 함수에서 ```Count``` 변수는 세 가지 방법으로 사용할 수 있다.
```
class FSomeClass
{
public:
    void Func(const int32 Count)
    {
        for (int32 Count = 0; Count != 10; ++Count)
        {
            // 사용 횟수
        }
    }

private:
    int32 Count;
}
```

- 함수 호출에서 익명 리터럴 사용은 피하세요. 이름 상수로 의미를 설명하는 것이 좋다.

```
// 기존 스타일
Trigger(TEXT("Soldier"), 5, true);.

// 새 스타일
const FName ObjectName                = TEXT("Soldier");
const float CooldownInSeconds         = 5;
const bool bVulnerableDuringCooldown  = true;
Trigger(ObjectName, CooldownInSeconds, bVulnerableDuringCooldown);
```
- 이렇게 하면 함수 선언을 조회하지 않아도 이해할 수 있으므로 일반적인 독자가 의도를 쉽게 파악할 수 있다.
- 헤더에 특수한 스태틱 변수를 정의하지 않도록 한다. 해당 헤더가 포함된 모든 이동 단위로 인스턴스가 컴파일되기 때문이다.

```
// SomeModule.h
static const FString GUsefulNamedString = TEXT("String");
```
- 이러한 코드는 다음으로 대체해야 함

```
// SomeModule.h
extern SOMEMODULE_API const FString GUsefulNamedString;

// SomeModule.cpp
const FString GUsefulNamedString = TEXT("String");
```
## API 디자인 가이드라인
- ```bool``` 함수 파라미터는 피해야 하며, 함수에 전달되는 플래그의 경우 특히 그렇다. 앞서 언급한 익명 리터럴 문제가 그대로 발생한다. 또한 시간에 따라 API 확장을 통해 동작이 추가되면서 늘어나는 경향도 있다. 대신 다음과 같이 열거형을 사용하는 것이 좋다.

```
// 기존 스타일
FCup* MakeCupOfTea(FTea* Tea, bool bAddSugar = false, bool bAddMilk = false, bool bAddHoney = false, bool bAddLemon = false);
FCup* Cup = MakeCupOfTea(Tea, false, true, true);

// 새 스타일
enum class ETeaFlags
{
    None,
    Milk  = 0x01,
    Sugar = 0x02,
    Honey = 0x04,
    Lemon = 0x08
};
ENUM_CLASS_FLAGS(ETeaFlags)

FCup* MakeCupOfTea(FTea* Tea, ETeaFlags Flags = ETeaFlags::None);
FCup* Cup = MakeCupOfTea(Tea, ETeaFlags::Milk | ETeaFlags::Honey);
```
- 이러한 형태는 플래그가 실수로 반전되는 것을 막아 주어 포인터와 integer 아규먼트에서 실수로 변환되는 현상이 방지되고, 중복 디폴트값을 반복할 필요도 없으므로 더욱 효율적이다.
- ```bools``` 를 아규먼트로 사용해도 괜찮은 경우는 setter처럼 함수에 전달하기에 완전한 상태일 때로, 예를 들면 ```void FWidget::SetEnabled(bool bEnabled)``` 와 같이 사용할 수 있다. 그러나 변경되는 경우에는 리팩터링을 고려해야 한다.
-함수가 파라미터를 많이 받는 경우 다음과 같이 전용 구조체 전달을 사용하면 좋다

```
// 기존 스타일
TUniquePtrFCup[] MakeTeaForParty(const FTeaFlags* TeaPreferences, uint32 NumCupsToMake, FKettle* Kettle, ETeaType TeaType = ETeaType::EnglishBreakfast, float BrewingTimeInSeconds = 120.0f);

// 새 스타일
struct FTeaPartyParams
{
    const FTeaFlags* TeaPreferences       = nullptr;
    uint32           NumCupsToMake        = 0;
    FKettle*         Kettle               = nullptr;
    ETeaType         TeaType              = ETeaType::EnglishBreakfast;
    float            BrewingTimeInSeconds = 120.0f;
};
TUniquePtr<FCup[]> MakeTeaForParty(const FTeaPartyParams Params);
```
- ```bool``` 및 ```FString``` 을 사용한 함수 오버로드는 피하자. 작동 방식을 예상할 수 없다.
```
void Func(const FString String);
void Func(bool bBool);

Func(TEXT("String")); // 부울 오버로드 호출!
```
- 인터페이스 클래스(접두사 'I'를 가짐)는 항상 추상형이어야 하며, 멤버 변수가 있어서는 안 된다. 인터페이스는 순수 가상(pure virtual)이 아닌 메서드를 포함할 수 있으며, 인라인 구현되는 한 가상이 아니거나 정적인 메서드도 포함할 수 있다.
- 파생 클래스에서 가상 함수를 선언하고 그 클래스가 부모 클래스에서 가상 함수를 오버라이드하는 경우, ```virtual``` 및 ```override``` 키워드를 둘 다 사용해야 한다. 예를 들면 다음과 같다.

```
class A
{
public:
    virtual void F() {}
};

class B : public A
{
public:
    virtual void F() override;
}
```
- ```override``` 키워드는 최근에 추가되었으므로 아직 이 규칙을 따르지 않는 기존 코드가 많다. 그러한 코드에는 가급적 ```override``` 키워드를 추가해야 한다.