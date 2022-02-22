---
layout: post
title:  "A Week in Music-Making Part 2"
date:   2022-02-22 14:59:32 +0800
categories: music
tags: music vst DAW music-transcription virtual-instrument Ableton
---

This memo is part 2 of my last week's music-making learning.

# Digital Audio Workstations(DAW)

DAW is helpful software in audio editing, just like IDE or text editors when you're coding. After I researched some popular DAW in detail, I chose Abelton Lite 11 because of the following aspects:

- **The lite version is free.**Though there're eight tracks limitations in the lite version, I think it could fulfill the daily use after several months of use.
- **Support VST plugins in lite version.**Many DAW like PreSonus's Studio One doesn't support VST plugins in their free version. And some free DAWs don't have VST plugin support.
- **Rich documentation and tutorial.**Ableton Live has plenty of documentation and an active user forum. I found almost everything I needed when I was using it.

## Music Transcription

Sometimes you need to transfer the melody in your thought into notes. This process is called [transcription](https://en.wikipedia.org/wiki/Transcription_(music)). I found there're several ways to do it. However, I don't think I could master the manual method quickly. So I tried some deep learning methodologies.

### Manual Transcription
Like the instructions like [this](https://flypaper.soundfly.com/write/how-to-transcribe-music/), you need solid music theory knowledge and ear training to master this technique. I tried to reproduce the melody of a song that I'd forgotten the name. But found it's hard to handle the pitches. Voice synthesizers and virtual instruments like GarageBand could be helpful, but it's tough for melody in vocal. I cost a morning to adjust notes to fit my vocal melody wave but in vain. But at least DAW is somewhat helpful. You could record your voice and put it into an audio track, and make transcription in a midi track. After some effort, the notes seem aligned with my hums, but the pitches are still weird no matter what I try.

### Deep Learning
A single instrument transcription is easy in machine learning. Google even implemented one [in Tensorflow.js](https://magenta.tensorflow.org/oaf-js). And recently, Google's [Magenta](https://github.com/magenta) project implemented [an automatic music transcription model](https://github.com/magenta/mt3) that uses the T5X framework. It's doing really well on instruments. You could get a clear melody result. However, it can't apply to the vocal melody. But there is also a Python library called [OMNIZART](https://github.com/Music-and-Culture-Technology-Lab/omnizart) that could extract vocal melody to notes with its vocal models. I tried some folk music, and the results are relevant correct. But I'm not getting a useful midi track from the results. Maybe my voice has some bias with their training data.

| [![OMNIZART transcription result]({{ site.url }}/assets/transcription-compare.png)]({{ site.url }}/assets/transcription-compare.png) |
|:--:| 
| A comparison between the actual MIDI file(second line) and OMNIZART transcripted result(from vocal, first line). You can see the melody in the red rectangle is close to the real in the blue rectangle.  |


## VST Plugins & Virtual Instrument
I found VST plugins were convenient and easy to use in DAW. And there is a [VST framework](https://github.com/antonok-edm/ampli-Fe) in Rust language. I'll see if I can implement a virtual instrument with this framework or other equivalent next week.

## Learning Arrangement

I found Ableton's music-making and synthesizer tutorial helpful for learning music arrangements. They have a well-designed interactive web tutorial online. You could get some fundamental knowledge on arrangement. But it's hard to make arrangements with such fundamentals. For example, the drum beats are still a mass in my arrangement. I need something more specific, like [how to arrange drum beats](https://www.youtube.com/watch?v=zOVSOvsTXto).

## Useful Sites & Tools

- [Ableton's music-making tutorial](https://learningmusic.ableton.com/)
- [Ableton's synthesizer tutorial](https://learningsynths.ableton.com/)
- Guitar Amps
  * Native Instruments Guitar Rig 6
  * Ik Multimedia Amplitube 5
  * Voxengo Boogex

## What's Next

- Learn arrangement further, especially master drum beats.
- Learn VST Plugin developing.
- Record my fender's chords for later arrangements.

