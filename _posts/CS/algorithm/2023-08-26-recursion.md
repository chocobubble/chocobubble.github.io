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
last_modified_at: 2023-09-14
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


# 2. 전화번호에 대한 모든 연상기호 계산하기
- 전화 키패드에서 0과 1을 제외한 각 숫자는 알파벳의 세 개 또는 네 개 문자 중 하나에 해당한다.
- 숫자 문자열로 이루어진 전화번호가 주어졌을 때 가능한 모든 문자 집합을 반환하라.

## 풀이 방법
- 각 숫자에 대해 가능한 문자가 4개 이하이므로 $O(4^n)$의 시간 복잡도이고, 추가로 문자열 사본을 만들어 결과에 추가해야 하므로 
- 총 시간 복잡도는 $O(4^n \times n)$ 이다.


# 3. n개의 퀸이 서로 공격하지 못하는 상황을 모두 나열하기
- n이 주어졌을 때 $n \times n$ 크기의 체스판에 n개의 퀸이 안전하게 놓이는 모든 가능한 경우의 수를 반환하라.

## 풀이 방법
- 첫 퀸을 [i, j] 에 두었을 때 나머지 퀸이 위치할 수 없는 곳을 고려해 보자.


# 4. 순열 구하기 (위에 있음)
- 라이브러리를 이용하면 다음과 같다.

```cpp
vector<vector<int>> Permutations(vector<int> A) {
	vector<vector<int>> result;
	sort(begin(A), end(A));
	do {
		result.push_back(A);
	} while (next_permutation(begin(A), end(A)));
	return result;
}
```

# 5. 멱집합 구하기
- 멱집합(power set)은 집합 S의 공집합과 S를 포함한 모든 부분 집합과 같다.
- 예를 들어 {0, 1, 2}의 멱집합은 공집합, {{0}, {1}, {2}, {0,1}, {0,2}, {1,2}, {1,2,3}} 이다. 

# 6. 크기가 k인 모든 부분 집합 생성하기
- k 와 n이 주어졌을 때 {1, 2, 3, ..., n}의 부분 집합 중 크기가 k인 모든 부분 집합을 구하라

## 풀이 방법
- 점화식 D[N][k] = D[N-1][k] + D[N-1][k-1] 이다.
- 즉, N을 제외하고 1~N-1 까지 크기 k 부분 집합과, N을 제외하고 1~N-1 까지 크기 k-1 부분 집합에 N을 추가한 부분 집합을 더한 것과 같다.

# 7. 괄호의 짝이 맞는 문자열 생성하기

?

# 8. 회문 분해하기
- 주어진 문자열을 회문 문자열로 분해한 모든 결과를 구하라
- 예를 들어 "0204451881"이 주어졌을 때 반환하는 문자열은 "020", "44", "5", "1881" 이다.

## 풀이 방법
- 위의 예시에서 "0"은 회문이다.
	- "204451881"을 살펴본다.
- "020"도 회문이다.
	- "4451881"을 살펴본다.


# 9. 이진트리 생성

# 10. 스도쿠 해법 구현

# 11. 그레이 코드 구하기