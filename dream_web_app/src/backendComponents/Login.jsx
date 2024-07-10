import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({showSignup}) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        phone_number: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem('token', responseData)
                navigate('/profile')
            } else {
                console.error('Login failed:', responseData.msg)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    };

    return (
        <div className='gc__login-container' >
            <div className='gc__login-form-container' >
                <form onSubmit={handleSubmit}>
                    <input type='phone_number' name='phone_number' placeholder='enter phone number' value={data.phone_number} onChange={handleChange} required />
                    <input type='password' name='password' placeholder='enter password' value={data.password} onChange={handleChange} required />
                    <button type='submit'>Log in?</button>
                </form>
            </div>
            <div className='gc__login-link-container' >
                <p>I do not have an account? <button onClick={showSignup} >Create new account</button></p>
            </div>
        </div>
    )
};

export default Login;