---
layout: page
title: Memo
permalink: /memo/
---
{% assign filtered_posts = site.posts | where: "categories", "memo" %}
<ul>
{% for post in filtered_posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

[Older posts](https://kirisame.tips/)
