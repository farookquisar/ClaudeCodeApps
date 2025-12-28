import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssetRegister from './pages/AssetRegister';
import Transfer from './pages/Transfer';
import Disposal from './pages/Disposal';
import Pricing from './pages/Pricing';
import Tasks from './pages/Tasks';
import Maintenance from './pages/Maintenance';
import Contracts from './pages/Contracts';
import Members from './pages/Members';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<AssetRegister />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/disposal" element={<Disposal />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
