---
layout: post
title: Configuring L2TP/IPsec VPN on Debian 9 (stretch)
date: '2017-08-29T23:37:00.000+08:00'
author: G.L.
tags: Strongswan VPN IPsec L2TP kirisame
tag: kirisame
modified_time: '2017-08-29T23:43:16.869+08:00'
blogger_id: tag:blogger.com,1999:blog-5749148745394062032.post-9119605410348566698
blogger_orig_url: http://marisa.kirisame.tips/2017/08/configuring-l2tpipsec-vpn-on-debian-9.html
---

Waste few hours to configure L2TP VPN on Debian. To reduce Googling time when I need to do it again.

Found some almost correct ways on following links:

- [https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients.md#linux](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients.md#linux)
- [https://gist.github.com/psanford/42c550a1a6ad3cb70b13e4aaa94ddb1c](https://gist.github.com/psanford/42c550a1a6ad3cb70b13e4aaa94ddb1c)
- [https://seba-smart-services.github.io/smartnet/linux-ipsec-client.html](https://seba-smart-services.github.io/smartnet/linux-ipsec-client.html)

Few things need modify:

```bash
use ipsec up/down to control IPsec tunnel
use correct pipeline when start L2TP connection:
$ sudo ipsec up vpn-name
```

[https://askubuntu.com/questions/20578/redirect-the-output-using-sudo](https://askubuntu.com/questions/20578/redirect-the-output-using-sudo)

[https://github.com/hwdsl2/setup-ipsec-vpn/issues/48](https://github.com/hwdsl2/setup-ipsec-vpn/issues/48)

```bash
$ echo "c vpn-name " | sudo tee /var/run/xl2tpd/l2tp-control
```

And use ike-scan to find VPN server's supported protocols. Debug using [https://doc.pfsense.org/index.php/IPsec_Troubleshooting](https://doc.pfsense.org/index.php/IPsec_Troubleshooting) if IPSec tunnel can't be establish.
