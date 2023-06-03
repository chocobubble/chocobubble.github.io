---
title: "Home Title"
layout: archive
permalink: /
author_profile: true
sidebar_main: true

---

{% assign posts = site.categories.Home %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}