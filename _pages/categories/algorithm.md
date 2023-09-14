---
title: "algorithm"
layout: archive
permalink: categories/algo
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "algorithm"
---

{% assign posts = site.categories.algo%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}