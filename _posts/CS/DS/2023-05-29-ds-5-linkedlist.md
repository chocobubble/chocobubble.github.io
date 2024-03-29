---
title:  "자료 구조 - 연결 리스트"
excerpt: "C++로 쉽게 풀어쓴 자료구조 1판 - 천인국, 최영규"
excerpt_separator: "<!--more-->"
categories:
  - DS
tags:
  - DS, LinkedList

toc: true
toc_sticky: true

use_math : true
 
font-family: $happiness

date: 2023-05-29
last_modified_at: 2023-05-29
---
> 'c++로 쉽게 풀어쓴 자료구조 1판 - 천인국, 최영규' 책을 참고하여 작성한 포스트입니다.

# 포인터  
포인터는 메모리의 특정 주소를 저장하기 위해 사용되는 변수이다.  
32비트 운영체제의 경우 포인터 변수의 크기가 4바이트이며, 64비트 주소체계를 사용하는 운영체제의 경우 8바이트 이다.  

## 포인터 선언

```cpp
char* ptr;
char *p, *q, *r;
char** pptr;
void (*f)(int); // int를 매개변수로 갖고 반환이 없는 함수의 주소를 저장
void *p; // 아무것도 가리키지 않는 포인터.
// void 포인터는 다음과 같이 바꿔 사용한다.
int* pi = (int*)p;
```

## 파라미터와 포인터

```cpp
void someFunc1(SomeClass a, SomeClass b);
void someFunc2(SomeClass* aPtr, SomeClass* bPtr);
void someFunc3(SomeClass& aRef, SomeClass& bRef);
```

1. 첫 함수 호출 시 두 SomeClass 객체에 대한 복사가 일어나는데, 이때 복사 생성자가 호출된다. 크기가 큰 클래스라면 매개변수 전달을 위해 많은 메모리의 복사가 필요할 것이고 시스템의 낭비겠죠
2. 두 번째 함수 호출 시 클래스의 크기와 상관 없이 매개변수 전달을 위해 aPtr, bPtr 주소만 복사한다.
3. 세 번째 함수 호출 시 복사가 일어나는 **값에 의한 호출(call-by-value)** 가 아닌 인수에 대한 별명을 사용하여 단순히 참조하는 **참조에 의한 호출(call-by-reference)**이 일어난다. 이 경우 매개변수 전달을 위해 어떠한 복사도 일어나지 않는다.


## 함수 포인터

```cpp
void func(int a) {};

void main() {
	// f는 함수의 주소를 담는 포인터 타입
	void (*f)(int);
	f = func;
	f(10); // == func(10)
	(*f)(10); // == f(10)

// func(10) == f(10) == (*f)(10)
}
```

# 동적 메모리 할당
## 정적 메모리 할당(static memory allocation)
- 필요한 메모리의 크기가 컴파일 될 때 결정되고 프로그램 실행 중 크기 변경할 수 없다.
- 변수 선언 시 자동으로 메모리가 할당되고, 해당 프로그램 블록이 끝나면 자동으로 제거된다.
- 예시  
```cpp
int x;
int buffer[100];
char name[] = "data structure";
```

## 동적 메모리 할당(dynamic memory allocation)
- 프로그램 실행 중에 필요한 메모리 크기를 결정하고 시스템으로부터 할당받아 사용하고 해제한다.
- 메모리 효율적
- 메모리 생성과 해제를 직접 관리해야 한다.

### 동적 메모리 할당 및 해제 연산자
- new 연산자
	- 타입 크기의 메모리 블록을 할당하고 그 블록의 시작 주소(즉, 포인터)를 반환한다.
	- 여러 객체 동적 할당도 가능하다.
		- data_type* array = new data_type[size];
- delete 연산자
	- 동적으로 할당되었던 메모리 블록을 시스템에 반납한다.
	- 여러 객체를 동적 할당한 경우는
		- []를 사용하여 해제해 주어야 한다.
	- 동적 할당한 메모리를 해제해주지 않으면 메모리 누수가 발생한다.

