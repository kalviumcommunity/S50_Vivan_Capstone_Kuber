const express = require('express');
const router = express.Router();
const { couponmodel } = require("../Model/coupon");

// Get all coupons
router.get('/coupons', async (req, res, next) => {
    try {
        const coupons = await couponmodel.find();
        res.json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve coupons' });
    }
});

// Get a single coupon by ID
router.get('/coupons/:id', async (req, res) => {
    try {
        const coupon = await couponmodel.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve coupon' });
    }
});

// Create a new coupon
router.post('/coupons', async (req, res, next) => {
    try {
        console.log('Incoming request body:', req.body);

        const { image, ...couponData } = req.body;


        console.log('Extracted coupon data:', couponData);
        console.log('Image URL:', image);


        const newCoupon = new couponmodel({ ...couponData, image });
        await newCoupon.save();


        res.status(201).json(newCoupon);
    } catch (error) {

        console.error('Error during coupon creation:', error);


        res.status(500).json({ message: 'Failed to create coupon', error: error.message });
    }
});


// Update an existing coupon by ID
router.put('/coupons/:id', async (req, res, next) => {
    try {
        const updatedCoupon = await couponmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json(updatedCoupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update coupon' });
    }
});

// Delete a coupon by ID
router.delete('/coupons/:id', async (req, res, next) => {
    try {
        const deletedCoupon = await couponmodel.findByIdAndDelete(req.params.id);
        if (!deletedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete coupon' });
    }
});

module.exports = router;
