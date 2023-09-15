---
title: "CPP Research"
layout: archive
permalink: categories/cpp/research
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "cppresearch"
---

{% assign posts = site.categories.cppresearch%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}