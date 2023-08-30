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

## replace(b,e,x,x2)
- 구간 [b,e)의 x인 원소를 x2로 수정한다
- 조건을 넣고 싶다면 replace_if(b,e,f,x2) 를 사용한다.
	- f는 단항 조건자이다.

## replace_copy(b1, e1, b2, x, x2)
- 조건에 맞는 원소를 수정하여 목적지 순차열로 복사한다.
- 조건을 넣고 싶다면 replace_copy_if() 알고리즘을 사용한다.

## swap_ranges(b,e,b2) 
- 구간 [b,e)의 순차열과 구간[b2, b2+(e-b))의 모든 원소를 교환한다.

## transform(b,e,t,f)
- 구간[b,e)의 반복자가 p라면 f(*p)를 호출하여 반환값을 순차열 [t, t+(e-b))로 저장한다.
- f는 단항 함수류(함수자, 함수, 함수 포인터)다.
- transfrom()은 원본의 순차열의 변화 없이 목적지의 순차열로 저장한다는 점이 for_each()와의 차이점이다. 
	- 덮어쓰기 모드로 동작한다. 
- transform() 알고리즘은 목적지의 끝 반복자를 반환한다.
- 조건을 넣고 싶다면 transform(b,e,b2,t,f) 알고리즘 버전을 사용한다.

## 주의
- 원소를 수정하는 알고리즘은 모두 디폴트가 덮어쓰기이기 때문에 목적지 순차열은 원본 이상의 원소를 가지고 있어야 한다.
- 삽입 모드로 동작하려면 insert_iterator를 사용해야 한다. (10장)

```cpp
struct Accumulation
{
	void operator() (int& n) {
		total += n;
		n = total;
	}
private:
	int total = 0;
};

void print(vector<int> v) {
	for(int n : v) cout << n << " ";
	cout << endl;
}

int main()
{
	vector<int> v1 {1, 3, 5, 7, 9};
	for_each(v1.begin(), v1.end(), Accumulation());
	print(v1);
	swap(v1[4], v1[1]);
	print(v1);
	iter_swap(v1.begin(), v1.end()-1);
	print(v1);
	vector<int> v2 = {1, 3, 5};
	vector<int> v3 (3, 2);
	vector<int> v4(10, 0); // 빈 컨테이너면 에러
	merge(v2.begin(), v2.end(), v3.begin(), v3.end(), v4.begin());
	print(v4);
	replace(v4.begin(), v4.end(), 0, 4);
	print(v4);
	return 0;
}
/*
1 4 9 16 25 
1 25 9 16 4 
4 25 9 16 1 
1 2 2 2 3 5 0 0 0 0 
1 2 2 2 3 5 4 4 4 4 
```


# 제거 알고리즘
- removing algorithms은 '원소를 수정하는 알고리즘'의 특수한 형태이다.
- 원소를 실제로 제거하지 않고 논리적으로 제거(다음 원소로 덮어쓰기)하기 때문에 순차열의 size를 실제로 변경하지 않는다.
- 실제 size를 변경하려면 컨테이너의 erase() 멤버 함수를 이용하면 된다

## remove(b,e,x) 
- 구간 [b,e)의 순차열에서 x인 원소가 남지 않게 함.
- 이 때 remove는 실제 원소를 제거하지 않고 뒤의 원소들을 앞으로 복사시킴.
- size에는 변동이 없으며 remove() 후의 순차열은 [b,p)가 된다.
	- p는 remove(b, e, x)의 리턴값
- 조건에 따라 원소를 제거하고자 한다면 remove_if() 알고리즘을 사용한다. 

## remove_copy(b,e,t,x)
- 구간 [b,e)에서 *p==x인 원소를 제외한 원소를 순차열[t,p)에 복사한다.
- 원소 복사는 당연히 덮어쓰기 모드로 동작한다.
- remove_copy_if() 는 조건자 버전

