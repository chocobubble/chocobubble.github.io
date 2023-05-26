---
title: "Test"
layout: archive
permalink: /Category/Test
---

{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}