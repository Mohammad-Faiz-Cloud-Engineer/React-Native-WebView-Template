# Quick Start Guide

Get your WebView app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

## Step 1: Install Dependencies

```bash
npm install
```

For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

## Step 2: Configure Your App

Edit `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  APP_NAME: 'MyApp',                    // Your app name
  BASE_URL: 'https://your-site.com',    // Your website URL
  ALLOWED_DOMAINS: [
    'your-site.com',                    // Your domain
    '*.your-site.com',                  // All subdomains
  ],
  // ... rest stays the same
};
```

## Step 3: Update App Name

Edit `app.json`:

```json
{
  "name": "MyApp",
  "displayName": "My App"
}
```

## Step 4: Run the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Step 5: Change App Icon (Optional)

### Android
Replace these files in `android/app/src/main/res/`:
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

Use [AppIcon.co](https://appicon.co/) to generate all sizes.

### iOS
1. Open `ios/YourApp.xcworkspace` in Xcode
2. Navigate to `Images.xcassets/AppIcon.appiconset`
3. Drag and drop your icons

## That's It! 🎉

Your WebView app is ready to use.

## Common Issues

### Metro bundler not starting
```bash
npm start -- --reset-cache
```

### iOS build fails
```bash
cd ios
rm -rf Pods
pod install
cd ..
```

### Android build fails
```bash
cd android
./gradlew clean
cd ..
```

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [ANDROID_SETUP.md](ANDROID_SETUP.md) for Android configuration
- Check [IOS_SETUP.md](IOS_SETUP.md) for iOS configuration
- Review [SECURITY.md](SECURITY.md) for security best practices

## Need Help?

- Check the [troubleshooting section](README.md#troubleshooting) in README
- Open an issue on GitHub
- Review the [architecture documentation](ARCHITECTURE.md)

---

Happy coding! 🚀
