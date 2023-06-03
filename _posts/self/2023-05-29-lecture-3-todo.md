---
title:  "c++ vector 구현"
excerpt: ""
excerpt_separator: "<!--more-->"
categories:
  - self_implement
tags:
  - Task

toc: true
toc_sticky: true
 
font-family: $happiness

date: 2023-05-29
last_modified_at: 2023-05-29
---
# C++ 의 Vector 구현
### 구현 할 내용

```
MyVector
    - 정수형을 저장하는 동적 배열입니다.
    - 생성자
        - MyVector vec
            - 비어있는 MyVector를 생성
        - MyVector vec(10)
            - 기본값(0)으로 초기화 된 10개의 원소를 가지는 MyVector를 생성
    - 함수
        - empty()
            - 비어잇으면 true, 아니면 false
        - push_back(1)
            - 마지막 원소 뒤에 1을 삽입
        - size()
            - 현재 원소 들어가 있는 갯수
        - capacity()
            - 현재 MyVector 할당된 메모리 크기
        - clear()
        - at(1)
            - 특정 인덱스로 접근
        - find(2)
            - 2를 찾아서 있으면 인덱스, 없으면 -1
        - vec[1]
            - 첨자 연산
```

## 배열로 vector 구현
### 필요 변수
* vecCapacity: 배열의 크기
* length: 배열 내 요소들의 개수, 새로운 요소가 맨 뒤에 추가될 때 삽입되어야 하는 위치 
* array: 원소들을 담을 배열

### MyVector class

```cpp
class MyVector{
private:
    int vecCapacity;
    int length;
    int* vector;
public:
    // 생성자. 초기 배열은 크기3 으로 생성  
    MyVector(int vecCapacity=3) : vecCapacity(vecCapacity) {
        vector = new int [vecCapacity];
        length = 0;
    }
    ~MyVector(){ delete [] vector; }

    bool empty() {
        return length == 0 ? true : false;
    }

    void push_back(int num) {
        // 벡터에 남은 공간이 있는 지 확인
        // 없으면 크기를 늘린 후 삽입
        if(isFull()) {
            expandVector();
        }

        vector[length++] = num;
    }

    int size() {
        return length;
    }

    int capacity() {
        return vecCapacity;
    }

    void clear() {
        // 포인터는 남아 있나??
        delete [] vector;
        vector = new int [vecCapacity];
    }

    int at(int idx) {
        return vector[idx];
    }

    int find(int num) {
        for(int i=0; i<length; i++) {
            if(vector[i] == num) {
                return i;
            }
        }
        return -1;
    }


    bool isFull() {
        return length == vecCapacity ? true : false;
    }

    // 벡터의 공간이 꽉 찬 상태에서 원소 삽입 시 호출
    // 벡터의 크기를 늘리고 원래의 배열의 원소들을 복사해 옴
    void expandVector() {
        vecCapacity *= 2;
        int* tempArray = new int [vecCapacity];
        for(int i=0; i<length; i++) {
            tempArray[i] = vector[i];
        }
        vector = tempArray;
        delete [] tempArray;
    }

};
```