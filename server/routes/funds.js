const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');
const SavedFund = require('../models/SavedFund');
const User = require('../models/User');

// Search mutual funds
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const response = await axios.get(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`);
    
    if (!response.data || response.data.length === 0) {
      return res.json([]);
    }
    
    res.json(response.data);
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ message: 'Error fetching funds. Please try again later.' });
  }
});

// Get fund details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Valid fund ID is required' });
    }
    
    const response = await axios.get(`https://api.mfapi.in/mf/${id}`);
    
    if (!response.data || !response.data.meta) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    
    res.json(response.data);
  } catch (err) {
    console.error('Fund details error:', err.message);
    res.status(500).json({ message: 'Error fetching fund details. Please try again later.' });
  }
});

// Save fund
router.post('/save', auth, async (req, res) => {
  try {
    const { fundId, name } = req.body;
    
    if (!fundId || !name) {
      return res.status(400).json({ message: 'Fund ID and name are required' });
    }
    
    // Check if fund already saved
    const existingSavedFund = await SavedFund.findOne({ 
      user: req.user.id, 
      fundId: fundId 
    });
    
    if (existingSavedFund) {
      return res.status(400).json({ message: 'Fund already saved' });
    }
    
    // Create new saved fund
    const savedFund = new SavedFund({
      user: req.user.id,
      fundId,
      name
    });
    
    await savedFund.save();
    
    // Get all saved funds for the user
    const savedFunds = await SavedFund.find({ user: req.user.id });
    
    res.status(201).json(savedFunds);
  } catch (err) {
    console.error('Save fund error:', err.message);
    res.status(500).json({ message: 'Error saving fund. Please try again later.' });
  }
});

// Get saved funds
router.get('/saved/all', auth, async (req, res) => {
  try {
    const savedFunds = await SavedFund.find({ user: req.user.id })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.json(savedFunds);
  } catch (err) {
    console.error('Get saved funds error:', err.message);
    res.status(500).json({ message: 'Error retrieving saved funds. Please try again later.' });
  }
});

// Remove saved fund
router.delete('/saved/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the saved fund
    const result = await SavedFund.findOneAndDelete({ 
      user: req.user.id, 
      fundId: id 
    });
    
    if (!result) {
      return res.status(404).json({ message: 'Saved fund not found' });
    }
    
    // Get updated list of saved funds
    const savedFunds = await SavedFund.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(savedFunds);
  } catch (err) {
    console.error('Remove saved fund error:', err.message);
    res.status(500).json({ message: 'Error removing saved fund. Please try again later.' });
  }
});

// Check if a fund is saved by the current user
router.get('/saved/check/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const savedFund = await SavedFund.findOne({ 
      user: req.user.id, 
      fundId: id 
    });
    
    res.json({ isSaved: !!savedFund });
  } catch (err) {
    console.error('Check saved fund error:', err.message);
    res.status(500).json({ message: 'Error checking saved status. Please try again later.' });
  }
});

module.exports = router;