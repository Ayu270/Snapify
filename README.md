# Snapify - Full Stack E-Commerce Website

This is a Full Stack E-Commerce Website built with **Next.js 15**, **Tailwind CSS**, **Firebase**, **Stripe**, **Rsend**, and **Algolia**.

## Demo Video

Click the image below to watch the demo video:

<a href="https://youtu.be/2y6Qi9ln0yw" target="_blank">
    <img src="https://img.youtube.com/vi/2y6Qi9ln0yw/maxresdefault.jpg" alt="Watch the video" width="750"/>
</a>

## Features

- User authentication with Firebase
- Product browsing and searching with Algolia
- Shopping cart functionality
- Secure payment processing with Stripe
- Admin panel for managing products, orders, and users

## Technologies Used

- **Frontend**: Next.js 15, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **Payment**: Stripe
- **Search**: Algolia
- **Contact Us**: Resend


## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=""
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
   NEXT_PUBLIC_FIREBASE_APP_ID=""
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
   
   NEXT_PUBLIC_DOMAIN=""

   NEXT_PUBLIC_RESEND_API_KEY=""
   
   NEXT_PUBLIC_ALGOLIA_APP_ID=""
   NEXT_PUBLIC_ALGOLIA_APP_KEY=""
   
   NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS='{}'
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Firestore Security Rules

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return exists(/databases/$(database)/documents/admins/$(request.auth.token.email));
    }

    match /{document=**}/reviews/{reviewId} {
      allow read: if isAdmin();
    }

    match /admins/{id} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /brands/{id} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /categories/{id} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /collections/{id} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /orders/{id} {
      allow read: if isAdmin() || request.auth.uid == resource.data.uid;
      allow write: if isAdmin();
    }

    match /products/{id} {
      allow read: if true;
      allow write: if isAdmin();

      match /reviews/{uid} {
        allow read: if true;
        allow write: if isAdmin() || request.auth.uid == uid;
      }
    }

    match /users/{uid} {
      allow read: if isAdmin() || request.auth.uid == uid;
      allow write: if isAdmin() || request.auth.uid == uid;

      match /checkout_sessions/{id} {
        allow read: if isAdmin() || request.auth.uid == uid;
        allow write: if isAdmin() || request.auth.uid == uid;
      }

      match /checkout_sessions_cod/{id} {
        allow read: if isAdmin() || request.auth.uid == uid;
        allow write: if isAdmin() || request.auth.uid == uid;
      }

      match /payments/{id} {
        allow read, write: if false;
      }
    }
  }
}
```

## Firestore Storage Security Rules

```plaintext
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid != null && firestore.exists(/databases/(default)/documents/admins/$(request.auth.token.email));
    }
  }
}
```

## Demo

You can explore the demo of the e-commerce website at [this link](https://snapiify.vercel.app). 

To access the Admin Panel, [Contact Us](https://snapiify.vercel.app/contact-us).

## Repository Structure

```bash
Snapify/
│
📦 app/
├── layout.js                           # Main app layout (Next.js App Router)
├── (auth)/                             # Auth Module (Login, Signup, Reset Password)
│   ├── layout.jsx
│   ├── login/page.jsx
│   ├── sign-up/page.jsx
│   └── forget-password/page.jsx
├── (checkout)/                         # Checkout Flow (Stripe & Firestore)
│   ├── checkout-cod/page.jsx
│   ├── checkout-failed/page.jsx
│   ├── checkout-success/page.jsx
│   └── checkout-success/components/SuccessMessage.jsx
├── (pages)/                            # Product Browsing & Search (Algolia)
│   ├── search/page.jsx
│   ├── search/components/SearchBox.jsx
│   ├── brands/[brandId]/page.jsx
│   ├── categories/[categoryId]/page.jsx
│   ├── collections/[collectionId]/page.jsx
│   └── products/[productId]/page.jsx
├── (user)/                             # User Area (Account, Cart, Favorites)
│   ├── layout.jsx
│   ├── account/page.jsx
│   ├── cart/page.jsx
│   ├── favorites/page.jsx
│   └── checkout/
│       ├── layout.jsx
│       ├── page.jsx
│       └── components/Checkout.jsx
├── admin/                              # Admin Management Panel
│   ├── layout.jsx
│   ├── page.jsx
│   ├── customers/, products/, orders/, brands/, categories/, collections/, reviews/, admins/
│   │   ├── page.jsx
│   │   ├── form/page.jsx (if applicable)
│   │   ├── components/
│   │   │   ├── ListView.jsx
│   │   │   └── Form.jsx / ChangeStatus.jsx
│   └── components/
│       ├── AdminLayout.jsx
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       ├── CountMeter.jsx
│       ├── OrdersChart.jsx
│       └── RevenueChart.jsx
├── about-us/page.jsx                   # Static & Info Pages
├── contact-us/page.jsx
├── faq/page.jsx
└── privacy/page.jsx

📦 app/api/
└── contact/route.js                    # Edge API - Contact Form

📦 components/
└── ui/                                 # Design System UI Components
    ├── badge.jsx
    ├── button.jsx
    ├── card.jsx
    └── skeleton.jsx
└── AddToCartButton.jsx, Header.jsx, Footer.jsx, etc.

📦 contexts/
└── AuthContext.jsx                     # Global Auth Context Provider

📦 lib/
├── firebase.jsx                        # Firebase Client SDK
├── firebase_admin.jsx                  # Firebase Admin SDK
├── utils.js                            # Common Utility Functions
└── firestore/                          # Firestore Access Layer (BaaS)
    ├── user/, products/, orders/, checkout/
    └── brands/, categories/, collections/, reviews/, admins/

📄 next.config.mjs                      # Next.js Configuration
📄 tailwind.config.mjs                  # Tailwind CSS Config
📄 jsconfig.json                        # Path Aliases
```

## Conclusion

This project provides a robust e-commerce solution leveraging modern technologies. Feel free to customize and extend its functionality as needed.
