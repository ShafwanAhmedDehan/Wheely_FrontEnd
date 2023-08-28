import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      console.log('i am locatl');
    }
  }, []);

  const login = (phoneNo, cookie, id) => {
    const newUser = { phoneNo, cookie, id };
    setUser(newUser);

    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user', 'filename');
    localStorage.removeItem('filename');
    TriggerLogout();
  };

 

  async function TriggerLogout() {
    try {
      const response = await axios.post('http://localhost:3000/Passenger/Logout',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      console.log(response)
        setUser(null);
        document.cookie = null;

        router.push('/');
      

    } catch (error) {
      console.error('error failed: ', error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);