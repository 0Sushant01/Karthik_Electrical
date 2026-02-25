# Vishal Electric - Shop Management System

A full-stack internal record management system for Vishal Electric.

## Tech Stack
- **Backend:** Django + Django REST Framework
- **Database:** SQLite
- **Frontend:** React (Vite + JavaScript)
- **Icons:** Lucide-React
- **API:** Axios

---

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Project Structure
- `backend/`: Django project with apps for customers, products, services, sales, and bookings.
- `frontend/`: React application with dashboard and management pages.
