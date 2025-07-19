# Tushar's Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, interactive chatbot, and optimized performance.

## 🚀 Performance Optimizations

This portfolio has been optimized for maximum performance, especially for deployment on Render:

### Key Optimizations:
- **Lazy Loading**: Heavy components are loaded only when needed
- **Code Splitting**: JavaScript bundles are split for faster loading
- **Canvas Optimization**: Star background reduced from 100 to 50 stars with 30 FPS limit
- **Animation Optimization**: Reduced motion support and mobile optimizations
- **Scroll Performance**: Debounced scroll handlers and passive event listeners
- **Build Optimization**: Gzip and Brotli compression, tree shaking, and minification

### Performance Features:
- Framer Motion animations optimized for 60fps
- Reduced animations on mobile devices
- Console logs removed in production
- Optimized image loading
- CSS performance optimizations with `will-change` properties

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons, React Icons, Lucide React
- **Deployment**: Render (Static Site)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd profile-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment on Render

### Automatic Deployment:
1. Connect your GitHub repository to Render
2. Choose "Static Site" as the service type
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Manual Deployment:
```bash
# Build the project
npm run build

# The built files will be in the `dist` directory
# Upload the contents of `dist` to your hosting service
```

## 🔧 Build Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Production build with optimizations
- `npm run build:analyze` - Build with bundle analysis
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📱 Performance Tips

### For Better Performance:
1. **Use the optimized build**: Always use `npm run build:prod` for production
2. **Enable compression**: The build includes Gzip and Brotli compression
3. **CDN**: Consider using a CDN for static assets
4. **Image optimization**: Optimize images before adding to the project
5. **Monitor performance**: Use browser dev tools to monitor performance

### Mobile Optimization:
- Animations are automatically reduced on mobile devices
- Touch interactions are optimized
- Reduced motion support for accessibility

## 🎨 Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Interactive Chatbot**: AI assistant with voice capabilities
- **Smooth Animations**: Optimized Framer Motion animations
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility**: WCAG compliant with reduced motion support

## 📊 Performance Metrics

After optimization, the website should achieve:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔍 Troubleshooting

### Common Issues:

1. **Website feels slow on Render**:
   - Ensure you're using the production build
   - Check that compression is enabled
   - Verify all optimizations are applied

2. **Animations are choppy**:
   - Check if device supports hardware acceleration
   - Reduce motion is automatically applied on mobile
   - Ensure browser is up to date

3. **Chatbot not working**:
   - Check browser console for errors
   - Ensure microphone permissions are granted
   - Verify all dependencies are installed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
