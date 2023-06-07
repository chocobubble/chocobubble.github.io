---
title:  "언리얼 코딩 표준 "
excerpt: "coding"
excerpt_separator: "<!--more-->"
categories:
  - ing
tags:
  - Unreal
  - code

toc: true
toc_sticky: true
 
font-family: $happiness

date: 2023-06-07
last_modified_at: 2023-06-07
---

<div id="maincol" style="padding-bottom: 100px;">
																																				<div class="toc">
<div style="position:relative;">
    <div class="title">
    목차
    </div>
<div id="tocScroll">
    <ul>
	    		    			    <li id="">
	<p><a id="toc_link" href="#클래스체계">클래스 체계</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#저작권고지">저작권 고지</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#명명규칙">명명 규칙</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#예시">예시</a></p>
	</li>					</ul>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#포용적단어선택">포용적 단어 선택</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#인종,민족,종교포용성">인종, 민족, 종교 포용성</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#젠더포용성">젠더 포용성</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#속어">속어</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#이중적의미가있는단어">이중적 의미가 있는 단어</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#단어목록">단어 목록</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#blacklist">Blacklist</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#whitelist">Whitelist</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#master">Master</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#slave">Slave</a></p>
	</li>					</ul>
	</li>					</ul>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#포터블c++코드">포터블 C++ 코드</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#표준라이브러리사용">표준 라이브러리 사용</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#코멘트">코멘트</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#가이드라인">가이드라인</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#const정확도">Const 정확도</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#예시포맷">예시 포맷</a></p>
	</li>					</ul>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#최신c++언어문법">최신 C++ 언어 문법</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#static_assert">static_assert</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#override및final">override 및 final</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#nullptr">nullptr</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#'auto'키워드">'auto' 키워드</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#범위기반for">범위 기반 for</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#람다및익명함수">람다 및 익명 함수</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#강-타입enum">강 - 타입 Enum</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#이동시맨틱">이동 시맨틱</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#디폴트멤버이니셜라이저">디폴트 멤버 이니셜라이저</a></p>
	</li>					</ul>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#서드파티코드">서드 파티 코드</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#코드포맷">코드 포맷</a></p>
			<ul>
							<li id="">
	<p><a id="toc_link" href="#중괄호">중괄호</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#if-else">If - Else</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#탭및들여쓰기">탭 및 들여쓰기</a></p>
	</li>							<li id="">
	<p><a id="toc_link" href="#switch문">Switch 문</a></p>
	</li>					</ul>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#네임스페이스">네임스페이스</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#물리적종속성">물리적 종속성</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#캡슐화">캡슐화</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#일반적인스타일문제">일반적인 스타일 문제</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#api디자인가이드라인">API 디자인 가이드라인</a></p>
	</li>		    			    <li id="">
	<p><a id="toc_link" href="#플랫폼별코드">플랫폼별 코드</a></p>
	</li>		    	        </ul>
</div>
</div>
</div>
<p>에픽에는 간단한 코딩 표준 및 규칙 몇 가지가 있습니다. 이 문서는 논의의 목적을 띠기보다는 에픽의 현재 코딩 표준의 상태를 나타냅니다. 코딩 표준을 따르는 것은 필수입니다.
</p><p>코딩 규칙이 프로그래머에게 중요한 이유는 다음과 같습니다.
</p><ul><li class="Default"><p>소프트웨어의 총 수명 비용 중 80%는 유지보수에 소모됩니다.
</p></li><li class="Default"><p>최초 작성자가 그 소프트웨어의 수명이 다할 때까지 유지보수하는 경우는 거의 없습니다.
</p></li><li class="Default"><p>코딩 규칙을 사용하면 소프트웨어의 가독성을 향상하여 엔지니어가 새로운 코드를 더 빠르고 완벽히 이해할 수 있습니다.
</p></li><li class="Default"><p>에픽에서 소스 코드를 모드 개발자 커뮤니티에 공개할 경우 코딩 규칙을 알고 있으면 이해하기 더 쉽습니다.
</p></li><li class="Default"><p>대다수의 코딩 규칙이 크로스 컴파일러 호환성에 필요합니다.
</p></li></ul><p>다음의 코딩 표준은 C++ 중심이지만, 코딩 표준의 핵심은 어떤 언어를 사용하든 관계없이 따라야 합니다. 해당할 경우 특정 언어에 대한 규칙이나 예외 사항을 다룬 섹션을 제공할 수 있습니다.
</p><h2 id="클래스체계">클래스 체계</h2>
<p>클래스는 작성자보다는 읽는 사람을 염두에 두고 조직되어야 합니다. 읽는 사람은 대부분 클래스의 퍼블릭 인터페이스를 사용할 것이므로, 퍼블릭 인터페이스에서 먼저 선언한 후 클래스의 프라이빗 구현이 뒤따라야 합니다.
</p><h2 id="저작권고지">저작권 고지</h2>
<p>배포용으로 에픽에서 제공한 모든 소스 파일(.h, .cpp, .xaml, etc.)은 파일 첫 번째 줄에 저작권 고지를 포함해야 합니다. 저작권 고지의 포맷은 다음과 정확히 일치해야 합니다.
</p><pre class="prettyprint"><code>// Copyright Epic Games, Inc. All Rights Reserved.</code></pre>
<p>이 줄이 누락되거나 올바른 양식으로 작성되지 않을 경우 CIS에서 오류를 생성하고 실패합니다.
</p><h2 id="명명규칙">명명 규칙</h2>
<ul><li class="Default"><p>모든 코드 및 코멘트는 미국 영어의 철자법 및 문법을 사용해야 합니다.
</p></li><li class="Default"><p>각 단어의 첫 번째 글자(타입 이름 또는 변수 이름)는 대문자여야 하며, 일반적으로 단어 사이에는 언더스코어를 사용하지 않습니다. 예를 들어, <code>Health</code> 및 <code>UPrimitiveComponent</code> 는 올바르지만, <code>lastMouseCoordinates</code> 또는 <code>delta_coordinates</code> 는 올바르지 않습니다.
</p></li><li class="Default"><p>타입 이름에는 추가적으로 대문자로 이루어진 접두사를 포함하여 변수 이름과 구분합니다. 예를 들어 <code>FSkin</code> 은 타입 이름이고, <code>Skin</code> 은 <code>FSkin</code> 의 인스턴스입니다.
</p><ul><li class="Default"><p>템플릿 클래스에는 접두사 T를 포함합니다.
</p></li><li class="Default"><p><code>UObject</code> 에서 상속받는 클래스에는 접두사 U를 포함합니다.
</p></li><li class="Default"><p><code>AActor</code> 에서 상속받는 클래스에는 접두사 A를 포함합니다.
</p></li><li class="Default"><p><code>SWidget</code> 에서 상속받는 클래스에는 접두사 S를 포함합니다.
</p></li><li class="Default"><p>추상적 인터페이스인 클래스에는 접두사 I를 포함합니다.
</p></li><li class="Default"><p>에픽의 개념이 유사한 클래스 타입( <code>TModels</code> 타입 특성에 첫 번째 아규먼트로 사용)에는 접두사 C를 포함합니다.
</p></li><li class="Default"><p>열거형에는 접두사 E를 포함합니다.
</p></li><li class="Default"><p>부울 변수는 접두사 b를 포함합니다(예: <code>bPendingDestruction</code> 또는 <code>bHasFadedIn</code> ).
</p></li><li class="Default"><p>그 외 대부분의 클래스는 접두사 F를 포함합니다. 그러나 일부 서브시스템은 다른 글자를 사용하기도 합니다.
</p></li><li class="Default"><p>Typedef의 경우 해당 타입에 적합한 접두사를 사용합니다. 예를 들어 구조체의 typedef인 경우 F, <code>UObject</code> 의 typedef인 경우 U를 사용합니다.
</p><ul><li class="Default"><p>특정 템플릿 인스턴스화의 typedef는 더 이상 템플릿이 아니며, 다음과 같이 알맞은 접두사를 붙여야 합니다.
</p><pre class="prettyprint"><code>typedef TArray&lt;FMytype&gt; FArrayOfMyTypes;</code></pre></li></ul></li><li class="Default"><p>C#에서는 접두사가 생략됩니다.
</p></li><li class="Default"><p>UnrealHeaderTool의 경우 대부분 올바른 접두사가 필요하므로, 접두사를 제공하는 것이 중요합니다.
</p></li></ul></li><li class="Default"><p>이러한 템플릿 파라미터를 기반으로 하는 타입 템플릿 파라미터 및 중첩된 타입 에일리어스는 타입 카테고리를 알 수 없으므로 상기 접두사 규칙의 대상이 아닙니다.
</p><ul><li class="Default"><p>설명적인 용어 뒤에는 Type 접미사를 사용하는 것이 좋습니다.
</p></li><li class="Default"><p>In 접두사를 사용하여 템플릿 파라미터를 에일리어스와 구분합니다.
</p><pre class="prettyprint"><code>template &lt;typename InElementType&gt;
class TContainer
{
public:
    using ElementType = InElementType;
};</code></pre></li></ul></li><li class="Default"><p>타입 및 변수 이름은 명사입니다.
</p></li><li class="Default"><p>메서드 이름은 메서드의 이펙트를 설명하거나, 이펙트가 없는 메서드의 반환 값을 설명하는 동사입니다.
</p></li><li class="Default"><p>매크로 이름은 모두 대문자로 구성되고, 단어가 언더스코어로 분리되며, 접두사 <code>UE_</code> 가 사용되어야 합니다(네임스페이스 참조).
</p></li></ul><p>변수, 메서드, 클래스 이름은 명확하고 확실하며, 내용을 파악할 수 있어야 합니다. 이름의 범위가 넓을수록 올바르고 내용을 파악할 수 있는 이름을 사용해야 합니다. 과도한 약어는 피합니다.
</p><p>변수의 의미에 대한 코멘트를 제공할 수 있도록 모든 변수는 한 번에 하나씩 선언해야 합니다. 이는 JavaDocs 스타일에도 필요한 부분입니다. 변수 앞에 여러 줄 또는 한 줄의 코멘트를 사용할 수 있으며, 변수 그룹화를 위한 빈 줄은 선택사항입니다.
</p><p>부울을 반환하는 모든 함수는 <code>IsVisible()</code> 또는 <code>ShouldClearBuffer()</code> 등의 true/false 질문을 해야 합니다.
</p><p>프로시저(반환 값이 없는 함수)는 강한 동사 뒤에 오브젝트를 붙여 써야 합니다. 메서드의 오브젝트가 그 안에 있는 오브젝트일 때는 예외이며, 이 경우 오브젝트는 컨텍스트에서 이해됩니다. 'Handle' 및 'Process' 등의 모호한 동사로 시작하는 이름은 피해야 합니다.
</p><p>필수 사항은 아니지만, 함수 파라미터가 참조로 전달된 후 함수가 그 값에 쓸 것으로 예상되는 경우 이름 앞에 접두사 'Out'을 추가할 것을 권장합니다. 이렇게 하면 이 아규먼트에 전달되는 값이 함수로 대체된다는 것을 확실히 알 수 있습니다.
</p><p>In 또는 Out 파라미터도 부울인 경우 <code>bOutResult</code> 와 같이 In/Out 접두사 앞에 'b'를 붙입니다.
</p><p>값을 반환하는 함수는 반환 값을 설명해야 합니다. 함수가 어떤 값을 반환하는지 이름을 보고 정확히 알 수 있어야 합니다. 특히 부울 함수의 경우 이는 매우 중요합니다. 예시로 다음 두 가지 방법을 확인해 보세요.
</p><pre class="prettyprint"><code>// true일 경우 무슨 의미일까요?
bool CheckTea(FTea Tea);

