
import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";



const OneProduct = () => {
    const [product, setProduct]  =useState([]);
    const {_id} = useParams();
    const history = useHistory();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/product/"+_id)
            .then(res=>{
                console.log(res.data);
                setProduct(res.data);
            })
            .catch(err=>console.log(err))
    },[])

    const onDeleteHandler =()  =>{
            axios.delete(`http://localhost:8000/api/product/${_id}/delete`)
            .then(res=>{
                history.push("/");
            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <h2> {product.title}</h2>
            <h2>{product.description}</h2>
            <h2>{product.price}</h2>
            <Link  to={`/product/${_id}/edit`} >EDIT</Link>
            <button onClick={onDeleteHandler}  className="btn btn-lg btn-danger m-3">DELETE</button>
        </div>
    
    )
}

export default OneProduct