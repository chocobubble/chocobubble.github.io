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

<템플릿 형식>

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

|  |  |
| --- | --- |
|  |  |
|  |  |

나중에 정리하자

list는 시퀀스 컨테이너이므로 원소의 저장 위치(순서)가 정해지며 노드 기반 컨테이너이므로 원소가 각각의 노드에 저장된다. 시퀀스 컨테이너가 갖는 모든 특징을 가진다. 노드 기반 컨테이너이므로 at()과 [] 연산자가 없으며 임의 접근 반복자가 아닌 양방향 반복자를 제공한다. 그래서 모든 원소를 탐색하려면 양방향 반복자의 연산인 ++, --를 사용한다.

```cpp
list<int> lt;
lt.push_back(10);
list<int>::iterator iter;
for(iter = lt.begin(); iter != lt.end(); ++lt) {...}
lt.push_front(100);
```

list의 가장 큰 특징 중 하나는 순차열 중간에 원소를 삽입, 제거 시 상수 시간 복잡도의 수행 성능을 보인다는 점이다. vector나 deque처럼 원소를 밀어낼 필요가 없기 때문이다. 또한 노드 기반 컨테이너의 삽입과 제거 동작은 반복자를 무효화 시키지 않는다. 반복자가 가리키는 원소 자체가 제거되지 않는 한 반복자가 가리키는 원소는 그대로 존재한다. 하지만, 배열 기반 컨테이너의 반복자는 원소의 삽입과 제거 동작이 발생하면 메모리가 재할당되거나 원소가 이동할 수 있으므로 반복자가 무효화 된다.

```cpp
iter2 = lt.erase(iter);
// iter2는 다음 원소를 카리키는 반복자이다.
// iter는 사라짐
iter = iter2;
iter2 = lt.insert(iter, 300);
// 삽입하는 위치는 반복자가 가리키는 원소의 앞쪽이다.
// 삽입 후에도 iter, iter2 반복자 모두 유효함
```

원소의 값으로 원소를 제거하는 remove() 함수가 있음. 컨테이너의 모든 원소를 순차적으로 검색하며 해당 원소를 제거함. 속도가 빠르고 유일하게 list만이 remove() 함수를 가지므로 필요한 경우 list 컨테이너가 좋음. 조건자를 이용해 원소를 제거한다면 remove_if() 버전의 멤버 함수 이용

```cpp
lt.remove(10);
// 10원소의 노드를 '모두' 제거
lt.remove_if(조건);
// 조건에 맞는 모든 노드를 제거
```

순서가 있는 노드 기반 커너테이너 list는 splice()라는 멤버 함수를 이용해 다른 list 컨테이너의 순차열을 잘라붙일 수 있음

```cpp
lt.splice(iter, lt2);
// 물론 상수의 시간복잡도
lt1.splice(iter1, lt2, iter2);
// lt1의 iter1위치에 lt2의 iter2가 가리키는 원소를 원소를 잘라 붙임
lt1.splice(lt1.end(), lt2, lt2.begin(), lt2.end());
// lt1의 끝에 lt2를 모두 잘라 붙임
```

모든 순차열을 반대로 뒤집어야 한다면 reverse() 멤버 함수를 사용한다. 이중 연결 리스트의 탐색 경로를 서로 바꿈으로써 순차열을 리버스시킴

```cpp
lt.reverse();
```

중복되지 않는 원소만 남기고 싶다면 unique() 멤버 함수를 사용. 주의할 점은 인접한 원소를 하나만 남기므로 연속하지 않는 원소는 중복될 수 있대. 정렬해서 하면 깔끔하겠죠. 조건자 버전도 있음

```cpp
lt.unique();
// 인접한 원소를 유니크하게 만듬.
lt.unique(조건);
// 조건자가 참이면 원소를 제거함
```

정렬을 위한 sort() 멤버함수를 제공한다. 시퀀스 컨테이너는 정렬이 가능함. deque와 vector는 sort() 알고리즘을 이용해 빠르게 정렬할 수 있지만, list는 sort()알고리즘을 수행할 수 없음. 임의 접근 반복자를 이용해 하기 때문에 이를 지원하는 컨테이너만 가능함. 그래서 자체 정렬 멤버 함수 sort()를 제공한다.

```cpp
lt.sort();
lt.sort(조건);
lt.sort(greater<int>());
// 내림차순으로 정렬
```

greater, less 조건자는 <functional> 헤더에 들어 있지만 일반적으로 list 컨테이너 헤더에서 포함한다. 두 list를 합병해야 한다면 merge() 멤버 함수를 사용한다. 주의할 점은 합병은 정렬된 두 list를 하나의 정렬된 list로 합병하므로 합병할 두 list는 정렬되어 있어야 한다. slice() 멤버 함수와의 차이점이다.

```cpp
lt1.merge(lt2);
//lt2를 lt1으로 합병 정렬. 정렬 기준은 less
// lt2의 원소는 합병되어 사라짐.
// 다른 정렬기준을 사용하고 있다면 조건자 버전을 이요해야 함
lt1.merge(lt2, greater<int>());
```

## list의 주요 특징 정리

시퀀스 컨테이너이며 노드 기반 컨테이너 이므로 순차열 중간에 삽입, 제거가 빈번하게 발생하며 원소의 상대적인 순서가 중요하다면 list 컨테이너를 사용한다.