import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement login (set JWT token)
    
    // Example login logic
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // Simulate authentication 
    if (email === 'test@example.com' && password === 'password') {
      // On successful login, store JWT token and redirect to Home
      localStorage.setItem('token', 'your-jwt-token');
      
      history.push('/');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
