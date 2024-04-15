---
layout: post
title:  "Won't Use OVH again"
date:   2024-04-15 20:07:23 +0900
categories: memo
tags: vps public_cloud ovh review customer_service
summary: "A scathing review of OVH's unreliable VPS and deceptive public cloud offerings. The author details their frustrating experiences, including DDoS attacks, restrictive mitigation measures, and misleading information about OVH's free credit promotion. The article concludes that the cheap prices offered by OVH are not worth the trouble, and strongly cautions others against using their hosting and cloud services."
---

## Background

Recently, due to [AWS Lightsail's upcoming charges](https://aws.amazon.com/blogs/compute/announcing-ipv6-instance-bundles-and-pricing-update-on-amazon-lightsail/) for IPv4, I've been considering migrating my
Mastodon proxy server to a different VPS provider. I have previous experience using OVH's bare metal server at my former
company, where it proved to be a relatively inexpensive option. However, since I haven't had a valid payment method with
them for some time, I haven't used their services personally. When I obtained a valid credit card, I decided to give OVH
another try.

## VPS

I opted for OVH's 0.99/month VPS plan. The network performance was generally acceptable, so I proceeded to migrate my
Mastodon proxy server to the new VPS. Unfortunately, a few days later, I received a notification that my server was under
a DDoS attack, and OVH had activated their uninterruptible mitigation measures. The issue, however, was that these
mitigation measures also filtered traffic from Cloudflare, effectively blocking any IPv4 traffic originating from
Cloudflare. This forced me to temporarily switch back to AWS Lightsail. I also found similar cases on [Reddit](https://www.reddit.com/r/ovh/comments/sgaa0x/false_ddos_mitigation/).

The DDoS attack was a [ping flood attack](https://www.cloudflare.com/learning/ddos/ping-icmp-flood-ddos-attack/), while
not generating a particularly high level of traffic, caused significant disruption due to OVH's refusal to allow users
to disable the mitigation measures. The attack lasted for around 12 hours, but then started again after several hours:

<iframe src="https://mastodon.nyanshell.com/@nyanshell/112048212211354644/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.nyanshell.com/embed.js" async="async"></script>

After a few days of struggling with this ongoing issue, I decided to cancel the service in frustration.

## Public Cloud

Intrigued by the 200 free credit offer for new users, I decided to give OVH's Public Cloud a try as well. Unfortunately,
this proved to be yet another nightmare. The available regions for the trial were quite limited and located far away, and
the network speeds for most of their services were around 500Mbps, which I found unsatisfactory.

During the payment process, I was asked to deposit $30 in advance, under the impression that it was a verification for
the payment method, and the funds would be returned to me. However, I was mistaken. After the trial period expired, I
had not received any refund, even after deleting the project (which, in hindsight, may have been another mistake, as I
should have kept the proof. Afterwards I also found [someone in the Reddit charged for 200 USD](https://www.reddit.com/r/ovh/comments/nrlwwz/support_asking_to_deposit_200_beforehand_to/)).

Seeking a resolution, I contacted OVH's support to request a refund. After nearly a week of waiting, I received a
response from OVH's Claim Department:

```text
Dear ***,
This is Joanna from the Claim Dept., it will be my pleasure to assist you.

In regard to your request, I regret to inform that the Public Cloud credit may not be transferred or reimbursed. It has no monetary value, and any credit not used within 13 months will be lost.

This information is clearly displayed upon purchase, and at the same in the following guide:
https://help.ovhcloud.com/csm/en-ie-public-cloud-billing-add-credit?id=kb_article_view&sysparm_article=KB0050447

Thank you in advance for your understanding, and I am sorry for the fact that we are unable to meet your request at this time.

Kind regards,
```

However, I did not see the information they mentioned significantly displayed during the payment process, nor was the guide they
referenced easily accessible. Feeling increasingly frustrated, I requested a refund through PayPal, which was processed
promptly, allowing me to at least recover my financial loss. Luckily I chose use PayPal as the payment method.

## The Cheap Price Not Worth the Trouble

In short, I will not be using OVH's services again. The cheap prices offered by OVH do not justify the trouble and
disappointment I experienced with both their VPS and Public Cloud offerings. The lack of reliable service, the
restrictive mitigation measures, and the deceptive information around the Public Cloud credit have left me with a highly
negative impression of OVH as a provider. I would strongly caution others against relying on OVH for their hosting and
cloud computing needs.