## 2차원 배열의 동적 할당
- c++은 1차원 배열 형태의 동적 할당 및 해제 방법만 제공한다.
- 그래서 2중 포인터 변수를 사용한다.

```cpp
int** mat = new int*[rows];
for (int i=0; i<rows; ++i) {
	mat[i] = new int [cols];
}

int x = mat[3][4];
```
### 동적 해제
- new 연산자가 사용된만큼 delete 연산자를 사용해 주어야 한다.

```cpp
if(mat != nullptr) {
	for (int i=0; i<rows; ++i) {
		delete[] mat[i];
	}
	delete[] mat;
}
```


---

# 연결리스트
## 연결리스트란?
앞서 배열로 자료구조를 구현하였을 때, 크기가 고정된다는 단점이 있었다. 동적으로 크기가 변할 수 있는 보다 자유로운 방법으로 **연결된 표현(linked representation)**을 사용하면 된다.
> ### 연결된 표현
> 데이터와 링크로 구성되어 있고, 링크가 노드들을 연결하는 역할을 한다.
> 특징은 다음과 같다.  
> - 데이터를 한군데 모아두는 것을 포기한다  
> - 데이터들은 메인 메모리상의 어디에나 흩어져서 존재할 수 있다.
> - 순서를 유지하기 위해 각각의 데이터는 다음 데이터를 가리키는 줄(링크)을 가진다.
> - 첫 데이터에서부터 순서대로 줄을 따라가면 모든 데이터를 방문할 수 있다.

> ### 연결리스트(linked list)
> 물리적으로 흩어져 있는 자료들을 서로 연결하여 하나로 묶는 방법. 
> 배열과 대응되는 의미로 다음과 같은 장점들이 있다.
> - 크기가 고정되지 않아 메모리를 할당할 수 있는 한 계속 자료를 넣을 수 있다. 배열의 경우 사용하지 않더라도 한꺼번에 많은 공간을 할당해야 한다.
> - 중간에 자료를 삽입 혹은 삭제가 용이하다. ($O(1)$)  

> 그러나 연결 리스트는 배열에 비해 상대적으로 구현이 어렵고 데이터 탐색 시 순차적으로 접근해야 한다는 단점이 있다.

## 연결 리스트의 구조
### 노드(Node)
* 연결리스트는 노드들의 집합이며 이들은 데이터를 저장하고 있고 서로 연결되어 있다. 일반적인 노드는 데이터 필드(data field)와 링크 필드(link field)로 구성되어 있다. 데이터 필드에는 저장하고 싶은 자료가 저장되며, 링크 필드에는 다른 노드를 가리키는 포인터 변수가 있다. 이 포인트로 현재 노드에 연결된 다음 노드를 알 수 있다.

### 헤드 포인터(head pointer)
* 헤드 포인터란 연결 리스트에서 첫 번째 노드를 가리키는 포인터이다. 연결 리스트는 첫 번째 노드를 알면 링크로 매달려 있는 전체 노드에 모두 접근이 가능하다.

### 연결 리스트의 단점
1. 링크 필드를 위한 추가 공간이 필요하고,
2. 연산의 구현이나 사용 방법이 배열에 비해 복잡하다.
3. 그에 따라 오류가 발생할 가능성도 많으며,
4. <u>동적 할당과 해제가 너무 빈번하게 일어나는 경우 메모리 관리를 위한 처리 시간이 지나치게 길어져 프로그램이 느려질 수 있다.</u> (이유 추가하기.)

## 연결 리스트의 종류
> 연결 리스트에는 단순 연결 리스트(singly linked list)와 이중 연결 리스트(doubly linked list)가 있다.

### 단순 연결리스트
* 하나의 방향으로만 연결되어 있으며, 맨 마지막 노드의 링크 필드는 NULL 값을 가진다.

