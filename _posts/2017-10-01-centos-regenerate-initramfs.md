---
layout: post
title:  "Regenerate initramfs in CentOS 7"
date:   2017-10-01 14:29:24 +08:00
categories: initramfs CentOS
author: Yet another Kirisame Marisa
tag: kirisame
---

If you change motherboard you may meet a boot issue like */dev/centos/root does not exist*. Just follow the [tips](https://wiki.centos.org/TipsAndTricks/CreateNewInitrd) in CentOS wiki to rebuild initramfs and the issue should be resolved.

## Procedure

{% highlight bash %}
mount /dev/sda1 /media/boot/
mount /dev/mapper/centos-root /media/sysimage
mount --bind /proc /media/sysimage/proc
mount --bind /dev /media/sysimage/dev
mount --bind /sys /media/sysimage/sys
mount --bind /media/boot /media/sysimage/boot
chroot /media/sysimage
# backup old initramfs image
drauct --kver 2.6.40-1.rc5.f20.x86_64 # kernel version
{% endhighlight %}

# NOTICE

* Don't rename initramfs file.
* Install xfsprogs for XFS filesystem & LVM2 for LVM partitions.
* Mount /boot first and bind mount to chroot folder(/media/sysimage/boot in sample)