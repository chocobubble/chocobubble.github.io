---
title: "Computer Architecture"
layout: archive
permalink: categories/architecture
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "Computer Architecture"
---

{% assign posts = site.categories.Architecture%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}