const express = require('express');
const router = express.Router(); 
const { couponmodel } = require("../Model/coupon"); 


router.get('/coupons', async (req, res, next) => {
    try {
        const coupons = await couponmodel.find();
        res.json(coupons);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.get('/coupons/:id', async (req, res) => {
    try {
      const coupon = await couponmodel.findById(req.params.id);
  
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post('/coupons', async (req, res, next) => {
    try {
        const newCoupon = await couponmodel.create(req.body);
        res.status(201).json(newCoupon);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/coupons/:id', async (req, res, next) => {
    try {
        const updatedCoupon = await couponmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.json(updatedCoupon);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.delete('/coupons/:id', async (req, res, next) => {
    try {
        const deletedCoupon = await couponmodel.findByIdAndDelete(req.params.id);
        if (!deletedCoupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router; 
