import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formHandler = () => {
    const newProduct = {
      price: price,
      title: title,
      description: description
    }
    // if()?
    newProductApi(newProduct);
    setPrice("");
    setTitle("");
    setDescription("");
  }

  const newProductApi = (product) => {
    axios.post("http://localhost:8000/api/products", product)
      .then(res => {
        console.log(res.data.newProduct);
        addProductToProducts(res.data.newProduct);
      })
      .catch(err => console.log(err))
  }

  const addProductToProducts = (product) => {
    setProducts([...products, product]);
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(data => {
        console.log(data.data);
        setProducts(data.data);
        setLoaded(true);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Product Manager</h1>
      <div>
        {title}
        <br />
        {price}
        <br />
        {description}
        <br />
        Title <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        Prices <input
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        Description <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={formHandler}>
          Create
        </button>
      </div>
      <hr />
      {loaded && products.map((product, key) =>
        <div key={key}>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <hr />
        </div>
      )
      }
    </>
  )
}

export default App;
