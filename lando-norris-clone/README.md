# ⭐ TapStar — NFC Google Review Cards Website

> High-end, dark-mode, typography-driven website for **TapStar** (NFC Google Review Cards), inspired by the design concept of [landonorris.com](https://landonorris.com/).

---

## 🚀 How to Run Locally

```bash
# Navigate to project folder
cd "d:\TAP STAR\lando-norris-clone"

# Start HTTP server
python -m http.server 3000
```
Open your browser at: `http://localhost:3000`

---

## 📂 Project Structure

```
d:\TAP STAR\lando-norris-clone\
├── index.html                  # Complete semantic HTML5 webpage (all 10 sections)
├── README.md                   # Project documentation & setup instructions
├── make_transparent.ps1        # Image processing utility for logo transparency
├── css/
│   ├── style.css               # Design system tokens, variables, typography, reset, buttons
│   ├── sections.css            # Section styles (Floating Glass Nav, Hero, Products, Footer, etc.)
│   └── animations.css          # Keyframes, NFC radio pulse, laser scan beam, hover effects
├── js/
│   └── main.js                 # Smooth interactions, 3D mouse parallax tilt, fake QR generator
└── assets/
    └── images/
        ├── tapstar-emblem.png           # Official transparent logo emblem
        ├── tapstar-logo.png             # Official transparent main logo
        ├── tapstar-logo-transparent.png # Full logo version with stars
        ├── hero-product.jpg             # Floating 3D review card hero render
        ├── card-front.jpg               # Standard NFC review card
        ├── card-hand.jpg                # Lifestyle hand holding card
        ├── restaurant-scene.jpg         # Card on restaurant counter
        ├── multiple-cards.jpg           # 3x Cards premium pack
        ├── raw-stand-front.jpg          # NFC card with wooden stand (front)
        ├── raw-stand-front-2.jpg        # Custom design NFC card with stand
        ├── raw-back.jpg                 # Card back view
        └── raw-hand.jpg                 # Raw hand holding photo
```

---

## ✨ Features Implemented

1. **Floating Curved Glassmorphism Navbar**:
   - Translucent glass capsule with curved ends (`border-radius: 100px`).
   - 30% reduced opacity for pure crystal-clear frosted glass look (`rgba(10, 22, 40, 0.22)`).
   - High-performance backdrop blur (`blur(24px) saturate(180%)`).
   - Super smooth and fast 0.18s spring button animation with shimmer light reflection sweep.

2. **Hero Section**:
   - Instant page reveal (no blocking splash screen).
   - Official transparent logo mark in nav.
   - Interactive 3D mouse parallax tilt on the floating NFC card.
   - Live animated customer counter & floating testimonial card.

3. **How It Works (3 Steps)**:
   - 1. Tap • 2. Scan • 3. Grow with lifestyle photography.

4. **Products Grid**:
   - Standard NFC Card (PKR 1,500)
   - Card + Stand (PKR 2,000)
   - Premium Pack 3x (PKR 4,000)
   - Custom Design Card (PKR 2,500)

5. **Scan Me Section**:
   - Real-time animated fake QR pattern with pulsing NFC waves.
   - High-tech glowing blue laser scanning beam sweeping continuously.

6. **Direct WhatsApp Integration**:
   - Number: `+92 327 4733604` (`03274733604`).
   - All "Order Now", "Order →", and "WhatsApp Us" buttons link directly with custom prefilled messages.

7. **Balanced Footer**:
   - Aligned 3-column layout.
   - Social links with official brand colors on cursor hover:
     - 📷 **Instagram**: `#E1306C`
     - 🎵 **TikTok**: `#FF0050`
     - 📘 **Facebook**: `#1877F2`
     - 💬 **WhatsApp**: `#25D366` (direct chat link)
   - YouTube removed as requested.
   - Signature Google 4-color stripe.
