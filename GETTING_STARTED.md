# Getting Started with React Native WebView Template

Welcome! This guide will help you get started with your new WebView app.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Customization](#customization)
3. [Building for Production](#building-for-production)
4. [Documentation](#documentation)
5. [Support](#support)

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- For iOS: macOS with Xcode 14+ and CocoaPods
- For Android: Android Studio with JDK 11+

### Installation

1. **Clone or download this template**
   ```bash
   git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/React-Native-WebView-Template.git
   cd React-Native-WebView-Template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

See [QUICKSTART.md](QUICKSTART.md) for more details.

## 🎨 Customization

### 1. Change Your Website URL

Edit `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  BASE_URL: 'https://your-website.com',  // Change this
  ALLOWED_DOMAINS: [
    'your-website.com',                   // Change this
    '*.your-website.com',                 // And this
  ],
  // ...
};
```

### 2. Change App Name

Edit `app.json`:
```json
{
  "name": "YourAppName",
  "displayName": "Your App Display Name"
}
```

Also update:
- `android/app/src/main/res/values/strings.xml`
- iOS: In Xcode project settings

### 3. Change App Icon

**Android:**
- Replace icons in `android/app/src/main/res/mipmap-*/`
- Use [AppIcon.co](https://appicon.co/) to generate all sizes

**iOS:**
- Open `ios/YourApp.xcworkspace` in Xcode
- Replace icons in `Images.xcassets/AppIcon.appiconset`

### 4. Customize UI

Edit `src/config/appConfig.ts`:

```typescript
UI: {
  enablePullToRefresh: true,
  loadingColor: '#007AFF',        // Change colors
  showProgressBar: true,
  progressBarColor: '#007AFF',
  backgroundColor: '#FFFFFF',
}
```

### 5. Configure Security

Edit `src/config/appConfig.ts`:

```typescript
ALLOWED_SCHEMES: ['https', 'mailto', 'tel'],  // Add/remove schemes
WEBVIEW_SETTINGS: {
  javaScriptEnabled: true,
  geolocationEnabled: false,      // Enable if needed
  // ... other settings
}
```

## 🏗️ Building for Production

### Android

1. **Generate signing key:**
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing** in `android/gradle.properties`

3. **Build:**
   ```bash
   cd android
   ./gradlew assembleRelease  # APK
   ./gradlew bundleRelease    # AAB for Play Store
   ```

See [ANDROID_SETUP.md](ANDROID_SETUP.md) for detailed instructions.

### iOS

1. Open `ios/YourApp.xcworkspace` in Xcode
2. Configure signing in "Signing & Capabilities"
3. Product → Archive
4. Distribute to App Store

See [IOS_SETUP.md](IOS_SETUP.md) for detailed instructions.

## 📚 Documentation

### Essential Reading

- **[README.md](README.md)** - Main documentation with features and examples
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[ANDROID_SETUP.md](ANDROID_SETUP.md)** - Complete Android guide
- **[IOS_SETUP.md](IOS_SETUP.md)** - Complete iOS guide

### Advanced Topics

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture and design decisions
- **[SECURITY.md](SECURITY.md)** - Security features and best practices
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

### Quick Reference

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete file structure and validation

## 🔧 Configuration Reference

### Main Configuration File

All app settings are in `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  // Basic Settings
  APP_NAME: 'WebViewApp',
  BASE_URL: 'https://example.com',
  ALLOWED_DOMAINS: ['example.com', '*.example.com'],
  ALLOWED_SCHEMES: ['https', 'mailto', 'tel', 'sms'],

  // WebView Settings
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,           // Keep false for security
    mixedContentMode: 'never',        // Keep 'never' for security
    cacheEnabled: true,
    geolocationEnabled: false,
    thirdPartyCookiesEnabled: true,
  },

  // UI Settings
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#007AFF',
    showProgressBar: true,
    progressBarColor: '#007AFF',
    backgroundColor: '#FFFFFF',
  },

  // Error Messages
  ERROR_MESSAGES: {
    NO_INTERNET: 'No internet connection...',
    LOAD_ERROR: 'Failed to load the page...',
    BLOCKED_NAVIGATION: 'Navigation not allowed...',
    SSL_ERROR: 'SSL certificate error...',
  },

  // Deep Links
  DEEP_LINK: {
    scheme: 'webviewapp',
    enabled: true,
  },
};
```

## 🎯 Common Use Cases

### News/Blog App
```typescript
BASE_URL: 'https://news.example.com',
ALLOWED_DOMAINS: ['news.example.com', '*.news.example.com'],
UI: { enablePullToRefresh: true }
```

### E-commerce App
```typescript
BASE_URL: 'https://shop.example.com',
ALLOWED_DOMAINS: ['shop.example.com', 'checkout.example.com', 'payment.example.com'],
WEBVIEW_SETTINGS: { thirdPartyCookiesEnabled: true }
```

### Documentation App
```typescript
BASE_URL: 'https://docs.example.com',
ALLOWED_DOMAINS: ['docs.example.com', '*.docs.example.com'],
UI: { showProgressBar: false }
```

### SaaS Dashboard
```typescript
BASE_URL: 'https://app.example.com',
ALLOWED_DOMAINS: ['app.example.com', 'api.example.com'],
WEBVIEW_SETTINGS: { domStorageEnabled: true }
```

## 🐛 Troubleshooting

### App won't build
```bash
# Clean everything
rm -rf node_modules
npm install

