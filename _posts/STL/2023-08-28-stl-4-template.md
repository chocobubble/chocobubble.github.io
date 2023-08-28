---
title:  "STL - 템플릿"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Template

toc: true
toc_sticky: true
use_math: true

date: 2023-08-28
last_modified_at: 2023-08-28
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

> 템플릿은 함수 템플릿(function template)과 클래스 템플릿(class template)으로 나뉜다.  
> 함수 템플릿은 함수를 만들어 내고, 클래스 템플릿은 클래스를 만들어내는 틀이다.

# 함수 템플릿
- 템플릿 함수를 사용하면 컴파일러는 함수 호출 인자 타입을 보고 템플릿 함수의 매개변수 타입을 결정하여 실제 함수인 템플릿 인스턴스 함수를 생성한다.
- 즉, 컴파일이 완료되면 함수 템플릿은 존재하지 않고, 인스턴스화 된 함수들이 생긴 상태가 된다.
- 매개변수 타입 객체는 템플릿 함수 정의의 연산이 가능한 객체라면 모두 올 수 있다.

```cpp
template<typename T>
void Swap(T &a, T &b)
{
	T temp = a; // 복사 생성자
	a = b;      // 대입 생성자
	b = temp;   // 를 매개변수 객체들이 지원해야 한다.
}
```

- 함수 템플릿의 매개변수로 타입뿐 아니라 정수 등도 가능하다.
- 이 경우 다음과 같이 명시적으로 호출해 주어야 한다.
	- 인스턴스는 PrintArray<int, 5>() 와 PrintArray<float, 5> 가 생성된다.

```cpp
template<typename T, int size>
void PrintArray(T* arr)
{
	for(int i=0; i<size; ++i) {
		cout << arr[i] << " ";
	}
	cout << endl;
}

int main()
{
	int intArray[5] = {1, 2, 3, 4, 5};
	float floatArray[5] = {0.1, 0.2, 0.3, 0.4, 0.5};
	PrintArray<int, 5>(intArray);
	PrintArray<float, 5>(floatArray);
	return 0;
}
```

## 함수 템플릿 특수화
- 함수 템플릿 특수화(Function Template Specialization)은 특수화된 버전의 함수 템플릿을 더 제공한다고 보면 된다.
- 다음 Point 클래스는 << 연산자가 오버로딩 되어 있지 않아 cout으로 출력할 수 없다.
- << 연산자를 오버로딩 하지 않고 특수화 함수 템플릿을 이용하면 출력이 가능하다.
- 일반화 버전의 템플릿 함수도 있어야 한다!

```cpp
class Point
{
	int x; int y;
public:
	Point(int _x, int _y) : x(_x), y(_y) {}
	void print() const {
		cout << x << ", " << y << endl;
	}
};

template<typename T>
void Print(T a)
{
	cout << a << endl;
}

template< >
void Print(Point a)
{
	cout << "특수화 템플릿 함수 : ";
	a.print();
}

int main()
{
	Point pt(1, 2);
	Print(pt);
	return 0;
}
```

# 클래스 템플릿
- 함수 템플릿과 비슷하게 클래스를 만들어내는 틀(메타 코드)이다.
- 함수 템플릿처럼 디폴트 매개변수 값 지정도 가능하고, 특수화 버전도 가능하다.

```cpp
template<typename T=int, int capT=10> // int, 10 디폴트 매개변수 값 지정
class Array
{
	// ...
};

template<> // 특수화 버전
class Array<Point> 
{
	// ...
};

int main()
{
	Array<> intarr; // 디폴트 매개변 수 값 사용
	Array<double> darr;
	Array<string, 5> sarr;
	Array<Point> parr; // 특수화 버전
	return 0;
}
```