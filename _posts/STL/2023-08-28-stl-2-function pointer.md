---
title:  "STL - 함수 포인터"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Function Pointer

toc: true
toc_sticky: true
use_math: true

date: 2023-08-28
last_modified_at: 2023-08-28
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

# 함수 포인터란
1. 변수는 값을 저장하는 메모리 공간의 이름
2. 포인터는 주소를 저장하는 메모리 공간의 이름
3. 함수 포인터는 함수의 시작 주소를 저장하는 포인터
	- 함수의 이름은 함수가 시작하는 시작 주소이다.

## 선언 방법
- 함수 시그니처(함수의 반환 타입과 매개변수 리스트)와 같게 선언한다.  
```cpp
void print(int n) { /**/ }
void (*pf)(int);
pf = print;
```
- 멤버 함수의 주소를 저장하는 경우는 해당 클래스 혹은 구조체의 이름도 함께 사용해야 하며,
- & 연산자도 같이 앞에 붙여주어야 한다.

## 함수 포인터의 주소

```cpp
void print(int n) {
	cout << "number : " << n << endl;
}

int main()
{
	void (*pf)(int);
	pf = print;
	print(10); // '함수 호출'
	pf(20);    // '포인터 이용 함수 호출 1'
	(*pf)(30); // '포인터 이용 함수 호출 2'

	cout << "print 주소 : " << reinterpret_cast<void *>(print) << endl;
	cout << "pf 주소    : " << reinterpret_cast<void *>(pf) << endl;
	cout << "*pf 주소   : " << reinterpret_cast<void *>(*pf) << endl;
	return 0;
}

/* print
number : 10
number : 20
number : 30
print 주소 : 0x1021e7040
pf 주소    : 0x1021e7040
*pf 주소   : 0x1021e7040
*/
```

# 함수 포인터의 종류
- 정적 함수와 멤버 함수로 나눌 수 있다.
- 정적 함수
	- 전역 함수, namespace 내 전역 함수, static 멤버 함수
- 멤버 함수 
	- 나머지...
- 멤버 함수는 객체와 주소로 각각 호출 가능하므로, 함수 호출은 총 세 가지가 있다.
	1. 정적 함수 호출
	2. 객체로 멤버 함수 호출
	3. 객체의 주소로 멤버 함수 호출  
```cpp
print();    // 1
pt.print(); // 2
pt->print();// 3
print(10);      // 1. namespace에 없는 전역 함수 호출
A::print(10);   // 2. A namespace에 있는 전역 함수 호출
Point::print(1);// 3. Point 클래스의 정적 멤버 함수 호출
```

## 정적 함수 호출
- 아래에서 볼 수 있듯이 정적 함수는 모두 같은 정적 함수 포인터를 사용한다.

```cpp
void (*pf)(int) // 정적 함수 포인터 선언
pf = print;
pf(10);
pf = A::print;
pf(10);
pf = Point::print;
pf(10);
```

## 객체와 주소로 멤버 함수 호출
- 멤버 함수 포인터는 함수 포인터 선언에 어떤 클래스의 멤버 함수를 가리킬 것인지 클래스 이름을 지정해 주어야 한다.
- 연산자 우선순위로 인해 아래와 같이 사용해야 한다.

```cpp
void (Point::*pf1)() const;
pf1 = &Point::Print;
void (Point::*pf2)(int);
pf2 = &Point::PrintInt;

Point pt(1, 1);
(pt.*pf1)(); // 객체로 멤버 함수 포인터를 이용한 호출
(pt.*pf2)(10);
Point *ptr = &pt;
(p->*pf1)(); // 주소로 멤버 함수 포인터를 이용한 호출
(p->*pf2)(10); 
```