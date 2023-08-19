---
layout: post
title:  "Install tensorflow-rocm"
date:   2018-11-25 16:40:16 +08:00
categories: radeon rocm gpu tensorflow ubuntu
author: Yet another Kirisame Marisa
tag: kirisame
---

**Hardware Environment**

* CPU: AMD Ryzen Threadripper 1950X 16-Core Processor
* GPU: [Radeon-RX-580-GAMING-X-4G](https://us.msi.com/Graphics-card/Radeon-RX-580-GAMING-X-4G)

**Software Environment**

* Ubuntu 16.04.5
* Kernel: 4.15.0-39-generic

**Procedure & Notice**

* Follow [ROCM](https://rocm.github.io/ROCmInstall.html) & [tensorflow-rocm](https://github.com/ROCmSoftwarePlatform/tensorflow-upstream/blob/develop-upstream/rocm_docs/tensorflow-install-basic.md#install-rocm) install instruction. Ubuntu 16.04 LTS come with kernel 4.4.x, need to switch to proper kernel version.  `tensorflow-rocm` has [extra dependencies](https://stackoverflow.com/questions/51449236/tensorflow-1-3-rocm-port-cannot-open-pywrap-tensorflow-internal) other than `rocm-dkms`.
* If abnormal information shown in `dmesg -T | grep kfd`, [HWE](https://wiki.ubuntu.com/Kernel/LTSEnablementStack) may needed, in this case, `linux-hwe-tools-4.15.0-39` & `linux-modules-extra-4.15.0-39-generic` were needed.
* Issues like `hsa api call failure at line 900, file: /home/jenkins/jenkins-root/workspace/compute-rocm-rel-1.8/rocminfo/rocminfo.cc. Call returned 4104` may caused by [various reasons](https://github.com/RadeonOpenCompute/ROCm/issues/415), caution on `dmesg` output & `rocm-dkms` build log.

**After Successful Installation**
{% highlight bash %}
$ /opt/rocm/bin/rocm-smi
====================    ROCm System Management Interface    ====================
================================================================================
 GPU  Temp    AvgPwr   SCLK     MCLK     Fan      Perf    SCLK OD    MCLK OD
  0   42c     115.217W 1380Mhz  1000Mhz  29.8%    auto      0%         0%
================================================================================
====================           End of ROCm SMI Log          ====================
$ sudo dkms status
amdgpu, 1.9-307, 4.15.0-39-generic, x86_64: installed
(venv) $ pip freeze | grep -i rocm
tensorflow-rocm==1.12.0
(venv) $ python
Python 3.6.7 (default, Nov 25 2018, 01:02:31)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import tensorflow as tf
WARNING:tensorflow:From /home/marisa/venv/lib/python3.6/site-packages/tensorflow/python/ops/distributions/distribution.py:265: ReparameterizationType.__init__ (from tensorflow.python.ops.distributions.distribution) is deprecated and will be removed after 2019-01-01.
Instructions for updating:
The TensorFlow Distributions library has moved to TensorFlow Probability (https://github.com/tensorflow/probability). You should update all references to use `tfp.distributions` instead of `tf.distributions`.
WARNING:tensorflow:From /home/marisa/venv/lib/python3.6/site-packages/tensorflow/python/ops/distributions/bernoulli.py:169: RegisterKL.__init__ (from tensorflow.python.ops.distributions.kullback_leibler) is deprecated and will be removed after 2019-01-01.
Instructions for updating:
The TensorFlow Distributions library has moved to TensorFlow Probability (https://github.com/tensorflow/probability). You should update all references to use `tfp.distributions` instead of `tf.distributions`.
{% endhighlight %}