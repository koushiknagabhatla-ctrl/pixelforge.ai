# ⚒️ Pixel Forge AI: Next-Gen Image Engineering

![Pixel Forge Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)

> **Empowering architects of the digital age with elite-grade AI image processing capabilities.**

Pixel Forge AI is a high-performance, full-stack platform designed for rapid image enhancement, high-fidelity upscaling, and professional-grade background removal. Built with a focus on precision and performance, it provides a seamless interface for computational image engineering.

---

## 🌟 Vision & Purpose

Pixel Forge was built to bridge the gap between complex AI models and creative workflows. Whether you are a designer, developer, or digital architect, Pixel Forge provides the "foundry" to refine your visual assets with zero friction.

### Why Pixel Forge?
*   **Mission Critical Reliability**: Designed for stable, high-throughput image processing.
*   **Neural Path Symmetry**: Algorithms that reconstruct structural integrity rather than just pixels.
*   **Zero-Trust Security**: Isolated workflows for maximum data privacy.
*   **Premium Foundry Experience**: A sleek, dark-mode interface built for deep focus.

---

## 🚀 Key Features

*   **✨ Advanced Image Enhancement**: Revitalize low-quality images with proprietary forge networks.
*   **🔍 High-End Upscaling**: Upscale assets up to 4x while maintaining sharp, realistic details.
*   **🎭 Professional BG Removal**: Clean, high-precision background extraction in seconds.
*   **🤖 Forge Assistant (Chatbot)**: An integrated AI assistant powered by OpenAI to guide your workflows.
*   **📜 Records Ledger**: A comprehensive history of all your forged assets for easy retrieval.

---

## 🛠️ Technical Specifications

### Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **Database/Auth** | Supabase (PostgreSQL + GoTrue) |
| **AI Infrastructure** | Replicate API (Real-ESRGAN, Rembg), OpenAI (GPT-4) |
| **Storage** | Cloudinary (High-Performance CDN) |

### System Requirements
*   **Node.js**: v18.0.0 or higher
*   **Python**: v3.10 or higher
*   **Package Manager**: npm or yarn
*   **OS**: Windows, macOS, or Linux

---

## 🔑 API Configuration & Tokens

To run the "foundry" at full capacity, you need to configure the following environment variables.

### Integrated APIs
*   **Supabase**: Handles your identity and ledger records.
*   **Replicate**: The core "engine" for image processing.
*   **OpenAI**: Powers the Forge AI Chatbot.
*   **Cloudinary**: Hosts your transformed assets on a global CDN.

### 🪙 Unlimited Tokens Concept
Pixel Forge operates on a **Foundry Credits** system. In your local environment, you have access to "Unlimited Tokens" logic by ensuring your API keys are correctly configured in both the `frontend/.env` and `backend/.env` files. This allows you to forge assets without artificial platform-level restrictions.

---

## ⚙️ Installation & Setup

### 1. Clone the Foundry
```bash
git clone https://github.com/koushiknagabhatla-ctrl/pixelforge-ai.git
cd pixelforge-ai
```

### 2. Configure Environment Variables

**Backend (`/backend/.env`):**
```env
REPLICATE_API_TOKEN=your_token
OPENAI_API_KEY=your_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
SUPABASE_URL=your_url
SUPABASE_SERVICE_KEY=your_service_key
```

**Frontend (`/frontend/.env`):**
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:8000
```

### 3. Initialize Commands

**Backend Installation:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Or `.venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

**Frontend Installation:**
```bash
cd ../frontend
npm install
```

---

## ⚡ How to Run Locally

### Automatic Start (Windows Only)
Simply double-click the `start_pixelforge.bat` file in the root directory. This will initialize both servers simultaneously.

### Manual Start

**Start Backend Engine:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Start Frontend Console:**
```bash
cd frontend
npm run dev
```

The application will be accessible at **`http://localhost:5173`**.

---

## 📂 Project Structure

```text
pixelforge-ai/
├── backend/            # FastAPI Server & AI Logic
│   ├── main.py         # Entry point
│   └── .env            # Private keys
├── frontend/           # React App & UI
│   ├── src/            # Source code
│   └── .env            # Public keys
├── supabase/           # SQL Schemas
└── start_pixelforge.bat # Quick-start shortcut
```

---

## 🌐 Deployment Guide

To deploy Pixel Forge AI to production, we recommend a split-deployment strategy for maximum performance and stability.

### 1. Frontend (Vercel)
Vercel is the optimal choice for the React frontend.
1.  Connect your GitHub repository to [Vercel](https://vercel.com).
2.  Set the **Root Directory** to `frontend`.
3.  Configure **Environment Variables**:
    *   `VITE_SUPABASE_URL`: Your production Supabase URL.
    *   `VITE_SUPABASE_ANON_KEY`: Your production Supabase Anon Key.
    *   `VITE_API_URL`: The URL of your deployed backend (see below).
4.  Deploy! The included `vercel.json` will handle SPA routing automatically.

### 2. Backend (Render / Railway)
Standard Python servers perform better on Render or Railway than on serverless functions.
1.  Connect your GitHub repository to [Render](https://render.com).
2.  Create a new **Web Service**.
3.  Set the **Root Directory** to `backend`.
4.  **Runtime**: Python.
5.  **Build Command**: `pip install -r requirements.txt`.
6.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`. (The included `Procfile` already contains this).
7.  Configure **Environment Variables**:
    *   Add all keys from your local `backend/.env` to the Render Dashboard.
8.  Deploy! Once live, copy the URL and paste it into the frontend's `VITE_API_URL`.

---

> [!TIP]
> **Pro Tip**: For the best experience, use high-resolution source images. The Forge AI performs best when it has a clear structural baseline to work from.

Developed with ❤️ by **Koushik**
