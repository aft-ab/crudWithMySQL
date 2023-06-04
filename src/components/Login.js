import { Col, Row, Card, } from "react-bootstrap";
import React, { useState } from 'react';
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Form,FormControl,Button,Container } from 'react-bootstrap'

         
export default function Login(props) {
  const      [username, setUserName] = useState('');
  const      [password, setPassword] = useState(''); 
 const navigate = useNavigate();
   
  function handleChange1(e)  {
    e.preventDefault();
      
    setUserName(e.target.value);
  };
  function handleChange2(e)  {
    e.preventDefault();
      
    setPassword(e.target.value);
  }; 
  async function mysubmit() 
    {
  const data={"username":username,"password":password};

     const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:4200/login', config)    
    const json = await response.json();
 

console.log(json);
if(json.length==0)
  {
   console.log("invalid user try again");
     
    }
else if(json[0].type=="admin")
 { console.log("welcome admin");
      navigate("/admin");
  }
else if(json[0].type=="customer")
 { console.log("customer ");
    localStorage.setItem("cname",username);
     navigate("/customer");
  }


    
}



    return (
      <>
    
     

    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow" >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2 text-uppercase ">Please enter your Username and password!</h4>
                  <p className=" mb-5"></p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                          </Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" 
                           value={username}
                           onChange={handleChange1}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" 
                          value={password}
                          onChange={handleChange2}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                   
                        </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary"  type="button" onClick={mysubmit}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/Register" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            </Col>
        </Row>
      </Container>
    </div>
  
      </>
    );
  }
  
 
  