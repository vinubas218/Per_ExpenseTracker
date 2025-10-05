Project Overview:

The Personal Expense Tracker is a full-stack web application designed to help users efficiently manage and track their daily expenses. Users can add, delete, and categorize expenses, as well as add notes for each entry. The application features a responsive and intuitive frontend built with React.js, while the backend is powered by Node.js, Express, and MongoDB for data storage and API handling.

Key Features:

1. Add, edit, and delete expense records.

2. Categorize expenses for easy tracking (e.g., Food, Travel, Utilities).

3. Add notes to each expense for detailed descriptions.

4. Responsive user interface for seamless experience on desktop and mobile devices.

5. Backend API to store and retrieve expenses in a MongoDB database.

6. Full-stack integration with REST API communication between frontend and backend.


How to Run the Project:

Backend:

1. Navigate to the backend folder in your project directory.

Install dependencies by running:

npm install


2. Start the backend server:

npm start


3. By default, the server runs at: (https://per-expensetracker.onrender.com).

Frontend:

1. Navigate to the expensetrack folder in your project directory.

Install dependencies:

npm install


2. Start the frontend development server:

npm start


3. The frontend runs at: (https://expensetrack.onrender.com).



Deployed Versions (Live URLs):

Backend: https://per-expensetracker.onrender.com

Frontend: https://expensetrack.onrender.com


Technical Design and Architecture:

Backend:

1. Node.js + Express for server-side development.

2. MongoDB for database management and storage of expense data.

3. RESTful API endpoints for CRUD operations on expense data.

Frontend:

1. React.js for building a responsive, component-based user interface.

2. Communicates with backend APIs to fetch, add, and delete expense data.

3. Organized folder structure: src for components, public for static assets.



Workflow:

1. User interacts with the frontend UI.

2. Frontend sends API requests to the backend server.

3. Backend performs necessary CRUD operations on the MongoDB database.

4. Response is sent back to the frontend to update the UI in real-time.



Assumptions:

1. Users will manually enter the date, amount, category, and notes for each expense.

2. User authentication is not implemented in this version.

3. All expense data is stored in MongoDB and accessible via backend API endpoints.

