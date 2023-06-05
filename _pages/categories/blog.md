---
title: "Blog"
layout: archive
permalink: categories/blog
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
toc_label: "Blog"
---

{% assign posts = site.categories.blog%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}