// 이름을 통해 true일 경우 차가 신선하다는 것을 명확히 알 수 있습니다.
bool IsTeaFresh(FTea Tea);</code></pre>
<h3 id="예시">예시</h3>
<pre class="prettyprint"><code>float TeaWeight;
int32 TeaCount;
bool bDoesTeaStink;
FName TeaName;
FString TeaFriendlyName;
UClass* TeaClass;
USoundCue* TeaSound;
UTexture* TeaTexture;</code></pre>
<h2 id="포용적단어선택">포용적 단어 선택</h2>
<p>언리얼 엔진 코드베이스에서 작업할 때 언어 사용에 있어 늘 정중하고, 포용적이며, 전문적인 태도를 견지하려고 노력해야 합니다.
</p><p>이는 클래스, 함수, 데이터 구조체, 타입, 변수, 파일 및 폴더, 플러그인 등 모든 요소의 이름을 설정할 때 적용되며, UI, 오류 메시지, 알림에서 사용자가 대면하는 텍스트의 스니펫을 작성할 때도 적용됩니다. 또한 코멘트 및 체인지리스트 설명과 같이 코드에 <em>관해</em> 작성할 때도 적용됩니다.
</p><p>다음 섹션에는 모든 상황에서 모든 독자에게 정중하고 적절한 단어 및 이름을 선택하여 보다 효과적인 의사 전달 수단이 되게 하기 위한 가이드와 제안사항이 나와 있습니다.
</p><h3 id="인종,민족,종교포용성">인종, 민족, 종교 포용성</h3>
<ul><li class="Default"><p>편견을 강화하는 은유나 직유를 사용하지 마세요.
</p><p>여기에는 <em>blacklist</em> / <em>whitelist</em> 와 같이 흑백이 대비되는 표현도 포함됩니다.
</p></li><li class="Default"><p>역사상의 트라우마나 실제 차별받았던 경험을 연상시키는 단어를 사용하지 마세요.
</p><p>여기에는 <em>slave,</em> <em>master,</em> <em>nuke</em> 등이 포함됩니다.
</p></li></ul><h3 id="젠더포용성">젠더 포용성</h3>
<ul><li class="Default"><p>가상의 인물을 지칭할 때는 단수형이더라도 대명사 <em>they,</em> <em>them,</em> <em>their</em> 를 사용하세요.
</p></li><li class="Default"><p>사람 이외의 사물을 지칭할 때는 항상 <em>it</em> 및 <em>its</em> 를 사용하세요. 예를 들면 모듈, 플러그인, 함수, 클라이언트, 서버나 모든 기타 소프트웨어 또는 하드웨어 컴포넌트가 있습니다.
</p><p>성별이 없는 요소에 성별을 부여하지 마세요.
</p></li><li class="Default"><p>성별을 상정하게 하는 <em>guys</em> 와 같은 집합 명사를 사용하지 마세요.
</p></li><li class="Default"><p>'a poor <em>man</em>'s X' 와 같이 임의의 성별이 포함된 구어체 문구 사용을 지양하세요.
</p></li></ul><h3 id="속어">속어</h3>
<ul><li class="Default"><p>여러분이 작성한 코드를 전 세계의 독자가 읽게 될 것이라는 점을 잊지 마세요. 독자가 여러분과 같은 관용어 및 사고방식을 공유하지 않을 수 있고, 해당 문화와 관련된 내용을 이해하지 못할 수도 있습니다.
</p></li><li class="Default"><p>재미있거나 무해하다고 생각되더라도 속어 및 관용어구 사용을 피하세요. 영어가 모국어가 아닌 사람이 이해하기 어려울 수 있고, 제대로 번역하기도 어려울 수 있습니다.
</p></li><li class="Default"><p>신성 모독적인 표현을 사용하지 마세요.
</p></li></ul><h3 id="이중적의미가있는단어">이중적 의미가 있는 단어</h3>
<ul><li class="Default"><p>기술적인 의미로 사용하는 용어가 기술 분야 외에서는 다른 의미로 사용되는 경우가 많습니다. 예를 들면 다음과 같습니다. <em>abort,</em> <em>execute</em> 또는 <em>native</em> 등의 단어가 여기에 포함됩니다. 이러한 단어는 항상 정확하게 사용해야 하며, 해당 맥락에서 적절한지 검토해야 합니다.
</p></li></ul><h3 id="단어목록">단어 목록</h3>
<p>다음 목록에는 과거 언리얼 코드베이스에 사용되었지만, 더 나은 단어로 대체해야 한다고 생각되는 일부 용어가 나와 있습니다.
</p><h4 id="blacklist">Blacklist</h4>
<p>대체 용어: <em>deny list,</em> <em>block list,</em> <em>exclude list,</em> <em>avoid list,</em> <em>unapproved list,</em> <em>forbidden list,</em> <em>permission list</em>
</p><h4 id="whitelist">Whitelist</h4>
<p>대체 용어: <em>allow list,</em> <em>include list,</em> <em>trust list,</em> <em>safe list,</em> <em>prefer list,</em> <em>approved list,</em> <em>permission list</em>
</p><h4 id="master">Master</h4>
<p>대체 용어: <em>primary,</em> <em>source,</em> <em>controller,</em> <em>template,</em> <em>reference,</em> <em>main,</em> <em>leader,</em> <em>original,</em> <em>base</em>
</p><h4 id="slave">Slave</h4>
<p>대체 용어: <em>secondary,</em> <em>replica,</em> <em>agent,</em> <em>follower,</em> <em>worker,</em> <em>cluster node,</em> <em>locked,</em> <em>linked,</em> <em>synchronized</em>
</p><div class="note">
	<p>언리얼 엔진은 위에 제시된 원칙에 따라 코드를 작성하기 위해 적극적인 노력을 기울이고 있습니다.</p>
