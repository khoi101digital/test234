A **React Native** mobile application built with [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

# Getting Started

Follow the steps below **in order** to set up and run the project on your machine.

---

## Step 0: Prerequisites (Install Required Tools)

Before you begin, make sure the following tools are installed on your computer.

### 1. Install Node.js (v20 or higher)

Download and install Node.js from [https://nodejs.org](https://nodejs.org) (choose the **LTS** version, must be **v20 or above**).

To verify, open a terminal and run:

```sh
node --version
```

You should see something like `v20.x.x` or higher.

### 2. Install Yarn (Package Manager)

This project uses **Yarn** to manage dependencies. Install it globally via npm:

```sh
npm install -g yarn
```

Verify:

```sh
yarn --version
```

### 3. Install Ruby (v2.6.10 or higher)

Ruby is needed for iOS CocoaPods. macOS comes with Ruby pre-installed, but you may need a newer version.

You can use [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://rvm.io/) to manage Ruby versions.

Verify:

```sh
ruby --version
```

### 4. Install Watchman (macOS)

```sh
brew install watchman
```

### 5. Set Up Platform-Specific Tools

Follow the official React Native environment setup guide for your target platform:

👉 [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

**For Android:**

- Install [Android Studio](https://developer.android.com/studio)
- During setup, make sure to install the **Android SDK**, **Android SDK Platform**, and **Android Virtual Device (AVD)**
- Set up the `ANDROID_HOME` environment variable (the guide above explains how)
- Create an Android Emulator via AVD Manager in Android Studio

**For iOS (macOS only):**

- Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the Mac App Store
- Open Xcode and install the **iOS Simulator** (Xcode → Settings → Platforms → install a recent iOS version)
- Install Xcode Command Line Tools:

```sh
xcode-select --install
```

---

## Step 1: Install Project Dependencies

Open a terminal, navigate to the project folder, and run:

```sh
yarn install
```

> This will install all JavaScript dependencies **and** automatically run `patch-package` and `react-native-asset` as a post-install step.

---

## Step 2: Install iOS Dependencies (macOS / iOS only)

If you plan to run the app on **iOS**, you need to install CocoaPods dependencies.

### First-time setup — install CocoaPods via Ruby Bundler:

```sh
bundle install
```

### Then install the pods:

```sh
cd ios
pod install
cd ..
```

> **Tip:** If you're on an Apple Silicon Mac (M1/M2/M3) and encounter issues, try:
>
> ```sh
> cd ios
> arch -x86_64 pod install
> cd ..
> ```
>
> Or use the built-in shortcut script:
>
> ```sh
> yarn install-pod
> ```

---

## Step 3: Start Metro (JavaScript Bundler)

Metro is the JavaScript bundler for React Native. Start it by running:

```sh
yarn start
```

Keep this terminal window **open and running** — it needs to stay active while you use the app.

---

## Step 4: Run the App

Open a **new terminal window** (keep Metro running in the other one) and run:

### Android (Development)

```sh
yarn android-dev
```

> Make sure you have an **Android Emulator running** or a **physical device connected via USB** with USB debugging enabled.

### iOS (Development) — macOS only

```sh
yarn ios-dev
```

> This will launch the app in the iOS Simulator.

---

## Available Run Commands

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `yarn android-dev`     | Run on Android (Development build) |
| `yarn ios-dev`         | Run on iOS (Development build)     |
| `yarn android-staging` | Run on Android (Staging build)     |
| `yarn ios-staging`     | Run on iOS (Staging build)         |
| `yarn android-prod`    | Run on Android (Production build)  |
| `yarn ios-prod`        | Run on iOS (Production build)      |

---

## Environment Configuration

The project uses [react-native-config](https://github.com/lukewalczak/react-native-config) for environment variables. The following env files are available:

| File               | Used For    |
| ------------------ | ----------- |
| `.env.development` | Development |
| `.env.staging`     | Staging     |
| `.env.production`  | Production  |
| `.env`             | Default     |

> These files are already included in the project. You should not need to modify them unless instructed to.

---


## Running E2E Tests (Maestro)

This project includes end-to-end (E2E) tests powered by [Maestro](https://maestro.mobile.dev/).

### Prerequisites

1. Install Maestro CLI:

```sh
curl -Ls "https://get.maestro.mobile.dev" | bash
```

2. Make sure an **Android Emulator** or **iOS Simulator** is running.

### Run Tests

Use the provided test runner script:

#### Android

```sh
# Development build
yarn e2e:dev-test-android

# Staging build
yarn e2e:staging-test-android

# Production build
yarn e2e:prod-test-android
```

#### iOS

```sh
# Development build
yarn e2e:dev-test-ios

# Staging build
yarn e2e:staging-test-ios

# Production build
yarn e2e:prod-test-ios
```

### Test Structure

| Folder / File              | Description                                  |
| -------------------------- | -------------------------------------------- |
| `e2e/`                     | Root directory for all E2E test files        |
| `e2e/master_suite.yaml`    | Master test suite that runs all screen tests |
| `e2e/common/`              | Reusable flows (tap, input, dropdown, etc.)  |
| `e2e/screens/`             | Per-screen test flows                        |
| `run_maestro_test.sh`      | Shell script to build, install, and run tests|
| `parseMaestroLog.js`       | Parses Maestro test output to JSON           |
| `generateTestReport.js`    | Generates comprehensive test reports         |

### Test Reports

After running tests, reports are generated in the `test-reports/` directory:

- **JSON report** — machine-readable test results
- **Detailed log** — full Maestro output in `maestro-detailed-output.log`

---


## Other Useful Commands

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `yarn start`       | Start the Metro bundler                         |
| `yarn test`        | Run unit tests with Jest                        |
| `yarn lint`        | Run ESLint on source files                      |
| `yarn format`      | Format code with Prettier                       |
| `yarn install-pod` | Install Ruby bundler + CocoaPods (iOS shortcut) |

---

## Troubleshooting

### Common Issues

- **Metro bundler fails to start** — Make sure no other Metro process is running. Kill it with <kbd>Ctrl</kbd> + <kbd>C</kbd> and try again.
- **Android build fails** — Ensure `ANDROID_HOME` is set correctly and an emulator is running or a device is connected.
- **iOS pod install fails** — Try `arch -x86_64 pod install` on Apple Silicon Macs, or delete the `ios/Pods` folder and `ios/Podfile.lock` then re-run `pod install`.
- **"Command not found: yarn"** — Run `npm install -g yarn` to install Yarn globally.
- **Node version too old** — This project requires Node.js **v20 or higher**. Update from [https://nodejs.org](https://nodejs.org).

For more help, see the official [React Native Troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

---

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [`@facebook/react-native`](https://github.com/facebook/react-native) — React Native GitHub repository
