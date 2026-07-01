# Server-Rendered E-Commerce Product Management Dashboard

The **Server-Rendered E-Commerce Product Management Dashboard** is a secure, full-stack administrative portal built with **Next.js 15**. It is designed to simplify inventory management for store administrators. This application leverages **Server-Side Rendering (SSR)** to ensure fast page loads, SEO optimization, and reliable data fetching.

The dashboard is protected to ensure only authorized personnel can access sensitive data. Please use the following dummy credentials to access the live demo: **Username:** `admin` and **Password:** `password123`

### Application Workflow
1. **Request:** Admin accesses the secure URL.
2. **Auth:** Middleware intercepts the request to verify the session token.
3. **Fetch:** Server connects to MongoDB to fetch the latest product data (SSR).
4. **Render:** Page is sent fully populated to the browser.
5. **Interact:** Admin updates products; server revalidates data instantly.
   
## Installation and Setup
If you wish to run this codebase locally, follow these steps:

### Step 1: Clone the Repository
Open your terminal and clone the repository:
```bash
git clone [https://github.com/ZenasZephaniah/SRECPMD.git](https://github.com/ZenasZephaniah/SRECPMD.git)
cd SRECPMD
```

### Step 2: Install Dependencies
Install the necessary Node.js packages:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a .env.local file in the root directory and add your connection strings:
```Code snippet
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Step 4: Run the Development Server
Start the local server:
```bash
npm run dev
```
Once running, open http://localhost:3000 in your browser.