</div><h2 id="포터블c++코드">포터블 C++ 코드</h2>
<ul><li class="Default"><p><code>bool</code> - 부울 값(부울 크기 추정 금지). <code>BOOL</code> 은 컴파일되지 않습니다.
</p></li><li class="Default"><p><code>TCHAR</code> - character(문자) (TCHAR 크기 추정 금지)
</p></li><li class="Default"><p><code>uint8</code> - unsigned byte(부호 없는 바이트) (1바이트)
</p></li><li class="Default"><p><code>int8</code> - signed byte(부호 있는 바이트) (1바이트)
</p></li><li class="Default"><p><code>uint16</code> - unsigned 'shorts'(부호 없는 'short') (2바이트)
</p></li><li class="Default"><p><code>int16</code> - signed 'short'(부호 있는 'short')(2바이트)
</p></li><li class="Default"><p><code>uint32</code> - unsigned int(부호 없는 int) (4바이트)
</p></li><li class="Default"><p><code>int32</code> - signed int(부호 있는 int) (4바이트)
</p></li><li class="Default"><p><code>uint64</code> - unsigned 'quad word'(부호 없는 '쿼드 단어') (8바이트)
</p></li><li class="Default"><p><code>int64</code> - signed 'quad word'(부호 있는 '쿼드 단어') (8바이트)
</p></li><li class="Default"><p><code>float</code> - 단정밀도 부동 소수점(4바이트)
</p></li><li class="Default"><p><code>double</code> - 배정밀도 부동 소수점(8바이트)
</p></li><li class="Default"><p><code>PTRINT</code> - 포인터를 가질 수 있는 정수(PTRINT 크기 추정 금지)
</p></li></ul><p>C++의 <code>int</code> 및 부호 없는 <code>int</code> 타입(플랫폼에 따라 크기가 변할 수 있으나 항상 최소 너비는 32비트로 보장됨)은 정수 너비가 중요치 않은 경우라면 코드에서 사용해도 괜찮습니다. 명시적으로 크기가 정해진 타입은 여전히 시리얼라이즈 또는 리플리케이트된 포맷으로 사용해야 합니다.
</p><h2 id="표준라이브러리사용">표준 라이브러리 사용</h2>
<p>과거에는 UE에서 C 및 C++ 표준 라이브러리를 직접 사용하는 것을 지양했습니다. 여기에는 빠른 구현을 위한 자체 라이브러리 사용, 메모리 할당에 대한 제어력 강화, 널리 이용 가능해지기 전에 새 함수 기능 추가, 바람직하지만 비표준인 동작 변경 수행, 코드베이스 전체에서 문법 일관성 유지, UE 언어와 호환되지 않는 컨스트럭트 방지 등 여러 가지 이유가 있습니다. 하지만 최근 몇 년에 걸쳐 표준 라이브러리는 더욱 안정적이고 완성도가 높아져, 추상화 레이어로 래핑하거나 직접 재구현하지 않아도 되는 함수 기능을 포함하게 되었습니다.
</p><p>이전에 사용한 적이 없는 새로운 표준 라이브러리 컴포넌트를 사용하고 싶다면 코딩 표준 그룹을 통해 평가받아야 합니다. 이를 통해 컴포넌트가 허용되면 이 허용 컴포넌트 목록을 최신 상태로 유지할 수 있습니다.
</p><p>자체 라이브러리 대신 표준 라이브러리 기능을 사용할 것인지 선택해야 할 때는 더 나은 결과를 제공하는 옵션을 선택하되, 일관성 또한 중요하게 고려해야 한다는 점을 명심하세요. 레거시 UE 구현이 더 이상 도움이 되지 않을 경우, 에픽은 지원을 중단하고 모든 사용을 표준 라이브러리로 이주하기로 결정할 수도 있습니다.
</p><p>동일한 API에서 UE 언어와 표준 라이브러리 언어를 혼합하여 사용하지 않도록 합니다.
</p><p><code>&lt;atomic&gt;</code> : 새 코드로 사용해야 하며 터치 시 기존 코드는 이주해야 합니다. Atomic은 지원되는 모든 플랫폼에서 완전히 효율적으로 구현되어야 합니다. 에픽의 자체 <code>TAtomic</code> 은 부분적으로만 구현되며 에픽에서 이를 유지보수하고 개선할 예정이 없습니다.
</p><p><code>&lt;type_traits&gt;</code> : 레거시 UE 특성과 표준 특성 간에 겹치는 부분이 있는 경우 사용해야 합니다. 특성은 종종 정확도를 위해 컴파일러 고유 속성으로 구현되며, 컴파일러는 표준 특성을 파악하여 이를 일반 C++로 처리하는 대신 보다 빠른 컴파일 경로를 선택할 수 있습니다. 한 가지 우려되는 사항은 UE 특성이 보통 <code>Value</code> static 또는 <code>Type</code> typedef를 갖는 반면, 표준 특성은 <code>value</code> 및 <code>type</code> 을 사용하게 되어 있습니다. 이는 중요한 차이점으로, 컴포지션 특성에 의해 특정 문법(예: <code>std::conjunction</code> )이 필요하기 때문입니다. 에픽에서 추가하는 새 특성은 컴포지션을 지원하기 위해 소문자 <code>value</code> 또는 <code>type</code> 으로 작성되고, 기존 특성은 대/소문자를 모두 지원하도록 업데이트됩니다.
</p><p><code>&lt;initializer_list&gt;</code> : 중괄호로 묶인 이니셜라이저 문법을 지원하기 위해 사용되어야 합니다. 이는 언어와 표준 라이브러리가 겹치는 경우에 해당되며, 이를 지원해야 할 경우 대안은 없습니다.
</p><p><code>&lt;regex&gt;</code> : 직접적으로 사용할 수도 있지만 에디터 전용 코드 내에 캡슐화해서 사용해야 합니다. 자체 정규 표현식 솔루션을 구현할 계획은 없습니다.
</p><p><code>&lt;limits&gt;</code> : <code>std::numeric_limits</code> 를 온전히 사용할 수 있습니다.
</p><p><code>&lt;cmath&gt;</code> : 이 헤더의 모든 부동 소수점 함수를 사용할 수 있습니다.
</p><p><code>&lt;cstring&gt;</code> : <code>memcpy()</code> 및 <code>memset()</code> 는 명확한 퍼포먼스상의 이점이 있을 경우 각각 <code>FMemory::Memcpy</code> 및 <code>FMemory::Memset</code> 대신 사용할 수 있습니다.
</p><p>표준 컨테이너와 스트링은 interop 코드를 제외하고는 사용하지 말아야 합니다.
</p><h2 id="코멘트">코멘트</h2>
<p>코멘트는 소통에 매우 중요합니다. 다음 섹션에서는 코멘트에 대해 몇 가지 유의할 점을 상세하게 설명합니다(출처: Kernighan &amp; Pike의 <em>The Practice of Programming</em> ).
</p><h3 id="가이드라인">가이드라인</h3>
<ul><li class="Default"><p>코드 자체만으로도 뜻을 알 수 있도록 코드를 작성합니다.
</p><pre class="prettyprint"><code>// 나쁜 예:
t = s + l - b;

// 좋은 예:
TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;</code></pre></li></ul><ul><li class="Default"><p>도움이 되는 코멘트를 작성합니다.
</p><pre class="prettyprint"><code>// 나쁜 예:
// Leaves 증가
++Leaves;

// 좋은 예:
// 찻잎이 더 있다는 것을 알았습니다.
++Leaves;</code></pre></li></ul><ul><li class="Default"><p>나쁜 코드에는 코멘트를 다는 대신 다시 작성합니다.
</p><pre class="prettyprint"><code>// 나쁜 예:
// 잎의 총 개수는
// 작은 잎과 큰 잎을 더한 것에서
// 둘 다인 것을 뺀 것입니다.
t = s + l - b;

// 좋은 예:
TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;</code></pre></li></ul><ul><li class="Default"><p>모순된 코드를 작성하지 않습니다.
</p><pre class="prettyprint"><code>// 나쁜 예:
// Leaves는 절대 증가하지 않음!
++Leaves;

// 좋은 예:
// 찻잎이 더 있다는 것을 알았습니다.
++Leaves;</code></pre></li></ul><h3 id="const정확도">Const 정확도</h3>
<p>Const는 문서이자 컴파일러 지시어(directive)이므로, 모든 코드는 const 정확도를 맞추어야 합니다.
</p><p>다음과 같은 내용이 페이지에 포함됩니다.
</p><ul><li class="Default"><p>함수 아규먼트가 함수에 의해 수정되지 않아 함수 아규먼트를 const 포인터 또는 참조로 전달하는 경우
</p></li><li class="Default"><p>메서드가 오브젝트를 수정하지 않아 const로 플래그를 지정하는 경우
</p></li><li class="Default"><p>루프에서 컨테이너 수정을 하지 않아 const를 사용하여 컨테이너에 반복작업을 하는 경우
</p></li></ul><p>예시:
</p><pre class="prettyprint"><code>void SomeMutatingOperation(FThing&amp; OutResult, const TArray&lt;Int32&gt;&amp; InArray)
{
    // InArray는 여기서 수정되지 않지만, OutResult는 수정될 수도 있습니다.
}

void FThing::SomeNonMutatingOperation() const
{
    // 이 코드는 자신을 호출한 FThing을 수정하지 않습니다.
}

TArray&lt;FString&gt; StringArray;
for (const FString&amp; : StringArray)
{
    // 이 루프의 바디는 StringArray를 수정하지 않습니다.
}</code></pre>
<p>const는 by-value 함수 파라미터와 로컬에서도 선호됩니다. 그러면 읽는 사람에게 변수가 함수 바디에서 수정되지 않을 것이라고 알려 주므로 가독성 향상에 도움이 됩니다. 이렇게 하면 선언과 정의가 일치하는데, JavaDoc 프로세스에 영향을 줄 수 있습니다.
</p><p>예시:
</p><pre class="prettyprint"><code>void AddSomeThings(const int32 Count);

void AddSomeThings(const int32 Count)
{
    const int32 CountPlusOne = Count + 1;
    // Count와 CountPlusOne 모두 함수 바디에서 변경 불가합니다.
}</code></pre>
<p>여기에 대한 한 가지 예외는 pass-by-value 파라미터로, 이 파라미터는 궁극적으로 컨테이너 안으로 이동하지만('이동 시맨틱' 참고) 이는 매우 드문 경우입니다.
</p><p>예시:
</p><pre class="prettyprint"><code>void FBlah::SetMemberArray(TArray&lt;FString&gt; InNewArray)
{
    MemberArray = MoveTemp(InNewArray);
}</code></pre>
<p>포인터가 가리키는 것이 아니라 포인터 자체를 const로 만들 때는 끝에 const 키워드를 넣습니다. 레퍼런스는 어떤 방식으로도 '재할당' 불가하며, 같은 방법으로 const로 만들 수 없습니다.
</p><p>예시:
</p><pre class="prettyprint"><code>// const 포인터에서 const 이외 오브젝트 - 포인터로의 재할당은 불가하나, T는 여전히 수정 가능합니다.
T* const Ptr = ...;

// 틀림
T&amp; const Ref = ...;</code></pre>
<p>복잡한 타입에 대한 이동 시맨틱이 제한되며 내장된 타입에는 컴파일 경고가 발생하므로 반환 타입에는 const를 사용하지 않습니다. 이 규칙은 반환 타입 자체에만 적용되며, 포인터의 타깃 타입 또는 반환되는 레퍼런스에는 적용되지 않습니다.
</p><p>예시:
</p><pre class="prettyprint"><code>// 나쁜 예 - const 배열 반환
const TArray&lt;FString&gt; GetSomeArray();

// 좋은 예 - const 배열로의 레퍼런스 반환
const TArray&lt;FString&gt;&amp; GetSomeArray();

// 좋은 예- const 배열로의 포인터 반환
const TArray&lt;FString&gt;* GetSomeArray();

