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
#include <iostream>

class MyVector{
private:
    // 할당된 공간의 크기  
    int vecCapacity;
    // 원소의 개수
    int length;
    // 벡터를 구성할 배열
    int* vector;
public:
    // 생성자. 초기 배열은 크기3 으로 생성  
    MyVector(int vecCapacity=3) : vecCapacity(vecCapacity) {
        vector = new int [vecCapacity];
        length = 0;
    }
    ~MyVector(){ delete [] vector; }

    bool isEmpty() {
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
        delete [] vector;
        vecCapacity = 3;
        length = 0;
        vector = new int [vecCapacity];
    }

    int at(int idx) {
        if(idx < 0 || idx >= length) {
            std::cout<<"옳지 않은 인덱스에 접근했습니다. 인덱스를 확인해 주세요"<<std::endl;
            return -1;
        }
        return vector[idx];
    }

    int find(int num) {
        for(int i=0; i<length; i++) {
            if(vector[i] == num) {
                return i;
            }
        }
        // 원하는 숫자가 벡터 내에 없는 경우
        std::cout<<"벡터 내에 "<<num<<"이 존재하지 않습니다."<<std::endl;
        return -1;
    }

    int operator[] (int idx) {
        if(idx < 0 || idx >= length) {
            std::cout<<"옳지 않은 인덱스에 접근했습니다. 인덱스를 확인해 주세요"<<std::endl;
            return -1;
        }
        return vector[idx];
    }

    // idx 위치에 num을 삽입
    void insert(int idx, int num) {
        if(idx < 0 || idx >= length) {
            std::cout<<"옳지 않은 인덱스에 접근했습니다. 인덱스를 확인해 주세요"<<std::endl;
            return;
        }
        // 벡터의 용량이 꽉 차있으면 늘려주기
        if( isFull() ) expandVector();
        // 숫자를 삽입하기 위해 idx 위치부터 오른쪽 끝까지
        // 원소들을 하나씩 옮기기
        for(int i=length; i>idx; i--) {
            vector[i] = vector[i-1];
        }
        vector[idx] = num;
        // 원소의 개수가 늘었다.
        length++;
    }
    
    // idx 위치의 원소 삭제
    void erase(int idx) {
        if(idx < 0 || idx >= length) {
            std::cout<<"옳지 않은 인덱스에 접근했습니다. 인덱스를 확인해 주세요"<<std::endl;
            return;
        }
        // 숫자를 idx 위치부터 오른쪽 끝까지
        // 원소들을 하나씩 왼쪽으로 옮겨 idx위치의 원소 지우기
        for(int i=idx; i<length-1; i++) {
            vector[i] = vector[i+1];
        }
        // 원소의 개수가 줄었다.
        length--;
    }


    bool isFull() {
        return length == vecCapacity ? true : false;
    }

    // 벡터 내의 모든 원소 출력
    void display() {
        if(isEmpty()) {
            std::cout<<"벡터가 비어 있습니다."<<std::endl;
        } else {
            std::cout<<"벡터 내의 원소들 : ";
            for(int i=0; i<length; i++) {
                std::cout<<vector[i]<<", ";
            }
            std::cout<<std::endl;
        }
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
        //delete [] tempArray;
    }

};

int main() {
    MyVector v;
    if(v.isEmpty()) std::cout<<"v is empty"<<std::endl;
    std::cout<<"v에 3, 5, 7 삽입"<<std::endl;
    v.push_back(3);
    v.push_back(5);
    v.push_back(7);
    std::cout<<"v의 원소의 개수 = "<<v.size()<<std::endl;
    std::cout<<"v의 크기 = "<<v.capacity()<<std::endl;
    v.clear();
    std::cout<<"v 초기화"<<std::endl;
    std::cout<<"v의 원소의 개수 = "<<v.size()<<std::endl;
    std::cout<<"v의 크기 = "<<v.capacity()<<std::endl;
    std::cout<<"v에 3, 5, 7 삽입"<<std::endl;
    v.push_back(3);
    v.push_back(5);
    v.push_back(7);
    std::cout<<"인덱스 1 위치에 8 삽입"<<std::endl;
    v.insert(1, 8);
    v.display();
    std::cout<<"인덱스 1 위치의 숫자 = " <<v.at(1)<<std::endl;
    std::cout<<"8의 위치 = "<<v.find(8)<<std::endl;
    std::cout<<"인덱스 2 위치의 숫자 = "<<v[2]<<std::endl;
    std::cout<<"v의 원소의 개수 = "<<v.size()<<std::endl;
    std::cout<<"v의 크기 = "<<v.capacity()<<std::endl;
    v.display();
    std::cout<<"인덱스 1 위치의 원소 삭제"<<std::endl;
    v.erase(1);
    v.display();

    return -1;
}
```