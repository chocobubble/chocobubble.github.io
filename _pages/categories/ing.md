---
title: "작성중 포스트들"
layout: archive
permalink: categories/ing
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "ING"
---

{% assign posts = site.categories.ing%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}