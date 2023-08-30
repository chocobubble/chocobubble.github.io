---
title:  "STL - string 어댑터"
excerpt: "뇌를 자극하는 C++ STL"
excerpt_separator: "<!--more-->"
categories:
  - STL
tags:
  - STL
  - string

toc: true
toc_sticky: true
use_math: true

date: 2023-08-31
last_modified_at: 2023-08-31
---
> '뇌를 자극하는 C++ STL - 공동환' 책 및 c++ reference를 참고하여 작성한 포스트입니다.

> string 컨테이너는 c++ 표준 라이브러리이지만 일반적으로 STL에 포함시키지는 않는다.

# string 주요 인터페이스와 특징
- string은 vector 컨테이너와 비슷하다.
- char 형식의 문자를 관리한다.
	- 유니코드 문자(wchar_t)를 관리하는 컨테이너는 wstring
- 문자열에 '\0'을 포함시킬 필요 없다.

## append(), +=
- += 연산자는 일반적으로 전체 문자열을 붙일 때 사용하고,
- append 멤버 함수는 부분 문자열을 덧붙일 때 사용한다.

## assign(), =
- = 연산자는 전체 문자열을 할당할 때 사용하고,
- assign 멤버 함수는 부분 문자열을 할당할 때 사용한다.

## c_str(), data()
- string 객체가 가지고 있는 문자열을 C 스타일('\0' 문자 포함)의 문자열로 변환할 때 사용
- data()는 '\0' 을 포함시키지 않는다.
	- 대부분의 컴파일러는 구현을 동일하게 해두었음
	- 그래도 구분해 사용하는 것이 맞겠죠
- const char* 타입을 반환한다.


## compare(s1, s2), 비교 연산자
- 비교 연산자는 전체 문자열을 비교하고, compare 멤버 함수는 부분 문자열을 비교할 수 있다.
- 문자열을 비교해 s1 > s2이면 양수, s1 < s2 이면 음수, s1 == s2 이면 0을 반환한다.

## find(), rfind()
- 문자나 부분 문자열의 위치를 반환하는 함수.
- 찾는 문자가 없으면 string::npos 정의값을 반환한다.
	- 일반적으로 -1 이다.
- find(c, n)는 n 위치부터 c가 있는 지 검색한다.

## insert, replace
- 도 지원한다.

## substr(pos, n)
- string의 일부 문자열을 추출할 때 사용
- n을 string::npos로 지정하면 문자열의 마지막 문자까지가 된다.
	- n 디폴트는 string::npos 인 것으로 보인다.

## getline()
- 스트림으로 부터 string 객체로 문자열을 입력받는다.
- 입력 스트림 연산자 >> 와 같이 사용하면 된다.
- cin>> 처럼 공백 문자를 구분자로 사용한다.

## reserve, capacity
- 등도 있다

```cpp
int main()
{
// +=, append
	string s1("Mo");
	string s2{"on"};
	string s3{'M','o','o','n'};
	cout << "s1 : " << s1 << " ,  s2 : " << s2 << endl;
	cout << "s1 + s2 : " << s1 + s2 << endl;
	cout << "s1.append(s2) : " << s1.append(s2) << endl;
	cout << "s1.append(s3, 2) : " << s1.append(s3, 2) << endl;
	cout << "s1.append(s3, 3, 1) : " << s1.append(s3, 3, 1) << endl;
	cout << "s1.append(s3.beign(), s3.end()) : " << s1.append(s3.begin(), s3.end()) << endl;
	s3 += ", ";
	s3 += s2;
	s3.push_back('|');
	cout << "s3 : " << s3 << endl;
// =, assign
	string s4 = "Moon";
	cout << "s1.assign(s4) : " << s1.assign(s4) << endl;
	cout << "s1.assign(s3.begin(), s3.end()) : " << s1.assign(s3.begin(), s3.end()) << endl;
//
	const char* ch = s3.c_str();
	cout << "ch : " << ch << endl;
//
	cout << "s1 : " << s1 << ", s2 : " << s2 << ", s3 : " << s3 << ", s4 : " << s4 << endl;
	cout << "s3.compare(ch) : " << s3.compare(ch) << endl;
	cout << "s1.compare(s2) : " << s1.compare(s2) << endl;
	cout << "s2.compare(s1) : " << s2.compare(s1) << endl;
	cout << "s1.compare(0, 4, s4) : " << s1.compare(0, 4, s4) << endl;
//
	cout << "s1.find('M')  : " << (int)s1.find('M') << endl;
	cout << "s1.find('M')  : " << (int)s1.find('K') << endl;
	cout << "s1.find('M', 1) : " << (int)s1.find('M', 1) << endl;
//
	cout << "s1.substr(0) : " << s1.substr(0) << endl;
	cout << "s1.substr(3, string::npos) : " << s1.substr(3, string::npos) << endl;
	cout << "s1.substr(1, 3) : " << s1.substr(1, 3) << endl;
//
	string s5;
	getline(cin, s5);
	cout << "s5 : " << s5 << endl;
	string s6;
	getline(cin, s6, 'n'); // 종료 문자 추가
	cout << "s6 : " << s6 << endl;
	return 0;
}
/*
s1 : Mo ,  s2 : on
s1 + s2 : Moon
s1.append(s2) : Moon
s1.append(s3, 2) : Moonon
s1.append(s3, 3, 1) : Moononn
s1.append(s3.beign(), s3.end()) : MoononnMoon
s3 : Moon, on|
s1.assign(s4) : Moon
s1.assign(s3.begin(), s3.end()) : Moon, on|
ch : Moon, on|
s1 : Moon, on|, s2 : on, s3 : Moon, on|, s4 : Moon
s3.compare(ch) : 0
s1.compare(s2) : -34
s2.compare(s1) : 34
s1.compare(0, 4, s4) : 0
s1.find('M')  : 0
s1.find('M')  : -1
s1.find('M', 1) : -1
s1.substr(0) : Moon, on|
s1.substr(3, string::npos) : n, on|
s1.substr(1, 3) : oon
moon
s5 : moon
moonki
s6 : moo
```
