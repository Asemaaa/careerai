import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CareerTestPage from './pages/CareerTestPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import DemandedProfessionsPage from './pages/DemandedProfessionsPage.jsx';
import CareerToursPage from './pages/CareerToursPage.jsx';
import BusinessExcursionsPage from './pages/BusinessExcursionsPage.jsx';

/**
 * Root app shell: routes + shared layout (navbar, footer, page background).
 */
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-test" element={<CareerTestPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/demanded" element={<DemandedProfessionsPage />} />
        <Route path="/tours" element={<CareerToursPage />} />
        <Route path="/excursions" element={<BusinessExcursionsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
