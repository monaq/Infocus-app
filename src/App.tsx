// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SavedPage from './pages/SavePage';
import CardDetailPage from './pages/CardDetailPage';
import GeneratePage from './pages/GeneratePage';
import Login from './pages/Login';
// import SettingsPage from './pages/SettingsPage'; // MVP에서는 생략

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/card/:id" element={<CardDetailPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;