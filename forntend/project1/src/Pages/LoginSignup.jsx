import React, { useState } from 'react';
import './CSS/Loginsignup.css';
const LoginSignUp = () => {
  const [mode, setMode] = useState('login'); // Modes: 'login', 'signup', 'forgotPassword'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [resetEmail, setResetEmail] = useState(''); // For "Forgot Password"
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear the previous error message before submitting again
    try{
        if (mode === 'signup') {
          await handleSignUp();
          } else if (mode === 'login') {
            await handleLogin();
        }
    } catch(error){
        setError(error.message);
      console.error("Error during form submission:", error);
    }
  };
  const handleSignUp = async () => {
          try{
                const response = await fetch('http://localhost:4000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: formData.name,
                       email: formData.email,
                      password: formData.password,
                  }),
                });
            if(!response.ok){
                 const message = `HTTP error! status: ${response.status}`;
                throw new Error(message);
            }
                const data = await response.json();

                if(data.success){
                       alert('Signup Successfull!! Please Login with your credentials.');
                       setMode('login')
                  }else{
                        if (data.errors === 'existing'){
                                throw new Error('Email already registered!!');
                             }
                    }
           }
        catch(error){
            setError(`Failed to Sign up, Message: ${error.message}`);
        }
   };
  const handleLogin = async () => {
     try {
         const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
          if (!response.ok) {
               const message = `HTTP error! status: ${response.status}`;
             throw new Error(message);
            }
             const data = await response.json();
            if (data.success) {
               alert('Login Successful !!');
                  // You can add redirection logic to the dashboard/home page here
              }
          else {
            throw new Error(data.error || 'Invalid credentials. Please try again');
             }
          }
          catch(error){
            setError(`Login Failed, Message: ${error.message}`);
        }
    };
    // Simulate Forgot Password functionality
   const handleForgotPassword = async () => {
      try {
            const response = await fetch('http://localhost:4000/forgotpassword', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: resetEmail,
              }),
            });
             if(!response.ok){
                const message = `HTTP error! status: ${response.status}`;
                  throw new Error(message);
            }
             const data = await response.json();
              if (data.success) {
                   alert(`A password reset link has been sent to ${resetEmail}.`);
              } else {
                    throw new Error(data.error || 'No account found with this email.');
              }
            } catch (error) {
                  setError(`Reset password failed, message: ${error.message}`);
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