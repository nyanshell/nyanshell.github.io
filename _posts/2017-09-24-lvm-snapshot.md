---
layout: post
title:  "LVM Create Snapshot"
date:   2017-09-24 14:11:56 +08:00
categories: LVM
author: Yet another Kirisame Marisa
tag: kirisame
---

{% highlight bash %}
$ lvcreate --size 900G --snapshot --name mdb-snap01 /dev/mapper/vg-data
$ mount /dev/vg/mdb-snap01 /mnt/backup/ -onouuid,ro
# backup things
$ umount /mnt/backup
$ lvremove /dev/vg/mdb-snap01
{% endhighlight %}
