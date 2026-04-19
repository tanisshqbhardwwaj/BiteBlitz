const express = require('express');
const router = express.Router();

// Mock Data for Restaurants
const restaurants = [
    { id: 1, name: 'Pasta Place', cuisine: 'Italian', location: { lat: 40.7128, lng: -74.0060 } },
    { id: 2, name: 'Sushi Central', cuisine: 'Japanese', location: { lat: 34.0522, lng: -118.2437 } },
    { id: 3, name: 'Burger Town', cuisine: 'American', location: { lat: 41.8781, lng: -87.6298 } }
];

// Endpoint to get the list of restaurants
router.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Endpoint to search restaurants by cuisine
router.get('/restaurants/search', (req, res) => {
    const { cuisine } = req.query;
    const results = restaurants.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
    res.json(results);
});

// Endpoint to find nearby restaurants based on latitude and longitude
router.get('/restaurants/nearby', (req, res) => {
    const { lat, lng, distance } = req.query;
    const nearby = restaurants.filter(r => {
        const dist = Math.sqrt(Math.pow(r.location.lat - lat, 2) + Math.pow(r.location.lng - lng, 2));
        return dist <= distance;
    });
    res.json(nearby);
});

module.exports = router;