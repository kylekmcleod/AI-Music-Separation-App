import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BrowseSamples from './components/BrowseSamples';
import axios from 'axios';
import Loading from './components/Loading';
import Credits from './components/Credits';
import Profile from './components/Profile';
import Error404 from './components/Error404';
import MySamples from './components/MySamples';
import Track from './components/Track';
import Contact from './components/Contact';

const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current-user', {
          withCredentials: true,
        });
        setCurrentUser(response.data.user);
        console.log('Logged-in User:', response.data.user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sign-in" element={currentUser ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/sign-up" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/browse-samples" element={<BrowseSamples />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-samples" element={<MySamples />} />
          <Route path="/track/:id" element={<Track />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(UserContext);
}

export default App;
