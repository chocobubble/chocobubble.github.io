---
title:  "STL - 함수 객체"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Function Object
  - Functor

toc: true
toc_sticky: true
use_math: true

date: 2023-08-28
last_modified_at: 2023-08-28
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.


# 함수 객체란
- 함수 객체(Function Object)는 함수처럼 동작하는 객체이다. 
- 그러기 위해서는 () 연산자를 오버로딩해야 한다.
- 함수자(Functor)라고도 불린다.

## 함수 객체의 장점
- 객체이므로 멤버 변수와 멤버 함수를 가질 수 잇다.
- 함수 객체는 인라인될 수 있기 때문에 일반 함수보다 빠르다.
- 함수 객체의 서명이 같더라도 객체 타입이 다르면 서로 전혀 다른 타입으로 인식한다.
	- 아래와 같은 경우 operator()()와 서명이 같더라도 타입이 다른 함수 객체는 SomeFunc 클래스 객체에 대입하거나 복사할 수 없다.

```cpp
class SomeFunc
{
public: // 해주어야 한다
	void operator()() {
		cout << " 함수 객체 " << endl;
	}
};

int main()
{
	SomeFunc func;
	func();
}

//  함수 객체
```

# 함수 객체 구현
- STL에는 less(< 연산자의 함수 객체), greater(> 연산자의 함수 객체)가 정의되어 있다.
	- 이 둘은 bool 형을 반환하는 조건자(predicate)이다.
	- 'functional'에 정의되어 있다.

```cpp
int main()
{
	cout << less<int>()(10, 20) << ", ";
	cout << less<int>()(20, 10) << ", ";
	cout << greater<int>()(10, 20) << ", ";
	cout << greater<int>()(20, 10) << endl;
	return 0;
}
// 1, 0, 0, 1
```

```cpp
struct Plus
{
	int operator()(int a, int b) {
		return a + b;
	}
};

int main()
{
	int n = 10, m = 20;
	cout << Plus()(n, m) << endl;
	return 0;
}

// 30
```