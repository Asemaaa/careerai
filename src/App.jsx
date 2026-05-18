import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CareerTestPage from './pages/CareerTestPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import ProfessionsPage from './pages/ProfessionsPage.jsx';
import DemandedProfessionsPage from './pages/DemandedProfessionsPage.jsx';
import UniversitiesPage from './pages/UniversitiesPage.jsx';
import CareerToursPage from './pages/CareerToursPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import BookingPage from './pages/BookingPage.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-test" element={<CareerTestPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/demanded" element={<DemandedProfessionsPage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route path="/tours" element={<CareerToursPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/excursions" element={<Navigate to="/tours" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
