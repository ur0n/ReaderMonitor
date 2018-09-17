#!/usr/bin/env bash

node-gyp rebuild --platform=linux --arch=x64 --libc=glibc --dist-url=https://atom.io/download/electron
