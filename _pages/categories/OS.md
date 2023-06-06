---
title: "Operating System"
layout: archive
permalink: categories/OS
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "Operating System"
---

{% assign posts = site.categories.OS%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}