// 나쁜 예 - const 배열로의 const 포인터 반환
const TArray&lt;FString&gt;* const GetSomeArray();</code></pre>
<h3 id="예시포맷">예시 포맷</h3>
<p>에픽에서는 JavaDoc 기반 시스템을 사용하여 코드에서 코멘트를 자동으로 추출한 뒤 문서를 만들기 때문에, 특수한 코멘트 포맷 규칙 몇 가지를 따라야 합니다.
</p><p>다음 예시는 <strong>클래스,</strong> <strong>메서드,</strong> <strong>변수</strong> 코멘트의 포맷입니다. 기억하실 것은, 코멘트는 코드를 설명해야 한다는 것입니다. 코드는 구현을 설명하고, 코멘트는 그 의도를 설명합니다. 코드 한 줄의 의도를 바꾸더라도 반드시 코멘트를 업데이트하시기 바랍니다.
</p><p>지원되는 파라미터 코멘트 스타일은 두 가지로, <code>Steep</code> 과 <code>Sweeten</code> 메서드로 표시됩니다. <code>Steep</code> 이 사용하는 <code>@param</code> 스타일은 전형적인 여러 줄 스타일이지만, 단순 함수의 경우 Sweeten의 예시처럼 파라미터와 반환 값 문서를 함수에 대한 설명 코멘트로 통합하는 것이 보다 깔끔할 수 있습니다. <code>@see</code> 또는 <code>@return</code> 과 같은 특수 코멘트 태그는 주요 설명에 이어 새 줄을 시작할 때만 사용해야 합니다.
</p><p>메서드 코멘트는 딱 한 번, 메서드가 퍼블릭으로 선언되는 곳에 포함해야 합니다. 메서드 코멘트는 호출자와 연관될 수 있는 메서드 오버라이드 관련 정보를 포함하여 메서드 호출자에 대한 정보만을 담아야 합니다. 메서드 구현에 대한 세부 사항이나 호출자와 연관되지 않은 오버라이드는 메서드 구현 안에 코멘트를 달아야 합니다.
</p><pre class="prettyprint"><code>/** 마실 수 있는 오브젝트에 대한 인터페이스입니다. */
class IDrinkable
{
public:
    /**
     * 플레이어가 이 오브젝트를 마실 때 호출됩니다.
     * @param OutFocusMultiplier - 반환되면 마신 사람의 포커스에 적용할 배수를 포함합니다.
     * @param OutThirstQuenchingFraction - 반환되면 마신 사람의 갈증이 해소되는 프랙션을 포함합니다(0-1).
     * @warning 마실 것이 적절히 준비된 이후에만 호출하세요.     
     */
    virtual void Drink(float&amp; OutFocusMultiplier, float&amp; OutThirstQuenchingFraction) = 0;
};

/** 차 한 잔입니다. */
class FTea : public IDrinkable
{
public:
    /**
     * 우려내는 데 사용한 물의 용량과 온도가 주어진 경우 차에 대한 델타-맛 값을 계산합니다.
     * @param VolumeOfWater - 우려내는 데 사용한 물의 양(mL)입니다.
     * @param TemperatureOfWater - 물의 온도(켈빈)입니다.
     * @param OutNewPotency - 우리기가 시작된 이후의 차의 효능으로, 0.97에서 1.04까지입니다.
     * @return - 차 농도의 변화를 분당 차 맛 단위(TTU)로 반환합니다.
     */
    float Steep(
        const float VolumeOfWater,
        const float TemperatureOfWater,
        float&amp; OutNewPotency
    );

    /** 차에 감미료를 추가합니다. 같은 당도를 내는 데 필요한 자당의 그램으로 측정합니다. */
    void Sweeten(const float EquivalentGramsOfSucrose);

    /** 일본에서 판매되는 차의 가치(엔화 단위)입니다. */
    float GetPrice() const
    {
        return Price;
    }

    virtual void Drink(float&amp; OutFocusMultiplier, float&amp; OutThirstQuenchingFraction) override;

private:
    /** 엔화 단위 가격입니다. */
    float Price;

    /** 현재 당도로, 자당 그램 단위입니다. */
    float Sweetness;
};

float FTea::Steep(const float VolumeOfWater, const float TemperatureOfWater, float&amp; OutNewPotency)
{
    ...
}

void FTea::Sweeten(const float EquivalentGramsOfSucrose)
{
    ...
}

void FTea::Drink(float&amp; OutFocusMultiplier, float&amp; OutThirstQuenchingFraction)
{
    ...
}</code></pre>
<p>클래스 코멘트에 포함되는 것은 다음과 같습니다.
</p><ul><li class="Default"><p>이 클래스가 해결하는 문제에 대한 설명
</p></li><li class="Default"><p>이 클래스를 생성한 이유
</p></li></ul><p>이러한 여러 줄의 메서드 코멘트 부분이 뜻하는 바는 다음과 같습니다.
</p><ol><li class="Default"><p><strong>함수의 목적:</strong> <code>이 함수가 해결하는 문제</code> 를 설명합니다. 위에서 설명한 것처럼 코멘트는 <code>의도</code> 를 설명하며, 코드는 <code>구현</code> 을 설명합니다.
</p></li><li class="Default"><p><strong>파라미터 코멘트:</strong> 각 파라미터는 다음을 포함해야 합니다.
</p><ul><li class="Default"><p>측정 단위
</p></li><li class="Default"><p>예상되는 값 범위
</p></li><li class="Default"><p>'불가능한' 값
</p></li><li class="Default"><p>상태/오류 코드의 의미
</p></li></ul></li><li class="Default"><p><strong>반환 코멘트:</strong> 예상되는 반환 값을 출력 변수로만 문서화합니다. 중복을 피하기 위해, 함수의 목적이 오로지 이 값을 반환하는 것이고 그 부분이 함수 목적에 명시화된 경우 명시적 @return 코멘트는 사용하지 말아야 합니다.
</p></li><li class="Default"><p><strong>추가 정보:</strong> <code>@warning</code> , <code>@note</code> , <code>@see</code> , <code>@deprecated</code> 를 사용하여 관련된 추가 정보를 문서화할 수 있습니다. 각각은 나머지 코멘트에 이어 별도의 줄에 선언해야 합니다.
</p></li></ol><h2 id="최신c++언어문법">최신 C++ 언어 문법</h2>
<p>언리얼 엔진은 다수의 C++ 컴파일러로 대규모 포팅이 가능하도록 만들어졌기에, 에픽에서 기능을 사용할 때는 지원하게 될 수도 있는 컴파일러와의 호환성을 신중히 따져 봅니다. 가끔은 매우 유용한 기능을 매크로에 저장하여 자주 사용하는 경우도 있습니다. 그러나 보통은 지원하게 될 수도 있는 모든 컴파일러가 최신 표준을 지원할 때까지 기다립니다.
</p><p>언리얼 엔진이 빌드 시 요구하는 최소 언어 버전은 C++17이며, 최신 컴파일러 전반에서 잘 지원되는 다수의 최신 언어 기능을 사용합니다. 경우에 따라 프리프로세서 조건문에 이러한 기능의 사용을 래핑할 수도 있습니다. 그러나 가끔은 포터빌리티나 다른 이유로 인해 특정 언어 기능 전체를 사용하지 않기로 결정하는 경우도 있습니다.
</p><p>아래에 지원되는 최신 C++ 컴파일러 기능으로 명시된 것 이외의 컴파일러 전용 언어 기능에 대해서는, 프리프로세서 매크로나 조건문에 래핑한 경우가 아니라면 사용하지 말아야 하며, 래핑했다 하더라도 신중하게 사용해야 합니다.
</p><h3 id="static_assert">static_assert</h3>
<p>이 키워드는 컴파일 시간 어서트가 필요한 경우 사용할 수 있습니다.
</p><h3 id="override및final">override 및 final</h3>
<p>이 키워드들은 사용할 수 있을 뿐만 아니라, 사용을 강력히 권합니다. 빠진 부분이 다수 있을 수 있으나, 서서히 수정될 예정입니다.
</p><h3 id="nullptr">nullptr</h3>
<p><code>nullptr</code> 은 모든 경우 C 스타일 <code>NULL</code> 매크로 대신 사용해야 합니다.
</p><p>한 가지 예외로는 C++/CX 빌드(예: Xbox One)의 <code>nullptr</code> 은 사실 관리된 null 레퍼런스 타입입니다. 타입이나 일부 템플릿 인스턴스화 컨텍스트를 제외하면 네이티브 C++의 <code>nullptr</code> 과 거의 호환되므로, 호환성을 위해서는 좀 더 일반적인 <code>decltype(nullptr)</code> 대신 <code>TYPE_OF_NULLPTR</code> 매크로를 사용해야 합니다.
</p><h3 id="'auto'키워드">'auto' 키워드</h3>
<p>아래 몇 가지 예외를 제외하면 C++ 에서 <code>auto</code> 를 사용해서는 안 됩니다. 초기화하려는 타입은 항상 명시해 주어야 합니다. 즉, 읽는 사람에게 타입이 명확하게 보여야 한다는 뜻입니다. 이 규칙은 C#의 <code>var</code> 키워드 사용에도 적용됩니다.
</p><p>또한 C++17의 구조체 바인딩 기능도 실질적으로 variadic <code>auto</code> 이므로 사용해서는 안 됩니다.
</p><p><code>auto</code> 를 사용해도 되는 경우는 다음과 같습니다.
</p><ul><li class="Default"><p>변수에 람다를 바인딩해야 하는 경우. 람다 타입은 코드로 표현할 수 없기 때문입니다.
</p></li><li class="Default"><p>이터레이터 변수의 경우. 단, 이터레이터 타입이 매우 장황하여 가독성에 악영향을 미치는 경우에 한합니다.
</p></li><li class="Default"><p>템플릿 코드에서 표현식의 타입을 쉽게 식별할 수 없는 경우. 고급 사용 사례입니다.
</p></li></ul><p>코드를 읽는 사람에게 타입을 명확하게 알리는 것은 매우 중요합니다. 일부 IDE에서 타입을 추론할 수는 있지만, 이는 코드가 컴파일 가능 상태라는 가정하에서만 가능합니다. merge/diff 툴 사용자나, GitHub와 같은 곳에서 개별 소스 파일을 독립적으로 확인하는 경우에도 도움이 되지 않습니다.
</p><p><code>auto</code> 를 사용해도 괜찮다는 확신이 든다면, 항상 해당 타입에 const, &amp;, *를 정확히 사용해야 한다는 점을 기억해 주시기 바랍니다. 그래야만 `auto` 를 통해 원하는 추론 타입을 이끌어낼 수 있습니다.
</p><h3 id="범위기반for">범위 기반 for</h3>
<p>코드의 가독성과 유지보수성 향상에 도움이 되므로 사용을 추천합니다. 기존 <code>TMap</code> 이터레이터를 사용하는 코드를 이주할 때는, 기존 이터레이터 타입 메서드였던 <code>Key()</code> 및 <code>Value()</code> 함수가 이제 단순히 내재된 키 값 <code>TPair</code> 의 <code>Key</code> 및 <code>Value</code> 필드가 되었음에 유의하세요.
</p><p>예시:
</p><pre class="prettyprint"><code>TMap&lt;FString, int32&gt; MyMap;

