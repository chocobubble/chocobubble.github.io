---
title:  "[연습문제] 전문가를 위한 C++ Ch.8"
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

# 8-1

```cpp
#include <string>
#include <iostream>

using namespace std;

class Person
{
public:
	// constructor
	Person(string FirstName, string LastName);
	// getter
	string GetName();
	// setter
	void SetName(string FirstName, string LastName);

	void ShowPersonName();

private:
	// firstname
	string m_FirstName;
	// lastname
	string m_LastName;
};

Person::Person(string FirstName, string LastName)
	: m_FirstName(FirstName), m_LastName(LastName) {}

string Person::GetName()
{
	return m_FirstName + " " + m_LastName;
}
void Person::SetName(string FirstName, string LastName)
{
	m_FirstName = FirstName;
	m_LastName = LastName;
}

void Person::ShowPersonName()
{
	cout << "Name : "<< GetName() << endl;
}


int main()
{
	Person Person1("Kim", "Min Jae");
	Person1.ShowPersonName();
	Person1.SetName("Kang", "Min Ho");
	Person1.ShowPersonName();

	auto Person2SmartPtr = make_unique<Person>("Kim", "Min Jae");
	Person2SmartPtr->ShowPersonName();
	Person2SmartPtr->SetName("Son", "Heung Min");
	Person2SmartPtr->ShowPersonName();
}
```

# 8-2
- 객체 배열 생성 시 각 원소들을 따로 초기화 해주지 않으면 원소마다 클래스의 디폴트 생성자를 호출된다.
- 클래스에 생성자를 직접 정의한 경우에는 컴파일러가 디폴트 생성자를 자동으로 생성하지 않는다.
- 따라서 위 클래스에는 디폴트 생성자가 정의되어 있지 않아 
	- ```Person phoneBook[3]``` 에서 컴파일 에러가 발생한다.
- 다음과 같이 디폴트 생성자를 선언해 준다.

```cpp
...
public:
	Person() = default;
	...
```

# 8-3

```cpp
#include <string>
#include <iostream>

using namespace std;

class Person
{
public:
	// constructor
	Person() = default;

	~Person() { cout << GetName() << " was destructed" << endl;}

	Person(string& FirstName, string& LastName);
	// Copy Constructor
	Person(const Person& src);
	// Assignment Constructor
	Person& operator=(const Person& rhs);
	// getter
	const string& GetName() const;
	// setter
	void SetName(string& FirstName, string& LastName);
	// print the person full name
	void ShowPersonName();

private:
	// firstname
	string m_FirstName;
	// lastname
	string m_LastName;
	// fullname
	string m_FullName;
};

Person::Person(string& FirstName, string& LastName)
	: m_FirstName(FirstName), m_LastName(LastName) 
{
	m_FullName = m_FirstName + " " + m_LastName;
}

Person::Person(const Person& src)
{
	m_FirstName = src.m_FirstName;
	m_LastName = src.m_LastName;
	m_FullName = m_FirstName + " " + m_LastName;
}

Person& Person::operator=(const Person& rhs)
{
	if(this != &rhs)
	{
		//SetName(rhs.m_FirstName, rhs.m_LastName);
		m_FirstName = rhs.m_FirstName;
		m_LastName = rhs.m_LastName;
		m_FullName = m_FirstName + " " + m_LastName;
		cout << GetName() << " is copied by the copy constructor"<<endl;
	}
	return *this;
}

const string& Person::GetName() const
{
	return m_FullName;
}
void Person::SetName(string& FirstName, string& LastName)
{
	m_FirstName = FirstName;
	m_LastName = LastName;
	m_FullName = m_FirstName + " " + m_LastName;
}

void Person::ShowPersonName()
{
	cout << "Name : "<< GetName() << endl;
}


int main()
{
	string FirstManFirstName = "Kim";
	string FirstManLastName = "Min Jae";
	string SecondManFirstName = "Kang";
	string SecondManLastName = "Min ho";
	string ThirdManFirstName = "Son";
	string ThirdManLastName = "Heung Min";
	Person Person1(FirstManFirstName, FirstManLastName);
	Person1.ShowPersonName();
	Person1.SetName(SecondManFirstName, SecondManLastName);
	Person1.ShowPersonName();

	auto Person2SmartPtr = make_unique<Person>(FirstManFirstName, FirstManLastName);
	Person2SmartPtr->ShowPersonName();
	Person2SmartPtr->SetName(ThirdManFirstName, ThirdManLastName);
	Person2SmartPtr->ShowPersonName();

	Person phoneBook[3];
	
	Person NewPerson1(*Person2SmartPtr);
	NewPerson1.ShowPersonName();

	auto NewPerson2SmartPtr = make_unique<Person>();
	*NewPerson2SmartPtr = Person1;
	NewPerson2SmartPtr->ShowPersonName();

	Person1.ShowPersonName();
	Person2SmartPtr->ShowPersonName();
}
```