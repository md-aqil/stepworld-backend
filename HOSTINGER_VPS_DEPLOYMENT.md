# Hostinger VPS Docker Deployment Guide for StepWorld

This guide explains how to deploy the StepWorld application onto your Hostinger VPS using Docker and connect your domains (`stepworldeducation.com`, `stepworldeducation.in`, etc.).

---

## Architecture Overview
- **App Service (`stepworld-app`)**: Node.js + Express backend serving API endpoints and the compiled React SPA.
- **Database (`stepworld-db`)**: PostgreSQL 16 with persistent volume.
- **Reverse Proxy (`stepworld-proxy`)**: Caddy web server listening on ports `80` and `443`, automatically issuing and renewing free Let's Encrypt SSL/HTTPS certificates for your domains.

---

## Method 1: Deploy via SSH / Terminal (Recommended - 2 Minutes)

1. **Log in to your Hostinger VPS via SSH:**
   From your Hostinger VPS dashboard ([https://hpanel.hostinger.com/vps/1602171](https://hpanel.hostinger.com/vps/1602171)), copy your **VPS IP address** and SSH login details, or click **"Browser Terminal"**.
   ```bash
   ssh root@<YOUR_VPS_IP>
   ```

2. **Clone the StepWorld repository:**
   ```bash
   git clone https://github.com/md-aqil/stepworld-backend.git /var/www/stepworld
   cd /var/www/stepworld
   ```

3. **Deploy with Docker Compose:**
   ```bash
   docker compose up -d --build
   ```

4. **Verify running containers:**
   ```bash
   docker compose ps
   ```
   You should see `stepworld-app`, `stepworld-db`, and `stepworld-proxy` running.

5. **Future updates:**
   Whenever you push new code to GitHub, simply run on your VPS:
   ```bash
   cd /var/www/stepworld
   ./deploy.sh
   ```

---

## Method 2: Deploy via Hostinger Docker Manager UI

If using the Docker Manager interface at [https://hpanel.hostinger.com/vps/1602171/docker-manager](https://hpanel.hostinger.com/vps/1602171/docker-manager):

1. Click **"Create Compose Application"** or **"Add Application"**.
2. Give it the name `stepworld`.
3. Provide the GitHub repository URL:
   `https://github.com/md-aqil/stepworld-backend.git`
4. Or paste the contents of `docker-compose.yml`.
5. Click **Deploy**.

---

## Connecting Your StepWorld Domains

You own the following domains in your Hostinger account:
- `stepworldeducation.com`
- `stepworldeducation.in`
- `stepworldeducation.org`
- `stepworldeducation.online`

### Setting up the DNS Records:
1. In Hostinger hPanel, go to **Domains** &rarr; Select your domain (e.g., `stepworldeducation.com`) &rarr; **DNS / Nameservers**.
2. Locate or add the **A Records**:
   | Type | Name / Host | Value / Points to | TTL |
   |------|-------------|-------------------|-----|
   | **A** | `@` | `<YOUR_VPS_IP>` | 300 / Default |
   | **A** | `www` | `<YOUR_VPS_IP>` | 300 / Default |
3. Repeat for any other domain (e.g. `stepworldeducation.in`) you want to route to the site.

Once DNS propagates (usually 5 to 15 minutes), Caddy will automatically provision an SSL HTTPS certificate for your domain.
