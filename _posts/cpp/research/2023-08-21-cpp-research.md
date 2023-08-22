---
title:  "[C++ 정리] 짤막정리"
excerpt: "C++"
excerpt_separator: "<!--more-->"
categories:
  - cpp_research
tags:
  - CPP

toc: true
toc_sticky: true

use_math: true

date: 2023-08-21
last_modified_at: 2023-08-21
---


# using std::string
- string에 대해서만 std 생략

# FILE* fp = fopen(filePath.c_str(), "rt")
fgets(row, 100, fp);
char* token = strtok(row, ",");
token = strtok(NULL, ",");