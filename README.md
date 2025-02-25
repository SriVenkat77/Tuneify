# Tuneify : A Music Streaming Web Application

## Deployed Demo
- **Frontend User:** [Live Demo](https://tuneifya.netlify.app)
- **Backend:** [Live API](https://tuneify-pbc9.onrender.com)

## Introduction:

**Objective:** The goal of this project is to provide users with a music streaming platform where they can sign up, search for songs, view albums, play music and can subscribe to a **Premium Plan via Razorpay** for **ad-free music streaming**. The app also features an admin panel to manage albums, songs and view user data with image uploads handled via Cloudinary.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Cloud Storage:** Cloudinary (for album and song images)
- **Payment Integration:** Razorpay (for Premium subscription)
- **Email:** NodeMailer (for Premium Successful)

## Detailed Feature Walkthrough

### 1. User Registration, Login & Password Reset
**Description:** Secure user authentication for users to register, log in, and reset their password.
**Implementation:**
- **Authentication:** JWT-based user authentication and role management.
- **Registration/Login:** React forms to collect user data. Passwords are hashed with bcrypt before storing in MongoDB.
- **Password Reset:** Send reset links to users' emails via NodeMailer and allow users to update their password.

### 2. Song & Album Viewing and Playback
**Description:** Users can view albums, listen to songs, and explore music collections.
**Implementation:**
- **Song Playback:** Integrated audio player for playing songs directly from the platform.
- **Album Viewing:** Each album can display song lists with images, titles, and descriptions.
- **Search Functionality:** Users can search for songs by title using a dynamic search bar.

### 3. Premium Subscription for Ad-Free Music
**Description:** Users can subscribe to a premium plan to enjoy **ad-free music**.
**Implementation:**
- **Razorpay Integration:** Users can make payments securely via Razorpay.
- **Subscription Management:** After a successful payment, users are marked as **premium members** in the database.
- **Ad-Free Experience:** Premium users enjoy an ad-free interface.

### 4. Admin Panel
**Description:** Admins can manage the platform by adding new albums, songs, and images, as well as viewing user data.
**Implementation:**
- **Album/Song Management:** Admins can upload new albums and songs using forms. Songs can be linked to albums, and each song/album can have associated images stored in Cloudinary.
- **Cloudinary Integration:** Use Cloudinary API to upload and retrieve images for songs and albums.
- **User Data Management:** Admins can view user information, including **subscription status**, email, and registration details.

### 5. Search Functionality
**Description:** Users can search for songs using a dynamic search bar.
**Implementation:**
- **Search API:** Built a search feature using MongoDB query operators to fetch relevant songs from the database.

## Technical Details
### Tech Stack
- **Frontend:** React + Vite with TailwindCSS for responsive, modern design.
- **Backend:** Node.js and Express for building APIs and handling user authentication.
- **Database:** MongoDB for storing user data, albums, and songs.
- **Cloud Storage:** Cloudinary for storing album and song images.
- **Payment:** Razorpay for handling premium subscriptions.
- **Email:** NodeMailer for sending password reset links.

### Repository Structure
- **Frontend:** Contains React components, Redux store, and TailwindCSS configurations for styling.
- **Backend:** Contains Express routes, controllers, and authentication logic.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- **Razorpay** for payment integration.
- **Cloudinary** for image hosting.
- **MongoDB, Express, React, and Node.js** for the foundational technologies.