# iOS
cd ios && rm -rf Pods && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..

# Reset Metro
npm start -- --reset-cache
```

### WebView shows blank screen
1. Check `BASE_URL` in `src/config/appConfig.ts`
2. Ensure domain is in `ALLOWED_DOMAINS`
3. Verify URL is HTTPS (not HTTP)
4. Check console logs for errors

### Icons not updating
- Clean build and rebuild
- Android: Delete `android/app/build` folder
- iOS: Clean build folder in Xcode (Cmd+Shift+K)

### Deep links not working
- Verify scheme in `src/config/appConfig.ts`
- Check `AndroidManifest.xml` (Android)
- Check `Info.plist` (iOS)
- Test with: `npx uri-scheme open yourapp://test --ios`

## 🔒 Security Checklist

Before deploying:

- [ ] Changed `BASE_URL` to your website
- [ ] Updated `ALLOWED_DOMAINS` list
- [ ] Verified HTTPS-only (no HTTP)
- [ ] Removed unnecessary `ALLOWED_SCHEMES`
- [ ] Kept `allowFileAccess: false`
- [ ] Kept `mixedContentMode: 'never'`
- [ ] Updated app name and package ID
- [ ] Generated release signing key
- [ ] Tested on real devices
- [ ] Reviewed security documentation

## 📱 Testing

### Development
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Specific iOS device
npx react-native run-ios --simulator="iPhone 15 Pro"

# Physical device
npx react-native run-ios --device
npx react-native run-android --device
```

### Production
```bash
# iOS Release
npx react-native run-ios --configuration Release

# Android Release
npx react-native run-android --variant=release
```

## 🎓 Learning Resources

### React Native
- [Official Documentation](https://reactnative.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)

### Platform Guides
- [Android Developer Guide](https://developer.android.com/)
- [iOS Developer Guide](https://developer.apple.com/)

### Security
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [React Native Security](https://reactnative.dev/docs/security)

## 💬 Support

### Documentation
- Check the [README](README.md) first
- Review [troubleshooting section](README.md#troubleshooting)
- Read platform-specific guides

### Community
- Open an issue on GitHub
- Check existing issues and discussions
- Contribute improvements

## 🚀 Next Steps

1. ✅ Customize `src/config/appConfig.ts`
2. ✅ Update app name in `app.json`
3. ✅ Replace app icons
4. ✅ Test on both platforms
5. ✅ Review security settings
6. ✅ Build release version
7. ✅ Deploy to stores

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

**Ready to build something awesome? Let's go! 🎉**

For detailed information, see [README.md](README.md)
