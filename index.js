
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();

let app = express();
app.set('view engine', 'hbs');
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layout');
const helpers = require('handlebars-helpers');
// tell handlebars-helpers where to find handlebars
helpers({
    'handlebars': hbs.handlebars
})
const mysql = require('mysql2/promise');

// MySQL database connection
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database (using a connection pool, this is handled automatically)
connection.getConnection()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

app.get('/', async (req, res) => {
    try {
        const [customer] = await connection.query('SELECT * FROM Customer');
        const [products] = await connection.query('SELECT * FROM Product');
        const [invoices] = await connection.query(`
            SELECT *, DATE_FORMAT(Invoice.date, '%d-%m-%Y') AS formatted_date 
            FROM Invoice
        `);

        // Render the template with the fetched data
        res.render('layout/base', {
           title: 'Dashboard',
          customer,
          products,
          invoices
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/customers', async (req, res) => {
    try {
        const [customer] = await connection.query('SELECT * FROM Customer');
        res.render('customers', {
           // title: 'Customers',
            customer
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/customers/new', (req, res) => {
    res.render('customer-form', {
        title: 'Add Customer'
    });
});
app.get('/customers/:id', async(req, res) => {
    const customerId = req.params.id;
   
   const [customerData] = await connection.query(
    'SELECT name FROM Customer WHERE customer_id = ?',
    [customerId]
); 
if (customerData.length === 0) {
    return res.status(404).send('Customer not found <a href="/customers">Return to Customer page</a>');
}
const customerName = customerData[0].name;

    const [invoices] = await connection.query(`
               SELECT Invoice.*, Customer.name, Product.product_name 
        FROM Invoice 
        INNER JOIN Customer ON Invoice.customer_id = Customer.customer_id
        INNER JOIN Product ON Invoice.product_id = Product.product_id
        WHERE Invoice.customer_id = ?
    `
    , [customerId]);

      res.render('customerdb', {
        title: `${customerName}'s History`,
        name: customerName,
          invoices
      });
});

app.post('/customers/new', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        await connection.query('INSERT INTO Customer (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
        res.redirect('/customers');
    } catch (err) {
        return res.status(500).send('Error creating customer');
    }
});

app.get('/customers/edit/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
        const [results] = await connection.query('SELECT * FROM Customer WHERE customer_id = ?', [customerId]);
        if (results.length === 0) {
            return res.status(404).send('Customer not found');
        }
        res.render('customer-form', {
            title: 'Edit Customer',
            customer: results[0]
        });
    } catch (err) {
        return res.status(500).send('Error fetching customer');
    }
});

app.post('/customers/edit/:id', async (req, res) => {
    const customerId = req.params.id;
    const { name, email, phone } = req.body;
    try {
        await connection.query('UPDATE Customer SET name = ?, email = ?, phone = ? WHERE customer_id = ?', [name, email, phone, customerId]);
        res.redirect('/customers');
    } catch (err) {
        return res.status(500).send('Error updating customer');
    }
});

app.post('/customers/delete/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
        await connection.query('DELETE FROM Customer WHERE customer_id = ?', [customerId]);
        res.redirect('/customers');
    } catch (err) {
        return res.status(500).send('Error deleting customer');
    }
});

// Products routes
app.get('/products', async (req, res) => {
    try {
        const [products] = await connection.query('SELECT * FROM Product');
        res.render('products', {
            title: 'Products',
            products
        });
    } catch (err) {
        return res.status(500).send('Error fetching products');
    }
});

app.get('/products/new', (req, res) => {
    res.render('product-form', {
        title: 'Add Product'
    });
});

app.post('/products/new', async (req, res) => {
    const { product_name, price, stock_quantity } = req.body;
    try {
        await connection.query('INSERT INTO Product (product_name, price, stock_quantity) VALUES (?, ?, ?)', [product_name, price, stock_quantity]);
        res.redirect('/products');
    } catch (err) {
        return res.status(500).send('Error creating product');
    }
});

app.get('/products/edit/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [results] = await connection.query('SELECT * FROM Product WHERE product_id = ?', [productId]);
        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.render('product-form', {
            title: 'Edit Product',
            product: results[0]
        });
    } catch (err) {
        return res.status(500).send('Error fetching product');
    }
});

