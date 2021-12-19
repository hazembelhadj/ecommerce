import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signin ,signup} from '../actions/userActions';
import { useSelector ,useDispatch} from "react-redux";
import LoadingBox from '../screens.js/LoadingBox';
import MessageBox from '../screens.js/MessageBox';
export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const [password, setPassword] = useState('');
  const [SignUp, setSignUp] = useState(false);
 //usersignup
 const userSignup = useSelector((state) => state.userSignup);
 
 const dispatch = useDispatch()


  const HandleSubmitte = (e) => {

    e.preventDefault();

	dispatch (signup( name , email , password));

  };
 //usersignup
 //userSIgnin
  let history = useHistory();
const userSignin = useSelector((state) => state.userSignin);
const { userInfo, loading, error } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
	dispatch (signin(email , password))
    // TODO: sign in action
  };
const handlesignup = () =>{
setSignUp(false)
 
}
const handlesignin = () =>{

	setSignUp(true)
}
 
useEffect(() => {
    if (userInfo) {
      history.push('/');
    } else {
		history.push('/signin');
	}
  }, [userInfo]);
  return (

   <div className="bodyy">
	   	  <div >
      <div className={`container${SignUp ? " right-panel-active" : ""}`} id="container">
	<div className="form-container sign-up-container">
		<form className="form" onSubmit={HandleSubmitte}>
			<h1 className="titleee">Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			
			<span>or use your email for registration</span>
			<input className="inputt" type="text" placeholder="Name"  required
onChange={(e) => setName(e.target.value)} />
			<input className="inputt"  type="email"  
			            id="email"
						placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
			<input className="inputt"  type="password" placeholder="Password"  id="password"
 onChange={(e) => setPassword(e.target.value)} />
			<button className="buttonn" type="submit" >Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form  className ="form" onSubmit={submitHandler}>
			<h1 className="titleee">Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			{loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
			<span>or use your account</span>
			<input className="inputt"  type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)} />
			<input className="inputt"  type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button  className="buttonn">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1 className="title">Welcome Back!</h1>
				<p className="paragraphee">To keep connected with us please login with your personal info</p>
				<button  className="buttonn"
        onClick = {handlesignup}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1 className="titlee">Hello, Friend!</h1>
				<p className="paragraphe">Enter your personal details and start journey with us</p>
				<button  className="buttonn" onClick={handlesignin}>Sign Up</button>
			</div>
			{}
		</div>
	</div>
</div>
</div>

    
</div>
  );
}
