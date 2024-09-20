import React, { useState } from "react";
import './newletter.css';

const Newletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            alert(`Subscribed with email: ${email}`); // Replace with your subscription logic
            setEmail(''); // Clear the input after subscribing
        } else {
            alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleSubscribe}>Subscribe</button>
            </div>
        </div>
    );
}

export default Newletter;
