---
title:  "STL - 컨테이너 어댑터"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - stack
  - queue
  - priority_queue

toc: true
toc_sticky: true
use_math: true

date: 2023-08-31
last_modified_at: 2023-08-31
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

# stack 컨테이너
- LIFO 방식의 컨테이너이다.
- 기본 컨테이너는 deque 컨테이너이다.
	- vector, list로 설정 가능

### 템플릿 형식

```cpp
template<typename T, typename Container=deque<T>>
class stack
```

## 멤버 함수
- empty(), size(), push(x), pop(), top() 등이 있다.


<br>

---

<br>

# queue 컨테이너
- FIFO 방식 구현한 컨테이너
- 기본 컨테이너는 deque.
- 스택과 대부분 비슷하다.

## 멤버 함수
- top() 이 없다.
- front(), back() 등이 더 지원된다.


---

<br><br>

# priority_queue 컨테이너
- 우선순위 queue를 구현한 템플릿 클래스이다.
- 기본 컨테이너는 vector이다.
	- vector, deque 가능
- 내부적으로 STL의 힙 알고리즘을 사용하여 구현돼 있다.
	- make_heap(), push_heap(), pop_hea()


## 템플릿 형식

```cpp
template<typename T, typename Container=vector<T>,
		 typename Comp=less<typename Container::value_type>>
class priority_queue
```

## 멤버 함수
- empty(), size(), push(x), pop(), top() 등이 있다.
