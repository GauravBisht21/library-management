import React, { useRef } from 'react';

const User = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(`Email: ${email}, Password: ${password}`);
    }

    return (
        <div>
            <h2>User Component</h2>
            <div>
                <label>Email:</label>
                <input type="text" ref={emailRef} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" ref={passwordRef} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default User;