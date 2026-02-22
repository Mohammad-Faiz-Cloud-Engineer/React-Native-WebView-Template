# Contributing to React Native WebView Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Device/OS information
- React Native version

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature already exists
- Explain the use case
- Describe the expected behavior
- Consider if it fits the template's scope

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow existing code style
- Use TypeScript for type safety
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Testing

Before submitting:
- Test on both iOS and Android
- Test in debug and release modes
- Verify security features work
- Check performance
- Test on different device sizes

### Documentation

- Update README.md if needed
- Add comments to complex code
- Update setup guides if configuration changes
- Include examples for new features

## Development Setup

```bash
# Clone your fork
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/React-Native-WebView-Template.git

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/config` - Configuration files
  - `/hooks` - Custom React hooks
  - `/screens` - Screen components
  - `/types` - TypeScript types
  - `/utils` - Utility functions
- `/android` - Android native code
- `/ios` - iOS native code

## Security

- Never commit sensitive data
- Follow security best practices
- Test security features thoroughly
- Report security issues privately

## Questions?

Feel free to open an issue for questions or discussions.

Thank you for contributing! 🎉
