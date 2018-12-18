#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.growmoisociallearning.moiapp/host.exp.exponent.MainActivity
