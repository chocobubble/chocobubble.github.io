---
title:  "문풀"
excerpt: "DP"
excerpt_separator: "<!--more-->"
categories:
  - solution
tags:
  - solution
  - DP

toc: true
toc_sticky: true
use_math: true

date: 2023-09-15
last_modified_at: 2023-09-15
---

## 	도둑질
- 환형 배열에서 두 집을 연이어 도둑질 하지 못할 때 훔칠 수 있는 최대 돈을 구하라.

### 놓친 점
- left + 1 을 단순히 money[left + 1] 이 아닌, money[left] 와 money[left+1] 중 최댓값을 골라 주어야 했다.
	- left+1이 더 커 left+2가 선택되지 않았을 때 left + left+3이 선택될 경우 left 가 무시된다.

```cpp
int ans = 0;
void func(int l, int r, vector<int> dp, vector<int>& money) {
    dp[l] = money[l];
    //cout << dp[l] << ", ";
    dp[l+1] = max(money[l+1],dp[l]);
    //cout << dp[l+1] << ", ";
    for(int i=l+2; i<=r; ++i) {
        dp[i] = max(dp[i-1], dp[i-2] + money[i]);
        //cout << dp[i] << ", ";
    }
    //cout << endl;
    ans = max(ans, dp[r]);
}
int solution(vector<int> money) {
    if(money.size() == 3) {
        //return max(money[0], max(money[1], money[2]));
    }
    vector<int> dp (money.size(), 0);
    func(0, money.size()-2, dp, money);
    func(1, money.size()-1, dp, money);
    return ans;
}
```