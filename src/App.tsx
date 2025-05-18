import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';

import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import Wishlists from './pages/wishlist/Wishlists';
import WishlistDetail from './pages/wishlist/WishlistDetail';
import Recommendations from './pages/wishlist/Recommendations';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<EditProfile />} />
                <Route path="wishlists" element={<Wishlists />} />
                <Route path="wishlists/:id" element={<WishlistDetail />} />
                <Route path="recommendations" element={<Recommendations />} />
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;