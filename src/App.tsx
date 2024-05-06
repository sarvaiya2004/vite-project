import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login';
import RegistrationForm from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} /> 
      </Routes>
    </Router>
  );
};

export default App;
