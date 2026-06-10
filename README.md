# MyHomeetal Admin Panel

## Overview
This is the administrative dashboard for MyHomeetal, built with **Next.js 14** (App Router) and **MongoDB**. It handles product management, order processing, and administrative wallet functions.

## 🛠 Setup Instructions
1. **Clone the repository** and install dependencies:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file in the root directory. You **must** populate it with your own production credentials as the current ones are for testing.

   ```env
   # Database
   MONGO_URI=your_production_mongodb_uri

   # Authentication
   JWT_SECRET=your_secure_random_string

   # Storage (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Payment (Pooler - Currently using testing keys)
   POOLER_APIKEY=pk_live_...
   POOLER_WALLET_API_BASE=https://api.poolerapp.com/api/v1/wallet/
   CREATE_WALLET_API=...
   ```

## 🚀 Key Features
- **Serverless API Routes**: All backend logic is migrated to `app/api/v1/`.
- **Image Handling**: Integrated with **Cloudinary**. Images are uploaded via `lib/uploadImage.js`.
- **Admin Auth**: Handled via JWT and custom middleware in `lib/adminAuth.js`.

## ⚠️ Important Notes
- **Pooler Details**: The current keys provided in technical walkthroughs are for **testing**. The dev team must replace these with live merchant keys from the Pooler dashboard.
- **Database**: Ensure your MongoDB cluster has the same schema defined in the `/models` directory.
