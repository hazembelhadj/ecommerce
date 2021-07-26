//jdbiusbcis
import React from 'react';
import Filter from "./components/Filter";
import Products from "./components/Products";


function App() {
  return (
    <div className="grid-container">
    <header>
      <a href="/">React Shopping Cart</a>
    </header>
    <main>
      <div className="content">
        <div className="main">
          <Filter />
          <Products />
        </div>
        <div className="sidebar">
          
        </div>
      </div>
    </main>
    <footer>All right is reserved.</footer>
  </div>
  );
}

export default App;
