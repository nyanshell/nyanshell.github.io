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

Older posts:
<ul>
  <li><a href="/2013/04/29/villec2-flash.html">A method to unbrick HTC ONE S S3( villec2 ) with third party recovery & rom flashed</a></li>
  <li><a href="/2013/05/10/python-32-convert-raw-string-to-string.html">Python 3.2 convert raw string to string</a></li>
</ul>
{% assign filtered_posts = site.posts | where: "tag", "kirisame" %}
<ul>
{% for post in filtered_posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
