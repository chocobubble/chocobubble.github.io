
## pragama once
- ```#pragma once``` 지시어(directive)는 복수의 include를 방지한다.


## 애셋 레퍼런스
이상적으로 클래스의 애셋 레퍼런스는 존재하지 않습니다. 하드코딩된 애셋 레퍼런스는 취약해서, 애셋 프로퍼티의 환경설정에는 블루프린트를 사용하는 쪽이 선호되는 방식입니다. 그러나 하드코딩된 레퍼런스는 여전히 완벽 지원됩니다. 오브젝트를 생성할 때마다 애셋을 검색할 수는 없으니, 이러한 검색은 한 번만 합니다. 이는 애셋 검색을 한 번만 하도록 보장해 주는 정적인 구조체를 통해 이루어집니다.

ConstructorHelpers::FObjectFinder 는 StaticLoadObject 를 사용해서 지정된 UObject 로의 레퍼런스를 찾습니다. 이는 보통 콘텐츠 패키지에 저장된 애셋을 참조하는 데 사용됩니다. 오브젝트를 찾지 못하면 실패했다고 보고됩니다.

```cpp
ATimelineTestActor::ATimelineTestActor()
 {
        // 일회성 초기화 저장을 위한 구조체입니다.
        struct FConstructorStatics
        {
            ConstructorHelpers::FObjectFinder<UStaticMesh> Object0;
            FConstructorStatics()
            : Object0(TEXT("StaticMesh'/Game/UT3/Pickups/Pickups/Health_Large/Mesh/S_Pickups_Base_Health_Large.S_Pickups_Base_Health_Large'"))
            {
            }
        };
        static FConstructorStatics ConstructorStatics;

        // 프로퍼티 초기화

        StaticMesh = ConstructorStatics.Object0.Object;
}
```

# unreal -3

### GetName()
- 반환타입
    - FString
- 반환값
    - Returns the name of this object (with no path information)

### GetLocation()
- 반환타입
    - FVector
- 반환값
    - Temp function for easy conversion

### FVector
- Variables
    - X
    - Y
    - Z
- Constants
    - ZeroVector
        - 	A zero vector (0,0,0)

# UE_LOG
- 파라미터로 printf 마크업을 사용한다.

```cpp
UE_LOG(LogClass, Log, TEXT("This is a testing statement. %s"), *TestHUDString);
```

- ```LogClass``` 는 로그 카테고리입니다.
- (```OutputDevices.h``` 에 ```DECLARE_LOG_CATEGORY_EXTERN``` 으로 설정된) 기존 카테고리를 사용할 수도, 
- ```DEFINE_LOG_CATEGORY_STATIC``` 을 사용해서 자체적으로 정의할 수도 있다.
- ```Log``` 는 상세도이다. 상세도는 ELogVerbosity Enum 에 정의되며,
- 가능한 값은 ```Fatal```, ```Error```, ```Warning```, ```Display```, ```Log```, ```Verbose```, ```VeryVerbose``` 이다.
- 다음 인수는 출력하고자 하는 텍스트로, 파라미터 마크업을 포함한다.
- ```%s``` 파라미터를 사용하면, ```%s``` 파라미터에 필요한 ```TCHAR*``` 반환에 ```*``` 연산자를 사용해주어야 한다!!
- ```UE_LOG``` 로 출력된 메시지는 출력 로그에서 확인 가능하다.

# DECLARE_LOG_CATEGORY_EXTERN

- 이 매크로의 매개변수는 (CategoryName, DefaultVerbose, CompileTimeVerbose )이다.
    - Verbose: 정보가 얼마나 상세한지

namespace ELogVerbosity
{
    enum Type
    {
        NoLogging        = 0,
        Fatal,							// 파일 및 에디터 로그에 빨간색으로 출력, 프로그램 종료
        Error,							// 파일 및 에디터 로그에 빨간색으로 출력
        Warning,						// 파일 및 에디터 로그에 노란색으로 출력
        Display,						// 파일 및 콘솔에 출력
        Log,							// 파일 및 에디터 로그에 출력
        Verbose,						// 로그 파일에 출력
        VeryVerbose,					// 로그 파일에 상세 내용을 포함하여 출력
        All              = VeryVerbose,
        NumVerbosity,
        VerbosityMask    = 0xf,
        SetColor         = 0x40,
        BreakOnLog       = 0x80,
    }
}

### Tick(float DeltaTime)
- 반환타입  
    - void
- Called every frame to allow the game viewport to update time based state.

### UClass::StaticClass
- 반환타입
    - UClass Object
- Returns a [UClass](API\Runtime\CoreUObject\UObject\UClass) object representing this class at runtime
References
- Module
    - CoreUObject
- Header
    - /Engine/Source/Runtime/CoreUObject/Public/UObject/Class.h
- Include
    - #include "UObject/Class.h"
- Syntax
    - static UClass * StaticClass()