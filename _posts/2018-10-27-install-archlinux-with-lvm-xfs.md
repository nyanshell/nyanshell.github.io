---
layout: post
title:  "Tips for install archlinux with LVM & XFS"
date:   2018-10-27 20:36:08 +08:00
categories: mkinitcpio initramfs archlinux
author: Yet another Kirisame Marisa
tag: kirisame
---

Just follow the archwiki install guidelines with few notices:

* Add `lvm` to `GRUB_PRELOAD_MODULES` in `/etc/default/grub` and **regenerate** `grub.cfg`: [https://wiki.archlinux.org/index.php/GRUB#LVM](https://wiki.archlinux.org/index.php/GRUB#LVM)
* configure mkinitcpio then generate initramfs image: [https://wiki.archlinux.org/index.php/LVM#Configure_mkinitcpio](https://wiki.archlinux.org/index.php/LVM#Configure_mkinitcpio)

Otherwise you will meet a boot error like [this](https://www.reddit.com/r/archlinux/comments/5ueaar/failed_mounting_new_root/):

```
mount: mount(2) failed: /new_root: No such file or directory
You are no being dropped into an emergency shell
sh: can't access tty; job control turned off
```
