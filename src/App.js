import './App.css';
import BooksList from './Components/BooksList';
import StudentsList from './Components/StudentsList';
import StudentDetails from './Components/StudentDetails';
import UserList from './Components/UserList';
import Addbook from './Components/AddBook';
import studentData from './DB/studentslist.json';
import bookData from './DB/bookslist.json';
import Navigation from './Components/Common/Navigation';
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
 } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './Components/Common/NotFound';
import Login from './Components/Login';
import Logout from './Components/Logout';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  // Effect hook to update authentication status when sessionStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!sessionStorage.getItem('token'));
    };

    // Listen for changes to sessionStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="text-center">
        <div className="d-flex justify-content-between align-items-center" style={{ padding: '0 15px' }}> 
            <div style={{ flex: 0.07 }}> {/* Empty div for centering the title */}</div>
            <h1 className="mb-3 flex-grow-1 text-center">Library Management</h1>

            {/* Logout button shown only when authenticated */}
            {isAuthenticated && (
                <PrivateRoute><Logout /></PrivateRoute>
            )}
        </div>

        {/* Render Navigation if authenticated */}
        {isAuthenticated && <Navigation />}

        <hr />

        <Routes>
          <Route path="/" element={<Navigate to="/book-list" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path="/book-list" element={<PrivateRoute><BooksList bookData={bookData} /></PrivateRoute>} />
          <Route path="/student-list" element={<PrivateRoute><StudentsList studentData={studentData} /></PrivateRoute>} />
          <Route path="/student-details/:id" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />
          <Route path="/all-students" element={<PrivateRoute><StudentsList studentData={studentData} /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute><Addbook /></PrivateRoute>} />
          <Route path="/user-list" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
