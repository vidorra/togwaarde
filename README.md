# 🧥 Togwaarde - TOG Baby Clothing Calculator

**A professional-grade Next.js application for calculating optimal baby clothing layers using the TOG (Thermal Overall Grade) system.**

---

## 📋 Overview

Togwaarde helps parents dress their babies correctly based on room temperature, clothing items selected, and sleep safety guidelines. It uses the TOG system (standard thermal measurement for bedding and clothing) combined with pediatric safety recommendations.

### Key Features

- 🌡️ **Smart TOG Calculation** - Calculates thermal needs based on temperature and clothing
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🔐 **Secure Implementation** - CSP headers, rate limiting, input validation
- ⚡ **Optimized Performance** - Redis-backed rate limiting, weather caching
- ♿ **Accessibility Focus** - WCAG 2.1 compliant with ARIA labels
- 📚 **Knowledge Base** - ~20 articles on baby safety and clothing
- 🌍 **Location-Based** - Uses weather API for temperature recommendations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (optional, for future features)
- Redis instance (for rate limiting)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd togwaarde

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure environment (see Configuration section below)
# Then start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local` based on `.env.example`:

```bash
# Database (optional, for future admin features)
DATABASE_URL="postgresql://user:password@localhost:5432/togwaarde"

# Redis (required for rate limiting)
REDIS_URL="redis://localhost:6379"

# Admin Authentication
JWT_SECRET="your-random-secret-key-min-32-chars"

# EmailJS (for contact form)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PRIVATE_KEY=your_private_key

# Weather API (OpenWeatherMap)
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
NEXT_PUBLIC_WEATHER_API_ENDPOINT=https://api.openweathermap.org/data/2.5

# reCAPTCHA (optional, for contact form)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Setting up Redis

**For development:**
```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or install locally
brew install redis  # macOS
sudo apt-get install redis-server  # Ubuntu
```

**For production:**
- Use managed Redis service (AWS ElastiCache, Heroku Redis, Upstash)
- Update `REDIS_URL` environment variable

---

## 📁 Project Structure

```
togwaarde/
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/              # Admin authentication
│   │   ├── contact/            # Email submissions
│   │   └── sitemap/            # Dynamic sitemap
│   ├── calculator/             # Main calculator page
│   ├── kennisbank/             # Knowledge base articles
│   ├── layout.tsx              # Root layout + metadata
│   ├── error.tsx               # Error boundary
│   └── page.tsx                # Homepage
│
├── components/
│   ├── calculator/             # Calculator sub-components
│   │   ├── ClothingSelector.tsx
│   │   ├── RoomInfoCard.tsx
│   │   ├── TOGResultsPanel.tsx
│   │   └── TOGDisclaimer.tsx
│   ├── TOGCalculator.tsx       # Main calculator
│   ├── Layout.tsx              # Page layout wrapper
│   ├── Header.tsx              # Navigation
│   └── Footer.tsx              # Footer
│
├── hooks/
│   ├── useTOGCalculation.ts    # Core calculation logic
│   └── useWeatherLocation.ts   # Weather + geolocation
│
├── lib/
│   ├── tog-constants.ts        # TOG values & recommendations
│   ├── tog-types.ts            # TypeScript interfaces
│   └── rate-limiter.ts         # Redis rate limiting
│
├── middleware.ts               # Security headers & CSP
├── next.config.js              # Next.js configuration
└── tailwind.config.js          # Tailwind CSS config
```

---

## 🧮 How It Works

### TOG Calculation Algorithm

1. **Base TOG**: Determined by room temperature
   - Cold (<15°C): 3.5 TOG
   - Cool (15-18°C): 2.5-3.5 TOG
   - Moderate (18-21°C): 1.5-2.5 TOG
   - Warm (>21°C): 0.5-1.5 TOG

2. **Clothing Adjustments**: Add TOG based on selected items
   - Each clothing item has a TOG value
   - Multiple items stack (additive model)

3. **Safety Warnings**: Check against SIDS guidelines
   - Temperature alerts
   - Overheating risk
   - Safe sleep position recommendations

### Example Calculation

```
Room temp: 20°C → Base TOG: 2.0
Selected clothing:
  - Long sleeve shirt: +0.5
  - Pants: +0.5
  - Warm sleepsack: +1.5

