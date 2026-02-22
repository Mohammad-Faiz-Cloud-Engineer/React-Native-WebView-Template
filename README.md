# React Native WebView Template

Turn any website into a native mobile app in minutes. This isn't just another WebView wrapper—it's a battle-tested, production-ready foundation that handles security, performance, and user experience so you don't have to.

## Why This Template?

Most WebView templates are basic wrappers that ignore critical production concerns. This one is different:

- **Security-first**: Multiple layers of protection against common WebView vulnerabilities
- **Performance-optimized**: Hermes engine, hardware acceleration, smart caching
- **Actually configurable**: Change your URL and domains in one file, not scattered across 20 files
- **Production-tested**: No placeholders, no TODOs, no "figure it out yourself" moments

## What You Get

**Security hardening** that blocks file access, prevents JavaScript injection, enforces HTTPS, and validates every navigation request.

**Smart error handling** with offline detection, retry logic, and user-friendly error screens instead of blank white screens.

**Native features** like pull-to-refresh, loading indicators, back button handling, and deep link support that actually work.

**Clean architecture** with TypeScript, modular components, and separation of concerns so you can extend it without creating a mess.  

## Quick Start

```bash
# Install dependencies
npm install

# iOS only
cd ios && pod install && cd ..

# Run it
npm run ios     # or npm run android
```

That's it. The app runs with example.com loaded. Now make it yours.

## Make It Yours

Open `src/config/appConfig.ts` and change three things:

```typescript
export const APP_CONFIG = {
  APP_NAME: 'MyApp',
  BASE_URL: 'https://mysite.com',
  ALLOWED_DOMAINS: ['mysite.com', '*.mysite.com'],
  // Everything else has smart defaults
};
```

Update the app name in `app.json`:

```json
{
  "name": "MyApp",
  "displayName": "My App"
}
```

Replace the app icons (use [AppIcon.co](https://appicon.co/) to generate all sizes):
- Android: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- iOS: Open Xcode workspace and update `Images.xcassets/AppIcon.appiconset`

Done. Your app is ready.

## How It Works

```
src/
├── config/appConfig.ts      ← Edit this file
├── screens/WebViewScreen.tsx ← Main WebView with security
├── components/              ← Error screens, loading states
├── hooks/                   ← Back button, state management
└── utils/                   ← URL validation, security checks
```

The architecture is simple: configuration drives everything, components handle UI, hooks manage state, and utilities enforce security. No magic, no complexity.

## Security

WebViews are dangerous if not configured properly. This template protects against:

**File access exploits**: All file system access disabled  
**JavaScript injection**: Eval blocked, inputs sanitized  
**Mixed content**: HTTP blocked inside HTTPS  
**Malicious navigation**: Every URL validated before loading  
**Protocol attacks**: javascript:, data:, and file: schemes blocked  
**SSL stripping**: HTTPS enforced with proper certificate validation  

The security layer runs on every navigation request. If a URL doesn't pass validation, it doesn't load. Period.

## Configuration Deep Dive

Everything lives in `src/config/appConfig.ts`. Here's what matters:

**ALLOWED_DOMAINS**: Whitelist your domains. Use `*.domain.com` for subdomains. Anything not on this list gets blocked.

**ALLOWED_SCHEMES**: `https`, `mailto`, `tel`, `sms`. Add others if needed, but be careful—schemes like `javascript:` are attack vectors.

**WEBVIEW_SETTINGS**: JavaScript enabled by default (most sites need it), file access disabled (security), caching enabled (performance). Don't change these unless you know what you're doing.

**UI**: Colors, loading indicators, pull-to-refresh. Customize to match your brand.

The defaults are production-ready. Change what you need, leave the rest alone.

## Ship It

**Android:**
```bash
cd android
./gradlew assembleRelease  # APK
./gradlew bundleRelease    # AAB for Play Store
```

**iOS:**  
Open Xcode → Archive → Distribute

Full build instructions in [ANDROID_SETUP.md](./ANDROID_SETUP.md) and [IOS_SETUP.md](./IOS_SETUP.md).

## Testing

```bash
npm run ios                                    # iOS simulator
npm run android                                # Android emulator
npx react-native run-ios --device             # Physical iPhone
npx react-native run-android --device         # Physical Android
npx react-native run-ios --configuration Release  # Test release build
```

## Real-World Examples

**News app**: Enable pull-to-refresh, aggressive caching, auto-play videos  
**E-commerce**: Third-party cookies for payments, geolocation for delivery, tel: links for support  
**SaaS dashboard**: No caching (always fresh data), session management, analytics domains  
**Documentation**: Heavy caching, minimal UI chrome, offline support  

See [EXAMPLES.md](./EXAMPLES.md) for complete configurations.

## Advanced Usage

**Deep links**: Configure your URL scheme in `appConfig.ts`, then handle `yourapp://` URLs from anywhere.

**JavaScript injection**: Add custom JS in `WebViewScreen.tsx` to modify page behavior or add native features.

**WebView ↔ Native communication**: Use `postMessage` to send data between your website and the app.

**Custom error handling**: Extend `ErrorScreen.tsx` to handle specific error codes or add retry strategies.

The architecture is designed for extension. Add features without fighting the structure.

## Troubleshooting

**Build fails**: Delete `node_modules`, reinstall, clean native builds. 90% of issues are stale caches.

**WebView blank**: Check your URL is in `ALLOWED_DOMAINS` and uses HTTPS. Check console for blocked navigation warnings.

**Icons not updating**: Clean build folders. Android: delete `android/app/build`. iOS: Xcode → Clean Build Folder.

**Deep links broken**: Verify scheme matches in `appConfig.ts`, `AndroidManifest.xml`, and `Info.plist`.

Still stuck? Check the detailed guides in [ANDROID_SETUP.md](./ANDROID_SETUP.md) and [IOS_SETUP.md](./IOS_SETUP.md).

## Performance

Hermes engine is enabled. Hardware acceleration is on. Caching is configured. The app is fast by default.

Want faster? Optimize your website—that's where the bottleneck is. Use a CDN, compress images, minimize JavaScript. The WebView is just a window to your site.

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get running in 5 minutes
- [EXAMPLES.md](./EXAMPLES.md) - Real-world configurations
- [ANDROID_SETUP.md](./ANDROID_SETUP.md) - Android build guide
- [IOS_SETUP.md](./IOS_SETUP.md) - iOS build guide
- [SECURITY.md](./SECURITY.md) - Security details
- [ARCHITECTURE.md](./ARCHITECTURE.md) - How it works

## Contributing

Found a bug? Have an improvement? Pull requests welcome. Keep it simple, keep it secure.

## License

MIT. Use it for whatever you want.

---

Built for developers who need a WebView app that actually works in production.
