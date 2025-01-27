import React, { useState } from 'react';
import { SignIn } from './pages/SignIn';
import { Products } from './pages/Products';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <Products onSignOut={handleSignOut} />
  ) : (
    <SignIn onSignIn={handleSignIn} />
  );
}

export default App;