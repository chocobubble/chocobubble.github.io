var store = [{
        "title": "DS Test 2",
        "excerpt":"For Test DS 2  For test ds 2  for test ds 2  ","categories": ["DS"],
        "tags": ["ds"],
        "url": "/ds/ds-test-2/",
        "teaser": "/assets/images/teaser.jpg"
      },{
        "title": "Post:Sample Test",
        "excerpt":"For Test      1    This post is for testing.  ","categories": ["Test"],
        "tags": ["test"],
        "url": "/test/test-post/",
        "teaser": "/assets/images/teaser.jpg"
      },{
        "title": "자료 구조 - 시작",
        "excerpt":"‘c++로 쉽게 풀어쓴 자료구조 1판 - 천인국, 최영규’ 책을 참고하여 작성한 포스트입니다. 자료구조 자료구조란? 자료들을 편리하고 효율적으로 처리하기 위해 정리하고 조직화하는 구조이다. 자료구조의 분류 자료구조는 단순 자료구조와 여러 가지 자료들이 복합적으로 구성된 복합 자료구조로 나눌 수 있다. 단순 자료구조 : 정수, 실수, 문자, 문자열, 포인터 같이 많은 프로그래밍 언어에서 기본적으로...","categories": ["DS"],
        "tags": ["DS"],
        "url": "/ds/ds-1/",
        "teaser": "/assets/images/teaser.jpg"
      },{
        "title": "DS Test 1",
        "excerpt":"For Test  int main() {     cout&lt;&lt;\"Hello\"; }      1    This post is for testing.   And and and and     111   222      111   222  ","categories": ["DS"],
        "tags": ["ds"],
        "url": "/ds/ds-test/",
        "teaser": "/assets/images/teaser.jpg"
      },{
    "title": "Data Structure",
    "excerpt":"DS Test 1 less than 1 minute read For Test int main() { cout&lt;&lt;\"Hello\"; } 1 This post is for testing. And and and and 111 222 111 222 자료 구조 - 시작 3 minute read C++로 쉽게 풀어쓴 자료구조 1판 - 천인국, 최영규 DS Test 2 less than 1...","url": "http://localhost:4000/categories/DS"
  },{
    "title": "Category",
    "excerpt":" ","url": "http://localhost:4000/categories/"
  },{
    "title": "C++ 프로그래밍",
    "excerpt":"                              Post:Sample Test                                                                                           less than 1 minute read                                For Test     1   This post is for testing.        ","url": "http://localhost:4000/categories/cpp"
  },{
    "title": "Home Title",
    "excerpt":" ","url": "http://localhost:4000/"
  },{
    "title": null,
    "excerpt":"","url": "http://localhost:4000/"
  },{
    "title": null,
    "excerpt":"var idx = lunr(function () { this.field('title') this.field('excerpt') this.field('categories') this.field('tags') this.ref('id') this.pipeline.remove(lunr.trimmer) for (var item in store) { this.add({ title: store[item].title, excerpt: store[item].excerpt, categories: store[item].categories, tags: store[item].tags, id: item }) } }); $(document).ready(function() { $('input#search').on('keyup', function () { var resultdiv = $('#results'); var query = $(this).val().toLowerCase(); var result = idx.query(function...","url": "http://localhost:4000/assets/js/lunr/lunr-en.js"
  },{
    "title": null,
    "excerpt":"step1list = new Array(); step1list[\"ΦΑΓΙΑ\"] = \"ΦΑ\"; step1list[\"ΦΑΓΙΟΥ\"] = \"ΦΑ\"; step1list[\"ΦΑΓΙΩΝ\"] = \"ΦΑ\"; step1list[\"ΣΚΑΓΙΑ\"] = \"ΣΚΑ\"; step1list[\"ΣΚΑΓΙΟΥ\"] = \"ΣΚΑ\"; step1list[\"ΣΚΑΓΙΩΝ\"] = \"ΣΚΑ\"; step1list[\"ΟΛΟΓΙΟΥ\"] = \"ΟΛΟ\"; step1list[\"ΟΛΟΓΙΑ\"] = \"ΟΛΟ\"; step1list[\"ΟΛΟΓΙΩΝ\"] = \"ΟΛΟ\"; step1list[\"ΣΟΓΙΟΥ\"] = \"ΣΟ\"; step1list[\"ΣΟΓΙΑ\"] = \"ΣΟ\"; step1list[\"ΣΟΓΙΩΝ\"] = \"ΣΟ\"; step1list[\"ΤΑΤΟΓΙΑ\"] = \"ΤΑΤΟ\"; step1list[\"ΤΑΤΟΓΙΟΥ\"] = \"ΤΑΤΟ\"; step1list[\"ΤΑΤΟΓΙΩΝ\"] = \"ΤΑΤΟ\"; step1list[\"ΚΡΕΑΣ\"]...","url": "http://localhost:4000/assets/js/lunr/lunr-gr.js"
  },{
    "title": null,
    "excerpt":"var store = [ {%- for c in site.collections -%} {%- if forloop.last -%} {%- assign l = true -%} {%- endif -%} {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%} {%- for doc in docs -%} {%- if doc.header.teaser -%} {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture...","url": "http://localhost:4000/assets/js/lunr/lunr-store.js"
  },{
    "title": null,
    "excerpt":"{% if page.xsl %} {% endif %} {% assign collections = site.collections | where_exp:'collection','collection.output != false' %}{% for collection in collections %}{% assign docs = collection.docs | where_exp:'doc','doc.sitemap != false' %}{% for doc in docs %} {{ doc.url | replace:'/index.html','/' | absolute_url | xml_escape }} {% if doc.last_modified_at or doc.date...","url": "http://localhost:4000/sitemap.xml"
  },{
    "title": null,
    "excerpt":"Sitemap: {{ \"sitemap.xml\" | absolute_url }} ","url": "http://localhost:4000/robots.txt"
  },{
    "title": null,
    "excerpt":"{% if page.xsl %}{% endif %}Jekyll{{ site.time | date_to_xmlschema }}{{ page.url | absolute_url | xml_escape }}{% assign title = site.title | default: site.name %}{% if page.collection != \"posts\" %}{% assign collection = page.collection | capitalize %}{% assign title = title | append: \" | \" | append: collection %}{% endif...","url": "http://localhost:4000/feed.xml"
  }]
