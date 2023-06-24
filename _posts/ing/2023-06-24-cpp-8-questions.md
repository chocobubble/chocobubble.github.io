---
title:  "[연습문제] 전문가를 위한 C++ Ch.8"
excerpt: "전문가를 위한 C++"
excerpt_separator: "<!--more-->"
categories:
  - ing
tags:
  - CPP
  - Questions

toc: true
toc_sticky: true

use_math: true

date: 2023-06-24
last_modified_at: 2023-06-24
---

> '전문가를 위한 C++ - Marc Gregoire 지음, 남기혁 옮김' 책의 연습문제 풀이입니다.

---

# 8-1

```cpp
#include <string>
class Person
{
public:
	// constructor
	Person(string& FirstName, string& LastName);
	// getter
	string  GetName
	// setter

private:
	// firstname
	string m_FirstName
	// lastname
	string m_LastName
}

Person::Person(string& FirstName, string& LastName)
	: m_FirstName(FirstName), m_LastName(LastName) {}
```
