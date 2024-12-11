# Job Application Tracker

## Project Overview
The **Job Application Tracker** is a full-stack web application designed to help users manage and track their job applications efficiently. It allows users to create, edit, delete, and filter job entries, providing a comprehensive view of their job search progress. The application features a dynamic dashboard with sorting, searching, and filtering capabilities, as well as an intuitive user interface styled with Tailwind CSS.

The project is built using the **MERN stack** (MongoDB, Express, React, Node.js), ensuring a modern and scalable architecture for managing data and user interactions.

---

## Steps to Set Up and Run the Application Locally

### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your system. [Download here](https://nodejs.org/).
2. **MongoDB**: Install and set up MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Naveen-gn/Job-Application-Tracker
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server should now be running on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application should now be accessible at `http://localhost:5173/`.

---

## Features Implemented

### 1. **Job Management**
   - **Add New Job**: Users can add job details such as title, company, status, date applied, and notes through a modal popup.
   - **Edit Job**: Users can modify existing job entries using an intuitive edit modal.
   - **Delete Job**: Easily delete job entries directly from the dashboard.

### 2. **Filtering and Sorting**
   - **Search**: Filter jobs by title or company name using a search bar.
   - **Status Filter**: Filter jobs by status (e.g., Applied, Interviewing, Offered, Rejected).
   - **Sorting**: Sort jobs by title, company, or date applied.

### 3. **Dynamic Dashboard**
   - Displays job entries in a tabular format with a user-friendly design.
   - Shows a message when no jobs match the current filters (e.g., "There is no jobs found").

### 4. **Loading Indicators**
   - Displays a loading spinner during API calls to improve user experience.

### 5. **Responsive Design**
   - Fully styled with **Tailwind CSS** to ensure a clean, responsive layout across devices.

### 6. **Interactive Chart**:
   - Pie chart displaying the distribution of job application statuses.
   - Automatically updates based on the current job data.

---

## Future Enhancements
- User authentication to allow personalized dashboards.
- Advanced analytics to visualize job application progress.
- Integration with external APIs (e.g., LinkedIn) to import job applications directly.

---

## Contribution Guidelines
Contributions are welcome! Please fork the repository and create a pull request with detailed information about the changes made.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Acknowledgments
Special thanks to the open-source community for providing the tools and libraries used in this project.

