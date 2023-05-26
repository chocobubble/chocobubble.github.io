---
title: "Data Structure"
layout: archive
permalink: categories/DS
author_profile: true
types: posts
---

{% assign posts = site.categories.DS%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}