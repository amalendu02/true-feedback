# True Feedback – Anonymous Messaging Platform

## Problem Statement

In many environments—educational, personal, or corporate—people hesitate to share honest feedback due to fear of judgment or exposure. Most platforms require sender registration or compromise anonymity. True Feedback solves this by enabling users to receive messages via unique links without needing to know the sender, ensuring complete anonymity and privacy.

---

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Shadcn/ui, React Hook Form  
- Backend: Next.js API Routes, MongoDB with Mongoose, Zod for validation  
- Authentication: NextAuth/Auth.js with Email OTP  
- Email Service: Resend (for sending OTPs)  
- Validation & Testing: Zod, Postman  
- Extras: Debouncing, Aggregation Pipeline, Carousel, AI Features (Experimental)

---

## Challenging Parts

- Implementing secure OTP-based login and unique username checks using Auth.js and MongoDB.
- Designing clean, accessible UI components with Shadcn/ui while handling edge cases and form validations.
- Building a flexible message aggregation system using MongoDB's aggregation pipeline.
- Managing complex state and UI updates across components like carousel, dashboards, and OTP forms.

---

## Project Workflow & Logic

1. User Signup/Login: Users sign up with their email. OTP is sent via Resend and verified with NextAuth.
2. Unique Link Generation: After verification, each user gets a unique ID or link to receive messages.
3. Anonymous Message Sending: Anyone can send messages through this link without login or identity.
4. Dashboard View: Logged-in users can view received messages on their personal dashboard.
5. Validation & Error Handling: Input fields are validated with Zod, and forms are built with React Hook Form.
6. Additional Features: AI integration (optional), Carousel UI, and real-time debounced username checks.

---

## Future Improvements

- Add optional login for anonymous message senders for richer message context.
- Implement spam protection and rate limiting to avoid abuse.
- Enable message replies while maintaining anonymity.
- Add analytics/dashboard to track message trends or sentiment.
- Improve mobile UI/UX and animation experience with Framer Motion or Shadcn extensions.

---

## Key Functionalities Implemented

- OTP-based authentication using NextAuth/Auth.js
- Message API using MongoDB aggregation pipeline
- Custom username registration with debounced validation
- Anonymous message sending and tracking
- Responsive, clean UI with Shadcn, Tailwind, and reusable components
- Testing APIs with Postman
- Integrating AI responses (optional experiment)
- Built and debugged complex UI flows like Carousel and Dashboard

---

## What I Learned

- Deep understanding of Next.js app routing, API handling, and server-client separation.
- Authentication flow with NextAuth, including custom OTP handling.
- Input validation using Zod, and managing complex form states with React Hook Form.
- Designing full-stack features from database schema to frontend rendering.
- Debugging real-world UI/UX issues and building a production-ready app.