// 기존 스타일
for (auto It = MyMap.CreateIterator(); It; ++It)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), It.Key(), *It.Value());
}

// 새 스타일
for (TPair&lt;FString, int32&gt;&amp; Kvp : MyMap)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), *Kvp.Key, Kvp.Value);
}</code></pre>
<p>몇몇 독립형 이터레이터 타입에서 범위로 대체한 것도 있습니다.
</p><p>예시:
</p><pre class="prettyprint"><code>// 기존 스타일
for (TFieldIterator&lt;UProperty&gt; PropertyIt(InStruct, EFieldIteratorFlags::IncludeSuper); PropertyIt; ++PropertyIt)
{
    UProperty* Property = *PropertyIt;
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property-&gt;GetName());
}

// 새 스타일
for (UProperty* Property : TFieldRange&lt;UProperty&gt;(InStruct, EFieldIteratorFlags::IncludeSuper))
{
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property-&gt;GetName());
}</code></pre>
<h3 id="람다및익명함수">람다 및 익명 함수</h3>
<p>람다는 자유롭게 사용할 수 있습니다. 람다를 최적으로 사용하려면 길이상 두 구문 정도가 되어야 합니다. 특히 규모가 더 큰 표현식이나 구문의 일부로 사용될 때, 예를 들면 범용 알고리즘의 술부(predicate)에 사용될 때는 더욱 그렇습니다.
</p><p>예시:
</p><pre class="prettyprint"><code>// 이름에 단어 'Hello'가 포함된 첫 번째 Thing을 검색합니다.
Thing* HelloThing = ArrayOfThings.FindByPredicate([](const Thing&amp; Th){ return Th.GetName().Contains(TEXT("Hello")); });

// 배열을 이름 역순으로 정렬합니다.
Algo::Sort(ArrayOfThings, [](const Thing&amp; Lhs, const Thing&amp; Rhs){ return Lhs.GetName() &gt; Rhs.GetName(); });</code></pre>
<p>스테이트풀 람다는 자주 사용하는 경향이 있는 함수 포인터에 할당할 수 없다는 점에 유의하세요.
</p><p>사소하지 않은 람다는 일반 함수와 같은 방식으로 문서화해야 합니다. 코멘트를 몇 줄에 걸쳐 나눠 적어도 됩니다.
</p><p>자동 캡처보다는 명시적(explicit) 캡처를 사용해야 합니다(<code>[&amp;]</code> 및 <code>[=]</code> ). 대규모 람다와 지연(deferred) 실행에 사용되는 경우 가독성, 유지보수성, 퍼포먼스 측면에서 특히 중요합니다. 작성자의 의도를 선언하므로 코드 리뷰 과정에서 실수를 더욱 쉽게 잡아낼 수 있습니다. 잘못된 캡처는 부정적인 결과를 낳을 수 있으며, 추후 코드 유지보수 과정에서 문제가 될 확률이 높습니다.
</p><ul><li class="Default"><p>람다 실행이 지연된 경우 포인터 참조 캡처와 포인터 값 캡처가 때때로 허상 참조를 유발할 수 있습니다(<code>this</code> 포인터 포함).
</p></li><li class="Default"><p>값 캡처는 지연되지 않은 람다에 불필요한 사본을 만드는 경우 퍼포먼스상의 우려가 발생할 수 있습니다.
</p></li><li class="Default"><p>잘못 캡처된 UObject 포인터는 가비지 컬렉터에 보이지 않습니다. <code>[=]</code> 가 람다에 모든 것의 별도 사본이 있다는 인상을 주기는 하지만, 자동 캡처는 멤버 변수가 참조된 경우 묵시적으로 <code>this</code> 를 캡처합니다.
</p></li></ul><p>대규모 람다이거나 다른 함수 호출의 결과를 반환할 때는 명시적 반환 타입을 사용해야 합니다. 다음과 같이 <code>auto</code> 키워드와 동일한 방식으로 고려해야 합니다.
</p><pre class="prettyprint"><code>// 여기에는 반환 타입이 없어 반환 타입이 명확하지 않습니다.
auto Lambda = []() -&gt; FMyType
{
    return SomeFunc();
}</code></pre>
<p>지연되지 않은 사소한 람다는 Sort 호출처럼 시맨틱이 명확하므로 명시하더라도 장황해질 뿐입니다. 이러한 경우 자동 캡처와 묵시적 반환 타입을 사용해도 됩니다.
</p><p>다음과 같이 C++14의 캡처 이니셜라이저 기능을 사용할 수도 있습니다.
</p><pre class="prettyprint"><code>TUniquePtr&lt;FThing&gt; ThingPtr = MakeUnique&lt;FThing&gt;();
AsyncTask([UniquePtr = MoveTemp(UniquePtr)]()
{
    // 여기에 UniquePtr 사용
});</code></pre>
<h3 id="강-타입enum">강 - 타입 Enum</h3>
<p>Enum 클래스는 항상 일반 열거형이든 <code>UENUM</code> 이든 기존 네임스페이스 열거형을 대체하여 사용해야 합니다. 예를 들면 다음과 같습니다.
</p><pre class="prettyprint"><code>// 기존 열거형
UENUM()
namespace EThing
{
    enum Type
    {
        Thing1,
        Thing2
    };
}

// 새 열거형
UENUM()
enum class EThing : uint8
{
    Thing1,
    Thing2
}</code></pre>
<p>이는 <code>UPROPERTY</code> 로도 지원되며, 기존 <code>TEnumAsByte&lt;&gt;</code> 우회법을 대체합니다. 열거형 프로퍼티는 바이트뿐만 아니라 어떤 크기라도 될 수 있습니다.
</p><pre class="prettyprint"><code>// 기존 프로퍼티
UPROPERTY()
TEnumAsByte&lt;EThing::Type&gt; MyProperty;

// 새 프로퍼티
UPROPERTY()
EThing MyProperty;</code></pre>
<p>그러나 블루프린트에 노출되는 열거형은 여전히 <code>uint8</code> 기반이어야 합니다.
</p><p>플래그로 사용되는 Enum 클래스는 새로운 <code>ENUM_CLASS_FLAGS(EnumType)</code> 매크로를 사용하여 비트 단위 연산자 전체를 다음과 같이 자동 정의할 수 있습니다.
</p><pre class="prettyprint"><code>enum class EFlags
{
    None = 0x00,
    Flag1 = 0x01,
    Flag2 = 0x02,
    Flag3 = 0x04
};

ENUM_CLASS_FLAGS(EFlags)</code></pre>
<p>한 가지 예외는 <em>truth</em> 컨텍스트에서 플래그를 사용하는 것으로, 이는 언어상의 한계입니다. 대신 모든 플래그 열거형에 비교용으로 0으로 설정된 <code>None</code> 열거형을 넣습니다.
</p><pre class="prettyprint"><code>// 기존 스타일
if (Flags &amp; EFlags::Flag1)

// 새 스타일
if ((Flags &amp; EFlags::Flag1) != EFlags::None)</code></pre>
<h3 id="이동시맨틱">이동 시맨틱</h3>
<p><code>TArray</code> , <code>TMap</code> , <code>TSet</code> , <code>FString</code> 과 같은 모든 주요 컨테이너 타입에는 move 컨스트럭터와 move 할당 연산자가 있습니다. 이러한 타입을 값으로 전달/반환할 때 종종 자동으로 사용되지만, <code>std::move</code> 의 UE 해당 버전인 <code>MoveTemp</code> 를 통해 명시적으로 호출 가능합니다.
</p><p>값으로 컨테이너나 스트링을 반환하는 것은 보통 임시로 복사하는 비용이 없어 표현성에 이득이 될 수 있습니다. 값 전달 관련 규칙 및 <code>MoveTemp</code> 사용법은 아직도 확립 중이지만, 최적화된 코드베이스 영역 일부에서는 이미 찾아볼 수 있습니다.
</p><h3 id="디폴트멤버이니셜라이저">디폴트 멤버 이니셜라이저</h3>
<p>디폴트 멤버 이니셜라이저는 클래스 자체 내에서 클래스 디폴트값을 정의하는 데 사용할 수 있습니다.
</p><pre class="prettyprint"><code>UCLASS()
class UTeaOptions : public UObject
{
    GENERATED_BODY()

public:
    UPROPERTY()
    int32 MaximumNumberOfCupsPerDay = 10;

    UPROPERTY()
    float CupWidth = 11.5f;

    UPROPERTY()
    FString TeaType = TEXT("Earl Grey");

