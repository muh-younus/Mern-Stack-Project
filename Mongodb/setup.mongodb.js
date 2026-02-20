use('ecommerceDb');

db.products.insertMany([
    {
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics',    
        stock: 50
    },
    {       
        name: 'Smartphone',
        price: 499.99,
        category: 'Electronics',
        stock: 100
    },
    {       
        name: 'Smartphone11',
        price: 499.99,
        category: 'Electronics11',
        stock: 100
    },
])