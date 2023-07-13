---
title:  "[C++ 정리] lvalue & rvalue"
excerpt: "C++"
excerpt_separator: "<!--more-->"
categories:
  - cpp_research
tags:
  - CPP
  - lvalue
  - rvalue

toc: true
toc_sticky: true

use_math: true

date: 2023-07-13
last_modified_at: 2023-07-13
---

# lvalue & rvalue

## lvalue


## 우측값 레퍼런스
- 좌측값(lvalue)
	- 이름 있는 변수처럼 주소를 가질 수 있는 대상
  - 단일 표현식 이후에도 없어지지 않고 지속되는 객체
- 우측값(rvalue)
	- 좌측값이 아닌 나머지
	- 리터럴, 임시 객체, 값 등
  - rvalue는 && 참조자를 사용함
- 우측값 레퍼런스(rvalue reference)
	- 특히 우측 값이 임시 객체이거나 std::move()로 명시적으로 이동된 객체일 때 적용됨
	- 오버로딩된 함수 중 우측값에 적용할 대상을 결정하는 데 사용됨
	- 크기가 큰 객체 복사 연산이 오더라도 임시 객체라는 점을 이용해 포인터를 복사하는 방식으로 처리 가능
	- 함수의 매개변수에 &&를 붙여 우측값 레퍼런스로 만든다.
	- 일반적으로 임시 객체는 ```const type&```로 취급하지만 함수의 오버로딩 버전 중 우측값 레퍼런스를 사용하는 함수가 있다면 그 버전으로 임시 객체를 처리한다.
	- 우측값 레퍼런스로 전달된 인수는 임시 객체이므로 함수 안에서 변경한 사항들은 함수 리턴 후 사라진다.
	- 리터럴도 우측값이므로 우측값 레퍼런스 버전이 호출되나, const 레퍼런스 매개변수로 인수 전달이 가능하긴 하다.

```cpp
void HandleMessage(string& Message)
{
	cout << "Handle Message with lvalue reference, " << Message << endl;
}

void HandleMessage(string&& Message)
{
	cout << "Handle Message with rvalue reference, " << Message << endl;
}

string a = "Hello ";
// lvalue 
HandleMessage(a);
string b = "World";

// rvalue
HandleMessage(a + b); 

// rvalue
HandleMessage("Hello World");
```

- 좌측값 오버로딩이 되지 않은 함수에 **이름 있는 변수(좌측값)**를 인수로 호출하려고 하면 컴파일 에러가 발생한다.
- 이런 경우 ```std::move()``` 를 이용하면 된다.
	- move()는 좌측값을 우측값 레퍼런스로 캐스트해준다.
	- 실제로 이동시키는 작업은 하지 않음.

```cpp
void Helper(std::string&& Message) {}
void HandleMessage(std::string&& Message)
{
	// Message가 이름 있는 변수라 좌측값이다.
	// 따라서 아래는 컴파일 에러 발생.
	Helper(Message); 

	// 우측값으로 캐스트 해주어야 한다.
	Helper(std::move(Message));
}
```

- 우측값 레퍼런스에 임싯값을 대입하면 우측값 레퍼런스가 스코프에 있는 동안 존재한다.

```cpp
int& i = 2; // error : 상수에 대한 레퍼런스
int a = 2, b = 3;
int& j = a + b; // error : 임시 객체에 대한 레퍼런스

int&& i = 2;
int a =2, b = 3;
int&& j = a + b;
```