    UPROPERTY()
    EDrinkingStyle DrinkingStyle = EDrinkingStyle::PinkyExtended;
};</code></pre>
<p>코드를 이런 식으로 작성했을 때의 장점은 다음과 같습니다.
</p><ul><li class="Default"><p>여러 컨스트럭터에 걸쳐 이니셜라이저를 복제할 필요가 없습니다.
</p></li><li class="Default"><p>초기화 순서와 선언 순서가 섞일 일이 없습니다.
</p></li><li class="Default"><p>멤버 타입, 프로퍼티 플래그, 디폴트값이 모두 한 곳에 있으므로 가독성과 유지보수성에 좋습니다.
</p></li></ul><p>그러나 다음과 같은 단점도 있습니다.
</p><ul><li class="Default"><p>디폴트값을 변경하면 모든 종속 파일을 리빌드해야 합니다.
</p></li><li class="Default"><p>헤더는 엔진 패치 릴리즈에서 변경할 수 없으므로, 가능한 픽스 종류가 제한될 수 있습니다.
</p></li><li class="Default"><p>이런 방식으로 초기화시킬 수는 없는 것들도 있습니다. 예를 들면 베이스 클래스, <code>UObject</code> 서브오브젝트, 앞서 선언한(forward-declared) 타입으로의 포인터, 컨스트럭터 아규먼트에서 추론해 낸 값, 여러 단계에 걸쳐 초기화된 멤버 등은 이런 방식으로 초기화시킬 수 없습니다.
</p></li><li class="Default"><p>헤더에 약간의 이니셜라이저를 두고 나머지는 .cpp 파일의 컨스트럭터에 두게 되면 가독성과 유지보수성에 좋지 않을 수 있습니다.
</p></li></ul><p>실제 사용 여부는 적절한 판단에 맡길 부분입니다. 경험에 의하면, 디폴트 멤버 이니셜라이저는 엔진 코드보다 게임 코드 쪽에 적합합니다. 디폴트값에 환경설정 파일을 사용하는 것도 고려해 보세요.
</p><h2 id="서드파티코드">서드 파티 코드</h2>
<p>엔진에서 사용하는 라이브러리에 대한 코드를 수정할 때마다, 변경 내용에 //@UE4 코멘트는 물론 변경 이유를 설명하는 태그를 꼭 달아 주세요. 그러면 그 라이브러리의 새 버전으로 변경사항을 병합하는 작업이 쉽게 이루어지며, 라이선시 역시 수정 내용을 쉽게 찾을 수 있습니다.
</p><p>또한 엔진에 포함되는 서드 파티 코드는 쉽게 검색 가능한 포맷의 코멘트로 표시해야 합니다. 예를 들면 다음과 같습니다.
</p><pre class="prettyprint"><code>// @third party code - BEGIN PhysX
#include &lt;physx.h&gt;
// @third party code - END PhysX
// @third party code - BEGIN MSDN SetThreadName
// [http://msdn.microsoft.com/ko-kr/library/xcb2z8hs.aspx]
// 디버거에서 스레드 이름을 설정하는 데 사용됨
...
//@third party code - END MSDN SetThreadName</code></pre>
<h2 id="코드포맷">코드 포맷</h2>
<h3 id="중괄호">중괄호</h3>
<p>중괄호에 대한 논쟁은 오랫동안 이어져 왔습니다. 에픽에서는 새 줄에 중괄호를 사용하는 것이 오래된 관행처럼 이어지고 있으니, 이를 준수하여 주시기 바랍니다.
</p><p>다음 예시와 같이 단일 구문 블록에도 항상 중괄호를 포함시켜 주세요.
</p><pre class="prettyprint"><code>if (bThing)
{
    return;
}</code></pre>
<h3 id="if-else">If - Else</h3>
<p>if-else 문의 각 실행 블록은 중괄호로 묶어야 합니다. 이는 편집 시 실수를 방지하기 위함으로, 중괄호를 사용하지 않은 경우 다른 사람이 의도치 않게 if 블록에 다른 줄을 추가하게 될 수 있습니다. 이렇게 추가된 줄은 if 문의 영향을 받지 않으므로 나쁜 결과로 이어지게 됩니다. 더욱 나쁜 예시는 조건에 따라 컴파일되는 항목이 if/else 문을 깨지게 만드는 것입니다. 그러니 늘 중괄호를 사용해 주시기 바랍니다.
</p><pre class="prettyprint"><code>if (bHaveUnrealLicense)
{
    InsertYourGameHere();
}
else
{
    CallMarkRein();
}</code></pre>
<p>여러 갈래의 if 문에서 각각의 else if 문은 첫 번째 if 문과 같은 양만큼 들여쓰기해야 합니다. 그래야 읽는 사람이 구조를 쉽게 이해할 수 있습니다.
</p><pre class="prettyprint"><code>if (TannicAcid &lt; 10)
{
    UE_LOG(LogCategory, Log, TEXT("Low Acid"));
}
else if (TannicAcid &lt; 100)
{
    UE_LOG(LogCategory, Log, TEXT("Medium Acid"));
}
else
{
    UE_LOG(LogCategory, Log, TEXT("High Acid"));
}</code></pre>
<h3 id="탭및들여쓰기">탭 및 들여쓰기</h3>
<p>코드 들여쓰기 표준입니다.
</p><ul><li class="Default"><p>실행 블록별로 코드를 들여씁니다.
</p></li><li class="Default"><p>줄 시작 부분의 공백에는 스페이스가 아니라 탭을 사용합니다. 탭 크기는 4자로 설정합니다. 그래도 탭을 스페이스 몇 칸으로 지정했는지와 무관하게 코드 줄을 맞추기 위해 스페이스를 써야 할 때가 있습니다. 예를 들면, 탭 이외의 문자에 코드 줄을 맞출 필요가 있는 경우입니다.
</p></li><li class="Default"><p>C#로 코드를 작성하는 경우에도 스페이스가 아니라 탭을 사용해 주시기 바랍니다. C#와 C++ 사이의 전환은 프로그래머에게 자주 있는 일이고, 대부분은 일관된 탭 세팅을 주로 사용하기 때문입니다. Visual Studio의 디폴트값으로는 C# 파일에 스페이스를 사용하고 있으니, 언리얼 엔진 코드 작업을 할 때는 이 세팅을 변경해야 한다는 점을 기억해 주시기 바랍니다.
</p></li></ul><h3 id="switch문">Switch 문</h3>
<p>빈 케이스(동일한 코드를 갖는 다중 케이스)를 제외하면, switch 케이스 문에서는 다음 케이스로 넘어간다는 것을 명시적으로 밝혀 주어야 합니다. 각각의 경우마다 break를 넣거나, falls through 코멘트를 달아 주세요. 다른 코드 제어 전송 명령(return, continue 등)도 괜찮습니다.
</p><p>디폴트 케이스는 항상 만들어 두고, 다른 사람이 그 뒤에 새로운 케이스를 추가할 때에 대비해 break도 넣어 두시기 바랍니다.
</p><pre class="prettyprint"><code>switch (condition)
{
    case 1:
        ...
        // falls through

    case 2:
        ...
        break;

    case 3:
        ...
        return;

    case 4:
    case 5:
        ...
        break;

    default:
        break;
}</code></pre>
<h2 id="네임스페이스">네임스페이스</h2>
<p>해당하는 경우 네임스페이스를 사용하여 클래스, 함수 및 변수를 구성할 수 있습니다. 네임스페이스를 사용하는 경우에는 아래 규칙을 따릅니다.
</p><ul><li class="Default"><p>대부분의 UE 코드는 현재 글로벌 네임스페이스에 래핑되어 있지 않습니다. 특히나 서드 파티 코드를 사용하거나 포함할 때는 전역 범위에서 충돌이 일어나지 않도록 주의를 기울여야 합니다.
</p></li><li class="Default"><p>언리얼 헤더 툴에는 네임스페이스가 지원되지 않으므로, <code>UCLASS</code> , <code>USTRUCT</code> 등을 정의할 때는 사용할 수 없습니다.
</p></li><li class="Default"><p><code>UCLASS</code> , <code>USTRUCT</code> 등이 아닌 새 API는 적어도 <code>UE::</code> 네임스페이스에 배치해야 하며, 이상적으로는 중첩된 네임스페이스(예: <code>UE::Audio::</code> )를 사용하는 것이 좋습니다.  누구에게나 공개되는 API의 일부가 아닌 구현 세부 정보를 포함하는 데 사용되는 네임스페이스는 <code>Private</code> 네임스페이스(예: <code>UE::Audio::Private::</code> )에 들어가야 합니다.
</p></li><li class="Default"><p><code>Using</code> 선언:
</p><ul><li class="Default"><p>전역 범위에는 .cpp 파일에서도 <code>using</code> 선언을 넣지 않습니다('unity' 빌드 시스템에 문제가 생깁니다).
</p></li><li class="Default"><p>다른 네임스페이스 안이나 함수 바디 안에는 <code>using</code> 선언을 넣어도 괜찮습니다.
</p></li><li class="Default"><p>네임스페이스 안에 <code>using</code> 선언을 넣는 경우, 동일 이동 단위 내 해당 네임스페이스의 다른 곳으로 이어지게 됩니다. 일관성만 있으면 괜찮을 것입니다.
</p></li><li class="Default"><p>위의 규칙을 따라야만 헤더 파일에서 <code>using</code> 선언을 안전하게 사용할 수 있습니다.
</p></li></ul></li><li class="Default"><p>앞서 선언된 타입은 각각의 네임스페이스 안에서 선언해야 한다는 점에 유의하세요. 그렇지 않으면 링크 오류가 발생합니다.
</p></li><li class="Default"><p>하나의 네임스페이스 안에 다수의 클래스/타입을 선언할 경우 다른 전역 범위의 클래스에서 사용하기 어려울 수 있습니다(예를 들면, 함수 시그니처는 클래스 선언에 나타날 때 명시적 네임스페이스를 사용해야 합니다).
</p></li><li class="Default"><p><code>using</code> 선언을 사용하여 네임스페이스 안의 특정 변수만 자신의 범위로 에일리어싱할 수 있습니다(예: using <code>Foo::FBar</code> ). 그러나 언리얼 코드에서는 보통 그렇게 하지 않습니다.
</p></li><li class="Default"><p>매크로는 네임스페이스 내에 있을 수 없지만, 대신 <code>UE_</code> 접두사를 붙이면 됩니다(예: <code>UE_LOG</code> ).
</p></li></ul><h2 id="물리적종속성">물리적 종속성</h2>
<ul><li class="Default"><p>파일 이름에는 가급적 접두사를 붙이지 않아야 합니다. 예를 들면 <code>UScene.cpp</code> 보다는 <code>Scene.cpp</code> 가 좋습니다. 이렇게 하면 원하는 파일을 식별하는 데 필요한 글자 수가 줄어들어 Workspace Whiz나 Visual Assist와 같은 툴에서 Open File in Solution 등의 기능을 쉽게 사용할 수 있습니다.
</p></li><li class="Default"><p>모든 헤더는 <code>#pragma once</code> 지시어(directive)로 복수의 include를 방지해야 합니다. 참고로 에픽이 사용하는 모든 컴파일러는 <code>#pragma once</code> 를 지원합니다.
</p><pre class="prettyprint"><code>#pragma once
//&lt;파일 콘텐츠&gt;</code></pre></li></ul><ul><li class="Default"><p>일반적으로는 물리적 결합을 최소화하려고 시도하는 것이 좋습니다. 특히, 다른 헤더의 표준 라이브러리 헤더를 include하지 마세요.
</p></li></ul><p>헤더 include 대신 전방 선언(forward declaration)이 가능한 경우 그렇게 합니다.
</p><ul><li class="Default"><p>include할 때는 가능한 한 세밀하게 합니다. 예를 들면, Core.h를 include하지 말고 Core의 헤더 중 정의가 필요한 특정 부분을 include합니다.
</p></li><li class="Default"><p>세밀한 include 작업을 쉽게 하기 위해, 필요한 헤더는 전부 직접 include합니다.
</p></li><li class="Default"><p>자신이 include한 다른 헤더에 의해 간접적으로 include되는 헤더에 의존하지 않습니다.
</p></li><li class="Default"><p>다른 헤더를 통해 include시키기보다는 필요한 것을 전부 include하세요.
</p></li><li class="Default"><p>모듈에는 Private과 Public 소스 디렉터리가 있습니다. 다른 모듈이 필요로 하는 정의는 Public 디렉터리의 헤더에 있어야 합니다. 그 외 모든 것은 Private 디렉터리에 있어야 합니다. 참고로 기존 언리얼 모듈의 경우 이 디렉터리는 'Src' 및 'Inc'라고 불리기도 합니다. 그러나 이는 동일한 방식으로 프라이빗 코드와 퍼블릭 코드를 구분하기 위함일 뿐이지, 헤더 파일을 소스 파일과 구분하기 위함은 아닙니다.
</p></li><li class="Default"><p>사전 컴파일된 헤더 생성용 헤더 구성에 대해서는 걱정하지 마세요. UnrealBuildTool이 더욱 잘 처리해 줄 것입니다.
</p></li><li class="Default"><p>큰 함수는 논리적 하위 함수로 나눕니다. 컴파일러 최적화의 한 분야가 바로 공통 하위 표현식 삭제입니다. 함수가 클수록 그 식별을 위해 컴파일러가 할 일이 많아집니다. 그러면 빌드 시간이 크게 늘어나게 됩니다.
</p></li><li class="Default"><p>인라인 함수는 너무 많이 사용하지 마세요. 사용하지 않는 파일에 있어도 강제로 리빌드시키기 때문입니다. 인라인 함수는 사소한 접근자에만, 또는 프로파일링을 통해 이득이 있는 것으로 보일 때만 사용해야 합니다.
</p></li><li class="Default"><p><code>FORCEINLINE</code> 사용에 있어서는 훨씬 더 보수적이어야 합니다. 모든 코드와 로컬 변수는 호출 중 함수로 확장되어, 큰 함수에서 발생하는 것과 동일한 빌드 시간 문제가 생깁니다.
</p></li></ul><h2 id="캡슐화">캡슐화</h2>
<p>보호 키워드로 캡슐화를 실행합니다. 클래스 멤버는 클래스의 public/protected 인터페이스 일부가 아니면 거의 항상 프라이빗으로 선언해야 합니다. 상황에 따라 적절히 판단하되, 접근자가 없으면 나중에 기존 프로젝트와 플러그인 해체 없이 리팩터링 작업을 하는 것이 힘들어진다는 점에 유의하시기 바랍니다.
</p><p>특정 필드가 파생 클래스에서만 사용하도록 의도된 경우, 프라이빗으로 만들어 보호된 접근자를 제공하세요.
</p><p>더 이상 파생시킬 클래스가 아닌 경우 final을 사용합니다.
</p><h2 id="일반적인스타일문제">일반적인 스타일 문제</h2>
<ul><li class="Default"><p>종속성 거리를 최소화하세요. 코드가 특정 값을 갖는 변수에 의존할 때는, 변수를 사용하기 직전에 그 값을 설정합니다. 실행 블록 상단에 변수 값을 초기화한 상태로 코드 수백 줄 동안 사용하지 않는다면, 그 종속성을 모르는 사람이 실수로 그 값을 바꾸게 될 가능성이 높습니다. 바로 다음 줄에 사용한다면 변수 초기화를 왜 그렇게 했는지, 어디서 사용되는지를 명확히 할 수 있습니다.
</p></li><li class="Default"><p>메서드는 가급적 하위 메서드로 분할하세요. 세밀한 부분부터 시작해서 큰 그림을 재구성하기보다는, 큰 그림을 먼저 그린 후 필요한 세밀한 부분을 자세히 살펴보는 것이 더 쉬울 수도 있습니다. 마찬가지로, 모든 코드가 통째로 들어 있는 메서드보다는 이름을 잘 지어 둔 다수의 하위 메서드를 연속적으로 호출하는 단순한 메서드를 이해하는 것이 더 수월합니다.
</p></li><li class="Default"><p>함수 선언이나 함수 호출 위치에서 함수의 이름과 아규먼트 목록에 선행되는 괄호 사이에 스페이스를 추가하지 마세요.
</p></li><li class="Default"><p>컴파일러 경고에 주의를 기울여 주세요. 컴파일러 경고 메시지는 무언가 잘못되었다는 것을 뜻하므로 컴파일러가 경고하는 내용을 고쳐야 합니다. 전혀 처리할 수 없다면 <code>#pragma</code> 로 억제할 수는 있지만, 이는 최후의 수단이어야 합니다.
</p></li><li class="Default"><p>파일 끝에 빈 줄 하나를 만드세요. 모든 .cpp 및 .h 파일은 빈 줄이 있어야 gcc와 함께 제대로 작동합니다.
</p></li><li class="Default"><p>디버그 코드는 전반적으로 유용하고 잘 다듬어진 상태가 아니라면 체크인하지 말아야 합니다. 디버그 코드가 다른 코드와 섞이면 다른 코드를 읽기가 힘들어집니다.
</p></li><li class="Default"><p>스트링 리터럴 주변에는 항상 <code>TEXT()</code> 매크로를 사용하세요. 그렇게 하지 않으면 코드가 리터럴에서 <code>FStrings</code> 을 생성하는 경우 원치 않는 스트링 변환 프로세스가 유발됩니다.
</p></li><li class="Default"><p>루프에서의 동일 연산 반복을 피하세요. 공통된 하위 표현식은 루프 밖으로 빼서 중복 계산을 피합니다. 경우에 따라 statics를 활용하여 전역 범위에서의 함수 호출을 대상으로 하는 중복 연산을 피할 수 있는데, 스트링 리터럴에서의 <code>FName</code> 생성 등을 예로 들 수 있습니다.
</p></li><li class="Default"><p>핫 리로드 기능을 염두에 두세요. 종속성을 최소화하여 반복작업 시간을 줄입니다. 리로드 동안 변할 확률이 있는 함수에는 인라인 또는 템플릿을 사용하지 않습니다. 리로드 동안 그대로 남아 있을 것에만 statics를 사용하시기 바랍니다.
</p></li><li class="Default"><p>복잡한 표현식은 중간 변수를 사용하여 간소화하세요. 복잡한 표현식을 중간 변수에 할당된 하위 표현식으로 나누고, 부모 표현식 내에서 하위 표현식의 의미를 설명하는 이름을 지정하면 이해하기 더 쉬워집니다. 예를 들면 다음과 같습니다.
</p><pre class="prettyprint"><code>if ((Blah-&gt;BlahP-&gt;WindowExists-&gt;Etc &amp;&amp; Stuff) &amp;&amp;
    !(bPlayerExists &amp;&amp; bGameStarted &amp;&amp; bPlayerStillHasPawn &amp;&amp;
    IsTuesday())))
{
    DoSomething();
}</code></pre>
<p><code>이러한 코드는 다음으로 대체해야 함</code>
</p><pre class="prettyprint"><code>const bool bIsLegalWindow = Blah-&gt;BlahP-&gt;WindowExists-&gt;Etc &amp;&amp; Stuff;
const bool bIsPlayerDead = bPlayerExists &amp;&amp; bGameStarted &amp;&amp; bPlayerStillHasPawn &amp;&amp; IsTuesday();
if (bIsLegalWindow &amp;&amp; !bIsPlayerDead)
{
    DoSomething();
}</code></pre></li></ul><ul><li class="Default"><p>포인터와 레퍼런스의 스페이스는 그 오른쪽에 딱 한 칸만 두어야 합니다. 그래야 특정 타입에 대한 모든 포인터나 레퍼런스에 빠르게 <strong>Find in Files</strong> 를 사용할 수 있습니다.
</p></li><li class="Default"><p><em>다음은 사용 가능합니다.</em>
</p><pre class="prettyprint"><code>FShaderType* Ptr</code></pre>
<p><em>다음은 사용해서는 안 됩니다.</em>
</p><pre class="prettyprint"><code>FShaderType *Ptr
FShaderType * Ptr</code></pre></li></ul><ul><li class="Default"><p>섀도잉된 변수는 허용되지 않습니다. C++에서는 외부 영역에서의 변수를 섀도잉하는 것이 가능하지만, 이는 읽는 사람에게 모호할 수 있습니다. 예를 들어, 다음 멤버 함수에서 <code>Count</code> 변수는 세 가지 방법으로 사용할 수 있습니다.
</p><pre class="prettyprint"><code>class FSomeClass
{
public:
    void Func(const int32 Count)
    {
        for (int32 Count = 0; Count != 10; ++Count)
        {
            // 사용 횟수
        }
    }

private:
    int32 Count;
}</code></pre></li></ul><ul><li class="Default"><p>함수 호출에서 익명 리터럴 사용은 피하세요. 이름 상수로 의미를 설명하는 것이 좋습니다.
</p><pre class="prettyprint"><code>// 기존 스타일
Trigger(TEXT("Soldier"), 5, true);.

