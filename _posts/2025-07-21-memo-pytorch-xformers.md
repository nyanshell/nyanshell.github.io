---
layout: post
title: "MEMO #2: PyTorch + xformers Environment Setup on Blackwell Architecture GPU"
date: 2025-07-21 15:30:01 +0900
categories: memo
tags: torch xformers cuda
largeimage: /assets/memo2.png
image: /assets/memo2.png
---

# As of 2025-07-21

- Only tested on `sdxl_gen_img.py`(inference) of [sd-scripts](https://github.com/kohya-ss/sd-scripts).

## Python 3.12.x + CUDA 12.8

Environment:
- Python 3.12.10
- CUDA 12.8

```bash
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2025 NVIDIA Corporation
Built on Fri_Feb_21_20:23:50_PST_2025
Cuda compilation tools, release 12.8, V12.8.93
Build cuda_12.8.r12.8/compiler.35583870_0
```

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu128
pip install -U xformers --index-url https://download.pytorch.org/whl/cu128

torch==2.7.1+cu128
torchvision==0.22.1+cu128
xformers @ git+https://github.com/facebookresearch/xformers.git@0f0bb9d93b466927d99fb43a311622b7682c6e9a
```

`.env`: (Temporary set back to CUDA 12.8)

```bash
export CUDA_HOME=/usr/local/cuda-12.8
export LD_LIBRARY_PATH=${CUDA_HOME}/lib64:$LD_LIBRARY_PATH
export PATH=${CUDA_HOME}/bin:${PATH}
```

## Python 3.12.x + CUDA 12.9 (Nightly build PyTorch)

Environment:
- Python 3.12.10
- CUDA 12.9


```bash
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2025 NVIDIA Corporation
Built on Tue_May_27_02:21:03_PDT_2025
Cuda compilation tools, release 12.9, V12.9.86
Build cuda_12.9.r12.9/compiler.36037853_0
```

Install PyTorch nightly build with CUDA 12.9 support:

```bash
pip install https://download.pytorch.org/whl/nightly/cu129/torch-2.9.0.dev20250720%2Bcu129-cp312-cp312-manylinux_2_28_x86_64.whl https://download.pytorch.org/whl/nightly/cu129/torchvision-0.24.0.dev20250720%2Bcu129-cp312-cp312-manylinux_2_28_x86_64.whl --index-url https://download.pytorch.org/whl/nightly --extra-index-url https://download.pytorch.org/whl/nightly/torch --extra-index-url https://download.pytorch.org/whl/nightly/torchvision
```

Build `xformers` from the latest commit of [Added Blackwell Support#1262](https://github.com/facebookresearch/xformers/pull/1262/commits)


Reference: https://github.com/facebookresearch/xformers/issues/1251

```bash
export TORCH_CUDA_ARCH_LIST="12.0"
pip install ninja
pip install --no-build-isolation --pre -v -U git+https://github.com/facebookresearch/xformers.git@cbd127ce86f5a42319734ca219b2268e0926d895
```

After the build:

```bash
$ python -m xformers.info
xFormers 0.0.31+cbd127c.d20250721
memory_efficient_attention.ckF:                    unavailable
memory_efficient_attention.ckB:                    unavailable
memory_efficient_attention.ck_decoderF:            unavailable
memory_efficient_attention.ck_splitKF:             unavailable
memory_efficient_attention.cutlassF-pt:            available
memory_efficient_attention.cutlassB-pt:            available
memory_efficient_attention.fa2F@2.5.7-pt:          available
memory_efficient_attention.fa2B@2.5.7-pt:          available
memory_efficient_attention.fa3F@0.0.0:             unavailable
memory_efficient_attention.fa3B@0.0.0:             unavailable
memory_efficient_attention.triton_splitKF:         available
indexing.scaled_index_addF:                        available
indexing.scaled_index_addB:                        available
indexing.index_select:                             available
sp24.sparse24_sparsify_both_ways:                  available
sp24.sparse24_apply:                               available
sp24.sparse24_apply_dense_output:                  available
sp24._sparse24_gemm:                               available
sp24._cslt_sparse_mm_search@0.7.1:                 available
sp24._cslt_sparse_mm@0.7.1:                        available
swiglu.dual_gemm_silu:                             available
swiglu.gemm_fused_operand_sum:                     available
swiglu.fused.p.cpp:                                available
is_triton_available:                               True
pytorch.version:                                   2.9.0.dev20250720+cu129
pytorch.cuda:                                      available
gpu.compute_capability:                            12.0
gpu.name:                                          NVIDIA RTX PRO 6000 Blackwell Workstation Edition
dcgm_profiler:                                     unavailable
build.info:                                        available
build.cuda_version:                                1209
build.hip_version:                                 None
build.python_version:                              3.12.10
build.torch_version:                               2.9.0.dev20250720+cu129
build.env.TORCH_CUDA_ARCH_LIST:                    12.0
build.env.PYTORCH_ROCM_ARCH:                       None
build.env.XFORMERS_BUILD_TYPE:                     None
build.env.XFORMERS_ENABLE_DEBUG_ASSERTIONS:        None
build.env.NVCC_FLAGS:                              None
build.env.XFORMERS_PACKAGE_FROM:                   None
build.nvcc_version:                                12.9.86
source.privacy:                                    open source
```

### Test **sd-script**

I modified the `sd-script` [a little bit](https://github.com/nyanshell/sd-scripts/commits/local-review-cuda129-575/) to make the requirements and import compatible.

Install:

```bash
pip install -U -r requirements.txt
pip install -e .
```


## Python 3.13.x + CUDA 12.9

Environment:
- Python 3.13.5
- CUDA 12.9

Basically the same as above, only change the Python version of the wheels:

```bash
pip install https://download.pytorch.org/whl/nightly/cu129/torch-2.9.0.dev20250720%2Bcu129-cp313-cp313-manylinux_2_28_x86_64.whl https://download.pytorch.org/whl/nightly/cu129/torchvision-0.24.0.dev20250720%2Bcu129-cp313-cp313-manylinux_2_28_x86_64.whl --index-url https://download.pytorch.org/whl/nightly --extra-index-url https://download.pytorch.org/whl/nightly/torch --extra-index-url https://download.pytorch.org/whl/nightly/torchvision

```

```bash
$ python -m xformers.info
xFormers 0.0.31+cbd127c.d20250721
memory_efficient_attention.ckF:                    unavailable
memory_efficient_attention.ckB:                    unavailable
memory_efficient_attention.ck_decoderF:            unavailable
memory_efficient_attention.ck_splitKF:             unavailable
memory_efficient_attention.cutlassF-pt:            available
memory_efficient_attention.cutlassB-pt:            available
memory_efficient_attention.fa2F@2.5.7-pt:          available
memory_efficient_attention.fa2B@2.5.7-pt:          available
memory_efficient_attention.fa3F@0.0.0:             unavailable
memory_efficient_attention.fa3B@0.0.0:             unavailable
memory_efficient_attention.triton_splitKF:         available
indexing.scaled_index_addF:                        available
indexing.scaled_index_addB:                        available
indexing.index_select:                             available
sp24.sparse24_sparsify_both_ways:                  available
sp24.sparse24_apply:                               available
sp24.sparse24_apply_dense_output:                  available
sp24._sparse24_gemm:                               available
sp24._cslt_sparse_mm_search@0.7.1:                 available
sp24._cslt_sparse_mm@0.7.1:                        available
swiglu.dual_gemm_silu:                             available
swiglu.gemm_fused_operand_sum:                     available
swiglu.fused.p.cpp:                                available
is_triton_available:                               True
pytorch.version:                                   2.9.0.dev20250720+cu129
pytorch.cuda:                                      available
gpu.compute_capability:                            12.0
gpu.name:                                          NVIDIA RTX PRO 6000 Blackwell Workstation Edition
dcgm_profiler:                                     unavailable
build.info:                                        available
build.cuda_version:                                1209
build.hip_version:                                 None
build.python_version:                              3.13.5
build.torch_version:                               2.9.0.dev20250720+cu129
build.env.TORCH_CUDA_ARCH_LIST:                    12.0
build.env.PYTORCH_ROCM_ARCH:                       None
build.env.XFORMERS_BUILD_TYPE:                     None
build.env.XFORMERS_ENABLE_DEBUG_ASSERTIONS:        None
build.env.NVCC_FLAGS:                              None
build.env.XFORMERS_PACKAGE_FROM:                   None
build.nvcc_version:                                12.9.86
source.privacy:                                    open source
```

# Driver

```bash
$ nvidia-smi
Mon Jul 21 16:16:06 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 575.64.03              Driver Version: 575.64.03      CUDA Version: 12.9     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX PRO 6000 Blac...    Off |   00000000:02:00.0  On |                  Off |
| 30%   36C    P0             48W /  600W |    6163MiB /  97887MiB |      1%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
```
