

import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';


import './cart.css';
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';

const Cart = () => {
    const [myList, setMyList] = useState([]);
    const [id, setId] = useState('');

   

    useEffect(() => {
        Axios.get("http://localhost:4200/cart_Data").then(
           
            res => setMyList(res.data));
            localStorage.setItem('products', JSON.stringify(myList));
            console.log(localStorage);
            console.log(myList);
            
            
    }, [myList]);

    function Remove(e) {
        e.preventDefault();
        const id = e.target.id;
        console.log(id);
        Axios.get(`http://localhost:4200/remove_cart/${id}`).then(res => {
            alert("Product Removed to cart")
        });
    };

    const Increment = (e) => {
        // e.preventDefault();
        const id = e.target.id;
        console.log(id);
        Axios.get(`http://localhost:4200/increment/${id}`).then(res => {
            //   res.setData(res.data)
               alert(res.data.message)

          
           
        })
    }

    const Decrement = (e) => {
        e.preventDefault();
        const id = e.target.id;
        console.log(id);
        Axios.get(`http://localhost:4200/decrement/${id}`).then(res => {
            res.setData(res.data)
        })
    }

    function Clearcart() {
        // e.preventDefault();
        // const qty =  e.target.qty;
        Axios.post("http://localhost:4200/cleancart").then(res => {
            res.setData(res.data);
            alert("Clean Cart")
        });
    };

    var Total = 0;


    return (
        <>

            <h3 align="center"><u>Shopping Cart</u></h3>
            <Container>
                <Table>
                    <thead>
                        <th>Image</th>
                        <th>Product id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                    </thead>
                    <tbody>

                        {
                            myList.map((curElm, index) => {
                                { Total += +curElm.product_price * curElm.qty };
                                localStorage.setItem('gross', JSON.stringify(Total));
                                console.log(Total);

                              
                                return (

                                    <tr key={index}>
                                        <td className="product-img"><img src={curElm.product_image} width="200" height="200" alt="image" /></td>
                                        <td>{curElm.product_id}</td>
                                        <td>{curElm.product_name}</td>
                                        <td className="price">₹{curElm.product_price}</td>
                                        <td><div className="add-minus-quantity">
                                            <i className="fas fa-minus minus" id={curElm.product_id} onClick={Decrement}></i>
                                            <input type="text" placeholder={curElm.qty} disabled />
                                            <i className="fas fa-plus add" id={curElm.product_id} onClick={Increment}></i>
                                        </div>
                                        </td>
                                        <td>
                                            <div className="remove-item">
                                                <i className="fas fa-trash-alt remove" id={curElm.product_id} onClick={Remove}></i></div>

                                                
                                        </td>
                                    </tr>

                                );
                            })}
                    </tbody>

                </Table>
            </Container>
            <div className="card-total">
                <h3>Cart Total:<span>{Total}</span>
                </h3>
                <button>checkout</button>
                <button className="clear-cart" onClick={Clearcart}>
                    Clear Cart
                </button>
                <a href="/Payment">Payment</a>
            </div>
        </>
    );
}

export default Cart;