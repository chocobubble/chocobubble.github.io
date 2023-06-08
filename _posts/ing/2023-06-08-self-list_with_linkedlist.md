---
title:  "[구현] List - Linked List"
excerpt: "list"
excerpt_separator: "<!--more-->"
categories:
  - ing
tags:
  - DS
  - List
  - Linked List

toc: true
toc_sticky: true

date: 2023-06-08
last_modified_at: 2023-06-08
---

> 언리얼엔진 코딩 표준을 참고하여 작성하였습니다.

---



# 리스트의 추상 자료형

```
데이터: 임의의 접근 방법을 제공하는 같은 타입 요소들의 순서 있는 모임  
연산
 - insert(pos, item): 리스트의 pos 위치에 새로운 요소 item을 삽입
 - delete(pos): 리스트의 pos 위치에 있는 요소를 삭제한다.
 - getEntry(pos): 리스트의 pos 위치에 있는 요소를 반환한다.
 - isEmpty(): 리스트가 비어 있는지를 검사한다.
 - isFull(): 리스트가 가득 차 있는지를 검사한다.
 - find(item): 리스트에 요소 item이 있는지를 검사한다.
 - replace(pos, item): 리스트의 pos 위치에 있는 요소를 새로운 요소 item으로 바꾼다.
 - size(): 리스트 안의 요소의 개수를 반환한다.
 - display(): 리스트 안의 모든 요소들을 출력한다. 
```


# 연결 리스트로 구현된 리스트
* 리스트를 연결 리스트로 구현하면 배열의 경우와 달리 비효율적인 많은 자료의 이동을 하지 않아도 된다.
* 앞서서는 연결 리스트 사용 시 헤드 포인터를 사용 하였다. 여기서는 헤드 노드를 사용해 보겠다. 헤드 노드에서의 링크가 원래의 헤드 포인터 역할을 한다.
* 객체 지향적 관점에서, 노드 클래스에서 가능한 많은 기능을 구현하고, 리스트 클래스에서 이들을 사용함으로써 리스트 클래스의 복잡도를 줄이겠다.
* 예를 들어 어떤 노드에서 자신의 다음 노드를 삭제하거나, 자신 노드 다음에 어떤 노드를 삽입하는 등의 작업은 저체 리스트 정보가 없어도 가능하다. 이런 것들을 노드 클래스에 멤버 함수로 구현해주면 좋을 것이다.


```cpp
class Node {
public:
    Node(int Number) : Data(Number)  {
        Link = nullptr;
    }

    int GetData() { return Data; }
    void SetLink(Node* NodePointer) { Link = NodePointer; }
    Node* GetLink() { return Link; }

private:
    int Data;
    Node* Link;
};

```

```cpp
class LinkedList {
public:
    LinkedList() {
        HeadNode = new Node;
        TailNode = HeadNode;
        length = 0;
    }
    ~LinkedList() {
        delete HeadNode;
        delete TailNode;
    }

    bool IsEmpty() const;

    void InsertItem(const int Index, const Node* Item); // 리스트의 Index 위치에 새로운 요소 Item을 삽입
    void DeleteItem(const int Index); //리스트의 Index 위치에 있는 요소를 삭제한다.
    Node* GetEntry(const int Index) const; // 리스트의 Index 위치에 있는 요소를 반환한다.
    bool FindItem(const Node* Item) const; // 리스트에 요소 Item이 있는지를 검사한다.
    void Replace(const Int Index, const Node* Item); // 리스트의 index 위치에 있는 요소를 새로운 요소 item으로 바꾼다.
    int Size() const; // 리스트 안의 요소의 개수를 반환한다.
    void Display() const; // 리스트 안의 모든 요소들을 출력한다. 

private:
    Node* HeadNode;
    Node* TailNode;
    int Length; // 리스트 내 원소의 개수
};

bool LinkedList::IsEmpty() {
    if(HeadNode->GetLink() == nullptr) return true;
    else return false;
}

Node* LinkedList::GetEntry(const int Index) {
    if(Index < 0 || Index >= Length) {
        cout<<"Invalid Index"<<endl;
        exit(1);
    } else {
        Node* P = HeadNode;
        int TempInt = 0;
        while(TempInt < Index) {
            P = P->GetLink();
            ++TempInt;
        }
        return P->GetLink();
    }
}

void LinkedList::InsertItem(int Index, Node* Item) 
{
    if(Index < 0 || Index >= Length) 
    {
        cout<<"Invalid Index"<<endl;
        exit(1);
    }
    else
    {
        if(Index == 0)
        {
            Node* P = HeadNode;
        }
        else
        {
            Node* P = GetEntry(Index-1);
        }
        Item->SetLink(P->GetLink());
        P->SetLink(Item);
        ++Length;
    }
}

void LinkedList::DeleteItem(const Int Index)
{
    if(Index < 0 || Index >= Length)
    {
        cout<<"Invalid Index"<<endl;
        exit(1);
    }
    else
    {
        if(Index == 0)
        {
            Node* P = HeadNode;
        }
        else
        {
            Node* P = GetEntry(Index-1);
        }
        Node* D = P->GetLink(); // 삭제 과정 필요하겠지?_1
        P->SetLink(P->GetLink()->GetLink());
        --Length;
        D->SetLink(nullptr); // 이렇게?_2_1
        delete D; // 이렇게?_2_2
    }
}

bool LinkedList::FindItem(const Node* P)
{
    Node* T = HeadNode;
    while(T->GetLink() != nullptr)
    {
        if(T->GetLink() == P)
        {
            return true;
        }
        T = T->GetLink();
    }
    return false;
}

int LinkedList::Size()
{
    return Length;
}

void LinkedList::Replace(const int Index, const Node* P)
{
    if(Index < 0 || Index >= Length)
    {
        cout<<"Invalid Index"<<endl;
        exit(1);
    }
    else
    {
        if(Index == 0)
        {
            Node* T = HeadNode;
        }
        else
        {
            Node* T = GetEntry(Index-1);
        }
        Node* D = T->GetLink(); // 필요?
        P->SetLink(T->GetLink()->GetLink());
        T->SetLink(P);
        D->SetLink(nullptr); //필요?
    }   
}

void LinkedList::Display()
{
    Node* T = HeadNode;
    while(T->GetLink() != nullptr)
    {
        T = T->GetLink();
        cout<<T->GetData()<<" ";
    }
    cout<<endl;
}
```

