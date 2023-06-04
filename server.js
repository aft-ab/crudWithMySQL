
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const { resolve } = require("path");

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
//app.use('/assets',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var imagename = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("a1")
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    console.log("a2")
    imagename = Date.now() + '-' + file.originalname;
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })



//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'one'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});




//****************************************************route for homepage
app.get('/showproduct', (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);

  });
});




//******************************************************route for delete
app.get('/productdelete/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//***************************************************************Edit
app.get('/productedit/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  let sql = "select *  FROM product WHERE product_id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


//********************************************************route for update data
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "', qty='" + req.body.qty + "' WHERE product_id=" + req.body.id;
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showproduct');
  });
});

//***************************************************route for insert
app.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req.body.file);
  console.log(imagename);



  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    qty: req.body.product_qty,
    product_image: imagename
  };
  console.log(data);
  let sql = "insert into product set ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) throw err;

    let q = conn.query("select * from product", (err, results) => {
      if (err) throw err;
      res.json(results);
      // res.end();
    });



  });

});
//************************************************login 
app.post('/login', (req, res) => {
  let sql = "select * from login where username='" + req.body.username + "' and password='" + req.body.password + "'";
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});




//***********************************************************Add To Cart
app.get('/addcart/:id',function(req,res){
  const id= req.params.id;
  let a ="SELECT * FROM cart where product_id="+id;
  conn.query(a,(err,get)=>{
    if(err) throw err;
    if(get.length>=1){
      console.log("items already added");
    }
    else{
      let data = { customer_name: 'ramu', product_id: id, qty: 1 };
    console.log(data);
    let sql = "INSERT INTO cart SET ?";
  
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.json(results);
    });

    }
  })
})

//**********************************************************cart_Data
app.get('/cart_Data', function (req, res) {
  //  console.log(data);
  let sql = "select * from product,cart Where product.product_id=cart.product_id";

  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });


});


//********************************************************************Remove Cart
app.get('/remove_cart/:id',function(req,res) {	
	const id=req.params.id;
	console.log(id);
 let sql = "DELETE FROM cart WHERE product_id="+id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/showproduct');
  });
});


//*****************************************************************Increment
app.get('/increment/:id',function(req,res) {	
	const id=req.params.id;

  let a="select *from product,cart where product.qty=cart.qty and product.product_id='"+id+"' and cart.product_id='"+id+"'";

  conn.query(a,(err,get)=>{
    console.log(a);

    if(get.length>=1){
    console.log("All Items Sold");
    res.send( { message: "All Items Sold." })
      
    }
    else{
 let sql = "UPDATE cart SET qty = qty+1 WHERE  product_id="+id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    // res.redirect('/showproduct');                    
    });

    }
  })







     
  });


//*************************************************************Decrement
app.get('/decrement/:id',function(req,res) {	
	const id=req.params.id;
	console.log(id);
 let sql = "UPDATE cart SET qty = qty-1 WHERE qty>1 and product_id="+id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/showproduct');
  });
     
  });


//*****************************************************************payment
  // async and await associated to promise for synchronous process

app.post('/payment',async (req, res) => {


  //console.log(req.body.products);
let data1 = {customer_name: req.body.cname, amount:req.body.amount};

 let sql = "INSERT INTO bill SET ?";
// await db.query(queryString).catch(err => {throw err}); 
let promise = new Promise((resolve, reject) => {

  conn.query(sql,data1, async (err, resultSet) => { 
    if (err) reject(err); 
    resolve(resultSet);
  });
  
});
let result = await promise;
console.log(result);
console.log("hello");

console.log("done promise");
   let data = {customer_name: req.body.cname, cardno: req.body.cardno,amount:req.body.amount};
console.log(data);
   sql = "INSERT INTO payment SET ?";
   query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    
  
  });

var billno=10;
let s = "select max(billno) 'billno' FROM bill ";
let promise1 = new Promise((resolve, reject) => {


   query =  conn.query(s, async (err, results) => {
    if(err) throw err;
     resolve(results);
      
     //console.log("billno="+billno)
  });
});
let myresult = await promise1;
billno = myresult[0].billno;
let o = JSON.parse(req.body.products);

console.log("biilno="+billno)

console.log(o);
for(x in o)
  {

console.log(o[x]);
  let sql = "INSERT INTO bill_items values("+billno+","+o[x].product_id+","+o[x].qty+","+o[x].product_price+") ";
 console.log(sql);
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    
   });

 }




});






app.listen(4200, () => {
  console.log(`express server running on 4200`);
});
