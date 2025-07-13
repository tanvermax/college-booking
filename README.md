# 🎓 College Booking Web Application

A full-stack MERN (MongoDB, Express, React [Next.js], Node.js) application that enables users to browse, search, and book college services through a responsive and user-friendly interface. The platform includes authentication, college profiles, admission forms, research and event showcases, and a personalized user dashboard.

---
live link :[college-boking](https://college-booking-sable.vercel.app/)

## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Routes](#-routes)
- [Examples](#-examples)
- [Authentication](#-authentication)
- [Responsive Design](#-responsive-design)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 📖 Introduction

This project is built to facilitate college service booking through an intuitive interface. It allows users to explore various colleges, view detailed information, submit admission forms, and provide feedback. Admin-level functionalities like profile editing, user-specific data storage, and dynamic data rendering ensure a seamless experience.

---

## ✨ Features

- 🔍 College search and dynamic card rendering
- 🏫 College profile pages with events, research, sports, and more
- 📝 Admission form submission and tracking
- 🖼 College gallery and research publication display
- ⭐ Review & rating system with real-time updates
- 👤 User profile with editable data
- 🔐 Authentication with Email, Google, Social Login
- 📱 Fully responsive design
- ❌ Creative 404 page

---

## 🛠 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase/Auth or Auth0 (Google & Social Login)
- **Deployment**: Vercel / Firebase Hosting / Netlify

---

## 📥 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/college-booking-app.git

# Navigate to project directory
cd college-booking-app

# Install client dependencies
npm install

# Setup server directory (if separated)
cd server
npm install
```

---

## ⚙️ Configuration

Create `.env.local` files in both frontend and backend as necessary.

### `.env.local` (Frontend Example)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### `.env` (Backend Example)

```
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Usage

```bash
# Start the frontend
npm run dev

# Start the backend (from /server)
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Routes

### Main Navigation

- `/` - Home page with college cards, gallery, research papers, reviews
- `/colleges` - List of all colleges with detailed view
- `/admission` - Admission form for specific college
- `/my-college` - View user’s submitted admission info and review form
- `/profile` - User’s profile info with edit capability
- `/login`, `/register` - Authentication routes
- `*` - 404 Route for unmatched paths

### Home Page Sections

- 🔍 **Search Bar**: Search colleges by name
- 🏫 **College Cards**: Featured 3 colleges with image, admission dates, events, sports, research, and details button
- 🖼 **Image Gallery**: Graduate group pictures from colleges
- 📄 **Research Papers**: Recommended college publications
- ⭐ **Review Section**: Real user feedback and ratings

---

## 💡 Examples

### College Card

- 📷 College Image  
- 🎓 College Name  
- 📅 Admission Dates  
- 📚 Research Count  
- 🏅 Events & Sports  
- 🔘 Details Button → `/colleges/:id`

### Admission Form

Fields:
- Candidate Name
- Subject
- Candidate Email
- Phone Number
- Address
- Date of Birth
- Upload Image
- Submit Button

Data will be saved and shown in `My College` route.

---

## 🔐 Authentication

Implemented with Firebase/Auth (or similar) using:

- 📧 Email & Password
- 🔐 Google Login
- 🌐 Social Media Login

Features:
- ✅ Register/Login/Logout
- 🔁 Password Reset
- 🔒 Private Routes (can’t view college details or reviews unless logged in)
- 👤 Display logged-in user’s profile name in navbar
- 🧑‍💼 Editable user profile (name, email, university, address)

---

## 📱 Responsive Design

Designed with **Tailwind CSS** to ensure the app is responsive on:

- 🖥 Desktop
- 📱 Mobile
- 💻 Tablet

---

## 🚢 Deployment

You can deploy your project using:

- **Frontend**: [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- **Backend**: [Render](https://render.com) / [Heroku](https://heroku.com)
- **Authentication & Hosting**: Firebase

---

## 🛠 Troubleshooting

| Issue                            | Solution                                      |
|----------------------------------|-----------------------------------------------|
| ❌ CORS Errors                    | Enable CORS in backend using middleware        |
| 🚫 MongoDB Connection Error      | Verify `.env` settings and MongoDB credentials |
| 🔐 Auth Not Working              | Check Firebase/Auth setup and credentials      |
| 💅 Tailwind Not Working          | Verify `tailwind.config.js` and CSS import     |
| 🔌 API Not Connecting            | Ensure server is running and API URL is correct|

---

## 👥 Contributors

- **shafayet hossain tanveer** – MERN Stack Developer

Want to contribute? Fork the repo and submit a PR!

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).
