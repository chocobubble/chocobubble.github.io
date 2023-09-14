---
title:  "재귀"
excerpt: "알고리즘"
excerpt_separator: "<!--more-->"
categories:
  - algo
tags:
  - Algorithm
  - Recursion

toc: true
toc_sticky: true
use_math: true

date: 2023-08-26	
last_modified_at: 2023-08-26
---

# 알고 있어야 할 내용
- 재귀는 특히 **입력이 재귀적인 규칙에 따라 표현**될 때 유용하며, **탐색, 열거, 분할 정복**을 해야 하는 경우에 좋은 선택이다
- **동일한 인자(arguments)**로 재귀 함수를 한 번 이상 호출할 일이 생긴다면, 그 결과를 **캐시**에 저장해 동적 프로그래밍으로 해결하자

```cpp
void recursion(vector<vector<int>> graph, vector<int>& arr) {
	for (int col = 0; col < graph[0].size(); ++col) {
		arr.push_back(col);
		if(isValid(col)) {
			recursion(graph, arr);
		}
		arr.pop_back();
	}
}

bool isValid(int col) {
	...
}
```


# 순열 구하기

```cpp
vector<vector<int>> answer;
void permutation(vector<int> &arr, int n) {
	if(n == 4) answer.push_back(arr);
	for(int i=n; i<arr.size(); ++i) {
		swap(arr[i], arr[n]);
		permutation(arr, n+1);
		swap(arr[i], arr[n]);
	}
}

int main()
{
	vector<int> arr {1, 2, 3, 4};
	permutation(arr, 0);
	return 0;
}
```


# 1. 하노이 타워 문제

한 말뚝에 고리(ring)가 큰 것부터 작은 것 순으로 정렬되어 있다. n개의 고리를 다른 말뚝으로 옮기는 연산을 차례대로 출력하는 프로그램을 작성하라. 세개의 말뚝이 있으며, 두 말뚝은 비어 있고, 크기가 큰 고리를 작은 고리 위에 둘 수 없다.

## 풀이 방법
- n-1 개의 고리를 옮기는 방법을 안다고 가정했을 때, n번째 고리는 어떻게 옮기겠는가?
- 실제 고리를 옮긴 횟수는 T(n) = T(n-1) + 1 + T(n-1) = 1 + 2T(n-1) 과 같다. 처음 T(n-1)은 P1에서 P3로 n-1개의 고리를 옮긴 것을 뜻하고, 두번 째 T(n-1)은 P3에서 P2로 n-1개의 고리를 옮긴 것을 뜻한다. 이 수식을 풀면 T(n) = $2^n$-1이 된다. 나열하면 T(n) = 1 + 2 + 4 + … + $2^k$T(n-k)가 된다. 전체 시간복잡도는 O($2^n$)이다.