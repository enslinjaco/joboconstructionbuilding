# Jobo Building Construction – Website

A complete, production-ready website for **Jobo Building Construction** – a professional builder and contractor based in Cape Town, South Africa.

**Live at:** [jobobuildingconstruction.co.za](https://jobobuildingconstruction.co.za) *(deploy to Vercel – see below)*

---

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + shadcn/ui components
- **Supabase** (Auth + PostgreSQL + Storage)
- **Lucide React** icons
- **React Hook Form** + Zod validation
- **Framer Motion** animations

---

## 1. Supabase Setup

### Step 1 – Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project** → give it a name → choose a region (e.g. `eu-west-2` for SA proximity) → set a strong database password
3. Wait for the project to initialize

### Step 2 – Get Your Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy your **Project URL** and **Anon (publishable) key**
3. Paste them into `.env.local` (see below)

### Step 3 – Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run the following SQL:

```sql
-- Projects table (portfolio)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  date DATE,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Inquiries table (contact form submissions)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site content (editable text via admin panel)
CREATE TABLE site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Enable Row Level Security (recommended)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects and site_content
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read content" ON site_content FOR SELECT USING (true);

-- Allow authenticated (admin) users full access
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Allow anon to insert inquiries (contact form)
CREATE POLICY "Anon insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
```

### Step 4 – Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New Bucket**
3. Name it exactly: `project-images`
4. Set it to **Public** (so photos display on the website)
5. Click **Create bucket**

Add this storage policy (in Storage → Policies):
```sql
-- Allow authenticated users to upload images
CREATE POLICY "Admin can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow public to view images
CREATE POLICY "Public can view"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');
```

### Step 5 – Create Admin User

1. Go to **Authentication → Users** in Supabase
2. Click **Invite user** or **Add user**
3. Enter Jobo's email address and set a password
4. This is the login used at `/admin/login`

---

## 2. Environment Variables

Create (or update) `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your_anon_key_here
NEXT_PUBLIC_SITE_URL=https://jobobuildingconstruction.co.za
```

> **Never commit `.env.local` to git** – it's already in `.gitignore`

---

## 3. Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 4. Deploy to Vercel (Free)

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit – Jobo Building Construction website"
   git remote add origin https://github.com/yourusername/jobo-constructions.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New Project**

3. Import the repository

4. Add environment variables (same as `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → set to your actual domain (e.g. `https://jobobuildingconstruction.co.za`)

5. Click **Deploy** → your site will be live in ~2 minutes

6. (Optional) Add your custom domain in Vercel → **Domains**

---

## 5. Admin Panel Usage

### Login
Go to `/admin/login` and sign in with the email/password you created in Supabase.

### Dashboard
Overview of total inquiries and projects. Shows the 5 most recent contact form submissions.

### Portfolio Management (`/admin/portfolio`)
- Click **Add Project** to add a new project
- Enter title, category, description, and date
- Drag & drop photos or click to browse (supports multiple photos per project)
- A progress bar shows upload status
- Click **Edit** on any project card to update it
- Click the red trash icon to delete a project

### Site Content (`/admin/content`)
Edit the text displayed on the website:
- **Hero Heading & Subheading** – main text on the homepage
- **About Bio** – your biography text
- **Phone, Email, WhatsApp** – contact details shown everywhere
- **Areas Served** – comma-separated list of service areas

Click **Save** next to each field to save individually, or **Save All Changes** to save everything at once.

### Inquiries (`/admin/inquiries`)
View all contact form submissions. Each inquiry shows the customer's name, phone, email, message, and date. Quick **Call** and **WhatsApp** buttons make it easy to respond.

---

## 6. Project Structure

```
app/
├── page.tsx              ← Home page (/)
├── layout.tsx            ← Root layout + SEO metadata + JSON-LD
├── sitemap.ts            ← Auto-generated sitemap.xml
├── robots.ts             ← robots.txt
├── (public)/
│   ├── layout.tsx        ← Navbar + Footer for public pages
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── admin/
│   ├── layout.tsx        ← Auth-protected admin layout
│   ├── page.tsx          ← Dashboard
│   ├── login/page.tsx
│   ├── content/page.tsx
│   ├── portfolio/page.tsx
│   └── inquiries/page.tsx
└── api/
    └── contact/route.ts  ← Contact form API endpoint

components/
├── layout/Navbar.tsx
├── layout/Footer.tsx
├── home/               ← Homepage sections
├── portfolio/          ← Gallery + modal
├── contact/            ← Contact form
└── admin/              ← Admin panel components

lib/
├── supabase/client.ts  ← Browser Supabase client
├── supabase/server.ts  ← Server Supabase client
└── types.ts            ← TypeScript interfaces
```

---

## 7. SEO

The site is fully optimised for these Cape Town search terms:
- "builder Cape Town"
- "building contractor Cape Town"
- "home renovations Cape Town"
- "plastering Cape Town"
- "painting contractor Cape Town"
- "tiling Cape Town"
- "paving Cape Town"
- "laminate flooring Cape Town"
- "ceiling installation Cape Town"
- "plumber Cape Town"

Every page has:
- Keyword-rich `<title>` and `<meta description>`
- Proper H1/H2 heading structure
- Descriptive alt text on all images
- Open Graph tags for social sharing
- JSON-LD LocalBusiness structured data
- Auto-generated `sitemap.xml` and `robots.txt`

---

## 8. Contact Details

To update contact information, use the **Admin Panel → Site Content** page.

Default values:
- **Phone:** 066 367 6516
- **WhatsApp:** +27663676516
- **Email:** jobobuildingconstruction@gmail.com