// 새 스타일
const FName ObjectName                = TEXT("Soldier");
const float CooldownInSeconds         = 5;
const bool bVulnerableDuringCooldown  = true;
Trigger(ObjectName, CooldownInSeconds, bVulnerableDuringCooldown);</code></pre>
<p>이렇게 하면 함수 선언을 조회하지 않아도 이해할 수 있으므로 일반적인 독자가 의도를 쉽게 파악할 수 있습니다.
</p></li><li class="Default"><p>헤더에 특수한 스태틱 변수를 정의하지 않도록 합니다. 해당 헤더가 포함된 모든 이동 단위로 인스턴스가 컴파일되기 때문입니다.
</p><pre class="prettyprint"><code>// SomeModule.h
static const FString GUsefulNamedString = TEXT("String");</code></pre>
<p><code>이러한 코드는 다음으로 대체해야 함</code>
</p><pre class="prettyprint"><code>// SomeModule.h
extern SOMEMODULE_API const FString GUsefulNamedString;

// SomeModule.cpp
const FString GUsefulNamedString = TEXT("String");</code></pre></li></ul><h2 id="api디자인가이드라인">API 디자인 가이드라인</h2>
<ul><li class="Default"><p><code>bool</code> 함수 파라미터는 피해야 하며, 함수에 전달되는 플래그의 경우 특히 그렇습니다. 앞서 언급한 익명 리터럴 문제가 그대로 발생합니다. 또한 시간에 따라 API 확장을 통해 동작이 추가되면서 늘어나는 경향도 있습니다. 대신 다음과 같이 열거형을 사용하는 것이 좋습니다. (<a id="content_link" href="../epic-cplusplus-coding-standard-for-unreal-engine"><span>강 - 타입 Enum</span></a> 섹션에서 열거형을 플래그로 사용하는 것에 대한 조언을 참조하세요)
</p><pre class="prettyprint"><code>// 기존 스타일
FCup* MakeCupOfTea(FTea* Tea, bool bAddSugar = false, bool bAddMilk = false, bool bAddHoney = false, bool bAddLemon = false);
FCup* Cup = MakeCupOfTea(Tea, false, true, true);

