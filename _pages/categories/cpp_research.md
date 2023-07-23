---
title: "CPP Research"
layout: archive
permalink: categories/cpp/research
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "cpp_research"
---

{% assign posts = site.categories.cpp_research%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}