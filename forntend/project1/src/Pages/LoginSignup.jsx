import React, { useState } from 'react';
import './CSS/Loginsignup.css';

const LoginSignUp = () => {
  const [mode, setMode] = useState('login'); // Modes: 'login', 'signup', 'forgotPassword'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [resetEmail, setResetEmail] = useState(''); // For "Forgot Password"
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Display success or error messages

  // Handle input changes for signup/login forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'signup') {
      handleSignUp();
    } else if (mode === 'login') {
      handleLogin();
    }
  };

  // Simulate Sign Up
  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setError('An account with this email already exists.');
    } else {
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Sign up successful! Please log in.');
      setMode('login'); // Switch to login after sign-up
    }
  };

  // Simulate Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      setMessage('Login successful! Welcome back.');
      // You can add redirection logic to the dashboard/home page here
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  // Simulate Forgot Password functionality
  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === resetEmail);

    if (user) {
      setMessage(`A password reset link has been sent to ${resetEmail}.`);
    } else {
      setError('No account found with this email.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="login-container">
        {/* Dynamic title based on mode */}
        <h1>{mode === 'signup' ? 'Sign Up' : mode === 'login' ? 'Login' : 'Forgot Password'}</h1>

        {/* Login and Sign Up Form */}
        {mode !== 'forgotPassword' && (
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Error and success messages */}
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}

            <button type="submit" className='button'>{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
          </form>
        )}

        {/* Forgot Password Form */}
        {mode === 'forgotPassword' && (
          <div className="forgot-password">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button onClick={handleForgotPassword}>Reset Password</button>
          </div>
        )}

        {/* Toggle between modes */}
        <p className="login">
          {mode === 'signup' ? (
            <>
              Already have an account? <span onClick={() => setMode('login')}>Login here</span>
            </>
          ) : mode === 'login' ? (
            <>
              Don't have an account? <span onClick={() => setMode('signup')}>Sign up here</span>
              <br />
              <span onClick={() => setMode('forgotPassword')}>Forgot your password?</span>
            </>
          ) : (
            <span onClick={() => setMode('login')}>Back to login</span>
          )}
        </p>

        {/* Checkbox for terms of use in sign up mode */}
        {mode === 'signup' && (
          <div className="login-agree">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
