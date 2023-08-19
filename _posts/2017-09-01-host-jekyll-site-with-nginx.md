---
layout: post
title:  "Host Jekyll Site with Nginx"
date:   2017-09-01 22:34:40 +08:00
categories: jekyll nginx blog
tag: kirisame
author: Yet another Kirisame Marisa
---
**CHECKLIST**
* Firewall port
* SELinux
* Force SSL(ssl on configure) should be off at first

Nginx site related configure:

{% highlight bash %}
server {
    root <static_file_path>;
    index index.html;
    listen [::]:80;
    listen 80;
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name kirisame.tips www.kirisame.tips marisa.kirisame.tips;
    location / {
    }
    error_page 404 /404.html;
            location = 404.html {
    }
    ssl        on;
    ssl_certificate <PATH_TO_CERT>;
    ssl_certificate_key <PATH_TO_PRIVKEY>;
}

{% endhighlight %}

Install jekyll, use [RVM](https://rvm.io/) may make build easier, e.g:

* Add `export PATH="$PATH:$HOME/.rvm/bin"` to `.bashrc`
* `$ rvm install 2.5.3`
* `$ rvm use ruby-2.5.3`

Generate HTML (from this [pull request](https://github.com/jekyll/jekyll/pull/6274)):

{% highlight bash %}
$ JEKYLL_ENV=production bundle exec jekyll build -d _deploy
{% endhighlight %}

Using JEKYLL_ENV=production if you set google analytics tracking ID so [minima](https://github.com/jekyll/minima) or other theme you're using will render tracking script.

Change files privilege:

{% highlight bash %}
$ cd <PATH_TO_DEPLOY_FOLDER>
$ chmod o+x `find . -type d`
$ chmod o-x `find . -type f`
{% endhighlight %}

**TODO**
1. In Fedora 25, Nginx static file folder not in `/usr/share/nginx/html`, even SELinux was disabled, Nginx still return a permission denied when access.
2. An automatic way to change files privilege.