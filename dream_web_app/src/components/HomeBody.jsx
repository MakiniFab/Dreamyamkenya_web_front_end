import {useState} from 'react';
import './components.css'
import Login from "../backendComponents/Login";
import Signup from "../backendComponents/Signup";

function HomeBody() {
    const [signUpVisible, setSignUpVisible] = useState(false)
    const [loginVisible, setLoginVisible] = useState(true)

    function showSignup() {
        setSignUpVisible(!signUpVisible)
        setLoginVisible(!loginVisible)
    }

    return (
        <div className="gc__main-container" >
            <div className="gc__main-header-container" >
                <div>
                <h2>CaptaiN</h2>
                </div>
                <div>
                    <button onClick={showSignup} >
                        {signUpVisible ? "Log in" : "Sign up"}
                    </button>
                    <img src="" alt='logo' />
                </div>
                
            </div>
            <div className="gc__main-login-container" >
                {loginVisible  && (
                <Login  showSignup={showSignup} />
                )}
            </div>
            <div className="gc__main-singup-container" >
                {signUpVisible && (
                    <Signup />
                )}
            </div>
            <div className="gc__main-body-container" >
                <h2>BODY</h2>
                <p>Move tracks around with updated UI in Performance panel
                    Change the order of tracks and hide them with an improved configuration mode in the Performance panel.
                    Ignore scripts in the flame chart
                    Add and remove scripts to and from the ignore list right in the flame chart.
                    Find excessive memory usage with filters in heap snapshots
                    Find common cases of inefficient memory usage using new filters in heap snapshots.
                </p>
            </div>
            <div className="gc__main-footer-container" >
                <h2>FOOTER</h2>
                <p>Find excessive memory usage with filters in heap snapshots
                    Find common cases of inefficient memory usage using new filters in heap snapshots.
                </p>
            </div>
        </div>
    )
}

export default  HomeBody;