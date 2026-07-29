# Emma Backend

A Node.js/Express backend service for file uploads and certification management with Supabase integration.

## Features

- File upload handling for avatars and certifications
- JWT authentication and verification
- Supabase storage integration
- CORS enabled for cross-origin requests
- Express.js REST API

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your environment variables:
   ```
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints

### Upload Routes (`/upload`)
- `POST /upload/avatar` - Upload user avatar image

### Certification Routes (`/certification`)
- `POST /certification` - Upload certification file
- `GET /certification/ping` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `SUPABASE_JWT_SECRET` - JWT secret for token verification

## Dependencies

- express
- express-fileupload
- cors
- dotenv
- @supabase/supabase-js
- jose (for JWT verification) 