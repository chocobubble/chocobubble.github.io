---
title:  "[STL] 시퀀스 컨테이너"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - Sequence Container
  - vector
  - list
  - deque

toc: true
toc_sticky: true
use_math: true

date: 2023-08-29
last_modified_at: 2023-08-29
---

> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.


# Vector 컨테이너

```cpp
template<typename T,
		typename Allocator = allocator<T>>
class vector
// T는 vector 컨테이너 원소의 형식
```

```cpp
void print(vector<int> vec)
{
	cout << "size : " << size(vec);
	if(size(vec) == 0) {
		cout << endl;
		return;
	}
	cout <<"  [";
	for(int i=0; i<size(vec)-1; ++i) {
		cout<< vec[i] << ", ";
	}
	cout << vec[size(vec)-1] << "]" << endl;
}

int main()
{
// Constructor
	vector<int> v1; // 빈 컨테이너
	print(v1);
	vector<int> v2(5); // 5개의 원소
	print(v2);
	vector<int> v3(4, 2); // 2로 초기화된 4개의 원소
	print(v3);
	vector<int> v4(v3); // v3 컨테이너의 복사본 - 복사 생성자 호출
	print(v4);
	vector<int>::iterator liter = v4.begin()+1;
	auto riter = v4.begin() + 3;
	vector<int> v5(liter, riter); // 반복자 구간 [b, e)로 초기화
	print(v5);
// End Constructor

	vector<int> v6;
	v6.assign(6, 3);
	print(v6);
	v6.assign(liter, riter);
	print(v6);
	vector<int> v7 {1, 3, 5, 7};
	print(v7);
	cout << "v7.at(2) : " << v7.at(2) << endl;
	cout << "v7.back() : " << v7.back() << endl;
	auto biter = v7.begin();
	cout << "*v7.begin() : " << *v7.begin() << endl;
	cout << "v7.capacity() : " << v7.capacity() << endl;
	v7.push_back(9);
	print(v7);
	cout << "v7.capacity() : " << v7.capacity() << endl;
	v7.clear();
	cout << "after clear() v7.size() : " << v7.size() << endl;
	cout << "after clear() v7.capacity() : " << v7.capacity() << endl;
	cout << "v7.empty() : " << v7.empty() << endl;
	v7.reserve(10);
	cout << "after reserve() v7.size() : " << v7.size() << endl;
	cout << "after reserve() v7.capacity() : " << v7.capacity() << endl;
	v7.resize(3);
	print(v7);
	cout << "after resize() v7.size() : " << v7.size() << endl;
	cout << "after resize() v7.capacity() : " << v7.capacity() << endl;
	v7.resize(6, 1);
	print(v7);
	cout << "after resize() v7.size() : " << v7.size() << endl;
	cout << "after resize() v7.capacity() : " << v7.capacity() << endl;
	vector<int> v8 = {1, 3, 5, 7, 9};
	print(v8);
	auto eiter = v8.end();
	cout << "*v8.end() == v8.back() : " << (*v8.end() == v8.back()) << endl;
	cout << (*(v8.end() - 1) == v8.back()) << endl;
	auto qiter = v8.erase(v8.begin() + 1);
	print(v8);
	cout << "*qiter : " << *qiter << endl;
	qiter = v8.erase(v8.begin() + 1, v8.begin() + 3);
	print(v8);
	cout << "*qiter : " << *qiter << endl;
	cout << "v8.front() : "<< v8.front() << endl;
	v8.insert(qiter, 5);
	print(v8);
	v8.insert(qiter, 3, 4);
	print(v8);
	v8.insert(v8.begin(), liter, riter);
	print(v8);
	cout << "v8.max_size() : " << v8.max_size() << endl; // V8이 담을 수 있는 최대 원소 개수(메모리의 크기)
	v8.pop_back();
	print(v8);
	cout << "*v8.rbegin() : " <<*v8.rbegin() << ", *v8.rend() : " <<*v8.rend() << endl;
	cout << "*(v8.rend()-1) : " << *(v8.rend() -1) << endl;
	v8.swap(v7);
	print(v8);
	cout << "v7 == v8 : " << (v7 == v8) << " , v7 != v8 : " << (v7 != v8) << endl;
	cout << "v7 <= v8 : " << (v7 <= v8) << " , v7 > v8 : " << (v7 > v8) << endl;
	return 0;
}

/* print
size : 0
size : 5  [0, 0, 0, 0, 0]
size : 4  [2, 2, 2, 2]
size : 4  [2, 2, 2, 2]
size : 2  [2, 2]
size : 6  [3, 3, 3, 3, 3, 3]
size : 2  [2, 2]
size : 4  [1, 3, 5, 7]
v7.at(2) : 5
v7.back() : 7
*v7.begin() : 1
v7.capacity() : 4
size : 5  [1, 3, 5, 7, 9]
v7.capacity() : 8
after clear() v7.size() : 0
after clear() v7.capacity() : 8
v7.empty() : 1
after reserve() v7.size() : 0
after reserve() v7.capacity() : 10
size : 3  [0, 0, 0]
after resize() v7.size() : 3
after resize() v7.capacity() : 10
size : 6  [0, 0, 0, 1, 1, 1]
after resize() v7.size() : 6
after resize() v7.capacity() : 10
size : 5  [1, 3, 5, 7, 9]
*v8.end() == v8.back() : 0
1
size : 4  [1, 5, 7, 9]
*qiter : 5
size : 2  [1, 9]
*qiter : 9
v8.front() : 1
size : 3  [1, 5, 9]
size : 6  [1, 4, 4, 4, 5, 9]
size : 8  [2, 2, 1, 4, 4, 4, 5, 9]
v8.max_size() : 4611686018427387903
size : 7  [2, 2, 1, 4, 4, 4, 5]
*v8.rbegin() : 5, *v8.rend() : 0
*(v8.rend()-1) : 2
size : 6  [0, 0, 0, 1, 1, 1]
v7 == v8 : 0 , v7 != v8 : 1
v7 <= v8 : 0 , v7 > v8 : 1
```

