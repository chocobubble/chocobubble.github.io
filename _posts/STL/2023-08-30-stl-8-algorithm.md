---
title:  "STL - 알고리즘"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Algorithm

toc: true
toc_sticky: true
use_math: true

date: 2023-08-30
last_modified_at: 2023-08-30
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.


# 원소를 수정하지 않는 알고리즘

- nonmodifying algorithms은 원소의 순서나 원소의 값을 변경하지 않고 원소를 읽기만 하는 알고리즘이다.


## adjacent_find(b, e, x)
- 구간에서 현재 원소와 다음 원소가 같아지는 첫 원소 반복자 반환
- 조건을 넣고 싶다면 adjacent_find(b,e,f)를 사용한다. 
	- f는 이항 조건자이다.

## count(b, e, x)
- 구간에서 x 원소의 개수 리턴
- 조건을 넣고 싶다면 count_if(b,e,f)
	- f는 단항 조건자

## equal(b, e, b2)
- [b, e), [b2, b2+(e-b))의 순차열이 같은지 판단
- 조건을 넣고 싶다면 equal(b, e, b2, f)
	- f는 이항 조건자

## find(b,e,x)
- 구간에서 x를 찾고 반복자를 리턴한다.
- 조건을 넣고 싶다면 find_if(b, e, x, f);
	- f는 단항 조건자

## find_end(b, e, b2, e2)
- 일치하는 순차열 구간이 여러 개라면 마지막 순차열의 첫 원소 반복자 리턴

## for_each(b, e, f)
- 구간 내 모든 원소에 대해 f 적용
	- f는 단항 연산자
- 원소 수정도 가능하다

## lexicographical_compare(b, e, b2, e2)
- 순차열을 사전식 비교한다. 디폴트는 less.

## min(a,b), max(a,b)
- 두 값 비교하여 크거나 작은 값 리턴
- 조건을 넣고 싶으면 min(a,b,f), max(a,b,f) 사용하면 된다.

## max_element(b, e), max_element(b,e,f)
- 구간 가장 크거나 작은 원소의 반복자를 반환함. 
- 조건을 넣고 싶다면 max_element(b, e, f), min_element(b,e,f)알고리즘은 작은 원소의 반복자 반환.
	- f는 이항 조건자

## mismatch(b, e, b2)
- 구간 [b,e)과 구간 [b2, b2+(e-b))의 모든 원소를 하나씩 비교하여 원소 값이 서로 다른 첫 원소의 반복자 쌍을 반환한다.
- 조건자를 추가한다면 두 구간의 반복자 p, q 에 대하여 !f(*p, *q)가 참인 첫 원소의 반복자를 반환한다.

## search_n(b,e,n,x)
- 구간 [b, e)의 순차열에서 원소 x가 n번 연속한 첫 원소의 반복자를 반환한다.

```cpp
struct Pred1
{
	bool operator()(int a) {
		return 3 < a;
	}
};

bool Pred2(int left, int right) {
	return abs(left - right) < 4;
}

class PrintFunctor
{
public:
	PrintFunctor(char c = ' ') : fmt(c) { }
	void operator()(int n) {
		cout << n << fmt;
	}	
private:
	char fmt;
};

struct Point
{
	Point(int _x = 0, int _y = 0) : x(_x), y(_y) { }
	void print() {cout << "[" << x << ","<<y<<"]" ;}
	int x;
	int y;
};

bool PointPred(const Point& a, const Point& b) {
	return a.y < b.y;
}

int main()
{
	vector<int> v1 {1, 2, 2, 3, 4, 5};
	vector<int> v2 {3, 4, 5};
	auto iter1 = adjacent_find(v1.begin(), v1.end());
	cout << "iter-1 : " << *(iter1-1) << ", iter : " << *iter1 << ", iter+1 : " << *(iter1+1) << endl;
	cout << "count(v1.begin(), v1.end(), 2) : " << count(v1.begin(), v1.end(), 2) << endl;
	cout << "count_if : " << count_if(v2.begin(), v2.end(), Pred1()) << endl; // 단항 조건자
	if(equal(v2.begin(), v2.end(), v1.begin())) cout << "equal(v2.begin(), v2.end(), v1.begin())" << endl;
	if(equal(v2.begin(), v2.end(), v1.begin()+3)) cout << "equal(v2.begin(), v2.end(), v1.begin()+3)" << endl;
	if(equal(v2.begin(), v2.end(), v1.begin(), Pred2)) cout << "equal(v2.begin(), v2.end(), v1.begin(), Pred2)" << endl;
	for_each(v1.begin(), v1.end(), PrintFunctor()); cout << endl;
	for_each(v1.begin(), v1.end(), PrintFunctor(',')); cout << endl;
	for_each(v2.begin(), v2.end(), PrintFunctor('\n')); cout << endl;
	Point pt1(1,1), pt2(2,2);
	Point minpt = min(pt1, pt2, PointPred);
	minpt.print(); cout << endl;
	Point maxpt = max(pt1, pt2, PointPred);
	maxpt.print(); cout << endl;
	return 0;
}
/*
iter-1 : 1, iter : 2, iter+1 : 2
count(v1.begin(), v1.end(), 2) : 2
count_if : 2
equal(v2.begin(), v2.end(), v1.begin()+3)
equal(v2.begin(), v2.end(), v1.begin(), Pred2)
1 2 2 3 4 5 
1,2,2,3,4,5,
3
4
5

[1,1]
[2,2]
```

