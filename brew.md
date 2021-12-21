---
layout: page
title: Brew
permalink: /brew/
---
{% assign filtered_posts = site.posts | where: "categories", "brew" %}
<ul>
{% for post in filtered_posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
