---
title:  "[운영체제] 가상 메모리"
excerpt: "혼공컴운"
excerpt_separator: "<!--more-->"
categories:
  - OS
tags:
  - OS
  - Virtual Memory

toc: true
toc_sticky: true
 
font-family: $happiness

use_math: true

date: 2023-06-06
last_modified_at: 2023-06-06
---

> '혼자 공부하는 컴퓨터구조+운영체제 - 강민철' 책을 참고하여 작성한 포스트입니다.

---

# 연속 메모리 할당
* 프로세스에 연속적인 메모리 공간을 할당하는 것

<br><br>

# 스와핑
* 메모리에 적재된 프로세스들 중 현재 실행되지 않는 프로세스를 임시로 보조기억장치 일부 영역으로 쫓아내고, 그렇게 해서 생긴 메모리 상의 빈 공간에 다른 프로세스를 적재하는 방식을 **<u>스와핑(swapping)</u>** 이라고 한.
* 스와핑으로 보조기억장치로 보내지는 프로세스가 임시로 저장되는 영역을 **스왑 영역(swap space)** 이라고 한다.
* 메모리에서 스왑 영역으로 옮겨지는 것을 **스왑 아웃(swap-out)**,
* 스왑 영역에 있던 프로세스가 다시 메모리로 옮겨 오는 것을 **스왑 인(swap-in)** 이라고 한다.
* 물론 기존의 주소와 다른 주소에 적재될 수도 있다.

<br><br>

# 메모리 할당
* 프로세스를 메모리 내에 연속적으로 할당하는 방식에는 세 가지가 있다.

## 최초 적합(first fit)
* 운영체제가 메모리 내의 빈 공간을 순서대로 검색하다가 적재할 수 있는 공간을 발견하면 그 공간에 프로세스를 배치하는 방식이다.
* 빠른 할당이 가능하다

## 최적 적합(best fit)
* 운영체제가 메모리 내의 빈 공간을 모두 검색해 본 후, 프로세스 적재 가능한 공간 중 가장 작은 공간에 배치하는 방식이다.

## 최악 적합(worst fit)
* 운영체제가 메모리 내의 빈 공간을 모두 검색해 본 후, 프로세스 적재 가능한 공간 중 가장 큰 공간에 배치하는 방식이다.

<br><br>

# 외부 단편화(external fragmentation)
* <u>프로세스들이 메모리에 연속적으로 할당되는 환경</u>에서는 프로세스들이 실행되고 종료되기를 반복하며 메모리 사이 사이에 빈 공간들이 생긴다.
* 이 공간보다 큰 프로세스는 적재할 수 없으므로 결국 메모리 낭비로 이어지고, 이러한 현상을 **외부 단편화** 라고 한다.
* 즉, 프로세스를 할당하기 어려울 만큼 작은 메모리 공간들로 인해 메모리가 낭비되는 현상이다.
* 외부 단편화를 해결하는 대표적 방법으로 메모리를 **압축(compaction)** 하는 방법이 있다. 메모리 조각 모음!
* 하지만 이 방법은 작은 빈 공간들을 하나로 모으는 동안 시스템은 하던 일을 중지해야 하고,
* 메모리에 있는 내용을 옮기면서 많은 오버헤드가 발생하며, 
* 어떤 프로세스를 어떻게 움직여 효과적으로 압축할 지에 대한 명확한 방법을 결정하기 어렵다.
* 이에 또 다른 방안인 **가상 메모리 기법** 중에서도 **페이징 기법**을 오늘날 많이 이용한다.

<br><br>

# 페이징이란?
* 가상 메모리(virtual meemory)는 실행하고자 하는 프로그램을 일부만 메모리에 적재하여 실제 물리 메모리 크기보다 더 큰 프로세스를 실행할 수 있게 하는 기술.
* 가상 메모리 관리 기법에는 크게 **페이징** 과 **세그멘테이션**이 있다.
* 프로세스의 논리 주소 공간을 **페이지(page)**라는 일정한 단위로 자르고, 메모리 물리 주소 공간을 **프레임(frame)** 이라는 페이지와 동일한 크기의 일정한 단위로 자른 뒤 페이지를 프레임에 할당하는 가상 메모리 관리 기법을 **<u>페이징(paging)</u>** 이라고 한다.
* <u>페이지 단위로 프로세스를 자르고, 조각들을 잘린 메모리 조각들에 불연속적으로 적재한다.</u>
* 페이징에서도 스와핑을 사용할 수 있는데, 페이지 단위로 스왑 아웃/인 이 된다. 각각 **페이지 아웃(page out)**, **페이지 인(page in)** 이라 부르기도 한다.
* 페이지 중 실행에 필요한 일부 페이지만을 메모리에 적재하고, 당장 실행에 필요하지 않은 페이지들은 보조기억장치에 남겨 둠으로써 물리 메모리보다 더 큰 프로세스 실행이 가능하다

<br><br>

