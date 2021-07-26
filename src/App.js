//jdbiusbcis
import React , {useState} from 'react';
import data from "./data.json";
import Filter from "./components/Filter";
import Products from "./components/Products";


const App = ()  => {
  const[products , setProducts] = useState (data.products)
  const[sort , setSort] = useState ('')
  const[size , setSize] = useState ('')
  

   const sortProducts = (event) => {
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
  };
  return (
    <div className="grid-container">
    <header>
      <a href="/">React Shopping Cart</a>
    </header>
    <main>
      <div className="content">
        <div className="main">
          <Filter  size={size}  sort={sort} sortproducts={sortProducts} sizeproducts={filterProducts} />
          <Products products={products}></Products>
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
