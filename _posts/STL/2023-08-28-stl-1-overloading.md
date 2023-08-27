---
title:  "STL - 연산자 오버로딩"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Overloading

toc: true
toc_sticky: true
use_math: true

date: 2023-08-28
last_modified_at: 2023-08-28
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

> 설명에 사용할 베이스 클래스  

```cpp
class Point
{
private:
	int x, y;
public:
	Point(int _x = 0, int _y = 0) : x(_x), y(_y) {}
	void print() const {cout << "[" << x << ", " << y << "]" << endl;}
	
};
```

# 이항 연산자 오버로딩
- +, -, *, /, ==, !=, <, <= 등이 있다.

## == 연산자 오버로딩

```cpp
bool operator==(const Point& arg) const {
	return x == arg.x && y == arg.y ? true : false;
}
```

## != 연산자 오버로딩
- == 연산자를 구현했다면 쉽게 구현 가능하다.

```cpp
bool operator!=(const Point& arg) const {
		return !(*this == arg);
	}
```

# 전역 함수를 이용한 연산자 오버로딩
- 멤버 함수를 이용한 연산자 오버로딩을 사용할 수 없는 경우에 사용한다.
	- 이항 연산의 왼쪽 항이 연산자 오버로딩 객체가 아니면 멤버 함수를 이용한 연산자 오버로딩을 사용할 수 없다.
	- 왼쪽 객체를 기준으로 오버로딩 멤버 함수를 호출하기 때문

```cpp
Point pt(1, 1);
int k = 2;
Point pt2 = k * pt; 
```
- k 는 연산자 오버로딩 객체가 아니므로 ```k.operator*(pt)``` 처럼 호출할 수 없으며,
- ```operator*(k, pt)``` 처럼 호출해야 한다.

```cpp
const Point operator*(const int argL, const Point& argR) {
	Point newPoint;
	newPoint.setX(argR.getX() * argL);
	newPoint.setY(argR.getY() * argL);
	return newPoint;
}

int main()
{
	Point pt1(1, 1);
	int k=2;
	Point pt2;
	pt2 = k * pt1;
	pt2.print();
	return 0;
}

// [2, 2]
```

# STL에 필요한 주요 연산자 오버로딩
## 함수 호출 연산자 오버로딩(() 연산자)
- 함수 호출 연산자 오버로딩은 **객체를 함수처럼 동작하게 하는 연산자**이다.
- Print(10)은 다음과 같이 세 가지로 해석될 수 있다.
	1. 함수 호출
	2. 함수 포인터
	3. 함수 객체

```cpp
struct FuncObj
{
	void operator()(int arg) const {
		cout << "FuncObj(arg) : " << arg << endl;
	}
};

void Print1(int arg)
{
	cout << "Print1(int arg) : " << arg << endl;
}

int main()
{
	void (*Print2)(int) = Print1;
	FuncObj Print3;
	Print1(10); // '함수 호출'
	Print2(20); // '함수 포인터'
	Print3(30); // '함수 객체'
	Print1.operator()(40); // '명시적 호출'
	FuncObj()(50); // '임시 객체로 호출'
	FuncObj().opeartor()(60); // '임시 객체로 명시적 호출'
	return 0;
}
/* print
Print1(int arg) : 10
Print1(int arg) : 20
FuncObj(arg) : 30
FuncObj(arg) : 40
FuncObj(arg) : 50
FuncObj(arg) : 60
*/
```

## 배열 인덱스 연산자 오버로딩([] 연산자)
- 나중에 추가

## 메모리 접근, 클래스 멤버 접근 연산자 오버로딩(*, -> 연산자)
- *, -> 는 스마트 포인터나 반복자 등의 특수한 객체에 사용된다.
- 스마트 포인터를 만들며 위 연산자 오버로딩을 살펴본다.
- 구현한 스마트 포인터가 일반 포인터처럼 동작하려면 클래스에 정의된 멤버 함수를 사용할 수 있어야 한다.
	- 그러기 위해 -> 연산자를 오버로딩 한다.

```cpp
class PointPtr
{
private:
	Point* ptr;
public:
	PointPtr(Point *p) : ptr(p) {}
	~PointPtr() { delete ptr; }
	Point* operator->() const {
		return ptr;
	}
	Point& operator*() const {
		return *ptr;
	}
};

int main()
{
	PointPtr ptr1 = new Point(1, 1);
	ptr1->print(); // ptr1.operator->()->print()  호출됨
	(*ptr1).print();
	return 0;
}

// [1, 1]
// [1, 1]
```

- ptr1->print() 는 ptr1.opeartor->() 함수를 호출해 ptr1 내부에 보관된 실제 포인터를 반환받고 이 포인터를
이용해 실제 Point의 멤버 함수(ptr1.opeartor->()->print())를 호출한다.
- 