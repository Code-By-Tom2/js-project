// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Data (This could come from a database in a real app)
const courses = [
    {
        id: 1,
        title: "Body Language Mastery",
        description: "Understand and control your body language to communicate more effectively.",
        image: "https://images.unsplash.com/photo-1559339163-c3e10c07b63b?crop=entropy&cs=tinysrgb&w=400&fit=max"
    },
    {
        id: 2,
        title: "English Speaking Fluency",
        description: "Boost your speaking skills with practical exercises and real-life conversations.",
        image: "https://images.unsplash.com/photo-1531491291228-73c1e67236f1?crop=entropy&cs=tinysrgb&w=400&fit=max"
    }
];

// Routes
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Here you would typically handle form submission, like saving to a database or sending an email
    console.log('Contact Form Submission:', { name, email, message });
    res.status(200).json({ message: "Thank you for your message!" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
