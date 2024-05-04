---
layout: post
title: "My Samsung 980 Pro Also Got Issues"
date: 2024-04-29 19:07:23 +0900
categories: memo
tags: windows nvme ddrescue
largeimage: /assets/im_20230821124657_002_1534241591.png
image: /assets/im_20230821124657_002_1534241591.png
summary: "Samsung 980 pro replacement, ddrescue and dd to migrate NVMe SSD"
---

Recently, I met bunch of issues related with 2TB version of Samsung 980 pro NVMe in the work place(which caused much
troubles). So it reminds me I should also prepare some regular backup for my 980 PRO(though it's a 1TB model and
shouldn't affected by the [0E Issue](https://www.chiphell.com/forum.php?mod=viewthread&tid=2443478)).

However, while I'm running `dd`, I met some read errors. Though it disappeared after the reboot, but in `SMART` there're still some `Media and Data Integrity Errors`:

```text
SMART/Health Information (NVMe Log 0x02)
Critical Warning:                   0x00
Temperature:                        46 Celsius
Available Spare:                    90%
Available Spare Threshold:          10%
Percentage Used:                    3%
Data Units Read:                    45,476,592 [23.2 TB]
Data Units Written:                 78,325,270 [40.1 TB]
Host Read Commands:                 1,460,465,470
Host Write Commands:                1,195,856,864
Controller Busy Time:               4,653
Power Cycles:                       1,399
Power On Hours:                     12,190
Unsafe Shutdowns:                   101
Media and Data Integrity Errors:    14,370
Error Information Log Entries:      14,370
Warning  Comp. Temperature Time:    2
Critical Comp. Temperature Time:    0
Temperature Sensor 1:               46 Celsius
Temperature Sensor 2:               46 Celsius
Thermal Temp. 1 Transition Count:   5
Thermal Temp. 2 Transition Count:   2
Thermal Temp. 1 Total Time:         88
Thermal Temp. 2 Total Time:         174

Error Information (NVMe Log 0x01, 16 of 64 entries)
No Errors Logged
```

So I decided to make a replacement. I ordered a Crucial T500 2TB, and I started the migration after its arrival.

Firstly, I tried to use `ddrescue` to copy the entire disk directly onto the new NVMe. However, during the boot process, I couldn't choose the new disk to boot from. So I thought the copy wasn't successful. (Afterwards, I realized the new disk didn't appear in the boot menu in the BIOS simply because the UUIDs were the same. I should have gone ahead and removed the old NVMe first).

`ddrescue` also shows some read errors while copying from the original disk:

```text
# Mapfile. Created by GNU ddrescue version 1.27
# Command line: ddrescue /dev/nvme0n1 nvme0n1-20240428.img ddrescue.log
# Start time:   2024-04-28 20:24:13
# Current time: 2024-04-28 20:24:13
# Finished
# current_pos  current_status  current_pass
0x523902BC00     +               1
#      pos        size  status
0x00000000  0x1CE6668000  +
0x1CE6668000  0x00002000  -
0x1CE666A000  0x00001000  +
...
```

I thought the copy might have been affected by the read errors, so I tried some fix tools on the Windows side with the [sfc](https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e
).

Then, I tried using `gparted` to copy the partitions. But afterwards the windows can't even find the system with [bootrec](https://support.microsoft.com/en-us/topic/use-bootrec-exe-in-the-windows-re-to-troubleshoot-startup-issues-902ebb04-daa3-4f90-579f-0fbf51f7dd5d) tools.

Thus, I decided to try `ddrescue` to my Samba server first, then `dd` the image afterwards. It took about half a day (somehow the mounted Samba drive was only transferring at 100MB/s on a 2.5Gb/s network, but on the Windows Samba client, the transfer could reach the maximum speed of the disk, so I had to wait for several hours):

```bash
$ sudo ddrescue /dev/nvme0n1 nvme0n1-20240429.img
$ sudo dd if=nvme0n1-20240429.img of=/dev/nvme0n1 bs=8G
```
Afterward, I removed the old NVMe and tried to boot from the new one. Finally, it worked. The system booted as usual, even without triggering the Windows license reactivation.

My [Samsung 950 PRO 256GB NVMe SSD](https://www.techpowerup.com/ssd-specs/samsung-950-pro-256-gb.d73) had been running for 5 years without any issues. However, the storage size made me have to do the replacement. While the 0E issue appeared, I thought the 1TB model could avoid the influence, so I didn't upgrade the firmware, which seems like it was a mistake. Furthermore, I found that I hadn't removed the plastic seal from the upper silicone thermal pad when I installed it (x_x).

Besides that, recently one of the 980 Pro on the company's server suddenly disappeared from the system but came back online after a reboot. I recently read a [post](https://zhuanlan.zhihu.com/p/57617932) about this NVMe issue, wondering if it's related.

Maybe next time when buying an NVMe, I should search for enough information about the controller and the flash to avoid such cases. But there is a bunch of misinformation, so it's quite hard to distinguish between rumor and fact. Perhaps it would be better to regularly run a whole disk backup later.

References:

- [Samsung Issues Fix for Dying 980 Pro SSDs](https://forums.evga.com/Samsung-Issues-Fix-for-Dying-980-Pro-SSDs-m3596546.aspx) // Wondering if mine was also 03 issue, but it seems only happened on 2TB model.
- [国产固态翻车了？致态TiPro7000热失控损坏始末](https://www.toutiao.com/article/7073717761788609061?&source=m_redirect&wid=1714825558911) // A Chinese article about the NVMe heat issue.
- [业内人总结：教你看方案买对PCIe 4.0 固态硬盘——主控篇](https://zhuanlan.zhihu.com/p/636433679) // A Chinese article about the NVMe controller.
- [致态ssd大规模掉盘成因推测](https://www.reddit.com/r/real_China_irl/comments/vabo2d/%E8%87%B4%E6%80%81ssd%E5%A4%A7%E8%A7%84%E6%A8%A1%E6%8E%89%E7%9B%98%E6%88%90%E5%9B%A0%E6%8E%A8%E6%B5%8B/)
- [Help with SSD losing it's memory capacity](https://www.reddit.com/r/buildapc/comments/sx37ic/help_with_ssd_losing_its_memory_capacity/)