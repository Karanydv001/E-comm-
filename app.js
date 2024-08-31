const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const clothingItems = [
    { id: 1, name: 'T-Shirt', description: 'Comfortable cotton t-shirt', price: 19.99, image: 'tshirt.jpg' },
    { id: 2, name: 'Jeans', description: 'Stylish denim jeans', price: 39.99, image: 'jeans.jpg' },
    { id: 3, name: 'Jacket', description: 'Warm winter jacket', price: 79.99, image: 'jacket.jpg' },
    // Add more items here...
];

app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredItems = clothingItems.filter(item =>
        item.name.toLowerCase().includes(query)
    );
    res.json(filteredItems);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
