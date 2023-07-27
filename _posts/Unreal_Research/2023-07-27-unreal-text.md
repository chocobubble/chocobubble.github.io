---
title:  "[언리얼 엔진] Text"
excerpt: "Unreal Engine"
excerpt_separator: "<!--more-->"
categories:
  - Unreal_Research
tags:
  - Unreal
  - Text

toc: true
toc_sticky: true

use_math: true

date: 2023-07-27
last_modified_at: 2023-07-27
---

> 언리얼의 Text 관련 내용을 정리하였다.

> https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/StringHandling/


# FName
- 효율성을 위해 데이터 테이블에 문자열이 캐시되어 index로 접근하며,
- 대소문자를 구분하지 않고, 변경이 되지 않는다.
- 정적인 속성과 저장 시스템 덕에 찾기나 키로 FName에 접근하는 속도가 빠르다.
- 그리고 스트링에서 FName으로의 변환이 해시 테이블을 사용해 빠르다.

## 생성

```cpp
FName TestHUDName = FName(TEXT("ThisIsMyTestFName"));
```

## 변환
- FString과 FText 로만 변환 가능하며, FString 에서만 변환 가능하다.
- FName에서 FString
```cpp
MyString = MyName.ToString();
```
- FName에서 FText

```cpp
MyText = FText::FromName(MyName);
```
	- 이 경우 FName의 내용이 FText의 auto localization을 지원 받지 못한다.
- FString에서 FName

```cpp
MyName = FName(*MyString);
```
	- FName은 대소문자를 구분하지 않아 손실성 변환이다.
	- FName에서 사용할 수 없는 글자가 들어가 버릴 수 있다.

## 비교
- == 연산자
	- true 혹은 false 반환
- FName::Compare
	- 이 값이 다른 값보다 작으면 음수, 같으면 0, 크면 양수 반환
```cpp
CompareFloat = MyName.Compare(OtherName);
```

## 사용처
1. 콘텐츠 브라우저에서 새 에셋 이름을 지을 때
2. dynamic material instance의 파라미터를 변경할 때
3. skeletal mesh에서 bone에 접근할 때
