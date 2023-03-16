---
layout: post
title:  "Install Emacs & Emacs-rime on WSL 1 (OpenSUSE 15.3)"
date:   2021-12-21 12:53:29 +0800
categories: memo
tags: emacs rime opensuse linux WSL
---

## Setup VcXsrv as X11 Environment

Follow [emacs-wsl](https://github.com/hubisan/emacs-wsl)'s README to install VcXsrv as X11 Environment.

### Environment Variables Configure

```bash
export DISPLAY=:0.0
# for hidpi
export GDK_DPI_SCALING=2
```

After the installation, run `start "" "C:\Program Files\VcXsrv\vcxsrv.exe" :0 -multiwindow -clipboard -wgl` in `Command Prompt` (Not powershell) to start VcXsrv.

## Compile & Install Emacs 28

According to the [install instructions of emacs-rime](https://github.com/DogLooksGood/emacs-rime/blob/master/INSTALLATION.org), Emacs's version needs higher than 26.1 to support dynamic modules. However, OpenSUSE 15.3 only has Emacs 25.3, and we can't use [snap](https://snapcraft.io) in WSL 1, so we need to compile one from the source code.


### Compile Emacs (Install locally)

```bash
# Download emacs 28.0.90
$ wget https://git.savannah.gnu.org/cgit/emacs.git/snapshot/emacs-28.0.90.tar.gz
# Install
$ sudo zypper source-install --build-deps-only emacs
$ tar xf emacs-28.0.90.tar.gz && cd emacs-emacs-28.0.90
$ mkdir -p ~/usr/emacs28
$ ./configure --with-x-toolkit=gtk --with-cairo --prefix=$HOME/usr/emacs28
$ make -j<cpu_nums>
$ make install
```

### Fonts

`.emacs`:

```lisp
;; set font for emoji
(setq use-default-font-for-symbols nil)
(set-fontset-font t 'symbol "Noto Color Emoji")
```

```lisp
;; set font for Chinese & Japanese
(set-fontset-font t 'han "Noto Sans SC")
(set-fontset-font t 'kana "Noto Sans JP")
```

According to [this post on reddit](https://www.reddit.com/r/emacs/comments/ic0by2/fonts_not_found_after_upgrading_to_emacs_271/), due to a bug on OpenSUSE, maybe we need

> /usr/share/X11/app-defaults/Emacs manually: prefixing the line Emacs.FontBackend: xft,x with !! 

to avoid the issue.

## Compile & Install emacs-rime

### Compile & Install librime for emacs-rime

```bash
# install compile dependencies
$ zypper install cmake emacs-el gnutls libgnutls-devel libboost_* glog-devel leveldb-devel libmarisa libcapnp-devel libopencc2 gtest
$ cd ~/.emacs.d && git clone --recursive https://github.com/rime/librime.git
$ cd librime && make
```

❗️️: To avoid pthread error cover the real error while compiling in multi-threads, it's better to compile in single core at first time. Or it may cost more time to find the real error.


`make install` to install globaly or set up `rime-librime-root` in `.emacs` :

```lisp
(use-package rime
  :custom
  (rime-librime-root "~/.emacs.d/librime/build"))
```

### Install emacs-rime

Follow the instruction in [emacs-rime's doc](https://github.com/DogLooksGood/emacs-rime/blob/master/INSTALLATION.org).

#### Set up Default Schema

Using default configure from [rime-prelude](https://github.com/rime/rime-prelude.git):

```bash
$ git clone https://github.com/rime/rime-prelude.git
$ cd rime-prelue/*.yaml ~/.emacs.d/rime
```

At this time, if the configure is correct, `M-x rime` should trigger the input method.

#### Configure Candidate Menu (optional)

And we need to install [posframe](https://github.com/tumashu/posframe) if we want to add a candidate menu that follows the cursor (just like the showcase):

`.emacs`:

```lisp
(require 'posframe)
(setq default-input-method "rime"
      rime-show-candidate 'posframe)
```

#### Configure Menu Keybinding

`.emacs`:

```lisp
(use-package rime
  :bind
  (:map rime-mode-map
   ("C-`" . 'rime-send-keybinding)))
```

[Reference](https://emacs-china.org/t/emacs-rime/12048/638?u=doglooksgood)


If configured successfully, press ``C-` `` will show configure menu.

### Install cloverpinyin (optional)

[cloverpinyin](https://github.com/fkxxyz/rime-cloverpinyin) provides a better input scheme and has a better corpus. Using this scheme give me a better experience like other commercial input methods.

Download the release and decompress into the rime's schema folder:

```bash
$ cd ~/.emacs.d/rime/ && wget https://github.com/fkxxyz/rime-cloverpinyin/releases/download/1.1.4/clover.schema-1.1.4.zip
$ unzip clover.schema-1.1.4.zip
```

## Final `.emacs` Configure

```lisp
(require 'posframe)
(require 'rime)
(rime-compile-module)
(setq default-input-method "rime"
      rime-show-candidate 'posframe)
(setq rime-posframe-properties
 (list :font "Noto Sans SC Regular"
       :internal-border-width 10))
(setq rime-share-data-dir "/home/flandre/.emacs.d/rime")
(use-package rime
  :custom
  (default-input-method "rime")
  :bind
  (:map rime-mode-map
   ("C-`" . 'rime-send-keybinding)))
```

I added all relevant configure [here](https://gist.github.com/nyanshell/5267583a1a004f22c4aee280bf2789e8).

**NOTICE**: If you use custom compiled librime you may don't need `(require 'rime)`, otherwise emacs won't load your custom compiled `librime.so`.

## Showcase

![emacs-rime]({{ site.url }}/assets/emacs-rime.jpg)

## Notes

- I tried to use [stow](https://www.gnu.org/software/stow/manual/stow.html) for multiple Emacs versions, but it's not a good practice to maintain multiple package versions. And I didn't find other tools like `Checkinstall` or `update-alternatives` on OpenSUSE, so I just installed locally and set `$PATH`.


## Refrences
- [emacs-wsl](https://github.com/hubisan/emacs-wsl)
- [emacs-rime](https://github.com/DogLooksGood/emacs-rime)
- [rime-prelude](https://github.com/rime/rime-prelude)
- [rime-cloverpinyin](https://github.com/fkxxyz/rime-cloverpinyin)
- [自制的基于rime的简体拼音输入方案，尽可能接近搜狗拼音](https://zhuanlan.zhihu.com/p/157368856)
