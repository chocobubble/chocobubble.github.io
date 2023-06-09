---
title:  "Binary Tree 구현"
excerpt: "DS-7"
excerpt_separator: "<!--more-->"
categories:
  - self_implement
tags:
  - DS
  - BST

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
 - create(): 이진트리를 생성한다 // 여기선 x
 - isEmpty(): 이진트리가 공백 상태인지 확인한다. 
 - getRoot(): 이진트리의 루트 노드를 반환한다.
 - getCount(): 이진트리의 노드의 수를 반환한다.
 - getHeight(): 이진트리의 높이를 반환한다.
 - insertBinaryTreeNode(n): 이진트리에 노드 n을 삽입한다. // 여기선 x
 - deleteBinaryTreeNode(n): 이진트리에 노드 n을 삭제한다. // 여기선 x
 - display(): 이진트리의 내용을 화면에 출력한다. // 여기선 x
 // 이진트리의 순회 연산
 - void inorder(): 중위순회
 - void preorder(): 전위순회
 - void postorder(): 후위순회
 - void levelorder(): 레벨순회
 // 이진트리의 추가 연산
 - int getCount()
 - int getheight()
 - int getLeafCount()
```

### 노드 클래스

```cpp
class BinaryTreeNode {
private:
    int data;
    BinaryTreeNode* left;
    BinaryTreeNode* right;
public:
    BinaryTreeNode(int data_ = 0, BinaryTreeNode* left_=nullptr, BinaryTreeNode* right_=nullptr)
         : data(data_), left(left_), right(right_) { }

    BinaryTreeNode* getLeft() {
        return left;
    }

    BinaryTreeNode* getRight() {
        return right;
    }

    void setLeft(BinaryTreeNode* p) {
        left = p;
    }

    void setRight(BinaryTreeNode* p) {
        right = p;
    }

    bool hasChild() {
        if(left == NULL && right == NULL) {
            return false;
        }
        return true;
    }

    void setData(int val) {data = val;}

    int getData() {
        return data;
    }

    bool isLeaf() {
        return left==nullptr && right==nullptr;
    }
}
```

### BinaryTreeNodeQueue 클래스
- 이진트리의 레벨순환을 하기 위한 큐 구현.

<details>
<summary> BinaryTreeNodeQueue </summary>
<div markdown="1">       

```cpp
#include "BinaryTreeNode.h"

/** 간단히 원형 큐를 구현한다.  */
class BinaryTreeNodeQueue
{
public:
    BinaryTreeNodeQueue(int CapacityParam = 100) 
        : Capacity(CapacityParam), HeadIndex(0), TailIndex(1) {}
    
    bool IsFull() { return HeadIndex == TailIndex; }
    void Enqueue();
    BinaryTreeNode* Dequeue();

private:
    int Capacity;
    int HeadIndex;
    int TailIndex;
    BinaryTreeNode* CircleQueue[Capacity];
};

void BinaryTreeNodeQueue::Enqueue()
{
    
}
```

</div>
</details>

### tree 클래스 

```cpp
#include "BinaryTreeNodeQueue.h"
#include "BinaryTreeNode.h"
#include <iostream>

class BinaryTree() {
public:
    BinaryTree() : Root(nullptr) { }

    void SetRoot(BinaryTreeNode* BinaryTreeNode) { Root = BinaryTreeNode; }
    /** 이진트리가 공백 상태인지 확인 */
    bool IsEmpty(); 
    BinaryTreeNode* GetRoot() { return Root; }
    /** 이진트리 내 노드의 개수 반환 */
    int GetCount();
    int GetHeight();
    void InsertBinaryTreeNode(BinaryTreeNode* N);
    void DeleteBinaryTreeNode(BinaryTreeNode* N);
    void DisplayBinaryTree();
    void PreOrder()
    {
        cout<<" PreOrder: ";
        PreOrder(Root);
        cout<<endl;
    }
    void InOrder()
    {
        cout<<" InOrder: ";
        InOrder(Root);
        cout<<endl;
    }
    void PostOrder()
    {
        cout<<" PostOrder: ";
        PostOrder(Root);
        cout<<endl;
    }
    void LevelOrder()
    {
        cout<<" LevelOrder: ";
        LevelOrder(Root);
        cout<<endl;
    }
    /** 순환적으로 트리를 순회 */
    void PreOrder(BinaryTreeNode* N);
    void InOrder(BinaryTreeNode* N);
    void PostOrder(BinaryTreeNode* N);
    void LevelOrder(BinaryTreeNode* N);

