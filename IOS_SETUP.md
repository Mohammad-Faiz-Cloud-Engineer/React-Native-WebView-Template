# iOS Configuration Guide

This guide explains how to configure the iOS app for your WebView application.

## Prerequisites

- macOS with Xcode installed (14.0+)
- CocoaPods installed
- Apple Developer account (for device testing and App Store)

## Initial Setup

1. Install dependencies:
```bash
npm install
```

2. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
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

### 2. Update Xcode project
Open `ios/YourApp.xcworkspace` in Xcode:

a. Select your project in the navigator
b. Under "General" tab, change "Display Name"
c. Update "Bundle Identifier" (e.g., com.yourcompany.yourapp)

### 3. Update scheme name
In Xcode:
- Product → Scheme → Manage Schemes
- Rename the scheme to match your app name

## Changing App Icon

### 1. Prepare icons
You need icons in multiple sizes. Use a tool like:
- https://appicon.co/
- https://www.appicon.build/
- Xcode's built-in asset catalog

Required sizes:
- 20x20 (2x, 3x)
- 29x29 (2x, 3x)
- 40x40 (2x, 3x)
- 60x60 (2x, 3x)
- 1024x1024 (App Store)

### 2. Add to Xcode
1. Open `ios/YourApp.xcworkspace` in Xcode
2. Navigate to `YourApp/Images.xcassets/AppIcon.appiconset`
3. Drag and drop your icon files into the appropriate slots
4. Or use "App Icon & Launch Image" generator in Xcode

### 3. Verify
Build and run to see your new icon on the simulator/device.

## Required Configurations

### 1. Info.plist Settings

Open `ios/YourApp/Info.plist` and ensure these keys exist:

```xml
<!-- App Transport Security -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <false/>
</dict>

<!-- Camera access (if needed) -->
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to upload photos</string>

<!-- Photo library access (if needed) -->
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to upload images</string>

<!-- Location access (if needed) -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access for location-based features</string>

<!-- Microphone access (if needed) -->
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for audio recording</string>
```

### 2. Allow Specific Domains (if needed)

If you need to allow specific HTTP domains (not recommended):

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>example.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
            <key>NSIncludesSubdomains</key>
            <true/>
        </dict>
    </dict>
</dict>
```

## Deep Links Configuration

### 1. URL Schemes
Add to `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>yourapp</string>
        </array>
        <key>CFBundleURLName</key>
        <string>com.yourcompany.yourapp</string>
    </dict>
</array>
```

### 2. Universal Links
1. Create an `apple-app-site-association` file on your server
2. Add Associated Domains capability in Xcode
3. Add domain: `applinks:yourdomain.com`

## Building for Release

### 1. Configure Signing
In Xcode:
1. Select your project
2. Select your target
3. Go to "Signing & Capabilities"
4. Select your team
5. Ensure "Automatically manage signing" is checked

### 2. Update Version and Build Number
In Xcode, under "General" tab:
- Version: 1.0.0 (user-facing version)
- Build: 1 (increment for each build)

### 3. Build Archive
```bash
# From command line
cd ios
xcodebuild -workspace YourApp.xcworkspace -scheme YourApp -configuration Release archive -archivePath ./build/YourApp.xcarchive

# Or in Xcode
# Product → Archive
```

### 4. Export IPA
In Xcode:
1. Window → Organizer
2. Select your archive
3. Click "Distribute App"
4. Choose distribution method:
   - App Store Connect (for App Store)
   - Ad Hoc (for testing)
   - Enterprise (for internal distribution)
   - Development (for testing)

## Testing

### Debug build
```bash
npm run ios
```

### Specific simulator
```bash
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### On physical device
```bash
npx react-native run-ios --device
```

### Release build
```bash
npx react-native run-ios --configuration Release
```

## App Store Submission

### 1. Prepare Assets
- App icon (1024x1024)
- Screenshots for all required device sizes
- App preview video (optional)
- Privacy policy URL
- Support URL

### 2. App Store Connect
1. Create app in App Store Connect
2. Fill in app information
3. Set pricing and availability
4. Upload build using Xcode or Transporter
5. Submit for review

### 3. Required Information
- App name
- Subtitle
- Description
- Keywords
- Support URL
- Marketing URL (optional)
- Privacy policy URL
- App category
- Content rating

## Performance Optimization

### 1. Enable Hermes
In `ios/Podfile`:
```ruby
use_react_native!(
  :path => config[:reactNativePath],
  :hermes_enabled => true
)
```

Then:
```bash
cd ios
pod install
cd ..
```

### 2. Optimize Images
Use asset catalogs and appropriate image sizes.

### 3. Enable Bitcode (if needed)
In Xcode Build Settings:
- Search for "Enable Bitcode"
- Set to "Yes"

## Security Checklist

- ✅ HTTPS only (no HTTP)
- ✅ App Transport Security properly configured
- ✅ Minimum iOS version set (iOS 13.0+)
- ✅ Debugging disabled in release builds
- ✅ Code signing configured
- ✅ Permissions minimized to only what's needed
- ✅ Sensitive data not logged in release
- ✅ Third-party dependencies audited

## Troubleshooting

### Clear build cache
```bash
cd ios
rm -rf build
rm -rf ~/Library/Developer/Xcode/DerivedData
pod deintegrate
pod install
cd ..
npm start -- --reset-cache
```

### CocoaPods issues
```bash
cd ios
pod repo update
pod install
cd ..
```

### Xcode build errors
1. Clean build folder: Product → Clean Build Folder (Cmd+Shift+K)
2. Delete derived data
3. Restart Xcode
4. Ensure Xcode command line tools are installed:
```bash
xcode-select --install
```

### Simulator issues
```bash
# Reset simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices
```

## App Size Optimization

1. Enable Hermes
2. Use asset catalogs
3. Remove unused resources
4. Enable app thinning (automatic in App Store)
5. Use on-demand resources for large assets

## Privacy Manifest (iOS 17+)

Create `PrivacyInfo.xcprivacy` if your app:
- Uses required reason APIs
- Collects user data
- Uses third-party SDKs

## Testing Checklist

- ✅ Test on multiple iOS versions
- ✅ Test on different device sizes
- ✅ Test in airplane mode
- ✅ Test with poor network
- ✅ Test deep links
- ✅ Test app backgrounding/foregrounding
- ✅ Test memory usage
- ✅ Test with VoiceOver (accessibility)
- ✅ Test in dark mode
- ✅ Test rotation (if supported)

## Useful Commands

```bash
# List available simulators
xcrun simctl list devices

# Boot simulator
xcrun simctl boot "iPhone 15 Pro"

# Install app on simulator
xcrun simctl install booted path/to/YourApp.app

# Take screenshot
xcrun simctl io booted screenshot screenshot.png

# Record video
xcrun simctl io booted recordVideo video.mp4
```