- vector는 sequence container 이므로 원소의 저장 위치(순서)가 정해지며 배열 기반 container이므로 원소가 하나의 메모리 블록에 할당된다
- vector는 앞쪽이 막혀 있는 형태로 앞쪽에는 원소를 추가/제거 할 수 없다.
- deque나 list는 가능해서 push_front() 와 pop_front()가 있다.
- size()는 unsigned int 타입을 반환하므로 vector 내에 typedef된 멤버 형식을 사용하면 좋다.

```cpp
for(vector<int>::size_type i = 0; i < v.size(); ++i){}
cout<<typeid(vector<int>::size_type).name()<<endl;
// unsigned int
```
- typeid(T): T에 대한 typeinfo 객체를 리턴한다.

- capacity()는 vector만 유일하게 가지는 멤버함수이다.
	- 원소를 추가할 때마다 메모리를 재할당하지 않도록 넉넉한 메모리를 확보하기 때문에 capacity를 보면 최대 추가 가능한 원소 수를 알 수 있음.

- reserve()를 사용해 미리 메모리를 할당 가능하다.

- clear() 사용시 size는 0이 되어도 메모리는 제거되지 않고 남아 있다.
- capacity를 0으로 만드는 함수는 존재하지 않지만 swap을 사용하는 방법이 있다.
	- 임시로 생성한(기본 생성자에 의해 size, capacity가 0인) 컨테이너 객체와 capacity를 0으로 만들고자 하는 컨테이너 객체를 서로 swap하는 방법을 사용함

- []연산자는 범위 점검을 하지 않아 속도가 빠르며 at() 멤버 함수는 범위를 점검하므로 속도는 느리지만 안전함. 
	- at()은 범위를 벗어나면 out_of_range 예외가 발생시킴


- 반복자가 가리키는 원소의 값을 변경하지 않는다면 상수 반복자를 사용하는 것이 좋다.

```cpp
vector<int>::iterator iter = v.begin();
vector<int>::const_iterator citer = v.begin();
// const int* 처럼 동작.
// const vector<int>::iterator 는
// int* const처럼 동작하여 반복자를 이동할 수 없음.
```

- reverse_iterator(역방향 반복자)는 iterator와 반대로 동작한다.
- 구간 [rbegin(), rend())는 컨테이너 모든 원소의 역순차열이다.

- 원소를 삽입하면 반복자가 가리키는 위치의 원소 자리에 삽입되며 삽입 위치부터 뒤에 있는 모든 원소는 뒤로 밀려난다. 
	- 교체가 아님!

- 컨테이너 연산자는 모든 컨테이너에 제공되는 연산이다.
	- 문자열 비교처럼 원소를 하나씩 비교함.
	- [10,20,30,40,50] < [10,20,50] 이다!

## vector의 주요 특징 정리
- 벡터는 원소가 하나의 메모리 블록에 연속(배열 기반 컨테이너)하게 저장된다.
- 그래서 원소가 추가되거나 삭제될 때 메모리 재할당이 발생할 수 있고 이럴 경우 상당한 비용을 지불하게 된다.


