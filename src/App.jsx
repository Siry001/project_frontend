import { Routes, Route } from 'react-router-dom';
import MarketingPage from './pages/MarketingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MarketingPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<ProtectedRoutes />} >
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
