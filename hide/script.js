// const express = require('express');
// const hbs = require('hbs');
// const wax = require('wax-on');
// require('dotenv').config();

// let app = express();
// app.set('view engine', 'hbs');
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: false }));

// wax.on(hbs.handlebars);
// wax.setLayoutPath('./views/layout');

// const mysql = require('mysql2');

// // MySQL database connection
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         process.exit(1);
//     } else {
//         console.log('Connected to the database.');
//     }
// });
// app.get('/', (req, res) => {
//     const customerQuery = 'SELECT * FROM Customer';
//     const productQuery = 'SELECT * FROM Product';
//     const invoiceQuery = 'SELECT * FROM Invoice';

//     // Execute queries
//     connection.query(customerQuery, (err, customers) => {
//         if (err) {
//             return res.status(500).send('Error fetching customers');
//         }
//         connection.query(productQuery, (err, products) => {
//             if (err) {
//                 return res.status(500).send('Error fetching products');
//             }
//             connection.query(invoiceQuery, (err, invoices) => {
//                 if (err) {
//                     return res.status(500).send('Error fetching invoices');
//                 }

//                 // Render the template with the fetched data
//                 res.render('layout/base', {
//                     title: 'Customer Dashboard',
//                     customers,
//                     products,
//                     invoices
//                 });
//             });
//         });
//     });
// });

// app.get('/customers', (req, res) => {
//   const customerQuery = 'SELECT * FROM Customer';
//   connection.query(customerQuery, (error, customers) => {
//       if (error) {
//           console.error('Error fetching customers:', error);
//           return res.status(500).send('Internal Server Error');
//       }
      
//       res.render('customers', {
//           title: 'Customers',
//           customers
//       });
//   });
// });
// //app.get('/customers', (req, res) => {
//    // console.log("customers route");
//  //   const customerQuery = 'SELECT * FROM Customer';
    
//   //  connection.query(customerQuery, (err, customers) => {
        
  
//     //    if (err) {
//   //          return res.status(500).send('Error fetching customers');
//    //     }
        
//     //    console.log(customers);
//      //   res.render('customers', {
//    //         title: 'Customers',
//    //         customers
//    //     });
//   //  });
// //});

// app.get('/customers/new', (req, res) => {
//     res.render('customer-form', {
//         title: 'Add Customer'
//     });
// });

// app.post('/customers/new', (req, res) => {
//     const { name, email, phone } = req.body;
//     const insertQuery = 'INSERT INTO Customer (name, email, phone) VALUES (?, ?, ?)';
//     connection.query(insertQuery, [name, email, phone], (err) => {
//         if (err) {
//             return res.status(500).send('Error creating customer');
//         }
//         res.redirect('/customers');
//     });
// });

// app.get('/customers/edit/:id', (req, res) => {
//     const customerId = req.params.id;
//     const selectQuery = 'SELECT * FROM Customer WHERE customer_id = ?';
//     connection.query(selectQuery, [customerId], (err, results) => {
//         if (err || results.length === 0) {
//             return res.status(404).send('Customer not found');
//         }
//         res.render('customer-form', {
//             title: 'Edit Customer',
//             customer: results[0]
//         });
//     });
// });

// app.post('/customers/edit/:id', (req, res) => {
//     const customerId = req.params.id;
//     const { name, email, phone } = req.body;
//     const updateQuery = 'UPDATE Customer SET name = ?, email = ?, phone = ? WHERE customer_id = ?';
//     connection.query(updateQuery, [name, email, phone, customerId], (err) => {
//         if (err) {
//             return res.status(500).send('Error updating customer');
//         }
//         res.redirect('/customers');
//     });
// });

// app.post('/customers/delete/:id', (req, res) => {
//     const customerId = req.params.id;
//     const deleteQuery = 'DELETE FROM Customer WHERE customer_id = ?';
//     connection.query(deleteQuery, [customerId], (err) => {
//         if (err) {
//             return res.status(500).send('Error deleting customer');
//         }
//         res.redirect('/customers');
//     });
// });

// // Products routes
// app.get('/products', (req, res) => {
//     const productQuery = 'SELECT * FROM Product';
//     connection.query(productQuery, (err, products) => {
//         if (err) {
//             return res.status(500).send('Error fetching products');
//         }
//         res.render('products', {
//             title: 'Products',
//             products
//         });
//     });
// });

// app.get('/products/new', (req, res) => {
//     res.render('product-form', {
//         title: 'Add Product'
//     });
// });

