# Server-Rendered E-Commerce Product Management Dashboard

### [View Live Demo](https://srecpmd-ck1w.vercel.app/)
### [Watch Demo Video](https://drive.google.com/drive/folders/1bUwnTtpHddiPUENuycenOla6QgEYsLhC?usp=drive_link)

The **Server-Rendered E-Commerce Product Management Dashboard** is a secure, full-stack administrative portal built with **Next.js 15**. It is designed to simplify inventory management for store administrators. This application leverages **Server-Side Rendering (SSR)** to ensure fast page loads, SEO optimization, and reliable data fetching.

---

## Key Features

* **Server-Side Rendering (SSR)**
  Product data is fetched on the server before rendering, ensuring instant initial page loads and improved performance compared to client-side fetching.

* **Secure Authentication & Onboarding**
  * **Middleware Protection:** Custom Middleware verifies session tokens on every request.
  * **Secure Admin Onboarding:** A protected route allows existing administrators to onboard new admins securely (restricted to authenticated users only).

* **Complete CRUD Operations**
  * **Create:** Multi-step form with **Zod validation** and **Cloudinary** image upload.
  * **Read:** Dynamic data table with real-time updates.
  * **Update/Delete:** Secure actions to manage inventory.

* **Data Visualization**
  Interactive **Bar** and **Pie** charts (via Recharts) visualize stock levels and inventory distribution.

* **Sales Module**
  Dedicated tracking for product sales performance.

---

## Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Database:** MongoDB (Mongoose ODM)
* **Styling:** Tailwind CSS
* **Image Storage:** Cloudinary
* **Validation:** Zod
* **Deployment:** Vercel

---

## Admin Credentials (For Evaluation)

The dashboard is protected to ensure only authorized personnel can access sensitive data. Please use the following dummy credentials to access the live demo:

* **Username:** `admin`
* **Password:** `password123`

---

## Application Workflow

1. **Request:** Admin accesses the secure URL.
2. **Auth:** Middleware intercepts the request to verify the session token.
3. **Fetch:** Server connects to MongoDB to fetch the latest product data (SSR).
4. **Render:** Page is sent fully populated to the browser.
5. **Interact:** Admin updates products; server revalidates data instantly.

---

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
