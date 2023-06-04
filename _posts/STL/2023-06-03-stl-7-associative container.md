---
title:  "STL - 연관 컨테이너"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL, Associative Container, set, map, multiset, multimap

toc: true
toc_sticky: true
 
font-family: $happiness

use_math: true

date: 2023-06-03
last_modified_at: 2023-06-03
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

# 연관 컨테이너
> 연관 컨테이너는 특정 정렬 규칙에 따라 저장 원소가 컨테이너에 정렬된다.  
> STL의 표준 연관 컨테이너는 set, map, multiset, multimap 이 있다.  
> 모든 연관 컨테이너는 노드 기반 컨테이너이며 균형 이진 트리로 구현된다.

# set 컨테이너
> key라 불리는 원소(value)의 집합으로 이뤄진 컨테이너이다.

## set의 주요 인터페이스와 특징

### 템플릿 형식
```
template<
    class Key,
    class Compare = std::less<Key>,
    class Allocator = std::allocator<Key>
> class set;
```

> Key는 set 컨테이너 원소의 형식이며, Compare는 set의 정렬 기준인 조건자이다.  
> 기본 조건자는 less이다.

### 생성자

|set s;|s는 빈 컨테이너|
|--|--|
|set s(cmp)|s는 빈 컨테이너로 정렬 기준은 cmp 조건자를 사용한다|
|set s(s2)|s는 s2 컨테이너의 복사본이다(복사 생성자 호출)
|set s(b,e)|s는 반복자 구간[b, e)로 초기화된 원소를 갖는다.|
|set s(b,e,cmp)|s는 반복자 구간[b, e)로 초기화된 원소를 갖는다. 정렬 기준은 cmp|

### 멤버 함수
|p=s.begin()||
|--|--|
|s.clear()||
|n=s.count(k)||
|s.empty()||
|p=s.end()||
|pr=s.equal_range(k)||
|q=s.erase(p)||
|q=s.erase(b,e)||
|n=s.erase(k)|
|p=s.find(k)|
|pr=s.insert(k)|s 컨테이너에 k를 삽입한다. pr은 삽입한 원소를 가리키는 반복자와 성공 여부의 bool 값인 pair다|
|q=s.insert(p,k)|
|s.insert(b,e)|
|cmp=s.key_comp()|
|cmp=s.value_comp()|
|p=s.lower_bound(k)|
|p=s.upper_bound(k)|
|n=s.max_size()|n은 s가 담을 수 있는 최대 원소의 크기(메모리의 크기)
|p=s.rbegin()|
|p=s.rend()|
|s.size()|
|v.swap(v2)|


### 연산자
> 문자열 비교처럼 실행된다.

### set의 특징
set은 컨테이너에 원소(key)를 저장(삽입)하는 유일한 멤버 함수 insert()를 제공한다. 연관 컨테이너에는 정렬 기준이 있으므로 삽입된 원소는 자동으로 정렬된다. set은 모든 원소(key)가 유일하며 중복이 없다. 중복을 허용하려면 multiset을 사용해야 한다.

 정렬 기준은 템플릿 매개변수에 지정할 수 있으며, 디폴트는 less 조건자이다. 연관 컨테이너는 균형 이진 트리를 사용하므로 찾기 연산(find(), lower_bound(), upper_bound(), equal_range(), count())에 뛰어난 성능을 보이며 insert() 멤버 함수도 로그 시간 복잡도를 보인다.

시퀀스 컨테이너가 아니므로 순서와 관련된 함수류인 push_back(), push_front() 등을 제공하지 않는다.

```cpp
set<int> s;
s.insert(k);
```

반복자의 탐색 순서는 inorder 이진 트리 탐색을 사용한다. 중복을 허용하지 않으므로 중복된 원소를 삽입하려 할 시 반환값으로 실패를 알려 준다. 반환값은 pair 객체이며 first와 second는 각각 삽입된 원소(key)의 위치를 가리키는 반복자와 성공 혹은 실패를 알려주는 bool 값이다.

```cpp
pair<set<int>::iterator, bool> pr;
pr = s.insert(50);
if(true == pr.second){ ... }
pr=s.insert(50);
// 실패
if(false == pr.second) { ... }

for(set<int>::iterator iter = s.begin();
		iter != s.end(); ++iter)
{ ... }
```

