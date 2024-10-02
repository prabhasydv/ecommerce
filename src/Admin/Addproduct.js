import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate()

    const addProduct = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("category", category);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("img", img);

        const response = await axios.post("http://localhost:8080/addproduct", productData);
        if(response.status===200){
            navigate("/dashboard/admin/products")
        }else{
            alert("product add failed")
        }
    }

    return (
        <div className="ring">
            <div className="login">
                <form className='login' onSubmit={addProduct}>
                    <h2>Add Product</h2>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Enter Product Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Enter Product Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="number"
                            placeholder="Enter Product Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="inputBx">
                        <input
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
                        <input type="submit" value="Add Product"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
