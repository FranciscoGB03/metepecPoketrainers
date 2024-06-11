// src/components/Login.js
import { useState } from 'react';
import useAxiosBack from '../../hooks/useAxiosBack';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, sendRequest } = useAxiosBack();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest('POST', '/login', { email, password });
        if (data.data) {
            const { token, permissions } = data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('permissions', JSON.stringify(permissions));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                //type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
