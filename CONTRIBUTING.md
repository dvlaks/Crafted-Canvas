# Contributing to Aakash Verma's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/dvlaks/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Fill in your actual environment variables
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── canvas/        # Three.js 3D components
│   ├── __tests__/     # Component tests
│   └── ...
├── assets/            # Static assets (images, icons)
├── utils/             # Utility functions
├── hoc/              # Higher-order components
├── constants.js      # App constants and data
└── App.jsx          # Main application component
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Writing Tests
- Place test files in `__tests__` directories
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies

Example test structure:
```javascript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ComponentName from '../ComponentName'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## 🎨 Code Style

### JavaScript/JSX Guidelines
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS custom properties for themes

### 3D/Three.js Guidelines
- Optimize models and textures
- Use error boundaries for 3D components
- Implement loading states
- Consider performance on low-end devices

## 🔧 Performance Guidelines

### Optimization Checklist
- [ ] Use React.memo for expensive components
- [ ] Implement lazy loading for routes
- [ ] Optimize images (WebP format when possible)
- [ ] Minimize bundle size
- [ ] Use proper caching strategies

### 3D Performance
- [ ] Limit polygon count in models
- [ ] Use compressed textures
- [ ] Implement LOD (Level of Detail)
- [ ] Monitor frame rate

## ♿ Accessibility Standards

### Requirements
- Maintain WCAG 2.1 AA compliance
- Ensure keyboard navigation works
- Provide proper ARIA labels
- Test with screen readers
- Support high contrast mode

### Testing Accessibility
```bash
# Run accessibility tests
npm run test:accessibility

# Use Lighthouse CI
npm run lighthouse
```

## 🚦 Git Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commits format:
```
type(scope): description

feat(navbar): add mobile navigation menu
fix(contact): resolve form validation issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following project guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

4. **Submit Pull Request**
   - Provide clear description
   - Link related issues
   - Request review from maintainers

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, device information
- **Screenshots**: If applicable

Use this template:
```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 96]
- Device: [e.g. Desktop, Mobile]
```

## 💡 Feature Requests

For feature requests, please include:

- **Feature Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you think it should work
- **Alternative Solutions**: Other approaches considered

## 📊 Performance Monitoring

The project includes built-in performance monitoring:

- **Performance Monitor**: Press `Ctrl+Shift+P` to view real-time metrics
- **Error Logging**: Automatic error tracking and reporting
- **Lighthouse CI**: Automated performance testing

## 🔒 Security

### Reporting Security Issues
Please do not report security vulnerabilities through public GitHub issues. Instead:

1. Email security concerns to: kumawataksh112@gmail.com
2. Include detailed information about the vulnerability
3. Allow time for the issue to be addressed before public disclosure

### Security Guidelines
- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Keep dependencies updated
- Follow security best practices

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide)

### Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Three.js Inspector](https://chrome.google.com/webstore/detail/threejs-inspector)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 🤝 Community

### Communication Channels
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General questions and ideas
- Email: Direct communication with maintainers

### Code of Conduct
We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive
- Focus on what is best for the community
- Show empathy towards other community members
- Use welcoming and inclusive language

## 📝 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to this project! Your efforts help make this portfolio better for everyone. 🎉
