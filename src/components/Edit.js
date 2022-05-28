import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


const Edit =(props) => {
    
    const {_id} = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("")
    const [errors, setErrors] =useState({});
    const history =useHistory();
    


    useEffect(()=>{
        axios.get("http://localhost:8000/api/product/"+_id)
            .then(res=>{
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
            })
            .catch(err=>console.log(err))
    },[_id])

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.patch(`http://localhost:8000/api/product/${_id}/update`, {title,description,price})
        .then(res => {
            console.log(res);
            history.push("/");
        })
        .catch(err=>{
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
    })
}
return(
    <div>
        <form onSubmit={onSubmitHandler}>
                <label>Title</label>
                <input type="text" name="title" value={title }onChange={(event)=>setTitle(event.target.value)} ></input>

                <label>Price</label>
                <input type="number" name="price" value={price} onChange={(event)=>setPrice(event.target.value)} ></input>

                <label> Description</label>
                <input type="text" name="description" value={description} onChange={(event)=>setDescription(event.target.value)} ></input>
                <input type="submit" />
            </form>
    </div>
    )
}
export default Edit