### 이중 연결 리스트
- 각 노드마다 링크 필드, 즉 포인터가 2개씩 존재
* 다음 장에서 살펴 보겠음!!

# 연결 리스트로 구현한 스택
저번에 스택을 배열로 구현하였다. 포인터를 이용한 연결 리스트로 구현해 보자.
* 추상 자료형은 이전의 스택과 동일하다.

* 핵심은 삽입, 삭제 등 연산 시 해당 노드를 가리키는 링크를 잃어버리지 않아야 한다는 것이다!
{: .notice} 


### 노드 구현
* 먼저 데이터를 담을 클래스를 구현한다.

```cpp
#include <cstdio>
#include <csdlib>
#include <cstring>
#define MAX_STRING 100
// 안의 내용은 중요하지 않음!
class Data {
    // 정수하면 가장 먼저 생각 나는 인덱스..
    int idx;
    // 정수만 있으면 좀 그러니 문자열도
    char str[MAX_STRING];

public:
    Data(int i=0; char* s="") {  set(i, s); }
    void set(int i, char* s) {
        idx = i;
        strcpy(str, s); // 문자열 복사 함수
    }

    void display() {
        printf("%d인덱스의 문자열은 %s이다.\n", idx, str);
    }
}; // 빼먹지 말기
``` 

* 데이터 클래스에 링크를 포함시켜 노드를 구현한다.

```cpp
// 데이터 필드를 상속으로 처리
// 상속없이 노드 클래스 내에 
// Data data; 선언을 해주어도 됨
#include "Data.h"

class Node : public Data {
    Node* link; // 링크 필드
public:
    Node(int i=0; char* s="") 
        : Data(i, s) { link = NULL; } // 마지막 노드의 링크는 NULL을 가리켜야 한다.
    ~Node(void) {}  // ~Node() {} 와 동일?

    // private으로 선언된 link에 접근하기 위한 메소드
    Node* getLink() {
        return link;
    }

    // private으로 선언된 link에 포인터(?)를 할당하기 위한 메소드
    void setLink(Node *p) {
        link = p;
    }
}; // 빼먹지 말기
```

### 연산 구현

```cpp
#include "Node.h"
class LinkedStack {
    Node* top; // 헤드 포인터
private:
    LinkedStack() { top = NULL; }
    // 소멸자 유의 깊게 보기
    // pop으로 노드를 반환 받아 삭제함
    ~LinkedStack() { while(!isEmpty()) delete pop(); }

    // 헤더 포인터가 NULL을 가리키면
    // 링크드리스트는 빈 것이죠
    bool isEmpty() {
        return top==NULL;
    }

    // 삽입 메소드
    void push( Node *p ) {
        if (isEmpty()) {
            top = p;
        } else {
            // stack은 후입 선출이므로
            // 헤드 포인터를 새로 들어온 p로
            // 변경해 주어야 한다.
            p.setLink(top);
            top = p;
        }
    }

    // 삭제 메소드
    Node* pop() {
        if (isEmpty()) {
            return NULL;
        } else {
            // 헤드 포인터를 다음 노드로 옮기고
            // 맨 마지막 노드를 반환한다
            Node *p = top;
            top = top->getLink();
            return p;
        }
    }

    Node* peek() {
        // 아래와 같이 empty일 때 NULL을 반환하는 경우
        // empty 체크는 안해도 결과는 NULL로 같다. 
        if (isEmpty()) {
            return NULL;
        } else {
            // top->getLink() 가 아님!
            return top;
        }
    }

    // 순회 해 보자!
    void display() {
        // 연결 리스트를 수정 하면 안되니까
        // top이 아닌 새로운 포인터 p로 순회
        Node* p = top;
        while(p != NULL) {
            p->display();
            p = p->getLink();
        }
    }
};
```

# 연결리스트로 구현한 큐

[연결리스트로 구현한 큐](https://chocobubble.github.io/self_implement/self-LinkedQueue/)

