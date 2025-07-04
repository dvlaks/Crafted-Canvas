# Security Policy

## Reporting Security Vulnerabilities

The security of Aakash Verma's Portfolio is important to us. If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

### Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.x.x   | :x:                |

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

#### Email
Send details to: **kumawataksh112@gmail.com**

Include the following information:
- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

#### What to Expect

After submitting a report, you can expect:

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Initial Assessment**: We will provide an initial assessment within 72 hours
3. **Regular Updates**: We will keep you informed of our progress
4. **Resolution**: We aim to resolve critical issues within 7 days
5. **Credit**: With your permission, we will credit you for the discovery

### Security Measures

This portfolio implements several security measures:

#### Frontend Security
- **Content Security Policy (CSP)**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Additional XSS protection
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer-Policy**: Controls referrer information

#### Development Security
- **Dependency Scanning**: Regular vulnerability scans using Trivy
- **Code Quality**: ESLint for secure coding practices
- **Automated Testing**: Comprehensive test suite
- **CI/CD Security**: Secure GitHub Actions workflows

#### Deployment Security
- **HTTPS Enforcement**: All traffic encrypted
- **Secure Headers**: Security headers configured in Vercel
- **Environment Variables**: Sensitive data properly secured
- **Access Controls**: Proper authentication and authorization

### Security Best Practices for Contributors

When contributing to this project, please follow these security guidelines:

1. **Dependencies**: 
   - Keep dependencies up to date
   - Use `npm audit` to check for vulnerabilities
   - Avoid dependencies with known security issues

2. **Code Practices**:
   - Validate all inputs
   - Use HTTPS for all external requests
   - Never commit sensitive information (API keys, passwords)
   - Follow secure coding standards

3. **Environment Variables**:
   - Use `.env` files for local development
   - Never commit `.env` files to version control
   - Use Vercel environment variables for production

4. **Third-party Services**:
   - Verify the security of third-party services
   - Use official libraries and APIs
   - Implement proper error handling

### Vulnerability Disclosure Timeline

We strive to follow this timeline for vulnerability disclosure:

- **Day 0**: Vulnerability reported
- **Day 1-2**: Acknowledgment sent to reporter
- **Day 1-3**: Initial assessment and triage
- **Day 1-7**: Fix developed and tested
- **Day 7-14**: Fix deployed to production
- **Day 14+**: Public disclosure (if appropriate)

### Scope

This security policy applies to:

- The main portfolio website and its components
- All associated repositories under the project
- Third-party integrations and dependencies
- Deployment and hosting configurations

### Out of Scope

The following are generally considered out of scope:

- Issues in third-party services not under our control
- Social engineering attacks
- Physical security issues
- Denial of service attacks
- Issues requiring physical access to devices

### Recognition

We believe in recognizing security researchers who help improve our security. With your permission, we will:

- Credit you in our security acknowledgments
- Mention you in relevant changelog entries
- Provide a letter of acknowledgment for your portfolio

### Contact Information

For security-related inquiries:

**Aakash Verma**
- **Security Email**: kumawataksh112@gmail.com
- **GitHub**: [@dvlaks](https://github.com/dvlaks)
- **LinkedIn**: [aakash-verma-669062269](https://www.linkedin.com/in/aakash-verma-669062269)

---

Thank you for helping keep our project and users safe!
