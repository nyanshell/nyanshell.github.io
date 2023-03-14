---
layout: post
title:  "Exploring Stable Diffusion and ControlNet: Challenges in Precisely Generating Images"
date:   2023-03-14 13:30:32 +0800
categories: memo
tags: stable_diffusion ControlNet
largeimage: /assets/im_20230314095849_000_211825335.png
image: /assets/im_20230314095849_000_211825335.png
summary: Explores the challenges faced in generating a high-quality image from a VRoid model using Stable Diffusion models and ControlNet.
---

## The problem

During the last two weeks, I have been experimenting with several Stable Diffusion models and found them highly efficient in generating high-quality images. With ControlNet, generating many ideas by simply sketching has become much easier. Nevertheless, I encountered several challenges in generating an image from a [VRoid](https://vroid.com/en/studio) 3D model with a photo background. I aimed to retain the original background while rendering it in a specific style. But, I found it really hard to generate an image with a specific style and maintain its clarity at the same time. Luckily, after several trials and errors, I was able to generate an output that didn't look too bad.

| ![Original Image Generated with VRoid]({{ site.url }}/assets/vroid_sample_crop.png) |
|:--:|
|Original Image Generated with VRoid|



## ControlNet Only

Initially, my approach was to increase the weight and guidance ratio in ControlNet, but I failed in this attempt. Raising them too high resulted in a fuzzy and chaotic image, particularly the facial features. However, decreasing the weight led to the model's influence becoming more prominent, causing the image to lose its original look. Hence, I found it hard to use ControlNet as a simple filter.

| ![A fuzzy image from ControlNet weight=0.95, guidance ratio=0.95]({{ site.url }}/assets/im_20230314045353_000_619876501.png) |
|:--:|
|To my surprise, the controlnet didn't persist the original image's pixel when the ratio & weights were both high(weight=0.95, guidance ratio=0.95)|

## Image-to-Image Generation

Image-to-Image Generation was included in diffusers's [`StableDiffusionImg2ImgPipeline`](https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img), only unique parameter to adjust is `strength`. When the `strength` is set to a very low value, the image tends to appear more original. As the `strength` is increased, more changes are noticeable in the output. However, I faced an issue: I couldn't adjust the character and background individually.

| ![Background and character changed simultaneously after strength raised]({{ site.url }}/assets/im_20230314011818_001_949090318.png) |
|:--:|
|Background and character changed simultaneously after strength was raised|

### With ControlNet

After that, I tried adding ControlNet to see if it could improve the outcome. However, I discovered that when the `strength` was set to a low value, the initial image had a greater influence, and the prompt words had minimal impact on the final output. On the other hand, as the `strength` was increased, the outcome was similar to that of ControlNet alone.

| ![Even in high weight and guidance ratio, the images looks same as the original]({{ site.url }}/assets/im_20230314014150_001_1553239451.png) |
|:--:|
|Even in high weight and guidance ratio, the images looks same as the original(Maybe the consistency of the background improved).|


### Mask + ControlNet

Finally, I concluded that the correct methodology would be to replace the character and fix the background by using an inpaint mask and using ControlNet to generate the character. To test this approach, I created a mask of the same size using MS Paint:

![First Mask Image]({{ site.url }}/assets/vroid_sample_crop_mask.png)

However, the output appeared crudely photoshopped:

![bad sample]({{ site.url }}/assets/im_20230314021505_000_2103155080.png) |

I suspected that it happened because the ControlNet weight and ratio were too low. After I increased the ratios until the pose was fixed, the output improved:

![good sample]({{ site.url }}/assets/im_20230314023243_000_663273944.png) |

Nevertheless, the image still appeared patched together and did not look natural. Maybe I'll finetune some parameters later, but it's good for now.

## Final Thought

After spending several hours adjusting the parameters, I came to the realization that it may not be easy to generate a specific structured image with an elegant look using these methods at this stage. Maybe, further testing and grid searching parameters may result in better outcomes. However, when replacing the image and the model, maybe I need to search for the proper parameters again. Nonetheless, the potential of Stable Diffusion models and ControlNet in generating high-quality images is worth the effort.

| ![a image generated with prompt words only]({{ site.url }}/assets/im_20230314095849_000_211825335.png) |
|:--:|
|My ideal image quality(This one fully generated with prompt words).|

**update**: Maybe the best one at current stage: ![best one]({{ site.url }}/assets/im_20230314123756_000_547898418.png)

## Reference

- [Stable Diffusion model: Anything 4.5](https://huggingface.co/andite/anything-v4.0)
- [LoRA model:ligneClaireStyleCogecha_v10](https://civitai.com/models/5406/ligne-claire-stylecogecha)
- [Script: kohya-trainer](https://github.com/Linaqruf/kohya-trainer)

prompt words reference:
```
prompt 1/1: a girl standing in front of the metro station platform, best quality, ultra high res, <lora:koreanDollLikeness_v10:0.25> , <lora:ligneClaireStyleCogecha_v10:1.2>, (ulzzang-6500:0.05),[:(detailed face:1.2):0.2], (no make-up:1.0),subway station, metro station, (station platform:1.2), (rails:1.2), train, screen door, (track:1.2), night, dusk, light, detailed background, photo, (photorealistic:1.2), 1girl, red bowtie hair ornament, big red bowtie,dark red eyes, dark gray hair, gray hair, elf ears, twintails, perfect hands, perfect fingers, pantyhose, loose shirt, blue shirt, work shirt, dark color shirt, rolled up sleeve, loili, detail, 4k, high resolution, lolita, 
negative prompt: (worst quality:2), (low quality:2), (normal quality:2), (subtitled:2.0), (wrong fingers:1.5), (bad fingers:1.5), (multiple_views:2),lowres, normal quality, ((monochrome)), ((grayscale)), bad thigh, bad pose, 3legs, (wrong legs:2), wrong anatomy, six fingers, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped,jpeg artifacts, signature, watermark, username, blurry,
```
