---
title:  "[연습문제] 전문가를 위한 C++ Ch.7"
excerpt: "전문가를 위한 C++"
excerpt_separator: "<!--more-->"
categories:
  - cpp_book
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

# 7-1
- 배열의 크기를 10으로 설정하여 마지막 인덱스는 9이나 10에 접근하고 있다.
- 그리고 배열을 동적 할당 하였으므로 해제도 해주어야 한다.

# 7-2

```cpp
#include <iostream>

using namespace std;

int main()
{
	const size_t numberOfElements = 10;
	vector<int> values(10);

	for (int index = 0; index < numberOfElements; ++index)
	{
		values[index] = index;
	}

	values[numberOfElements - 1] = 99;

	for (int index = 0; index < numberOfElements; ++index)
	{
		cout << values[index] << " ";
	}
}
```

# 7-3

```cpp
#include <iostream>

using namespace std;

class Coordinate
{
public:
	Coordinate(double x, double y, double z)
		: X(x), Y(y), Z(z) {}
	void PrintCoordinate()
	{
		cout << "(X, Y, Z) : (" << X << ", " << Y << ", " << Z << ")" << endl; 
	}
private:
	double X;
	double Y;
	double Z;
};

int main()
{
	auto CoordinatePtr = make_unique<Coordinate>(1.0, 2.0, -3.0);
	CoordinatePtr->PrintCoordinate();
}
```

# 7-4

```cpp

#include <iostream>
#include <string>

using namespace std;

void fillWithM(string &text)
{
	for (int i = 0; i < text.size(); ++i)
	{
		text[i] = 'm';
	}
}

int main()
{
	string SomeText = "TExtteXtTEXT";
	cout << SomeText << endl;
	fillWithM(SomeText);
	cout << SomeText << endl;
}
```