---
layout: post
title:  "A Week in Music-Making Part 1: A Glance of Voice Synthesizer"
date:   2022-02-21 14:28:32 +0800
categories: music
tags: music vst vocaloid synthesizer
---

In the previous week, I got some time to learn some music-making things. Last week, my original intention was to test some voice synthesizers, but many ideas were generated after I tried Synthesizer V. So I started to learn more about my DAW(Digital audio workstation, I am using Abelton Live 11 Lite), which was only used to record my Strat's sound before.

Since I tasted a lot of things at a glance, maybe writing some memos can be helpful.

# Piapro Studio & Miku Hatsune V4X/NT

## Miku Hatsune V4X

[Miku Hatsune V4X](https://sonicwire.com/product/virtualsinger/special/mikuv4xb) provide a 39 days demo with the Japanese and English version and comes with the Piapro Studio. Piapro Studio has a VSTi plugin and could properly work with Ableton Live 11. However, in some cases, you need to copy the `Piapro Studio VSTi.dll` into your VST2 plugin folder from `C:\Program Files\VstPlugIns`(if you installed V4X in default path) if Ableton can't show the plugin.

| [![Piapro Studio VSTi Plugin running on Abelton Live]({{ site.url }}/assets/ableton-live-piapro-studio-example.jpg)]({{ site.url }}/assets/ableton-live-piapro-studio-example.jpg) |
|:--:| 
| The Piapro Studio on the HiDPI monitor is a little fuzzy.  |


I tested V4X English with the famous folk song Auld Lang Syne. The MIDI track import is very convenient. You only need to import the MIDI track, edit the lyrics, and adjust the tone.


{% include embed-audio.html src="/assets/auld-lang-syne-v4x-eng.mp3" %}

Auld lang syne using Miku Hatsune V4X English.

However, when V4X meets an unknown word, it will only pronounce /u:/ instead. You need to add the VOCALOID
phonetic symbol yourself(but in SytheV, it will at least have a pronunciation), which requires some practice at first and can be time-costly. Because V4X can't pronounce any sound in an improper phonetic symbol combination.


## Miku Hatsune NT

[Hatsune Miku NT](https://sonicwire.com/product/virtualsinger/special/mikunt) was released in late 2020, but from the reviews on YouTube, maybe it can't work with Vocaloid 5(not confirmed). According to the reviews, it has a sound wave display and direct pitching editing, and other useful features. But since it didn't provide a demo. I didn't test it last week.

## VOCALOID4 VocalDBs

When I was browsing products on AHS's site, I found that VOCALOID4 vocal bank like [Kizuna Akari(紲星あかり)](https://www.ah-soft.com/vocaloid/akari/index.html) and [Yuzuki Yukari (結月ゆかり)](https://www.ah-soft.com/yukari/) also provide a trial version. They work as same as V4X on Piapro Studio. However, Piapro Studio doesn't show their anime icons on the vocal, that lesser perfect.

# Synthesizer V

Synthesizer V provides a basic free version and lite vocalbanks. It is more modern and user-friendly. But the basic version only runs standalone, which can't be used as a VSTi plugin. After a few days of trial, I think Synthesizer V is more convenient, and the voice is natural than V4X. So I bought Synthesizer V pro and [AiKO](https://www.anicute.com/product/715aefbb-516e-4e9c-8fcd-2b8752b733ae) a few days ago.

When Synthesizer V is running on the standalone mode, the interface fits the HiDPI. However, when it was trigged on Ableton Live, the interface was fuzzy. Maybe I'll give feedback on the issue to their forum later.

| [![Synthesizer V VSTi Plugin running on Abelton Live]({{ site.url }}/assets/synthv-plugin-example.jpg)]({{ site.url }}/assets/synthv-plugin-example.jpg) | 
|:--:| 
| Synthesizer V VSTi Plugin running on Abelton Live. You can let Miku and Maki sing together using a DAW. |

## A Brief Comparison

| Synthesizer      | Synthesizer V Studio | Miku Hatsune V4X | Miku Hatsune NT |
| ----------- | ----------- | ----------- |
| Release Year | 2020 | 2016 | 2020 |
| Demo | Basic version is free | 39 days Demo | N/A |
| Note / Tone Editing | The notes editing is easy to use. You could draw pitch lines via pencil tools. And Synthe V using a real-time rendering, you could see the whole sound wave after the edit. And you could start and stop at any point with coherent sound. In addition, Synthe V provided an auto pitch tuning feature in the Pro version. It's a very convenient feature. | You may feel a little struggle if you aren't familiar with the editor. The pencil tool only links the start and end position in each note, and you need the curve tool to draw a curve. And the other issue is the note editing. As I mentioned above, you may try a lot of vowels on some out of vocabulary verbs. | ? |
| Voice / Note Parameters | Synth V provided many parameters like loudness, tension, breathiness, gender, and tone shift for users to adjust. It offered more possibilities, but you need some experiments on parameter optimization. | Piapro Studio in V4X also provided many voice parameters like breathiness, clearness, and dynamics. But it is not as rich as Synth V and lacks editing features to craft notes in detail. | ? |
| DAW Support | VSTi Plugin(PRO only) / Standalone | VSTi Plugin | Standalone / VSTi Plugin |
| Price | 10,277 JPY(Synthesizer V Studio Pro Digital Version) + 9680 JPY (弦巻マキ Download Version) | 17,600 JPY(bundled with Studio One Artist Piapro Edition) | 19,800 JPY(bundled with Studio One Artist Piapro Edition) |
| Language | Japanese/English/Chinese | Japanese/English/Chinese | Japanese |
| Platform | Windows/Linux/macOS | Windows/macOS | Windows/macOS |

?: I only reviewed some of Hatsune Miku NT's [tutorials](https://www.youtube.com/watch?v=LXMOhY5Gtt0) and reviews, so it's hard to [evaluate](https://www.youtube.com/watch?v=UbnOtV4qAl4) for now.


# Overall

Many years have passed since V4X was released, and deep learning has changed many industries. So it may be unfair to compare them together. At the feature level, the Piapro Studio has its apparent shortcomings. You can see people still using the combination of Vocaloid 5 and V4X voicedb in many tutorials and practical works. However, after two years since Miku NT was released, I didn't see many producers using Miku NT. But Miku is something else. If the NT version has a discount someday, maybe I'll buy it as a souvenir. After all, it is more useful than a figure.

However, technology is only one aspect. Hatsune Miku has her reputation. Miku's voice is unique and nostalgic. I've heard her voice for over ten years. Even today, Vocaloid Miku is still a synonym of voice synthesizer-making songs. However, I only know [one producer who got millions of YouTube views](https://www.youtube.com/watch?v=mFih47l1pVI) with Synthesizer V's voices.


# A Test Tuning

After I bought Synthesizer V Pro and AiKO, I tuned a famous old song. The voice of AiKO is really sweet, have a listen:

{% include soundcloud_shanghainight.html %}
