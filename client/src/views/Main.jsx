import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
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

    const deleteHandler = (id) => {
        deleteProductApi(id);

    }

    const deleteProductApi = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res);
                removeProductFromProducts(id);
            })
            .catch(err => {
                console.log(err);
            })

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

    const removeProductFromProducts = (id) => {
        setProducts(products.filter(product => product._id !== id))
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
            <h1>This is Main</h1>
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
                Price <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                Description <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button onClick={formHandler}>Add Product!</button>
            </div>
            <hr />
            {loaded && products.map((product, key) =>
                <div key={key}>
                    <p>Title: <Link to={`/product/${product._id}`}> {product.title}</Link></p>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={e => deleteHandler(product._id)}>Delete Product!</button>
                    <hr />
                </div>
            )
            }
        </>
    )
}

export default Main;