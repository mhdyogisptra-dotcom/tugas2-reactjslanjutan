import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GenreAdmin from './components/GenreAdmin.jsx';
import AuthorAdmin from './components/AuthorAdmin.jsx';
import './App.css';  

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', backgroundColor: '#343a40', color: 'white' }}>
          <h1>Admin Panel</h1>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li><Link to="/genres" style={{ color: 'white', textDecoration: 'none' }}>Manage Genres</Link></li>
            <li><Link to="/authors" style={{ color: 'white', textDecoration: 'none' }}>Manage Authors</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/genres" element={<GenreAdmin />} />
          <Route path="/authors" element={<AuthorAdmin />} />
          <Route path="/" element={<h2>Welcome to Admin Panel</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;