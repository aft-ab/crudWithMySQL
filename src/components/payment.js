import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, Container } from 'react-bootstrap'

export default function Payment(props) {
    const [customername, setCustomername] = useState('');
    const [cardno, setCardno] = useState('');
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setCustomername(e.target.value);
    };
    function handleChange1(e) {
        e.preventDefault();
        setCardno(e.target.value);
    };
    function handleChange2(e) {
        e.preventDefault();
        setPassword(e.target.value);
    };
    function mysubmit() {
        const data = { "cname": customername, "cardno": cardno, "amount": amount, "products": localStorage.getItem("products") };
        console.log(data);
        Axios.post("http://localhost:4200/payment", data).then(
            res => console.log("payment done"));
        setCardno('');
        setPassword('');
        window.alert("payment done");

    }
    useEffect(() => {
        setAmount(localStorage.getItem("gross"));
        setCustomername(localStorage.getItem("cname"));
    }, []);



    return (
        <div>
            <br /><br /><br />
            <Container>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" value={customername}
                            onChange={handleChange}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Card No</Form.Label>
                        <Form.Control type="text" value={cardno}
                            onChange={handleChange1}

                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={password}
                            onChange={handleChange2}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="Amount"
                            value={amount}

                        />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={mysubmit}>
                        Submit
                    </Button>
                </Form>

                <a href="/bill">Generate Bill </a>

            </Container>

        </div>


    );
}