// 새 스타일
enum class ETeaFlags
{
    None,
    Milk  = 0x01,
    Sugar = 0x02,
    Honey = 0x04,
    Lemon = 0x08
};
ENUM_CLASS_FLAGS(ETeaFlags)

FCup* MakeCupOfTea(FTea* Tea, ETeaFlags Flags = ETeaFlags::None);
FCup* Cup = MakeCupOfTea(Tea, ETeaFlags::Milk | ETeaFlags::Honey);</code></pre>
<p>이러한 형태는 플래그가 실수로 반전되는 것을 막아 주어 포인터와 integer 아규먼트에서 실수로 변환되는 현상이 방지되고, 중복 디폴트값을 반복할 필요도 없으므로 더욱 효율적입니다.<br><code>bools</code> 를 아규먼트로 사용해도 괜찮은 경우는 setter처럼 함수에 전달하기에 완전한 상태일 때로, 예를 들면 <code>void FWidget::SetEnabled(bool bEnabled)</code> 와 같이 사용할 수 있습니다. 그러나 변경되는 경우에는 리팩터링을 고려해야 합니다.
</p></li><li class="Default"><p>너무 긴 함수 파라미터 리스트는 피하세요. 함수가 파라미터를 많이 받는 경우 다음과 같이 전용 구조체 전달을 고려해 보세요.
</p><pre class="prettyprint"><code>// 기존 스타일
TUniquePtr&lt;FCup[]&gt; MakeTeaForParty(const FTeaFlags* TeaPreferences, uint32 NumCupsToMake, FKettle* Kettle, ETeaType TeaType = ETeaType::EnglishBreakfast, float BrewingTimeInSeconds = 120.0f);

// 새 스타일
struct FTeaPartyParams
{
    const FTeaFlags* TeaPreferences       = nullptr;
    uint32           NumCupsToMake        = 0;
    FKettle*         Kettle               = nullptr;
    ETeaType         TeaType              = ETeaType::EnglishBreakfast;
    float            BrewingTimeInSeconds = 120.0f;
};
TUniquePtr&lt;FCup[]&gt; MakeTeaForParty(const FTeaPartyParams&amp; Params);</code></pre></li></ul><ul><li class="Default"><p><code>bool</code> 및 <code>FString</code> 을 사용한 함수 오버로드는 피하세요. 작동 방식을 예상할 수 없습니다.
</p><pre class="prettyprint"><code>void Func(const FString&amp; String);
void Func(bool bBool);

Func(TEXT("String")); // 부울 오버로드 호출!</code></pre></li></ul><ul><li class="Default"><p>인터페이스 클래스(접두사 'I'를 가짐)는 항상 추상형이어야 하며, 멤버 변수가 있어서는 안 됩니다. 인터페이스는 순수 가상(pure virtual)이 아닌 메서드를 포함할 수 있으며, 인라인 구현되는 한 가상이 아니거나 정적인 메서드도 포함할 수 있습니다.
</p></li><li class="Default"><p>오버라이딩 메서드를 선언할 때는 <code>virtual</code> 및 <code>override</code> 키워드를 사용하세요. 파생 클래스에서 가상 함수를 선언하고 그 클래스가 부모 클래스에서 가상 함수를 오버라이드하는 경우, <code>virtual</code> 및 <code>override</code> 키워드를 둘 다 사용해야 합니다. 예를 들면 다음과 같습니다.
</p><pre class="prettyprint"><code>class A
{
public:
    virtual void F() {}
};

class B : public A
{
public:
    virtual void F() override;
}</code></pre>
<div class="note">
	<p><code>override</code> 키워드는 최근에 추가되었으므로 아직 이 규칙을 따르지 않는 기존 코드가 많습니다. 그러한 코드에는 가급적 <code>override</code> 키워드를 추가해야 합니다.</p>
</div></li></ul><h2 id="플랫폼별코드">플랫폼별 코드</h2>
<p>플랫폼별 코드는 다음 예시와 같이 항상 적합한 이름의 하위 디렉터리의 플랫폼별 소스 파일에 추상화 및 구현해야 합니다.
</p><pre class="prettyprint"><code>Engine/Platforms/[PLATFORM]/Source/Runtime/Core/Private/[PLATFORM]PlatformMemory.cpp</code></pre>
<p>일반적으로, [PLATFORM] 이름의 디렉터리 밖에서 코딩하려면 <code>PLATFORM_[ </code>PLATFORM<code> ]</code> (예: <code>PLATFORM_XBOXONE</code> ) 형태는 피해야 합니다.
</p><p>대신 하드웨어 추상화 레이어를 확장하여 static 함수를 추가하세요. 예를 들어 FPlatformMisc의 경우는 다음과 같습니다.
</p><pre class="prettyprint"><code>FORCEINLINE static int32 GetMaxPathLength()
{
    return 128;
}</code></pre>
<p>그런 다음 플랫폼에서 이 함수를 오버라이드하여 플랫폼별 상수 값을 반환하거나, 플랫폼 API를 사용하여 결과를 결정할 수도 있습니다.
</p><p>함수에 force-inline을 사용하면 define을 사용할 때와 동일한 퍼포먼스 특징이 생깁니다.
</p><p>define이 반드시 필요한 경우, #define을 새로 만들어 플랫폼에 적용되는 특정 프로퍼티를 설명합니다. (예: <code>PLATFORM_USE_PTHREADS</code> ) Platform.h에 디폴트값을 설정해 두고, 필요한 플랫폼에서 그 플랫폼별 Platform.h 파일에 오버라이드합니다.
</p><p>예를 들면, Platform.h에 다음이 있다고 가정합니다.
</p><pre class="prettyprint"><code>#ifndef PLATFORM_USE_PTHREADS 
    #define PLATFORM_USE_PTHREADS 1
#endif</code></pre>
<p>또한 Windows/WindowsPlatform.h에는 다음이 있다고 가정합니다.
</p><pre class="prettyprint"><code>#define PLATFORM_USE_PTHREADS 0</code></pre>
<p>이러한 경우 크로스 플랫폼 코드는 플랫폼을 알 필요 없이 직접 다음과 같은 define을 사용하면 됩니다.
</p><pre class="prettyprint"><code>#if PLATFORM_USE_PTHREADS 
    #include "HAL/PThreadRunnableThread.h"
#endif</code></pre>
<p>이유: 엔진은 플랫폼별 세부 정보를 중앙에서 관리하므로, 그러한 세부 정보를 플랫폼별 소스 파일 안에만 있도록 할 수 있습니다. 이렇게 하면 여러 플랫폼에 걸쳐 엔진을 유지하기가 쉬워지며, 플랫폼별 define에 대한 코드베이스를 탐색할 필요 없이 새 플랫폼에 코드를 포팅할 수도 있습니다.
</p><p>플랫폼 코드를 플랫폼별 폴더에 유지하는 것은 PlayStation, Xbox, Nintendo Switch와 같은 NDA 플랫폼에 필수이기도 합니다.
</p><p><code>[PLATFORM]</code> 하위 디렉터리 존재 여부와 상관없이 코드가 컴파일되고 실행되도록 하는 것이 중요합니다. 즉, 크로스 플랫폼 코드가 플랫폼별 코드에 종속되어서는 안 됩니다.
</p>
																	</div>