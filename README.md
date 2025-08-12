Virtual Event Management Backend (single-file)
File: virtual-event-backend.js

Features:
- In-memory storage for users and events (arrays/objects)
- User registration/login with bcrypt and JWT
- Roles: organizer | attendee
- CRUD endpoints for events (organizers only for create/update/delete)
- Event registration endpoint for attendees
- Sends email on successful registration via nodemailer (async/await)
- Simple validation and error handling

Run instructions (see README section at bottom):
1. Create project folder and save this file as virtual-event-backend.js
2. npm init -y
3. npm i express bcrypt jsonwebtoken nodemailer uuid dotenv body-parser
4. Create a .env file with JWT_SECRET and SMTP settings (example below)
5. node virtual-event-backend.js

Notes:
- This is for demo / learning purposes. In production, use a proper DB, stronger validation, rate-limiting, HTTPS, secure cookie handling and refresh tokens.
*/