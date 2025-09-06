import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FileViewer from './components/FileViewer';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/file/:fileId" element={<FileViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