# 페이지 테이블
* 물리 주소(실제 메모리 내의 주소)에 불연속적으로 배치된 페이지들을 논리 주소에(CPU가 바라보는 주소) 연속적으로 배치되도록 할 수 있게 해주는 것이 **페이지 테이블(page table)** 이다.
* 페이지 테이블은 페이지 번호와 프레임 번호가 짝지어져 있으며, CPU는 페이지 테이블을 통해 해당 페이지가 적재된 프레임을 찾을 수 있다.
* 각 프로세스의 페이지 테이블들은 메모리에 적재되어 있으며, CPU 내의 **페이지 테이블 베이스 레지스터(PTBR, page table base register)**는 각 프로세스의 페이지 테이블이 적재된 주소를 가리키고 있다.
* 페이지 테이블은 각 프로세스의 PCB에 기록된다. 문맥 교환이 일어날 때 다른 레지스터와 마찬가지로 함께 변경된다.
* CPU가 페이지 테이블에 접근하는 속도를 줄이기 위해 CPU 곁에 (일반적으로 MMU 내에) **TLB(translation lookaside buffer)** 라는 페이지 테이블의 캐시 메모리를 둔다.
* <u>참조 지역성</u>에 근거해 주로 최근에 사용된 페이지 위주로 가져와 저장한다.
* 캐시와 비슷하게 논리 주소에 대한 페이지 번호가 TLB에 있을 경우 **TLB hit**라고 하며, 그러지 않을 경우 **TLB miss**라고 하며 메모리 내의 페이지 테이블에 접근해 찾는다.

<br><br>

# 페이징에서의 주소 변환
* 페이징 시스템에서는 모든 논리 주소가 기본적으로 **페이지 번호(page number)**와 **변위(offset)**로 이루어져 있다. 
* 페이지 번호를 통해 접근하고자 하는 페이지 번호를 찾을 수 있고, 변위는 접근하려는 주소가 페이지 번호로 부터 얼만큼 떨어져 있는지를 알려준다.
* 예를 들어 페이지 번호가 5이고, 변위가 2인 논리 주소에 접근할 때, CPU가 접근하게 될 물리 주소는..
* 페이지 테이블에서 페이지 번호에 따른 프레임 번호를 찾고, 메모리 상에 해당 프레임이 적재되어 있는 시작 주소에서 변위 값만큼 더한 주소이다.

<br><br>

# 페이지 테이블 엔트리(PTE, page tabel entry)
* 페이지 테이블 엔트리에는 페이지 번호, 프레임 번호 외에도 유효 비트, 보호 비트, 참조 비트, 수정 비트 등이 있다.

## 유효 비트(valid bit)
* 현재 해당 페이지에 접근 가능한지 여부를 알려 준다.
* 현재 페이지가 메모리에 적재되어 있다면 유효 비트가 1, 보조기억장치에 적재되어 있다면 유효 비트가 0이다.
* 유효 비트가 0인 페이지에 접근하려고 하면 **페이지 폴트(page fault)**라는 예외(exception)가 발생한다.

> CPU가 페이지 폴트를 처리하는 과정은 하드웨어 인터럽트를 처리하는 과정과 유사하다.  
> 1. CPU는 기존 작업 내역을 백업하고,  
> 2. 페이지 폴트 처리 루틴을 실행한 뒤,  
> 3. 원하는 페이지를 메모리로 가져오고 유효 비트를 1로 변경해 준다.

## 보호 비트(protection bit)
* 페이지 보호 기능을 한다.
* 1개의 비트인 경우 1이면 읽고 쓰기가 모두 가능, 0이면 읽기 전용 페이지이다.
* 3개의 비트인 경우 r(read), w(write), x(execute) 의 조합으로 읽기, 쓰기, 실행 권한을 나타낸다.
* 각 비트가 1이면 가능, 0이면 불가능이다.

## 참조 비트(reference bit)
* CPU가 이 페이지에 접근한 적이 있는지 여부를 나타낸다. 
* 적재 이후 CPU가 읽거나 쓴 적이 있으면 1, 없으면 0이다.

## 수정 비트(modified bit)
* 해당 페이지에 데이터를 쓴 적이 있는지 없는지 수정 여부.
* 더티 비트(dirty bit) 라고도 부른다.
* 1이면 변경된 적이 있는 페이지, 0이면 한번도 접근한 적 없거나 읽기만 한 페이지다.
* 0이면 페이지 메모리에서 사라질 때 보조기억장치에 쓰기 작업을 하지 않겠지.
* 1인 페이지가 스왑 아웃될 경우 변경된 값을 보조기억장치에 기록하는 작업이 추가 되어야 한다.



> 페이징은 외부 단편화 문제를 해결하지만, **내부 단편화(internal fragmentation)**라는 문제가 생길 수 있다.  
> 모든 프로세스가 페이지의 배수는 아니므로 잘리고 남은 나머지를 포함하는 프레임은 일부가 비어 있을 수 있다.  
> 페이지 크기를 너무 작게하면 페이지 테이블이 너무 커지므로 적절히 조절하는 것이 중요하다.


<br><br>

# 정리
* 스와핑은 메모리에서 사용되지 않는 일부 프로세스를 보조기억장치로 내보내고 실행할 프로세스를 메모리로 들여보내는 메모리 관리 기법
* 최초 적합 방식은 최초로 발견한 적재 간능한 빈 공간에 프로세스를 배치하는 방식
* 최적 적합 방식은 프로세스가 적재될 수 있는 공간 중 가장 작은 공간에 프로세스를 배치하는 방식
* 최악 적합 방식은 프로세스가 적재될 수 있는 공간 중 가장 큰 공간에 프로세스를 배치하는 방식
* 외부 단편화는 프로세스를 할당하기 어려울 만큼 작은 메모리 공간들로 인해 메모리가 낭비되는 현상