Total recommended TOG: 4.5
```

---

## 🔧 Development

### Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests (when test suite is added)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Code Style

- **TypeScript**: Strict mode for type safety
- **Formatting**: Use Prettier (configured in package.json)
- **Linting**: ESLint with Next.js rules
- **Commit messages**: Conventional commits (feat:, fix:, docs:, etc.)

---

## 🛡️ Security Features

### Implemented

- ✅ **Content Security Policy (CSP)** - Strict headers preventing XSS
- ✅ **HSTS** - Enforces HTTPS
- ✅ **Rate Limiting** - Redis-backed, 100 requests/minute per IP
- ✅ **Input Validation** - All user inputs sanitized
- ✅ **DOMPurify** - HTML sanitization for rich text
- ✅ **JWT Authentication** - Secure admin tokens
- ✅ **reCAPTCHA v3** - Bot protection on forms

### Best Practices

- Never commit `.env.local` (add to `.gitignore`)
- Use environment variables for all secrets
- Validate on both client and server
- Use HTTPS in production
- Keep dependencies updated: `npm audit`

---

## 📊 Performance

### Optimizations

- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Next.js Image component
- **Caching**: 1-hour cache for weather data
- **Compression**: Gzip compression on responses
- **Database**: Indexed queries for fast lookups

### Monitoring

Run Lighthouse audit:
```bash
npm run build
npm start
# Then use Chrome DevTools > Lighthouse
```

---

## ♿ Accessibility

**WCAG 2.1 Level AA Compliant**

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios
- ✅ Focus management
- ✅ Semantic HTML
- ✅ Error messages for form validation

Test with screen readers:
- **NVDA** (free, Windows)
- **JAWS** (commercial, Windows/Mac)
- **VoiceOver** (built-in, macOS/iOS)

---

## 📚 API Documentation

### POST /api/contact

Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about TOG",
  "message": "Is 2.5 TOG safe for..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 429: Rate limited
- 500: Server error

### POST /api/admin/login

Admin authentication

**Request:**
```json
{
  "password": "admin-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc..."
}
```

---

## 🚢 Deployment

### To Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to configure
```

### To CapRover

```bash
# Use CapRover CLI or dashboard
# Set environment variables in CapRover admin panel
# Push your code to trigger deployment
```

### Docker Deployment

```bash
# Build image
docker build -t togwaarde .

# Run container
docker run -p 3000:3000 \
  -e REDIS_URL=redis://... \
  -e DATABASE_URL=postgresql://... \
  togwaarde
```

---

## 🧪 Testing

**Current Status**: Tests planned for Phase 5

Test structure (to be implemented):
```
tests/
├── unit/
│   ├── hooks/useTOGCalculation.test.ts
│   └── lib/tog-constants.test.ts
├── integration/
│   └── api/contact.test.ts
└── e2e/
    └── calculator.spec.ts
```

---

## 📖 Further Reading

- [SIDS Prevention Guidelines](https://www.nichd.nih.gov/health/topics/sids)
- [TOG System](https://en.wikipedia.org/wiki/Thermal_Overall_Grade)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🐛 Troubleshooting

### "Redis connection failed"
- Check Redis is running: `redis-cli ping` should return `PONG`
- Verify `REDIS_URL` in `.env.local`
- Restart dev server after Redis starts

### "Weather API not working"
- Verify API key is valid on OpenWeatherMap dashboard
- Check rate limits haven't been exceeded
- Fallback uses default TOG values if API fails

### "Contact form not sending"
- Check EmailJS credentials are correct
- Verify reCAPTCHA keys if enabled
- Check spam folder for test emails

### Port 3000 already in use
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

---

## 📝 License

MIT License - See LICENSE file

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test locally
3. Commit with descriptive message: `git commit -m "feat: add new feature"`
4. Push to remote: `git push origin feature/new-feature`
5. Create Pull Request with description

---

## 📞 Support

- **Issues**: GitHub Issues page
- **Email**: Contact form on website
- **Documentation**: See `/docs` folder

---

**Last Updated**: February 2025
**Maintained by**: Development Team
**Status**: Production Ready ✅
