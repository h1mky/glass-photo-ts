## Glass Photo — React Photo Sharing App

Glass Photo is a modern, responsive photo-sharing web application built with React and TypeScript. It supports user registration, login, profile management, image uploads, and public post viewing with commenting functionality.

---

## 🚀 Features

- 🔐 User authentication (Sign up / Sign in / Logout)
- 👤 Public and private user profiles
- 🖼️ Upload and preview photo posts
- 💬 Commenting on photos
- 🧾 Edit profile bio and avatar
- 🌐 Responsive design (React + MUI)
- 🔄 Real-time UI updates with React Query
- 📁 Drag-and-drop or manual file upload

---

## 🧰 Technologies Used

- **React** with **TypeScript**
- **React Router v6** for routing
- **Redux Toolkit** for user state
- **React Query (TanStack Query)** for async data management
- **Formik + Yup** for form state and validation
- **Axios** with interceptor for authenticated API requests
- **Supabase** for file (image) uploads
- **Material UI** for notifications and avatar components
- **react-spinners** for loading indicators

---

## 📦 Installation

```bash
git clone https://github.com/h1mky/glass-photo-ts.git
cd glass-photo-ts
npm install
npm run dev
```

## 🛡️ Authentication

- **JWT token** is stored in localStorage
- **Axios** interceptor automatically adds Authorization: Bearer token to each request
- Authenticated users can:

  - Edit their profile

- Upload photos

-Leave comments

---

## 🛠️ Future Improvements

- Image optimization & thumbnail generatio
- Like and save posts functionality
- Infinite scroll or pagination for posts
- Unit tests with React Testing Library
- User search and discovery features

---
