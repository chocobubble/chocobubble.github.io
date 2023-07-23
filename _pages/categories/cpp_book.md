---
title: "CPP Book"
layout: archive
permalink: categories/cpp/book
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "cpp_book"
---

{% assign posts = site.categories.cpp_book%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}