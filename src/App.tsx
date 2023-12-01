import { motion, AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './screens/Home';
import WAM from './screens/Wam';
import GPA from './screens/Gpa';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="relative mt-12 flex justify-center pt-12">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/wam" element={<WAM />} />
          <Route path="/gpa" element={<GPA />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
