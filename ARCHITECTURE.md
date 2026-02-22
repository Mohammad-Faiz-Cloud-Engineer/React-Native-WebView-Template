# Architecture Documentation

This document explains the architecture and design decisions of the React Native WebView Template.

## Overview

This template follows clean architecture principles with a focus on:
- Separation of concerns
- Modularity
- Testability
- Security
- Performance
- Maintainability

## Project Structure

```
react-native-webview-template/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorScreen.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ProgressBar.tsx
│   ├── config/              # Configuration layer
│   │   └── appConfig.ts     # Single source of truth for config
│   ├── hooks/               # Custom React hooks
│   │   ├── useBackHandler.ts
│   │   └── useWebViewState.ts
│   ├── screens/             # Screen components
│   │   └── WebViewScreen.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── networkUtils.ts
│   │   └── urlValidator.ts
│   └── App.tsx              # Root component
├── android/                 # Android native code
├── ios/                     # iOS native code
└── [config files]
```

## Architecture Layers

### 1. Configuration Layer (`src/config/`)

**Purpose**: Single source of truth for all app configuration.

**Key File**: `appConfig.ts`

**Responsibilities**:
- Define app name, URLs, and domains
- Configure WebView settings
- Define UI preferences
- Manage security settings
- Provide validation functions

**Design Decision**: Centralized configuration makes the template easy to customize. Users only need to edit one file to change the app's behavior.

### 2. Presentation Layer (`src/components/`, `src/screens/`)

**Purpose**: Handle UI rendering and user interactions.

**Components**:
- `WebViewScreen`: Main screen containing the WebView
- `ErrorScreen`: Display errors with retry functionality
- `LoadingIndicator`: Show loading state
- `ProgressBar`: Visual loading progress

**Design Decisions**:
- Components are pure and focused on presentation
- State management is delegated to hooks
- Memoization prevents unnecessary re-renders
- Dark mode support via `useColorScheme`

### 3. Business Logic Layer (`src/hooks/`, `src/utils/`)

**Purpose**: Implement core functionality and business rules.

**Hooks**:
- `useWebViewState`: Manage WebView loading states
- `useBackHandler`: Handle Android back button
- `useNetworkStatus`: Monitor network connectivity

**Utilities**:
- `URLValidator`: Validate and sanitize URLs
- `networkUtils`: Network-related utilities

**Design Decisions**:
- Hooks encapsulate stateful logic
- Utilities are pure functions
- Clear separation from UI code
- Reusable across components

### 4. Type Layer (`src/types/`)

**Purpose**: Define TypeScript interfaces and types.

**Design Decision**: Centralized types improve type safety and make the codebase easier to understand.

## Key Design Patterns

### 1. Single Responsibility Principle

Each module has one clear responsibility:
- `appConfig.ts`: Configuration only
- `URLValidator`: URL validation only
- `useWebViewState`: State management only

### 2. Dependency Injection

Configuration is injected into components:
```typescript
import {APP_CONFIG} from '@/config/appConfig';
```

This makes testing easier and allows runtime configuration changes.

### 3. Custom Hooks Pattern

Complex logic is extracted into custom hooks:
```typescript
const {loadingState, error, handleLoadStart} = useWebViewState();
```

Benefits:
- Reusable logic
- Cleaner components
- Easier testing
- Better separation of concerns

### 4. Composition over Inheritance

Components are composed rather than inherited:
```typescript
<WebViewScreen>
  <ProgressBar />
  <WebView />
  <ErrorScreen />
</WebViewScreen>
```

### 5. Fail-Safe Defaults

All configurations have safe defaults:
- File access: disabled
- Mixed content: blocked
- Unknown domains: blocked

## Security Architecture

### Defense in Depth

Multiple layers of security:

1. **Configuration Layer**
   - Domain whitelist
   - Scheme whitelist
   - Safe defaults

2. **Validation Layer**
   - URL sanitization
   - Protocol checking
   - Domain verification

3. **WebView Layer**
   - File access disabled
   - JavaScript eval disabled
   - Navigation filtering

4. **Platform Layer**
   - Network security config (Android)
   - App Transport Security (iOS)
   - ProGuard obfuscation

### Security Flow

```
User Action
    ↓
URL Request
    ↓
Sanitization (URLValidator.sanitizeUrl)
    ↓
Scheme Check (isAllowedScheme)
    ↓
Domain Check (isAllowedDomain)
    ↓
Safety Check (isSafeUrl)
    ↓
onShouldStartLoadWithRequest
    ↓
Load or Block
```