## unique(b,e)
- 구간[b,e)의 순차열을 인접한 중복 원소가 남지 않게 한다.
- 수행 후 순차열은 [b,p)가 된다.
- 주의할 점은 인접한 중복 원소를 제거하기 대문에 결과에서 인접하지 않는 중복 원소는 남게 된다는 사실이다.
- 정렬 후 알고리즘을 수행하면 깔끔하게 된다. 또한 중복 원소를 논리적으로 제거한다.
- 조건자를 이용한다면 unique(b,e,f)를 이용하면 된다.
- 중복원소 자리를 뒷 원소가 복사이동하는 방식이라 size에 변함이없다.

```cpp
int main()
{
	vector<int> v1{1, 3, 5, 7};
	cout << "capacity : " << v1.capacity() << " , size : " << v1.size() << endl;
	auto iter_end = remove(v1.begin(), v1.end(), 1);
	cout << "capacity : " << v1.capacity() << " , size : " << v1.size() << endl;
	print(v1);
	cout << "iter - v1.begin() : " << iter_end - v1.begin() << endl;
	iter_end = unique(v1.begin(), v1.end());
	print(v1);
	cout << "iter - v1.begin() : " << iter_end - v1.begin() << endl;
	for(int i=0; i<4; ++i) v1.push_back(5);
	print(v1);
	unique(v1.begin(), v1.end());
	print(v1);
	v1.push_back(3);
	iter_end = unique(v1.begin(), v1.end());
	print(v1);
	cout << "iter - v1.begin() : " << iter_end - v1.begin() << endl;
	v1.erase(iter_end, v1.end());
	print(v1);
	return 0;
}
/*
capacity : 4 , size : 4
capacity : 4 , size : 4
size : 4  [3, 5, 7, 7]
iter - v1.begin() : 3
size : 4  [3, 5, 7, 7]
iter - v1.begin() : 3
size : 8  [3, 5, 7, 7, 5, 5, 5, 5]
size : 8  [3, 5, 7, 5, 5, 5, 5, 5]
size : 9  [3, 5, 7, 5, 3, 5, 5, 5, 3]
iter - v1.begin() : 5
size : 5  [3, 5, 7, 5, 3]
```

# 변경 알고리즘

> mutating algorithms은 순차열의 원소를 서로 교환하거나 이동하여 순차열 원소의 ‘순서’를 변경하는 알고리즘이다.

## next_permutation(b,e)
- 구간 [b,e)의 순차열을 다음 순열(사전순)의 순차열이 되게 한다. 마지막 순열이라면 false를 반환하며 아니면 true를 반환한다.
- 원소의 순서를 순열(permutation)처럼 변경할 때 next_permutation()과 prev_permutation() 알고리즘을 사용한다. 
- 사용자 조건으로 순열을 생성하려면 next_permutation(b,e,f)
- prev_permutation은 next_permutation과 비슷하며 순차열의 이전 순열을 만들어내고 첫 순열일 때 false를 반환한다.

## partition(b,e,f)
- [b,e)의 반복자가 p일 때 f(*p)가 참인 원소는 [b,p)의 순차열에 거짓인 원소는 [p,e)의 순차열로 분류한다.
- 원소의 상대적인 순서는 변경하지 않게 하려면 stable_partition() 알고리즘을 사용한다. 성능은 조금 떨어진다.

## reverse(b,e)
- 구간 [b,e)의 순차열을 역순으로 뒤집는다.
- 뒤집힌 순차열을 목적지 순차열로 복사하고자 한다면 reverse_copy(b,e,t). 덮어쓰기 모드이다

## rotate(b,m,e)
- 첫 원소와 마지막 원소가 연결된 것처럼 왼쪽으로 m-e만큼씩 회전한다.
- 순차열을 회전하여 목적지 순차열에 복사하려면 rotate_copy(b,m,e,t) 를 사용한다.

