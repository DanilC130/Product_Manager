import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";

const ShowOne = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        _id: "",
        title: "",
        price: 0,
        description: ""
    });
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const formHandler = () => {
        const updatedProduct = {
            title: title,
            price: price,
            description: description
        }

        editOneProductApi(updatedProduct);
    }

    const editOneProductApi = (product) => {
        axios.put(`http://localhost:8000/api/products/${id}`, product)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data.oneProductById);
                setProduct(res.data.oneProductById);
                setPrice(res.data.oneProductById.price);
                setTitle(res.data.oneProductById.title);
                setDescription(res.data.oneProductById.description);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <h1>This is ShowOne: {id}</h1>
            <div>
                <p>Title: {product.title}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
            </div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    min={1}
                    max={10000}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button onClick={formHandler}>Edit Product!</button>
            </div>
        </>
    )
}

export default ShowOne;