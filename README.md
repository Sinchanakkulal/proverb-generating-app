# proverb-generating-app
📜 Proverb Generator App is a full-stack project built with React (Vite) and FastAPI. It lets users generate random proverbs, add new ones, view all stored proverbs, and delete any. The random proverb is shown in a styled card with large text for readability, while all proverbs are listed below for easy management.


✨ Features
🎲 Random Proverb Generator – Click a button to see a randomly selected proverb.
📝 Add Proverbs – Add new proverbs with an optional author.
🗑️ Delete Proverbs – Remove a proverb from the list.
📂 View All Proverbs – Displays all stored proverbs below the random generator.
🎨 Clean UI – Centered random proverb with a card-style border and large readable text.

🛠️ Tech Stack
Frontend: React.js (Vite)
Backend: FastAPI (Python)
Database: In-memory list (can be extended to SQLite/PostgreSQL)
API Communication: Fetch requests

🚀 Project Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/proverb-generator-app.git
cd proverb-generator-app

2️⃣ Backend Setup (FastAPI)
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload


Backend will run on: http://127.0.0.1:8000

3️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend will run on: http://127.0.0.1:5173

📡 API Endpoints
Method	Endpoint	Description
GET	/proverbs	Fetch all proverbs
GET	/random	Get a random proverb
POST	/proverbs	Add a new proverb
DELETE	/proverbs/{id}	Delete a proverb by ID

🎯 How It Works
On load, the app fetches all proverbs and shows one random proverb.
Users can click the "Get Random" button to generate a new proverb.
Users can add new proverbs with text + author.
All proverbs are listed below, with ❌ buttons to delete them.

📸 UI Preview
Centered proverb card with border
Big font size for better readability
All proverbs listed below in simple format

📝 Future Improvements
Add database (SQLite/PostgreSQL) persistence
Edit proverbs functionality
Categories/tags for proverbs
Dark mode UI
