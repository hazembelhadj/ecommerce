import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { detailsUser, signin ,signup, updateUserProfile} from '../actions/userActions';
import { useSelector ,useDispatch} from "react-redux";
import LoadingBox from '../screens.js/LoadingBox';
import MessageBox from '../screens.js/MessageBox';
import { USER_UPDATE_PROFILE_RESET, } from '../constants';
export default function UserProfile(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const [password, setPassword] = useState('');
  const [SignUp, setSignUp] = useState(false);
 //usersignup
 const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;
 const userDetails = useSelector((state) => state.userDetails);
 const { loading, error, user } = userDetails;
 const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
 const {
   success: successUpdate,
   error: errorUpdate,
   loading: loadingUpdate,
 } = userUpdateProfile;
 const dispatch = useDispatch();
 useEffect(() => {
   if (!user) {
	 dispatch({ type: USER_UPDATE_PROFILE_RESET });
	 dispatch(detailsUser(userInfo._id));
   } else {
	 setName(user.name);
	 setEmail(user.email);
   }
 }, [dispatch, userInfo._id, user]);
 const submitHandler = (e) => {
   e.preventDefault();
   // dispatch update profile
  
	 dispatch(updateUserProfile({ userId: user._id, name, email, password }));
   
 };
  return (
<form onSubmit={submitHandler}>
	<div className="login-box">
	{loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
	<div className="leftt">
		<div>
	  <h1>Edit Profile</h1></div>
	  
	  
	  <input type="text" className="emaill"   id="name"  placeholder="name" value= {name} onChange={(e) => setName(e.target.value)} />
	  <input type="email" className="emaill" name="email" id="email" placeholder="E-mail" value = {email} onChange={(e) => setEmail(e.target.value)} />
	  <input type="password" className="emaill"  id = "password" name="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
	  
	  
	  <button type="submit" className="emailll"  > updata </button>
	</div>
	
	<div className="rightt">
	  <span className="loginwith">Sign in with<br />social network</span>
	  
	  <button className="social-signin facebook">Log in with facebook</button>
	  <button className="social-signin twitter">Log in with Twitter</button>
	  <button className="social-signin google">Log in with Google+</button>
	</div>
	<div className="or">OR</div>
	</>
        )}
  </div>
  </form>)}