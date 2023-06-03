---
title:  "Binary Tree 구현"
excerpt: "DS-7"
excerpt_separator: "<!--more-->"
categories:
  - self_implement
tags:
  - DS, BST

toc: true
toc_sticky: true
 
font-family: $happiness

date: 2023-06-01
last_modified_at: 2023-06-01
---


# BST 구현
### 구현 할 내용

```
데이터: 노드와 간선의 집합, 노드는 공집합이거나 공집합이 아닌 경우 루트노드와 왼쪽 서브트리, 오른쪽 서브트리로 구성됨. 이때 모든 서브트리도 이진트리여야 함.
연산
 - create(): 이진트리를 생성한다
 - isEmpty(): 이진트리가 공백 상태인지 확인한다. 
 - getRoot(): 이진트리의 루트 노드를 반환한다.
 - getCount(): 이진트리의 노드의 수를 반환한다.
 - getHeight(): 이진트리의 높이를 반환한다.
 - insertNode(n): 이진트리에 노드 n을 삽입한다.
 - deleteNode(n): 이진트리에 노드 n을 삭제한다.
 - display(): 이진트리의 내용을 화면에 출력한다.
```

### 노드 클래스

```cpp
class Node {
private:
    int data;
    Node* left;
    Node* right;
public:
    Node(int data_ = 0) : data(data_) {
        left = NULL;
        right = NULL;
    }

    Node* getLeft() {
        return left;
    }

    Node* getRight() {
        return right;
    }

    void setLeft(Node* p) {
        left = p;
    }

    void setRight(Node* p) {
        right = p;
    }

    bool hasChild() {
        if(left == NULL && right == NULL) {
            return false;
        }
        return true;
    }
    int getData() {
        return data;
    }
}
```

### tree 클래스 

```cpp
class Tree() {
private:
    Node* root;

public:

}
```