```cpp
int main()
{
	vector<int> v {5, 7, 9, 3, 1, 8, 6};
	print(v);
	auto iter = partition(v.begin()+1, v.end(), Pred(5));
	if(*v.begin() > *iter) iter_swap(v.begin(), iter);
	print(v);
	reverse(v.begin(), v.end());
	print(v);
	rotate(v.begin(), v.begin()+3, v.end());
	print(v);
	return 0;
}
/*
size : 7  [5, 7, 9, 3, 1, 8, 6]
size : 7  [5, 1, 3, 9, 7, 8, 6]
size : 7  [6, 8, 7, 9, 3, 1, 5]
size : 7  [9, 3, 1, 5, 6, 8, 7]
```

# 정렬 알고리즘

## 힙관련
- make_heap(), push_heap(), pop_heap(), sort_heap()이 있다.

### make_heap()
- 순차열을 힙으로 만든다.
- default는 가장 큰 값부터 작은 순으로 나열된다.

### push_heap(b,e)
- 구간[b,e)의 힙에 원소를 추가하는 알고리즘이다.
- 일반적으로 멤버 함수 push_back()과 함께 사용된다.

### pop_heap(b,e)
- 구간의 첫 원소(가장 큰 원소)를 가장 끝 원소와 교환한 후 힙이 유지되게 하면서 제거한다.

### sort_heap(b, e)
- 힙을 정렬. 디폴트는 오름차순으로 정렬

### 조건 사용
- make_heap(b,e,f), push_heap(b,e,f), pop_heap(b,e,f), sort_heap(b,e,f) 모두 조건자 버전 힙 알고리즘으로 f를 조건자로 사용하여 힙 연산을 수행한다.

## sort(b,e), stable_sort(b,e), partial_sort(b,e)
- 순차열의 원소를 정렬.
- sort() 는 퀵정렬을 기반으로 하며, stable_sort()는 머지정렬을 기반으로, partial_sort()는 힙정렬을 기반으로 한다.
- sort() 알고리즘의 경우 평균적으로 O(nlogn), 최악의 경우 O($n^2$) 복잡도를 가지며,
- stable_sort() 는 메모리만 넉넉하다면 O(nlogn), 그렇지 않다면(nlognlogn)의 복잡도를 가진다.
	- 머지정렬을 기반으로 하므로 같은 원소의 정렬에서 원소의 상대적인 순서가 유지된다.
- partial_sort()는 힙정렬을 기반으로 하므로 언제든지 O(nlogn)의 복잡도를 보장하지만 퀵정렬보다는 성능이 떨어진다.
- 조건자를 사용하려면 2항 조건자를 파라미터에 추가시키면 된다.

```cpp
int main()
{
	vector<int> v {1, 3, 2, 5, 4};
	print(v);
	make_heap(v.begin(), v.end());
	print(v);
	v.push_back(7);
	print(v);
	push_heap(v.begin(), v.end());
	print(v);
	pop_heap(v.begin()+2, v.end());
	print(v);
	sort_heap(v.begin(), v.end());
	print(v);

	vector<int> v1 {1, 3, 2, 5, 4};
	vector<int> v2(v1), v3(v1);
	sort(v1.begin(), v1.end());
	print(v1);
	print(v2);
	stable_sort(v2.begin(), v2.end());
	print(v2);
	print(v3);
	partial_sort(v3.begin(), v3.begin()+2, v3.end());
	print(v3);
	return 0;
}
/*
size : 5  [1, 3, 2, 5, 4]
size : 5  [5, 4, 2, 3, 1]
size : 6  [5, 4, 2, 3, 1, 7]
size : 6  [7, 4, 5, 3, 1, 2]
size : 6  [7, 4, 3, 2, 1, 5]
size : 6  [1, 2, 3, 4, 5, 7]
size : 5  [1, 2, 3, 4, 5]
size : 5  [1, 3, 2, 5, 4]
size : 5  [1, 2, 3, 4, 5]
size : 5  [1, 3, 2, 5, 4]
size : 5  [1, 2, 3, 5, 4]
```

# 정렬된 범위 알고리즘

