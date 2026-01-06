# Server-Rendered E-Commerce Product Management Dashboard

View Live Demo: https://srecpmd-ck1w.vercel.app/

The Server-Rendered E-Commerce Product Management Dashboard is a secure, full-stack administrative portal built with Next.js 15. It is designed to simplify the process of inventory management for store administrators. This application leverages Server-Side Rendering (SSR) to ensure fast page loads, SEO optimization, and reliable data fetching, providing a seamless user experience even on slower networks.

Features

Server-Side Rendering (SSR)
Product data is fetched on the server before rendering, ensuring instant initial page loads and improved performance compared to client-side fetching.

Secure Authentication
The application implements custom Middleware to protect admin routes. Unauthenticated users attempting to access the dashboard are automatically redirected to the login page.

Complete CRUD Operations
Administrators can perform full Create, Read, Update, and Delete operations.
- Create: A multi-step form with input validation (Zod) and image upload integration (Cloudinary).
- Read: A dynamic data table that reflects real-time inventory updates.
- Update/Delete: Secure actions to modify or remove stock items.

Data Visualization
The dashboard includes interactive charts (Bar and Pie charts via Recharts) to visualize stock levels, inventory distribution, and active categories.

Sales Module
A dedicated tracking section allows administrators to monitor product sales performance alongside inventory levels.

Tech Stack

Framework: Next.js 15 (App Router)
Database: MongoDB (Mongoose ODM)
Styling: Tailwind CSS
Image Storage: Cloudinary
Validation: Zod
Deployment: Vercel

Admin Credentials (For Evaluation)

The dashboard is protected to ensure only authorized personnel can access sensitive data. Please use the following dummy credentials to access the live demo:

Username: admin
Password: password123

Workflow

1. Request
The administrator attempts to access the secure dashboard URL.

2. Authentication
The Middleware intercepts the request to verify the session token. If invalid, the user is redirected to the login screen.

3. Fetch
Upon successful authentication, the server connects directly to the MongoDB database to fetch the latest product data using Server-Side Rendering.

4. Render
The page is generated on the server and sent as fully populated HTML to the browser, ensuring immediate content visibility.

5. Interact
The administrator adds, edits, or deletes products. The server processes these requests and revalidates the data cache to update the UI instantly without a full page reload.

Installation and Setup

If you wish to run this codebase locally, follow these steps:

1. Clone the Repository

Open your terminal and clone the repository to your local machine:

git clone https://github.com/ZenasZephaniah/SRECPMD.git
cd SRECPMD

2. Install Dependencies

Install the necessary Node.js packages required for the project:

npm install

3. Configure Environment Variables

Create a .env.local file in the root directory of the project. Add your specific connection strings for MongoDB and Cloudinary:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

4. Run the Development Server

Start the project locally. The application will compile and start a local server:

npm run dev

Once the server is running, open http://localhost:3000 in your browser to view the dashboard.