// app.post('/products/new', (req, res) => {
//     const { product_name, price, stock_quantity } = req.body;
//     const insertQuery = 'INSERT INTO Product (product_name, price, stock_quantity) VALUES (?, ?, ?)';
//     connection.query(insertQuery, [product_name, price, stock_quantity], (err) => {
//         if (err) {
//             return res.status(500).send('Error creating product');
//         }
//         res.redirect('/products');
//     });
// });

// app.get('/products/edit/:id', (req, res) => {
//     const productId = req.params.id;
//     const selectQuery = 'SELECT * FROM Product WHERE product_id = ?';
//     connection.query(selectQuery, [productId], (err, results) => {
//         if (err || results.length === 0) {
//             return res.status(404).send('Product not found');
//         }
//         res.render('product-form', {
//             title: 'Edit Product',
//             product: results[0]
//         });
//     });
// });

// app.post('/products/edit/:id', (req, res) => {
//     const productId = req.params.id;
//     const { product_name, price, stock_quantity } = req.body;
//     const updateQuery = 'UPDATE Product SET product_name = ?, price = ?, stock_quantity = ? WHERE product_id = ?';
//     connection.query(updateQuery, [product_name, price, stock_quantity, productId], (err) => {
//         if (err) {
//             return res.status(500).send('Error updating product');
//         }
//         res.redirect('/products');
//     });
// });

// app.post('/products/delete/:id', (req, res) => {
//     const productId = req.params.id;
//     const deleteQuery = 'DELETE FROM Product WHERE product_id = ?';
//     connection.query(deleteQuery, [productId], (err) => {
//         if (err) {
//             return res.status(500).send('Error deleting product');
//         }
//         res.redirect('/products');
//     });
// });

// // Invoices routes
// app.get('/invoices', (req, res) => {
//     const invoiceQuery = 'SELECT * FROM Invoice';
//     connection.query(invoiceQuery, (err, invoices) => {
//         if (err) {
//             return res.status(500).send('Error fetching invoices');
//         }
//         res.render('invoices', {
//             title: 'Invoices',
//             invoices
//         });
//     });
// });

// app.get('/invoices/new', (req, res) => {
//     res.render('invoice-form', {
//         title: 'Add Invoice'
//     });
// });

// app.post('/invoices/new', (req, res) => {
//     const { customer_id, product_id, quantity, total_amount, date } = req.body;
//     const insertQuery = 'INSERT INTO Invoice (customer_id, product_id, quantity, total_amount, date) VALUES (?, ?, ?, ?, ?)';
//     connection.query(insertQuery, [customer_id, product_id, quantity, total_amount, date], (err) => {
//         if (err) {
//             return res.status(500).send('Error creating invoice');
//         }
//         res.redirect('/invoices');
//     });
// });

// app.get('/invoices/edit/:id', (req, res) => {
//     const invoiceId = req.params.id;
//     const selectQuery = 'SELECT * FROM Invoice WHERE invoice_id = ?';
//     connection.query(selectQuery, [invoiceId], (err, results) => {
//         if (err || results.length === 0) {
//             return res.status(404).send('Invoice not found');
//         }
//         res.render('invoice-form', {
//             title: 'Edit Invoice',
//             invoice: results[0]
//         });
//     });
// });

// app.post('/invoices/edit/:id', (req, res) => {
//     const invoiceId = req.params.id;
//     const { customer_id, product_id, quantity, total_amount, date } = req.body;
//     const updateQuery = 'UPDATE Invoice SET customer_id = ?, product_id = ?, quantity = ?, total_amount = ?, date = ? WHERE invoice_id = ?';
//     connection.query(updateQuery, [customer_id, product_id, quantity, total_amount, date, invoiceId], (err) => {
//         if (err) {
//             return res.status(500).send('Error updating invoice');
//         }
//         res.redirect('/invoices');
//     });
// });

// app.post('/invoices/delete/:id', (req, res) => {
//     const invoiceId = req.params.id;
//     const deleteQuery = 'DELETE FROM Invoice WHERE invoice_id = ?';
//     connection.query(deleteQuery, [invoiceId], (err) => {
//         if (err) {
//             return res.status(500).send('Error deleting invoice');
//         }
//         res.redirect('/invoices');
//     });
// });
// app.get('/test', (req, res) => {
//     console.log("Test route accessed"); // Add this line to see if the route is hit
//     const message = "asdasd";
//     res.render('test', { message });
// });
// // Start server

// app.listen(3000, () => {
//     console.log('Server is running')
// });


