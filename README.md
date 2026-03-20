# Urban Shoes - 3D Interactive Landing Page

A high-conversion, 3D interactive landing page for Urban Shoes built with modern web technologies.

## 🚀 Tech Stack

- **React** with Vite for fast development
- **Tailwind CSS** for responsive UI styling
- **React Three Fiber (R3F)** for 3D rendering
- **Drei** for Three.js helpers and utilities
- **Framer Motion** for smooth scroll animations
- **Three.js** for 3D graphics

## ✨ Features

- 🎨 Full-screen 3D canvas with interactive shoe model
- 🔄 Auto-rotating 3D shoe with orbital controls
- 💫 Smooth scroll animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Optimized for high conversion
- 🌟 Reflective surfaces and realistic lighting
- ⚡ Fast performance with Vite

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🏃 Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx      # Main hero section with 3D canvas
│   │   ├── ShoeModel.jsx         # 3D shoe model component
│   │   └── FeaturesSection.jsx   # Features showcase section
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles with Tailwind
├── public/                       # Static assets
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

## 🎮 3D Controls

- **Mouse Drag**: Rotate the camera around the shoe
- **Auto-Rotate**: The shoe automatically rotates for better viewing
- **Scroll**: Explore different sections with smooth animations

## 🎨 Customization

### Changing Colors

Edit the `tailwind.config.js` file to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a1a1a',
      secondary: '#f5f5f5',
      accent: '#ff6b6b',
    },
  },
}
```

### Modifying the 3D Shoe

The shoe model is located in `src/components/ShoeModel.jsx`. You can:
- Replace the placeholder geometry with a real GLTF/GLB model
- Adjust materials, colors, and textures
- Modify rotation speed and camera angles

### Adding Sections

Create new components in `src/components/` and import them into `App.jsx`.

## 🚢 Deployment

Build the project and deploy the `dist` folder to your hosting provider:

```bash
npm run build
```

The `dist` folder contains optimized production-ready files.

## 📝 License

ISC

## 🙏 Credits

Built with ❤️ using React, Three.js, and modern web technologies.
