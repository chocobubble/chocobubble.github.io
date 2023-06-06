---
title:  "LinkedQueue 구현"
excerpt: "DS-6"
excerpt_separator: "<!--more-->"
categories:
  - self_implement
tags:
  - Task

toc: true
toc_sticky: true
 
font-family: $happiness

date: 2023-05-31
last_modified_at: 2023-05-31
---
# LinkedQueue 구현
### 구현 할 내용

```
데이터: 선입선출의 접근 방법을 유지하는 요소들의 모음
연산
 - enqueue(e): 주어진 요소 e를 큐의 맨 뒤에 추가
 - dequeue(): 큐가 비어 있지 않으면 맨 앞에 있는 요소를 삭제하고 반환
 - isEmpty(): 큐가 비어 있으면 true, 그렇지 않으면 false 반환
 - peek(): 큐가 비어있지 않으면 맨 앞에 있는 요소를 삭제하지 않고 반환
 - display(): 큐 내의 모든 요소들을 출력함
 ```

### 노드 클래스

```cpp
// Node.h
#include <cstdio>

class Node {
    int data;
    Node* link;
public:
    Node (int data_ = 0) : data(data_) { link = NULL; }
    int getData() {
        return data;
    }
    Node* getLink() {
        return link;
    }
    void setLink(Node* p) {
        link = p;
    }
};
```

### LinkedQueue 클래스

```cpp
// LinkedQueue.h
#include "Node.h"

class LinkedQueue {
    Node *head, *tail;
public:
    LinkedQueue() {
        head = new Node; //??
        tail = new Node; //??
    }
    ~LinkedQueue() {
        delete head;
        delete tail;
    }
    bool isEmpty() {
        if( head->getLink() == NULL) return true;
        else return false;
    }
    
    void enqueue(Node* p) {
        if(isEmpty()) {
            head -> setLink(p);
            tail = p;
        } else {
            tail->setLink(p);
            tail = p;
        }
    }
    Node* dequeue() {
        if(isEmpty()) {
            printf("queue is empty");
            return NULL;
        }
        Node* p = head->getLink();
        head = head->getLink();
        return p;
    }
    Node* peek() {
        if(isEmpty()) {
            printf("queue is empty");
            return NULL;
        }
        return head->getLink();
    }
    void display() {
        Node* p = head->getLink();
        while(p != NULL) {
            printf("%d ", p->getData());
            p = p->getLink();
        }
        printf("\n");
    }
};
```

### main.cpp

```cpp
#include "LinkedQueue.h"
#include <iostream>

int main() {
    LinkedQueue lq;
    lq.enqueue(new Node(4));
    lq.enqueue(new Node(5));
    lq.display();
    Node* temp = lq.dequeue();
    lq.display();
    temp = lq.dequeue();
    lq.display();
    lq.enqueue(new Node());

    Node* n = lq.peek();
    std::cout<<n->getData()<<std::endl;

    return 1;
}
```

### 실행 결과
```
4 5 
5 

0
```