app.post('/products/edit/:id', async (req, res) => {
    const productId = req.params.id;
    const { product_name, price, stock_quantity } = req.body;
    try {
        await connection.query('UPDATE Product SET product_name = ?, price = ?, stock_quantity = ? WHERE product_id = ?', [product_name, price, stock_quantity, productId]);
        res.redirect('/products');
    } catch (err) {
        return res.status(500).send('Error updating product');
    }
});

app.post('/products/delete/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await connection.query('DELETE FROM Product WHERE product_id = ?', [productId]);
        res.redirect('/products');
    } catch (err) {
        return res.status(500).send('Error deleting product');
    }
});

// Invoices routes
app.get('/invoices', async (req, res) => {
  try {
     // const [invoices] = await connection.query('SELECT * FROM Invoice');
      const [invoices] = await connection.query(`
        SELECT Invoice.*, Customer.name, Product.product_name, 
           DATE_FORMAT(Invoice.date, '%d-%m-%Y') AS formatted_date
        FROM Invoice 
        INNER JOIN Customer ON Invoice.customer_id = Customer.customer_id
        INNER JOIN Product ON Invoice.product_id = Product.product_id
    `);
      res.render('invoices', {
          title: 'Invoices',
          invoices
      });
  } catch (err) {
    console.error('Error fetching invoices:', err);
      return res.status(500).send('Error fetching invoices');
  }
});

app.get('/invoices/new', (req, res) => {
    res.render('invoice-form', {
        title: 'Add Invoice'
    });
});

app.post('/invoices/new', async (req, res) => {
    const { customer_id, product_id, quantity, total_amount, date } = req.body;
    try {
        await connection.query('INSERT INTO Invoice (customer_id, product_id, quantity, total_amount, date) VALUES (?, ?, ?, ?, ?)', [customer_id, product_id, quantity, total_amount, date]);
        res.redirect('/invoices');
    } catch (err) {
        return res.status(500).send('Error creating invoice');
    }
});

app.get('/invoices/edit/:id', async (req, res) => {
    const invoiceId = req.params.id;
    try {
        const [results] = await connection.query("SELECT *, DATE_FORMAT(Invoice.date, '%d-%m-%Y') AS formatted_date FROM Invoice WHERE invoice_id = ?", [invoiceId]);
        if (results.length === 0) {
            return res.status(404).send('Invoice not found');
        }
        res.render('invoice-form', {
            title: 'Edit Invoice',
            invoice: results[0]
        });
    } catch (err) {
        return res.status(500).send('Error fetching invoice');
    }
});

app.post('/invoices/edit/:id', async (req, res) => {
    const invoiceId = req.params.id;
    const { customer_id, product_id, quantity, total_amount, date } = req.body;
    try {
        await connection.query('UPDATE Invoice SET customer_id = ?, product_id = ?, quantity = ?, total_amount = ?, date = ? WHERE invoice_id = ?', [customer_id, product_id, quantity, total_amount, date, invoiceId]);
        res.redirect('/invoices');
    } catch (err) {
        return res.status(500).send('Error updating invoice');
    }
});

app.post('/invoices/delete/:id', async (req, res) => {
    const invoiceId = req.params.id;
    try {
        await connection.query('DELETE FROM Invoice WHERE invoice_id = ?', [invoiceId]);
        res.redirect('/invoices');
    } catch (err) {
        return res.status(500).send('Error deleting invoice');
    }
});

// app.get('/', (req, res) => {

//     res.send('Hello, World!');
// });
app.get('/test', async (req, res) => {
    try {
        const [customer] = await connection.query('SELECT * FROM Customer');
        res.render('test', {
            customer
            // title: 'Test Page',
            // header: 'Welcome to the Test Page' // Add any other data you want to pass to the template
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).send('Internal Server Error');
    }
  
});
app.get('/:id', async(req, res) => {
    const blankId = req.params.id;
    //res.render('customer-form', {
      //  title: "Customer's history"
   // });
   const [customerData] = await connection.query(
    'SELECT name FROM Customer WHERE customer_id = ?',
    [blankId]
); 
if (customerData.length === 0) {
    return res.status(404).send('Page not found <a href="/">Return to main page</a>');
}

      res.render('test', {
        title: `page does not exist`,
        
      });
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
