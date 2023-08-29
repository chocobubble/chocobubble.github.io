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
last_modified_at: 2023-08-30
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

# 연관 컨테이너
> 연관 컨테이너는 특정 정렬 규칙에 따라 저장 원소가 컨테이너에 정렬된다.  
> STL의 표준 연관 컨테이너는 set, map, multiset, multimap 이 있다.  
> 모든 연관 컨테이너는 노드 기반 컨테이너이며 균형 이진 트리로 구현된다.

# set 컨테이너
> key라 불리는 원소(value)의 집합으로 이뤄진 컨테이너이다.

## set의 주요 인터페이스와 특징

```
template<
    class Key,
    class Compare = std::less<Key>,
    class Allocator = std::allocator<Key>
> class set;
```

> Key는 set 컨테이너 원소의 형식이며, Compare는 set의 정렬 기준인 조건자이다.  
> 기본 조건자는 less이다.

- set은 컨테이너에 원소(key)를 저장(삽입)하는 유일한 멤버 함수 insert()를 제공한다.
- 연관 컨테이너에는 정렬 기준이 있으므로 삽입된 원소는 자동으로 정렬된다.
- set은 모든 원소(key)가 유일하며 중복이 없다. 중복을 허용하려면 multiset을 사용해야 한다.

- 연관 컨테이너는 균형 이진 트리를 사용하므로 찾기 연산(find(), lower_bound(), upper_bound(), equal_range(), count())에 뛰어난 성능을 보이며 insert() 멤버 함수도 로그 시간 복잡도를 보인다.

- 시퀀스 컨테이너가 아니므로 순서와 관련된 함수류인 push_back(), push_front() 등을 제공하지 않는다.

- 반복자의 탐색 순서는 inorder 이진 트리 탐색을 사용한다. 
- 중복을 허용하지 않으므로 중복된 원소를 삽입하려 할 시 반환값으로 실패를 알려 준다. 
	- 반환값은 pair 객체이며 first와 second는 각각 삽입된 원소(key)의 위치를 가리키는 반복자와 성공 혹은 실패를 알려주는 bool 값이다.

- 연관 컨테이너는 시퀀스 컨테이너처럼 삽입할 위치(반복자)를 지정하는 버전과 삽입할 구간(반복자 쌍)을 지정하는 버전의 insert()도 제공한다.
	- 단, key의 삽입 위치를 지정하는 버전은 삽입 탐색을 시작할 위치로 삽입 위치가 정렬 순서와 맞는다면 바로 삽입되지만 아니라면 로그 시간이 걸린다.

- 연관 컨테이너는 모두 같은 인터페이스의 멤버 함수를 제공한다. 핵심 인터페이스는 찾기 관련 멤버함수이다. 로그 시간 복잡도에 실행된다. 의미는 없지만 count() 함수를 제공한다(모두 같은 멤버 함수를 제공하니까)

- find()도 핵심 멤버 함수이다. key를 검색하여 key를 가리키는 반복자를 반환한다. 만약 없다면 끝 표시(past-the-end) 반복자를 반환한다.

- 연관 컨테이너는 모두 같은 인터페이스의 함수를 제공한다. 연관 컨테이너는 앞, 뒤에 추가하거나 제거하는 멤버 함수류를 제공하지 않으며 또한 첫 원소와 마지막 원소를 반환하는 front(), back()함수도 제공하지 않는다.
- 모든 연관 컨테이너의 key는 변경할 수 없다. 양방향 반복자를 지원하며 멤버 변수 begin(), end(), rbegin(), rend()는 순차열의 시작과 끝을 가리키는 반복자를 반환한다.




# multiset 컨테이너
- 중복 원소를 컨테이너에 저장할 수 있다는 것을 제외하면 set과 동일하다.

# map 컨테이너
- key와 value를 쌍(pair 객체)으로 저장한다.
	- first는 key, second는 value
- set처럼 key는 중복 저장될 수 없다.
- 중복 저장하려면 multimap으로 사용하기

## 주요 인터페이스와 특징
- [] 연산자를 제공하여 key에 해당하는 원소의 value에 쉽게 접근하거나 변경 가능하다.

```cpp
template<typename T1, typename T2>
void print(map<T1, T2> m) {
	for(auto iter = m.begin(); iter != m.end(); ++iter) {
		cout << "string : " << (*iter).first << " , int : " << (*iter).second << endl;
	}
}

template<typename T1, typename T2, typename T3>
void print(map<T1, T2, T3> m) {
	for(auto iter = m.begin(); iter != m.end(); ++iter) {
		cout << "string : " << (*iter).first << " , int : " << (*iter).second << endl;
	}
}

int main()
{
	map<int, string, greater<int>> m;
	m[1] = "string1";
	print(m);

	map<int, int> intmap;
	intmap.insert(make_pair(1, 10));
	pair<map<int,int>::iterator, bool> pr;
	pr = intmap.insert(pair<int, int>(2, 20));
	if(pr.second) {
		cout << "pr.first->first : " << pr.first->first << endl;
		cout << "pr.first->second : " << pr.first->second << endl;
	}
	intmap[2] = 40;
	print(intmap);
	if(intmap.find(1) != intmap.end()) cout << "key 1 is in intmap" << endl;
	
	return 0;
}

/*
string : 1 , int : string1
pr.first->first : 2
pr.first->second : 20
string : 1 , int : 10
string : 2 , int : 40
key 1 is in intmap
```

# multimap
- map 과 비슷하지만 key를 중복해서 저장할 수 있다는 특징이 있다.
- count(), lower_bound(), upper_bound(), equip_range() 등의 멤버함수가 의미가 있어 진다.