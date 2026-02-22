# Android Configuration Guide

This guide explains how to configure the Android app for your WebView application.

## Prerequisites

- Android Studio installed
- JDK 11 or higher
- Android SDK (API 21+)

## Initial Setup

1. Install dependencies:
```bash
npm install
```

2. Navigate to android directory:
```bash
cd android
```

## Changing App Name

### 1. Update app.json
Edit `app.json` in the root directory:
```json
{
  "name": "YourAppName",
  "displayName": "Your App Display Name"
}
```

### 2. Update Android strings
Edit `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">Your App Display Name</string>
</resources>
```

### 3. Update package name (optional but recommended)
If you want to change the package name from the default:

a. Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.yourcompany.yourapp"
    // ... other config
}
```

b. Rename package directories and update imports accordingly.

## Changing App Icon

### 1. Prepare icons
You need icons in multiple resolutions:
- mipmap-mdpi: 48x48px
- mipmap-hdpi: 72x72px
- mipmap-xhdpi: 96x96px
- mipmap-xxhdpi: 144x144px
- mipmap-xxxhdpi: 192x192px

### 2. Replace icon files
Replace the following files in `android/app/src/main/res/`:
```
mipmap-mdpi/ic_launcher.png
mipmap-hdpi/ic_launcher.png
mipmap-xhdpi/ic_launcher.png
mipmap-xxhdpi/ic_launcher.png
mipmap-xxxhdpi/ic_launcher.png
```

For round icons (Android 7.1+):
```
mipmap-mdpi/ic_launcher_round.png
mipmap-hdpi/ic_launcher_round.png
mipmap-xhdpi/ic_launcher_round.png
mipmap-xxhdpi/ic_launcher_round.png
mipmap-xxxhdpi/ic_launcher_round.png
```

### 3. Use online tools (recommended)
Use tools like:
- https://romannurik.github.io/AndroidAssetStudio/
- https://easyappicon.com/
- https://appicon.co/

## Required Permissions

The app requires internet permission. This is already configured in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Optional Permissions
Add these if your WebView needs them:

```xml
<!-- For camera access -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- For file downloads -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- For geolocation -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## Network Security Configuration

For production, ensure you're using HTTPS. If you need to allow specific HTTP domains (not recommended), create `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">example.com</domain>
    </domain-config>
</network-security-config>
```

Then reference it in `AndroidManifest.xml`:
```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

## Deep Links Configuration

To enable deep links, add this to `AndroidManifest.xml` inside the `<activity>` tag:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="yourapp"
        android:host="open" />
</intent-filter>
```

## Building Release APK

### 1. Generate signing key
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure signing
Edit `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

Edit `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. Build release APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

### 4. Build AAB for Play Store
```bash
./gradlew bundleRelease
```

The AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## Testing

### Debug build
```bash
npm run android
```

### Release build on device
```bash
npx react-native run-android --variant=release
```

## ProGuard Configuration

For release builds, ensure `android/app/proguard-rules.pro` includes:

```proguard
# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# WebView
-keepclassmembers class * extends android.webkit.WebView {
   public *;
}
-keepclassmembers class * extends android.webkit.WebViewClient {
    public *;
}
-keepclassmembers class * extends android.webkit.WebChromeClient {
    public *;
}
```

## Troubleshooting

### Clear build cache
```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
```

### Check app size
```bash
cd android
./gradlew app:assembleRelease
ls -lh app/build/outputs/apk/release/
```

### Enable Hermes (recommended for performance)
In `android/app/build.gradle`:
```gradle
project.ext.react = [
    enableHermes: true
]
```

## Performance Tips

1. Enable Hermes engine (already enabled by default in RN 0.70+)
2. Enable ProGuard in release builds
3. Use AAB format for Play Store (smaller download size)
4. Test on low-end devices
5. Monitor memory usage with Android Profiler

## Security Checklist

- ✅ HTTPS only (no HTTP)
- ✅ Network security config properly set
- ✅ ProGuard enabled for release
- ✅ Debugging disabled in release builds
- ✅ Signing key stored securely (not in git)
- ✅ Minimum SDK version set appropriately
- ✅ Permissions minimized to only what's needed
