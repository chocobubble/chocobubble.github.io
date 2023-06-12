
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