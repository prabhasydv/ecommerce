import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editproduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [img, setImg] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate()
    const {id}= useParams()

    const singleproduct = async()=>{
        const {data} = await axios.get(`http://localhost:8080/singleproduct/${id}`)
        setName(data.product.name)
        setDescription(data.product.description)
        setCategory(data.product.category)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setPhoto(data.product.img)
    }

    useEffect(()=>{
        if(img){
            setPhoto("")
        }
        singleproduct()
    },[img])

    const editproduct = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("category", category);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("img", img || photo);

        const response = await axios.put(`http://localhost:8080/editproduct/${id}`, productData);
        if(response.status===200){
            navigate("/dashboard/admin/products")
        }else{
            alert("product edit failed")
        }
    }

    return (
        <div className="ring">
            <div className="login">
                <form className='login' onSubmit={editproduct}>
                    <h2>Edit Product</h2>
                    <div className="inputBx">
                        <input
                            value={name}
                            type="text"
                            placeholder="Enter Product Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            value={description}
                            type="text"
                            placeholder="Enter Product Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                        value={category}
                            type="text"
                            placeholder="Enter Product Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            value={price}
                            type="number"
                            placeholder="Enter Product Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            value={quantity}
                            type="number"
                            placeholder="Enter Product Quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="file"
                            placeholder="Image"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    </div>
                    <div className="inputBx">
                        <input type="submit" value="Edit Product"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editproduct;



