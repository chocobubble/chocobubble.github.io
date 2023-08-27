---
title:  "재귀"
excerpt: "알고리즘"
excerpt_separator: "<!--more-->"
categories:
  - Recursion
tags:
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