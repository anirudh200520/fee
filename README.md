# Quevo

> A modern job portal built with Next.js, enabling seamless job posting, searching, and application management.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://job-portal-teal.vercel.app)

## 🚀 Features

### For Job Seekers
- Browse and search jobs by category
- Bookmark favorite job listings
- Apply to jobs with CV upload
- Track application status in real-time
- Dashboard to manage bookmarked and applied jobs

### For Employers
- Post job listings with detailed requirements
- View and manage all applications
- Accept or reject candidates
- Download applicant CVs
- Track all posted jobs in one place

### Authentication & Security
- Secure user registration and login
- Password recovery system
- JWT-based authentication
- Protected API routes

## 🛠️ Tech Stack

- **Framework:** Next.js 13
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Database:** SQLite (local), MongoDB (production)
- **Data Fetching:** SWR
- **Validation:** Joi
- **Authentication:** JWT

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/anirudh200520/fee.git

# Navigate to project directory
cd Job-Portal

# Install dependencies
npm install

# Set up environment variables (see below)

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
DB_URI=your_mongodb_connection_string
JWT_SECREAT=your_jwt_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## 📦 Database

This project uses SQLite for local development and MongoDB for production. The database automatically initializes on first run.

**Note:** CV upload/download features work only in local environments due to Vercel's read-only filesystem. For production, integrate cloud storage (AWS S3, Firebase Storage, etc.).

## 👨‍💻 Author

**Anirudh Sharma**  
GitHub: [@anirudh200520](https://github.com/anirudh200520)

## 📄 License

This project is open source and available under the MIT License.

---

⭐ Star this repository if you find it helpful!






