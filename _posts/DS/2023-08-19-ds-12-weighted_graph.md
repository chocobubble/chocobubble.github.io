---
title:  "자료 구조 - 가중치 그래프"
excerpt: "C++로 쉽게 풀어쓴 자료구조 1판 - 천인국, 최영규"
excerpt_separator: "<!--more-->"
categories:
  - DS
tags:
  - DS
  - Graph
  - Weighted Graph

toc: true
toc_sticky: true

use_math : true
 
font-family: $happiness

date: 2023-08-19
last_modified_at: 2023-08-19
---

# 가중치 그래프란?
- 간선에 비용이나 가중치가 할당된 그래프.
- 수학적으로는 $G = (V, E, w)$ 로 표현된다.
	- V(G)
		- 그래프 G의 정점 집합
	- E(G)	
		- 그래프 G의 간선 집합
	- w(e)
		- 간선 e의 강도(weight), 비용(cost), 혹은 길이(length)

# 가중치 그래프의 표현
- 인접 행렬을 이용해 표현해 본다.
- 이때 인접 행렬의 각 요소 값이 가중치가 된다.
- 주의해야 할 점은 연결되지 않은 두 정점 간의 요소 값을 잘 설정해야 한다는 점이다.
	- 유효한 가중치 값의 범위가 있을 때 연결되지 않은 두 정점 간의 요소 값은 이 범위 밖의 값으로 설정해야 한다.

# 최소 비용 신장 트리
- minimum spanning tree : MST
- 그래프 내 **모든 정점들을 가장 적은 수의 간선과 비용으로 연결** 한 트리이다.
- 최소 비용 신장 트리를 구하는 방버에는 Kruskal, Prim 알고리즘이 대표적이다.

## 조건
1. 간선의 가중치의 합이 최소
2. 정점의 개수가 n일 때 n-1개의 간선만 사용되어야 함
3. 사이클이 없어야 한다.


## Kruskal의 MST 알고리즘
- greedy method를 이용한 알고리즘이다.
	- 특정 시점에서 결정을 내릴 때마다 **그 순간에 최적**이라고 판단되는 것을 선택하는 방법이다.
	- **궁극적으로 최적**이라는 보장은 없다.
	- 그래서 항상 최적의 해답인지를 검증해 주어야 한다.
- Kruskal 알고리즘은 최적의 해답을 주는 것으로 검증되어 있다.

### 과정
1. 그래프의 모든 간선을 가중치에 따라 오름차순으로 정렬
2. 가장 가중치가 적은 간선 e를 택한다.
3. e를 신장 트리에 넣을 경우 사이클이 생기면 삽입하지 않고 2로 돌아간다.
4. 생기지 않는다면 최소 신장 트리에 삽입한다.
5. n-1개의 간선이 삽입될 때까지 2번으로 돌아가 반복한다.

### 사이클 검사 방법 : union-find 연산
- union(x, y)
	- x가 속한 집합과 y가 속한 집합을 합쳐 합집합으로 만드는 연산.
- find(x)
	- x가 속한 집합을 반환하는 연산
- 정점 집합을 구현하는 방법에는 여러 가지가 있다.
	- 비트 벡터, 배열, 연결 리스트 등
	- 가장 효율적인 방법은 트리를 이용하는 것이다.
	- 하나의 트리가 하나의 집합을 나타내며, 트리의 루트가 집합을 대표한다.

```cpp
class VertexSets
{
private:
	int parent[MAX_VTXS];
public:
	VertexSets() {for(int i=0; i<MAX_VTXS; ++i) parent[i] = i;}
	~VertexSets(){}
	void unionSets(int a, int b);
	int findSet(int a);
};
void VertexSets::unionSets(int a, int b)
{
	int aParent = findSet(a);
	int bParent = findSet(b);
	if (aParent == bParent) return;
	if (aParent <= bParent) {
		parent[bParent] = aParent;
	} else {
		parent[aParent] = bParent;
	}
}
int VertexSets::findSet(int a)
{
	if(a != parent[a]) return findSet(parent[a]);
	else return a;
}
```

### 구현 (해보기!)
- 최소 비용 간선은 힙을 이용하면 된다.


## Prim의 MST 알고리즘
- 하나의 정점에서 시작해 트리를 단계적으로 확장해나가는 방법이다.
- Kruskal은 간선을 기반, Prim은 정점을 기반으로 하는 차이가 있다.

### 과정
1. 그래프에서 시작 정점을 선택해 초기 트리 구성
2. 현재 트리의 정점들과 인접한 정점들 중 간선의 가중치가 가장 작은 정점 v 선택
3. v와 이때의 간선을 트리에 추가
4. 모든 정점이 삽입될 때 까지 반복



## 정리
- Kruskal은 힙 특성에 따라 복잡도가 $O(elog_2e)$이다.
- Prim은 반복문이 중첩 반복하므로 $O(n^2)$이다.
- 즉, 간선이 적으면 Kruskal, 많으면 Prim이 적당해 보인다.