    /** 해당 노드와 자식 노드들의 개수 리턴 */
    int CountChildBinaryTreeNodes(BinaryTreeNode* N);
private:
    BinaryTreeNode* Root;
}

bool BinaryTree::IsEmpty()
{
    if(Root == nullptr)
    {
        return true;
    }
    else
    {
        return false;
    }
}

int BinaryTree::GetCount()
{
    return CountChildBinaryTreeNodes(Root);
}

int BinaryTree::CountChildBinaryTreeNodes(BinaryTreeNode* BinaryTreeNodePtr)
{
    if(BinaryTreeNodePtr == nullptr)
    {
        return 0;
    }
    else
    {
        return CountChildBinaryTreeNodes(BinaryTreeNodePtr->left) + CountChildBinaryTreeNodes(BinaryTreeNodePtr->right) + 1;
    }
}

int BinaryTree::GetHeight()
{
    return SubtreeHeight(Root);
}

int BinaryTree::SubtreeHeight(BinaryTreeNode* BinaryTreeNodeptr)
{
    if(BinaryTreeNodeptr == nullptr)
    {
        return 0;
    }
    else
    {
        return max(SubtreeHeight(BinaryTreeNodeptr->left), SubtreeHeight(BinaryTreeNodeptr->right)) + 1;
    }
}

void BinaryTree::PreOrder(BinaryTreeNode* BinaryTreeNodeptr)
{
    if(BinaryTreeNodeptr != nullptr)
    {
        cout<<BinaryTreeNodeptr->GetData()<<" ";
        PreOrder(BinaryTreeNodeptr->GetLeft());
        PreOrder(BinaryTreeNodeptr->GetRight());
    }
    else
    {
        return;
    }
}

void BinaryTree::InOrder(BinaryTreeNode* BinaryTreeNodeptr)
{
    if(BinaryTreeNodeptr != nullptr)
    {
        InOrder(BinaryTreeNodeptr->GetLeft());
        cout<<BinaryTreeNodeptr->GetData()<<" ";
        InOrder(BinaryTreeNodeptr->GetRight());
    }
    else
    {
        return;
    }
}

void BinaryTree::PostOrder(BinaryTreeNode* BinaryTreeNodeptr)
{
    if(BinaryTreeNodeptr != nullptr)
    {
        PostOrder(BinaryTreeNodeptr->GetLeft());
        PostOrder(BinaryTreeNodeptr->GetRight());
        cout<<BinaryTreeNodeptr->GetData()<<" ";
    }
    else
    {
        return;
    }
}

void BinaryTree::LevelOrder(BinaryTreeNode* BinaryTreeNodeptr)
{
    if(BinaryTreeNodeptr != nullptr)
    {

    }
    else
    {
        return;
    }
}

```

```cpp
#include "BinaryTree.h"
int main()
{
    BinaryTree Tree;
    BinaryTree* D = new BinaryTreeNode(4, nullptr, nullptr);
    BinaryTree* E = new BinaryTreeNode(5, nullptr, nullptr);
    BinaryTree* B = new BinaryTreeNode(2, D, E);
    BinaryTree* F = new BinaryTreeNode(6, nullptr, nullptr);
    BinaryTree* C = new BinaryTreeNode(3, F, nullptr);
    BinaryTree* A = new BinaryTreeNode(1, B, C);
    Tree.SetRoot(A);
    Tree.PreOrder();
    Tree.InOrer();
    Tree.PostOrder();
    Tree.LevelOrder();
}

```