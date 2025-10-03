# Multi-Language Authentication System

A full-stack application with NestJS backend and Next.js frontend featuring multi-language support.

## Project Structure

```
├── backend/          # NestJS API with Prisma ORM
├── frontend/         # Next.js multi-language app
└── README.md
```

## Features

### Backend
- NestJS with TypeScript
- Prisma ORM with SQLite
- Authentication endpoints: `/auth/login`, `/auth/register`
- Password hashing with bcrypt
- Input validation

### Frontend
- Next.js 14 with App Router
- Multi-language support (English/Romanian)
- Language persistence in localStorage
- Responsive design

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```
Backend runs on `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

## API Endpoints

### POST /auth/register
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```
Response: `{"id": 1}`

### POST /auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response: `{"id": 1, "email": "user@example.com", "name": "John Doe"}`

## Frontend Pages

- **Home**: `/en` or `/ro`
- **About**: `/en/about` or `/ro/about`
- **Login**: `/en/login` or `/ro/login`
- **Register**: `/en/register` or `/ro/register`
- Language switching via header buttons
- Language preference persists across sessions
- Authentication state management with localStorage

## Testing

### Backend
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Frontend
1. Open `http://localhost:3000`
2. Test language switching
3. Navigate between pages
4. Verify language persistence

## Requirements Met

✅ **Backend**: NestJS + Prisma + SQLite + Auth endpoints  
✅ **Frontend**: Next.js + Multi-language (ro, en) + Language switching  
✅ **Authentication**: Login/Register pages with form validation  
✅ **User Management**: Authentication state with localStorage  
✅ **No external i18n packages**: Custom translation system  
✅ **JSON translation files**: `en/translations.json`, `ro/translations.json`  
✅ **Language persistence**: localStorage  
✅ **Complete documentation**: This README