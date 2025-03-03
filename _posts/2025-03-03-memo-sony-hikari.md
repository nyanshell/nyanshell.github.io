---
layout: post
title: "MEMO #0: Sony NURO Hikari MAP-E Issue on NSD-G1000T v1.0.35 Firmware (unresolved)"
date: 2025-03-03 21:38:01 +0900
categories: memo
tags: network sony
---

In order to leverage 2.5Gb bandwidth of NURO 光, I ordered スマートライフ option
to get a 2.5Gbps compatible router(NSD-G1000T). However, I met same MAP-E issue as many
[mentioned](https://blog.hinaloe.net/2024/03/28/nsd-g1000t-map-e-port-exhaustion/).

I could change the router admin pages JS to enable the save button for the DMZ,
port forwarding and port mapping, but it actually not work.

| ![Port Mapping config on NSD-G1000T]({{ site.url }}/assets/nsd_g100t_port_mapping_config.png) |
|:--:|
| I could change the status of button to add new config, but they're not working. |


Even I just got partial IPv4 port range, I should be able to use the ports I got.
But seems the firmware just disabled the config(?).

But I found the local net's IPv6 response to `ping` from the public network(And
it is the actual machine). So maybe I could try [this](https://github.com/esrrhs/pingtunnel).

Though I could serving the local services with `wireguard`, but still feel uncomfortable
with the fact that I can't use any IPv4 port.

BTW also found [a very long issue thread](https://github.com/site-u2023/config-software/issues/2) on GitHub,
If I have patience to try to replace the ONU, maybe it also possible to set the DMZ & port mapping.
And if it's possible maybe I'll consider a x86 OpenWrt solution since it's easier to test & debug.
