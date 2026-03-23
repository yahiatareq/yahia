import React, { useState } from 'react';

const PinAuth = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setPin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        if (pin === '1234') { // Replace with your actual PIN check
            console.log('Authentication successful');
            // proceed to next step
        } else {
            setError('Invalid PIN. Please try again.');
        }
    };

    return (
        <div>
            <h2>PIN Authentication</h2>
            <form onSubmit={handleSubmit}>
                <input
type="password"
                    value={pin}
                    onChange={handleChange}
                    placeholder="Enter your PIN"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default PinAuth;
