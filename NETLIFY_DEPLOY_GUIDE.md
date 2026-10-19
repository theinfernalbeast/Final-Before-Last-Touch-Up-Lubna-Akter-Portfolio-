# Lubna Akter Portfolio - Deployment & Hosting Guide (Netlify & GitHub)

This modern, high-performance portfolio is built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It is 100% client-side with persistent localStorage management, meaning it requires **zero backend server** and can be deployed in seconds for free!

---

## 🚀 Option 1: Drag-and-Drop Deployment to Netlify (Fastest - No Code Needed)

1. **Build the production folder on your computer:**
   Open your terminal in the project directory and run:
   ```bash
   npm run build
   ```
   *(This creates a ready-to-publish `dist` folder inside the project).*

2. **Deploy to Netlify:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser (log in or sign up with Google/GitHub).
   - Drag and drop the **`dist`** folder directly into the designated area on Netlify.
   - Your website is instantly live with a secure free HTTPS URL!
   - You can assign your own custom domain or change the site name in Netlify's *Site Settings*.

---

## 🌐 Option 2: Connect with GitHub for Automatic Deployments to Netlify (Recommended)

1. **Initialize Git and push to GitHub:**
   In your project directory terminal, run:
   ```bash
   git init
   git add .
   git commit -m "feat: Lubna Akter interactive pharmaceutical portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Open [https://app.netlify.com](https://app.netlify.com) and click **"Add new site" > "Import an existing project"**.
   - Select **GitHub** and authorize your repository.
   - Netlify will automatically detect:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     *(These settings are pre-configured in `netlify.toml`)*
   - Click **Deploy Site**. Every time you push a commit to GitHub, Netlify will rebuild and update your site automatically!

---

## 🐙 Option 3: Deploy to GitHub Pages (One-Command Deployment)

1. **Push your code to your GitHub repository:**
   ```bash
   git add .
   git commit -m "feat: portfolio updates"
   git push origin main
   ```

2. **Deploy to GitHub Pages:**
   Run the pre-configured deployment script:
   ```bash
   npm run deploy
   ```
   *(This builds the app with relative static asset paths via `base: './'` and automatically publishes the `dist` folder to your `gh-pages` branch).*

3. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment > Branch**, select `gh-pages` branch and `/ (root)` folder.
   - Click **Save**. Your portfolio is instantly live at `https://<your-username>.github.io/<repository-name>/`!

---

## 🛠️ Key Features Included:
- **Direct Email Transmission:** Contact messages are automatically delivered directly to `heyitslubnaakter@gmail.com`.
- **Live Content Editor Dashboard:** Click the password-protected icon on the bottom right of the screen (default password: `lubna2026` or change in dashboard) to edit any text, images, research projects, skills, education, or social media links live without writing code.
- **Data Export & Import:** Export your full portfolio content as a `.json` backup file anytime and restore it on any device.
- **WhatsApp Integration:** WhatsApp chat button directs to `+880 1537-720007` (`https://wa.me/8801537720007`).
- **Instagram Integration:** Direct link to `https://www.instagram.com/thisisrufaida`.
- **Google Blogger & Custom Social Links:** Displays Google Blogger and custom channels in the footer.