## State Management

### Local State

Uses React hooks for local state:
- `useState` for simple state
- `useRef` for mutable refs
- `useCallback` for memoized callbacks
- `useMemo` for memoized values

### State Flow

```
User Action
    ↓
Event Handler (e.g., onLoadStart)
    ↓
Hook Update (e.g., handleLoadStart)
    ↓
State Change (e.g., setLoadingState)
    ↓
Component Re-render
    ↓
UI Update
```

## Performance Optimizations

### 1. Memoization

```typescript
const injectedJavaScript = useMemo(() => {
  return `...`;
}, []);
```

Prevents recreation on every render.

### 2. Callback Optimization

```typescript
const handleError = useCallback((error) => {
  // ...
}, []);
```

Prevents unnecessary re-renders of child components.

### 3. Hardware Acceleration

```typescript
androidHardwareAccelerationDisabled={false}
androidLayerType="hardware"
```

### 4. Caching

```typescript
cacheEnabled={true}
cacheMode="LOAD_DEFAULT"
```

### 5. Hermes Engine

Enabled by default for faster startup and lower memory usage.

## Error Handling

### Error Flow

```
Error Occurs
    ↓
onError / onHttpError
    ↓
handleError (hook)
    ↓
State Update (error state)
    ↓
ErrorScreen Rendered
    ↓
User Clicks Retry
    ↓
resetError + reload
```

### Error Types

1. **Network Errors**: No internet, timeout
2. **HTTP Errors**: 404, 500, etc.
3. **SSL Errors**: Certificate issues
4. **Navigation Errors**: Blocked URLs

## Platform-Specific Considerations

### Android

- Back button handling via `BackHandler`
- Network security configuration
- ProGuard for code obfuscation
- Hardware acceleration
- Deep links via intent filters

### iOS

- Swipe-back gesture support
- App Transport Security
- Universal links support
- WKWebView (modern WebView)

## Testing Strategy

### Unit Tests

Test individual functions:
- `URLValidator` methods
- Configuration validators
- Utility functions

### Integration Tests

Test component interactions:
- WebView loading flow
- Error handling
- Navigation filtering

### E2E Tests

Test complete user flows:
- App launch
- Page loading
- Error recovery
- Deep links

## Scalability

### Adding Features

1. **New Configuration**: Add to `appConfig.ts`
2. **New Component**: Add to `src/components/`
3. **New Hook**: Add to `src/hooks/`
4. **New Utility**: Add to `src/utils/`

### Extending Security

1. Add validation in `URLValidator`
2. Update `appConfig.ts` settings
3. Modify `onShouldStartLoadWithRequest`

### Adding Screens

1. Create in `src/screens/`
2. Add navigation (if using React Navigation)
3. Update `App.tsx`

## Best Practices

### Do's

✅ Keep configuration in `appConfig.ts`  
✅ Use TypeScript for type safety  
✅ Implement error boundaries  
✅ Test on both platforms  
✅ Follow security guidelines  
✅ Use hooks for logic  
✅ Memoize expensive operations  
✅ Handle edge cases  

### Don'ts

❌ Hardcode URLs in components  
❌ Disable security features  
❌ Ignore TypeScript errors  
❌ Skip error handling  
❌ Use inline styles everywhere  
❌ Mutate state directly  
❌ Forget to test on real devices  

## Future Improvements

### Potential Enhancements

1. **State Management**: Add Redux/MobX for complex state
2. **Navigation**: Add React Navigation for multi-screen apps
3. **Offline Mode**: Cache content for offline viewing
4. **Push Notifications**: Add notification support
5. **Analytics**: Integrate analytics tracking
6. **A/B Testing**: Add feature flags
7. **Crash Reporting**: Add Sentry or similar
8. **Performance Monitoring**: Add performance tracking

### Architectural Evolution

As the app grows:
1. Consider feature-based structure
2. Add dependency injection container
3. Implement repository pattern for data
4. Add middleware for cross-cutting concerns
5. Consider micro-frontends for large teams

## Conclusion

This architecture prioritizes:
- **Security**: Multiple layers of protection
- **Simplicity**: Easy to understand and modify
- **Performance**: Optimized for speed
- **Maintainability**: Clean, modular code
- **Scalability**: Easy to extend

The template provides a solid foundation while remaining flexible enough to adapt to various use cases.

---

For questions or suggestions, please open an issue or discussion.
