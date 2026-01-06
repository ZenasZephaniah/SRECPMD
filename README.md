# Server-Rendered E-Commerce Product Management Dashboard

### 🔗 [View Live Demo](https://srecpmd-ck1w.vercel.app/)

The **Server-Rendered E-Commerce Product Management Dashboard** is a secure, full-stack administrative portal built with **Next.js 15**. It is designed to simplify inventory management for store administrators. This application leverages **Server-Side Rendering (SSR)** to ensure fast page loads, SEO optimization, and reliable data fetching.

---

## 🚀 Key Features

* **Server-Side Rendering (SSR)**
  Product data is fetched on the server before rendering, ensuring instant initial page loads and improved performance.

* **Secure Authentication**
  Custom Middleware protects admin routes. Unauthenticated users are redirected to the login page.

* **Complete CRUD Operations**
  * **Create:** Multi-step form with **Zod validation** and **Cloudinary** image upload.
  * **Read:** Dynamic data table with real-time updates.
  * **Update/Delete:** Secure actions to manage inventory.

* **Data Visualization**
  Interactive **Bar** and **Pie** charts (via Recharts) visualize stock levels and inventory distribution.

* **Sales Module**
  Dedicated tracking for product sales performance.

---

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Database:** MongoDB (Mongoose ODM)
* **Styling:** Tailwind CSS
* **Image Storage:** Cloudinary
* **Validation:** Zod
* **Deployment:** Vercel

---

## 🔑 Admin Credentials (For Evaluation)

The dashboard is protected. Please use these credentials to access the live demo:

* **Username:** `admin`
* **Password:** `password123`

---

## ⚙️ Application Workflow

1. **Request:** Admin accesses the secure URL.
2. **Auth:** Middleware verifies eligibility.
3. **Fetch:** Server connects to MongoDB to fetch data (SSR).
4. **Render:** Page is sent fully populated to the browser.
5. **Interact:** Admin updates products; server revalidates data instantly.

---

## 💻 Installation and Setup

If you wish to run this codebase locally, follow these steps:

### Step 1: Clone the Repository
Open your terminal and clone the repository:
```bash
git clone [https://github.com/ZenasZephaniah/SRECPMD.git](https://github.com/ZenasZephaniah/SRECPMD.git)
cd SRECPMD
