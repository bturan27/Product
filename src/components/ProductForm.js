import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";



const Product = (props) =>{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const history = useHistory();
    const [product, setProduct]  =useState([]);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log("submitted");
        let formInfo = {title, price,description}
        axios.post("http://localhost:8000/api/product/create", formInfo ) 
        .then(res=>{
            axios.get("http://localhost:8000/api/product/all")
            .then(res=>{
                // console.log(res.data);
                setProduct(res.data);
            })
            .catch(err=>console.log(err))
            history.push("/")
        })
        .catch(err =>
            console.log(err.response.data.err.errors)
        )
    }
    useEffect (()=>{
        axios.get("http://localhost:8000/api/product/all")
        .then(res=>{
            // console.log(res.data);
            setProduct(res.data);
        })
        .catch(err=>console.log(err))
    }, [product])

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>Title</label>
                <input required minlength="3"type="text" onChange={(event)=>setTitle(event.target.value)} ></input>

                <label>Price</label>
                <input required minlength="3" type="number" onChange={(event)=>setPrice(event.target.value)} ></input>

                <label> Description</label>
                <input required minlength="3" type="text" onChange={(event)=>setDescription(event.target.value)} ></input>
                <input type="submit" />
            </form>
            <div> 
                <h1>ALL PRODUCTS LIST</h1>
                {
                    product.map((product,i)=>{
                    return <Link to={`/product/${product._id}`}> {product.title} </Link>

                })
            }
            </div>
        </div>
    )


}


export default Product;