연관 컨테이너는 시퀀스 컨테이너처럼 삽입할 위치(반복자)를 지정하는 버전과 삽입할 구간(반복자 쌍)을 지정하는 버전의 insert()도 제공한다. 단, key의 삽입 위치를 지정하는 버전은 삽입 탐색을 시작할 위치로 삽입 위치가 정렬 순서와 맞는다면 바로 삽입되지만 아니라면 로그 시간이 걸린다.

```cpp
pair<set<int>::iterator, bool> pr;
pr=s.insert(90);
//pr.first는 90 원소의 반복자
s.insert(pr.first, 85);
```

정렬 기준은 다음과 같이 템플릿 매개 변수를 사용해 바꾼다

```cpp
set<int,greater<int>> s;
// 정렬 기준으로 greater<int> 조건자를 사용
set<int, greater<int>>::iterator iter;
// greater<int> 조건자를 사용하는 반복자 생성
```

set은 사용 중인 정렬 기준 조건자를 반환하는 멤버 함수 key_comp()와 value_comp()를 제공한다. 이 때 정렬 기준 형식은 typedef 내장 멤버 형식 key_compare와 value_compare로 제공한다. set은 key만 있으므로 value와 key타입이 같음

```cpp
set<int, less<int>> s_less;
set<int, greater<int>> s_greater;
set<int, less<int>>::key_compare l_cmp=s_less.key_comp();
set<int, greater<int>>::key_compare g_cmp=s_greater.key_comp();
```

연관 컨테이너는 모두 같은 인터페이스의 멤버 함수를 제공한다. 핵심 인터페이스는 찾기 관련 멤버함수이다. 로그 시간 복잡도에 실행된다. 의미는 없지만 count() 함수를 제공한다(모두 같은 멤버 함수를 제공하니까)

find()도 핵심 멤버 함수이다. key를 검색하여 key를 가리키는 반복자를 반환한다. 만약 없다면 끝 표시(past-the-end) 반복자를 반환한다.

```cpp
iter = s.find(30);
if(iter != s.end()) { ... }
// 원소 30이 안에 있다면 true. 
```

연관 컨테이너의 찾기 관련 멤버 함수는 원소를 찾을 때 == 연산을 사용하지 않음. 정렬 기준 조건자를 이용해 찾기 연산을 수행한다. 예로 정렬 기준이 less 라면 < 연산을 수행하므로 비교하는 두 원소 a, b가 !(a < b) && !(b<a)라면 두 원소는 같다고 판단한다.(equivalence)

더 정확히 하자면 s 컨테이너의 정렬 기준을 반환하는 멤버함수가 key_comp() 이므로 !s.key_comp()(a, b) && !s.key_comp()(b,a)이면 두 원소는 같다.

lower_bound()와 upper_bound()는 찾은 원소를 순차열 구간(반복자 쌍)으로 반환하는 멤버 함수이다. lower_bound()는 찾은 원소의 시작 반복자를 반환하며 upper_bound()는 찾은 원소의 다음 원소를 가리키는 반복자이다. 그래서 구간 [lower_bound(), upper_bound())로 표현할 수 있다. 즉, lower_bound()와 upper_bound()가 같다면 찾는 원소가 없다는 것이다.

```cpp
set<int>::iterator iter_lower;
set<int>::iterator iter_upper;
iter_lower = s.lower_bound(30);
iter_upper = s.upper_bound(30);
if(iter_lower != iter_upper) { .. }
// 30이 존재하는 경우 true
```

equal_range()는 lower_bound(), upper_bound()의 반복자 쌍을 pair 객체로 반환한다

```cpp
pair<set<int>::iterator, set<int>::iterator> iter_pair;
iter_pair = s.equal_range(30);
```

## set의 주요 특징 정리

set는 대표적인 연관 컨테이너이자 노드 기반 컨테이너이다. 연관 컨테이너는 특정 정렬 기준에 의해 원소가 자동 정렬되는 컨테이너이다. 또한 원소 찾기를 로그 시간 복잡도에 수행할 수 있도록 균형 이진 트리로 구현된다. 연관 컨테이너는 모두 같은 인터페이스의 함수를 제공한다. 연관 컨테이너는 앞, 뒤에 추가하거나 제거하는 멤버 함수류를 제공하지 않으며 또한 첫 원소와 마지막 원소를 반환하는 front(), back()함수도 제공하지 않는다. 모든 연관 컨테이너의 key는 변경할 수 없다. 양방향 반복자를 지원하며 멤버 변수 begin(), end(), rbegin(), rend()는 순차열의 시작과 끝을 가리키는 반복자를 반환한다.