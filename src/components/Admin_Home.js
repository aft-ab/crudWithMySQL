import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Container, Table } from 'react-bootstrap'

export default function Admin_Home() {
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQuanitity] = useState('');

  const [file, setFile] = useState(null);

  const [mylist, setList] = useState([]);

  // this is called repeatedly when ever u render
  useEffect(() => {

    Axios.get("http://localhost:4200/showproduct").then(
      res => setList(res.data));

    console.log("once");

  }, []);

  function change1(e) { setName(e.target.value); }

  function change2(e) { setPrice(e.target.value); }
  function change4(e) { setQuanitity(e.target.value); }

  function change3(e) {
    setFile(e.target.files[0]);
    console.log(file)
  }
  async function mysubmit() {

    const url = 'http://localhost:4200/upload';
    const formData = new FormData();
    formData.append('product_name', name);
    formData.append('product_price', price);
    formData.append('product_qty', qty);

    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const res = await Axios.post(url, formData, config);
    alert("The file is successfully uploaded");
    console.log(res.data);




  }

  function myupdate() {
    window.alert("submit data");

    const data = { "id": id, "product_name": name, "product_price": price, "qty": qty };
    console.log(data);
    Axios.post("http://localhost:4200/update", data)
      .then((res) => {
        setList(res.data);
        alert("The file is successfully uploaded");
      }).catch((error) => {
      });






  }
  function onDelete(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4200/productdelete/${id}`).then(res => {
      setList(res.data);
    });
  };
  function onEdit(e) {
    e.preventDefault();
    const id = e.target.id;

    console.log(id);
    Axios.get(`http://localhost:4200/productedit/${id}`).then(res => {

      setName(res.data[0].product_name);
      setPrice(res.data[0].product_price);
      setId(res.data[0].product_id);

      setQuanitity(res.data[0].qty);

    });
  };

  return (

    <div>
      <h3 align="center"><u> Admin Home</u> </h3>


      <Container>

        <Form>
          <Form.Group className="mb-3" controlId="t1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text"
              name="t1" onChange={change1} value={name} />



          </Form.Group>

          <Form.Group className="mb-3" controlId="t2">
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="text" name="t2" onChange={change2} value={price} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="t3">
            <Form.Label>Product Quanity</Form.Label>
            <Form.Control type="text" name="t3" onChange={change4} value={qty} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>File </Form.Label>
            <Form.Control type="file" name="file" onChange={change3} />
          </Form.Group>





          <Button variant="primary" type="button" onClick={mysubmit}>
            Submit
          </Button>
          &nbsp;
          <Button variant="success" type="button" onClick={myupdate}>
            Update
          </Button>
        </Form>

        <br />
        <br />



        <Table striped bordered hover>
          <thead>
            <th>Image</th> <th>Id </th> <th> Name</th><th> Price </th><th>Delete</th> <th>Edit</th>
          </thead>
          <tbody>
            {mylist.map((item, index) => {

              return (
                <tr key={index}>
                  <td><img src={item.product_image} width="200" height="200" alt="image" /></td>
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.product_price}</td>
                  <td>
                    <Button variant="danger"
                      id={item.product_id}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  </td>



                  <td>    <Button variant="warning" id={item.product_id} onClick={onEdit}  >
                    Edit
                  </Button>
                  </td>
                </tr>
              );
            })}


          </tbody>
        </Table>

      </Container>
    </div>
  );


}

