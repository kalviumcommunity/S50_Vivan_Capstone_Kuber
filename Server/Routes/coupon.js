const express = require('express');
const router = express.Router();
const  Coupon  = require("../Model/coupon");

router.get('/coupons', async (req, res, next) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve coupons' });
    }
});

router.get('/coupons/:id', async (req, res, next) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve coupon' });
    }
});

router.post("/coupons", async (req, res) => {
    try {
        const { Brand_Name, Code, Date, Description, Link, Price, image, userId } = req.body;
        console.log(Brand_Name, Code, Date, Description, Link, Price, image, userId)

        if (!Brand_Name || !Date || !Price || !Code || !Link || !image || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newCoupon = new Coupon(req.body);
        await newCoupon.save();

        res.status(201).json(newCoupon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.put('/coupons/:id', async (req, res, next) => {
    try {
        const { Brand_Name, Date, Price, Description, Code, Link, image } = req.body;

        if (!Brand_Name || !Date || !Price || !Code || !Link || !image) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("came");
        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json(updatedCoupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update coupon' });
    }
});

router.delete('/coupons/:id', async (req, res, next) => {
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
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