# 원소를 수정하는 알고리즘
- modifying algorithms은 원소의 값을 변경하거나 목적지 순차열로 원소를 복사하는 알고리즘이다.

## copy(b, e, b2)
- 구간[b,e)의 순차열을 구간[t, t+(e-b))의 순차열로 모두 복사하고, 목적지 끝 반복자를 반환한다.
- 모든 알고리즘의 기본 동작은 덮어쓰기 이며, 반복자 어댑터(insert_iterator) 등을 이용해 삽입 모드로 동작하게 할 수 있다.

## copy_backward(b,e,t)
- 원소의 복사를 순차열의 마지막 원소부터 복사하고, 목적지 시작 반복자를 반환한다.
- 구간[b, e)의 모든 원소를 [t-(e-b), t)의 순차열로 마지막 원소부터 복사함

## fill(b,e,x)
- 구간 [b, e)의 원소를 x로 채운다.
- fill_n(b,n,x) 알고리즘은 구간[b, b+n)의 원소를 x로 채운다.

## for_each(b,e,f)
- 사용자 함수류를 순차열 모든 원소에 적용한다.
	- 출력 매개변수(out parameter)를 사용해 함수를 원소에 적용한다.
		- 그러기 위해 사용자 함수의 매개변수는 반드시 &(레퍼런스)를 사용해야 한다.
- transfrom(b,e,f)도 비슷하게 작동한다.
	- 함수의 반환값을 사용하여 사용자의 함수를 원소에 적용한다.

## generate(b,e,f) 
- 구간[b,e)의 모든 원소를 f()로 채운다. 
	- generate()알고리즘과 for_each(), transform() 알고리즘의 큰 차이점은 함수자의 매개변수로 순차열의 원소를 전달받지 않기 때문에 원소가 가지고 있는 원값을 활용할 수 없고, 단순히 일정한 값으로 채운다. 
- generate_n(b,n,f) 알고리즘은 구간[b,b+n)의 모든 원소를 f()로 채운다

## swap(a,b)
- a와 b를 교환한다.
- iter_swap(p,q)알고리즘은 반복자가 가리키는 *p와 *q를 교환한다.

## merge(b,e,b2,e2,t) 
- **정렬된 구간** [b, e)의 순차열과 구간[b2,e2)의 순차열을 [t, t+(e-b)+(e2-b2))의 순차열로 합병 정렬한다.
- 정렬된 구간에서 동작한다는 점에 주의해야 한다. 특정 기준에 의해 정렬되어 있다면 merge(b,e,b2,e2,t,f) 알고리즘을 이용하면 됨.



순차열의 특정 원소를 다른 값으로 수정하고자 한다면 replace() 알고리즘을 사용한다. replace(b,e,x,x2) 알고리즘은 구간 [b,e)의 x인 원소를 x2로 수정한다

```cpp
replace(v.begin(), v.end(), 30, 0);

// 조건을 추가하려면
//replace_if(b,e,f,x2)
replace_if(v.begin(), v.end(), Pred, 0);
```

조건에 맞는 원소를 수정하여 목적지 순차열로 복사하려면 replace_copy(), replace_copy_if() 알고리즘을 사용한다.

```cpp
iter_end = replace_copy(v1.begin(), v1.end(),
												v2.begin(), 30, 0);
// 30인 원소를 모두 0으로 변환하여
// [v2.begin(), iter_end) 순차열에 저장

iter_end = replace_copy_if(v1.begin(), v1.end(),
													 v3.begin(), Pred, 0);
```

순차열과 순차열의 모든 원소를 교환하려면 swap_ranges() 알고리즘을 사용한다. swap_ranges(b,e,b2) 알고리즘은 구간 [b,e)의 순차열과 구간[b2, b2+(e-b))의 모든 원소를 교환한다.

```cpp
swap_ranges(v1.begin(), v1.end(), v2.begin());
```

순창ㅕㄹ의 모든 원소에 사용자의 정책(동작)을 반영(적용)하려면 일반적으로 for_each(), transform() 알고리즘을 사용한다. transfrom()은 원본의 순차열의 변화 없이 목적지의 순차열로 저장한다는 점이 for_each()와의 차이점이다. 물론 덮어쓰기 모드로 동작한다. transform(b,e,t,f)는 구간[b,e)의 반복자가 p라면 f(*p)를 호출하여 반환값을 순차열 [t, t+(e-b))로 저장한다. f는 단항 함수류(함수자, 함수, 함수 포인터)다.

```cpp
int Func(int n)
{
	return n+5;
}
int main()
{
	...
	transform(v.begin(), v.end(), v.begin(), Func);
	iter_end = transform(...);
	...
}
```

transform() 알고리즘은 목적지의 끝 반복자를 반환한다. 사용자 연산을 두 순차열의 원소에 적용하고자 한다면 transform(b,e,b2,t,f) 알고리즘 버전을 사용한다.

```cpp
int Plus(int left, int right)
{
	return left+right;
}

int main()
{
	...
	iter_end = transform(v1.begin(), v1.end(),
											v2.begin(), v3.begin(), Plus);
	...
}
```

원소를 수정하는 알고리즘은 모두 디폴트가 덮어쓰기이기 때문에 목적지 순차열은 원본 이상의 원소를 가지고 있어야 한다. 삽입 모드로 동작하려면 insert_iterator를 사용해야 한다. 얜 10장에서!