> sorted range algorithms은 정렬된 구간에서만 동작하는 알고리즘이다.  
> 즉, 반드시 정렬돼 있어야 한다.  
> 또한, 같음을 비교할 때 연관 컨테이너처럼 두 원소 a, b에 대해 equality 연산을 하지 않고 !(a<b) && !(b<a) 연산(equivalence)를 함.

## binary_search(b,e,x)
- 구간의 순차열에서 x와 같은 원소가 있으면 true를 반환, 없으면 false를 반환.
- 이진 탐색한다.

## includes(b,e,b2,e2)
- [b2,e2)의 원소가 구간[b,e)의 원소에 포함되면(부분 집합) ture, 아니면 false를 반환한다.
- 한 순차열의 다른 순차열의 부분 집합인지 판단하려면 includes() 알고리즘을 사용한다

## lower_bound(), upper_bound()
- 연관 컨테이너의 멤버 함수 lower_bound(), upper_bound() 와 비슷하다
- 조건자 버전도 있다

## equal_range() 
- 연관 컨테이너의 멤버 함수 equal_range() 와 비슷
- 조건자 버전도 있음

## merge()
- 연관 컨테이너의 멤버 함수 merge() 와 비슷
- 조건자 버전도 있음

## inplace_(b,m,e)
- 하나의 순차열이 두 구간으로 정렬돼 있다면 하나의 구간으로 정렬할 수 있음. 
- 알고리즘은 정렬된[b,m)의 순차열과 정렬된 [m,e) 순차열을 정렬된 [b,e) 순차열로 합병한다.
- 조건자 버전도 있음

## set_union(b,e,b2,e2,t)
- 두 구간의 순차열을 합집합하여 목적지 순차열 [t,p)에 저장한다.
- 조건자 버전도 있음

## set_intersection(b,e,b2,e2,t)
- 교집합

## set_difference()
- 차집합


# 수치 알고리즘

> 수치관련 원소를 다루는 알고리즘.  
> numeric algorithms은 다른 알고리즘과 달리 <numeric> 헤더에 정의된다.

## accumulate(b,e,x) 
- x를 초깃값으로 한 구간 [b,e)의 모든 원소 합을 반환한다.
- 조건을 넣으려면 accumulate(b,e,x,f)
	- f는 이항

## inner_product(b,e,b2,x) 
- x를 초깃값으로 구간 [b,e)의 원소와 구간 [b2, b2+e-b)의 두 순차열의 내적(모든 원소의 곱의 합)을 반환함.
- 함수류 버전은 inner_product(b,e,b2,x,f1,f2) 이다.
	- 각 구간의 원소에 대해 a와 b 각각의 f2 연산 결과를 f1 연산함.

## adjacent_difference(b,e,t)
- 구간[b,e)의 반복자가 p일 때 (*p - *(p-1)) 연산을 목적지 순차열 [t,p)에 저장한다.
- 순차열에서 원소 간의 차를 구하려면 adjacent_difference() 알고리즘을 사용한다 

## partial_sum(b,e,t) 
- 구간 [b,e)의 현재 원소까지의 합(누적)을 목적지 순차열 [t,p)에 저장한다.
순차열에서 현재 원소까지의 합을 구하고자 한다면 partial_sum() 을 사용한다. 

```cpp
int main()
{
	vector<int> v1 {1, 3, 5, 7};
	vector<int> v2 {2, 4, 6, 8};
	cout << "accumulate : " << accumulate(v1.begin(), v1.end(), 0) << endl;
	print(v1);
	print(v2);
	cout << "inner product + 1: " << inner_product(v1.begin(), v1.end(), v2.begin(), 1) << endl;
	vector<int> v3(4,0);
	adjacent_difference(v1.begin(), v1.end(), v3.begin());
	print(v3);
	partial_sum(v2.begin(), v2.end(), v3.begin());
	print(v3);
	return 0;
}
/*
accumulate : 16
size : 4  [1, 3, 5, 7]
size : 4  [2, 4, 6, 8]
inner product + 1: 101
size : 4  [1, 2, 2, 2]
size : 4  [2, 6, 12, 20]
```