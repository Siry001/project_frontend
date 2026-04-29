import { Routes, Route } from 'react-router-dom';
import MarketingPage from './pages/MarketingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MarketingPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<ProtectedRoutes />} >
          <Route path='/dashboard' element={<Dashboard />}>
            {/* <Route path='/workout' element={<Workout />} />
            <Route path='/diet' element={<Diet />} />
            <Route path='/settings' element={<Settings />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