# deque 컨테이너

## deque의 주요 인터페이스와 특징

- 생성자, 멤버 함수, 연산자, 멤버 형식 등 vector와 크게 다르지 않다.

- deque는 시퀀스 컨테이너이며 배열 기반 컨테이너이다. 
- vector 와 다른 점은 메모리 블록 할당 정책이다. 
	- vector의 단점을 해결하기 위해 여러 개의 메모리 블록을 할당하고 사용자에게는 하나의 블록처럼 보이게 하는 정책을 사용한다.
	- 원소의 추가 시 메모리가 부족할 때마다 일정한 크기의 새로운 메모리 블록을 할당하여 이전 메모리를 제거하거나 이전 원소를 복사하는 등의 연산을 수행하지 않는다.
	- 그래서 앞쪽에 원소 추가가 가능하다.
	- 또한 임의의 위치에 원소를 삽입 혹은 삭제하는 경우도 벡터보다 효율적이다.
		- 원소의 개수가 작은 쪽으로 밀어 내기 때문.

```cpp
int main()
{
	deque<int> deq1 {1, 3, 5};
	print(deq1);
	deq1.pop_front();
	print(deq1);
	deq1.push_front(9);
	print(deq1);
	return 0;
}

/* print
size : 3  [1, 3, 5]
after clear() deq1.size() : 3
size : 2  [3, 5]
size : 3  [9, 3, 5]
after clear() deq1.size() : 3
```

# list 컨테이너
- list는 노드 기반 컨테이너로 원소가 노드 단위로 저장되며 이중 연결 리스트로 구현된다

## list의 주요 인터페이스와 특징
- list는 시퀀스 컨테이너이므로 시퀀스 컨테이너가 갖는 모든 특징을 가진다. 
- 노드 기반 컨테이너이므로 at()과 [] 연산자가 없으며 임의 접근 반복자가 아닌 양방향 반복자를 제공한다.
	- 그래서 모든 원소를 탐색하려면 양방향 반복자의 연산인 ++, --를 사용한다.
- 순차열 중간에 원소를 삽입, 제거 시 상수 시간 복잡도의 수행 성능을 보인다.
- 또한 노드 기반 컨테이너의 삽입과 제거 동작은 반복자를 무효화 시키지 않는다.
	- 배열 기반 컨테이너의 반복자는 원소의 삽입과 제거 동작이 발생하면 메모리가 재할당되거나 원소가 이동할 수 있으므로 반복자가 무효화 된다.

```cpp
struct pred
{
	bool operator()(int a, int b) {
		return a < b;
	}
};

bool pred2(int n)
{
	return 5 <= n;
}

int main()
{
	list<int> l1 {1, 3, 5};
	print(l1);
	list<int> l2 {2, 4, 6};
	print(l2);
	l1.merge(l2);
	print(l1);
	print(l2);
	list<int> l3 = {1, 3, 5};
	list<int> l4 = {6, 4, 2};
	l4.merge(l3, pred()); // 둘 정렬되어 있지 않으면 이렇게 됨
	print(l4);
	auto iter = l4.begin();
	l4.insert(++iter, 2);
	print(l4);
	l4.remove(2); // 2 모두 지움
	print(l4); 
	l4.remove_if(pred2);
	print(l4);
	l1.splice(l1.begin(), l4); // l4의 모든 원소를 l1.begin()에 잘라붙임
	print(l1);
	l1.reverse();
	print(l1);
	l1.sort(); // 자체 정렬 멤버 함수이다. 
	print(l1);
	l1.unique(); // 인접한 원소를 유일하게 만든다.
	print(l1);
	l1.unique(pred());
	print(l1);
	return 0;
}
/* print
size : 3  [1, 3, 5, ]
size : 3  [2, 4, 6, ]
size : 6  [1, 2, 3, 4, 5, 6, ]
size : 0
size : 6  [1, 3, 5, 6, 4, 2, ]
size : 7  [1, 2, 3, 5, 6, 4, 2, ]
size : 5  [1, 3, 5, 6, 4, ]
size : 3  [1, 3, 4, ]
size : 9  [1, 3, 4, 1, 2, 3, 4, 5, 6, ]
size : 9  [6, 5, 4, 3, 2, 1, 4, 3, 1, ]
size : 9  [1, 1, 2, 3, 3, 4, 4, 5, 6, ]
size : 6  [1, 2, 3, 4, 5, 6, ]
size : 1  [1, ]
```
