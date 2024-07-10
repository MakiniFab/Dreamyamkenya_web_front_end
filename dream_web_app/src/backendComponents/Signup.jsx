import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(){
    const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    phone_number: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch ('http://127.0.0.1:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const info = await response.json();
        console.log("sign up successfull!")
        console.log(info)
        navigate('/profile')
        
      }
      catch (error) {
        console.error('Error:', error)
      }
  }

  return (
    <div className='gc__signup-container' >
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Enter username" value={data.username} onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Enter phone number" value={data.phone_number} onChange={handleChange} />
        <input type="password" name="password" placeholder="Enter password" value={data.password} onChange={handleChange} required />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Signup;