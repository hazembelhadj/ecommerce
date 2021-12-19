//jdbiusbcis
import React , {useState,useEffect} from 'react';
import data from "./data.json";
import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from './components/cart';
import OrderHistory from './components/OrderHistory';

import { Provider, useSelector ,useDispatch} from "react-redux";
import { BrowserRouter as Router, Link, Route,Switch , withRouter , useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoIosArrowDown } from "react-icons/io";
import { BiLogOut} from "react-icons/bi"
import { CgProfile} from "react-icons/cg"

import PrivateRoute from './components/PrivateRoute';
import SigninScreen from './components/SigninScreen';
import UserProfile from './components/UserProfile';
import { signout } from './actions/userActions';
const App = (props)  => {
  const dispatch = useDispatch();
const history = useHistory()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const[products , setProducts] = useState (data.products)
  const[sort , setSort] = useState ('')
  const[icon , setIcon] = useState (false);
  console.log(icon)
  const[cartItems,setCartItems] = useState( localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [])
  useEffect(() => {
    fetch("/api/products")
    .then(res => {
      return res.json();

    })
  .then(data => {
    console.log(data)
  }) }, []);
  
   const handleButtonClick = () => {
    
      
        setIcon (!icon);
     
      
  
  };

   /*const sortProducts = (event) => {
    // impl
    const sort = event.target.value;
    console.log(event.target.value);
   
      setSort(sort);
      setProducts ( products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    );
  };
  const  filterProducts = (event) => {
    // impl
    console.log(event.target.value);
    if (event.target.value === "") {
      setSize( event.target.value);
      setProducts( data.products );
    } else {
      
        setSize( event.target.value);
        setProducts(data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      );
    }
  };*/
  const  addProduct = (product) => {
    let cartItemss = cartItems.slice();
    let arleadyinCarts = false;
    cartItemss.forEach((item)  => {
      if(item._id === product._id){
      item.count++;
     
      arleadyinCarts = true } });
      if (!arleadyinCarts ){
      cartItemss.push({...product , count: 1})}
      setCartItems(cartItemss)
      localStorage.setItem("cartItems" , JSON.stringify(cartItemss) );
   
      
   



  }
  
  const removeItems = (itemtodelete) => {
    console.log(itemtodelete)
    const newcartItems = cartItems.filter ((item) => { return item !== itemtodelete})
    setCartItems(newcartItems)
    localStorage.setItem("cartItems" , JSON.stringify(newcartItems) )
  }
    const createOrder = (order) => { 
         alert(" need to save " + order.name)
         console.log(order.cartItems)
  }
  const signoutHandler = () => {
    dispatch(signout());
   setIcon(false);
  };
  const profileHandler = (value) => {
    props.history.push("/profile")
  }
  const orderHandler = (value) => {
    props.history.push("/order")
  }
  

   return (

    
    <div className="grid-container">
    <header>
      <Link to="/">React Shopping Cart</Link>
    
      {userInfo ? (
              <div className="dropdown">
                <div className="dropdownn">
                  <div onClick = {handleButtonClick}>
                <Link to="#">
                  {userInfo.name} <IoIosArrowDown  className="icon" />
                </Link>
                </div>
                </div>
                { icon &&  (
                <ul className="dropdown-content">
                  <li>
                    <div className="dropdown-item">
                    <Link to="/profile"  className = "item" onClick={profileHandler} >
                    <CgProfile className="icon" />  Profile
                    </Link>
                    <Link to="/order"  className = "item" onClick={orderHandler} >
                      orderHistory
                    </Link>
                    {userInfo.isAdmin &&
                    <Link to="/order"  className = "item" >
                      addProduct
                    </Link>}
                    <Link to="/signin"  className = "item" onClick={signoutHandler}>
                    <BiLogOut className="icon" /> Sign Out
                    </Link>
                    </div>
                  </li>
                </ul>
                )}
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

    </header>
    
    <main>
      <div>

    <Switch>
    {userInfo ? 
    <Route exact path ="/">
     
      <div className="content">
        <div className="main">
          <Filter   />
          <Products  addProduct={addProduct}  />
          
        </div>
       
        <div className="sidebar">
          <Cart  cartItems={cartItems} removeItems={removeItems}  createorder={createOrder} />
        </div>
      </div>
         </Route>
        
      :(
    
         <SigninScreen />
             
          )}
           <Route path="/signin" >
             <SigninScreen />
             </Route>
             
             <Route
            path="/profile"
           
          >  <UserProfile /> </Route>
                   <Route path= "/order">  <OrderHistory /> </Route>

          </Switch>
          
      </div>
    </main>
    
    <footer>All right is reserved.</footer>
  </div>
  
  
  );
}

export default withRouter (App) ;
