[![CircleCI](https://img.shields.io/circleci/build/github/h3poteto/fascia-rn/master?style=flat-square&token=1daae29740af38d98614eed5caf889dba5b8fc3e)](https://circleci.com/gh/h3poteto/fascia-rn)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/h3poteto/fascia-rn?style=flat-square)](https://github.com/h3poteto/fascia-rn/releases)
[![Dependabot](https://img.shields.io/badge/Dependabot-enabled-blue.svg?style=flat-square)](https://dependabot.com)

# fascia
This application is an iOS/Android application to use fascia. Fascia is a simple task management web service: https://fascia.io

# Development
This application is developed using React Native. So please install node.js in your machine.

## Android
### AndroidStudio
Install AndroidStudio from https://developer.android.com/studio/install .

Please select custom install, and choose these three otpions:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Export environment variables:

```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools%
```

After that, `Configure` -> `SDK Manager` -> `SDK Platform`, select and apply `Android 10.0(Q)`.

After install the SDK, please launch Android Emulator from `Configure` -> `ADV Manager`.

### Start React Native
```
$ yarn install
$ yarn run start
```

Launch another shell,

```
$ yarn run android
```

Then the application is compiled, and launch in Android Emulator.


## iOS
### Xcode
Install Xcode.

And install pods,

```
$ yarn install
$ npx pod-install
```

After that, you can launch the project from `ios/fascia.xcworkspace`, not `ios/fascia.xcodeproj`. And select simulator device.

### Start React Natvie
```
$ yarn install
$ yarn run start
```

Launch another shell,

```
$ yarn run ios
```

Then the application is compiled, and launch in iOS Simulator.


# License
The software is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
