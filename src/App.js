import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppContext } from './context/appContext';
// import { Navbar } from './components';
import './css/main.css'

import { Home, Login, Profile, Video, AddVideo, ProtectedRoute, Subscriptions } from './pages';

function App() {

  // const { user } = useAppContext()
  // if(!user) {
  //   return <Navigate to='/home' />
  // }
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        <Route path="video">
          <Route path=":id" element={<Video />} />
        </Route>
        <Route
          path='/add-video'
          element={
            <ProtectedRoute>
              <AddVideo />
            </ProtectedRoute>
          } />
        <Route
          path='/subscriptions'
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          } />


        {/* </Route> */}
      </Routes>
    </BrowserRouter >
  );
}

export default App;
