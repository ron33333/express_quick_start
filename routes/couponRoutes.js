const express = require('express');
const router = express.Router();
const couponService = require('../services/couponService');

// Get all coupons
router.get('/', (req, res) => {
    const coupons = couponService.getAllCoupons();
    res.send(coupons);
})

// Get a specific coupon
router.get('/:code', (req, res) => {
    const { code } = req.params;
    const coupon = couponService.getExistingCoupon(code);
    if (!coupon) {
        res.status(404).send();
    } else {
        res.send(coupon);
    }
})

// Create a coupon
router.post('/', (req, res) => { // add a coupon
    const coupon = req.body;
    console.log(req.body)
    if (coupon.code != undefined && coupon.couponDate != undefined && coupon.isRedeem != undefined) {
        const success = couponService.createCoupon(coupon);
        if (success) {
            res.status(201).send('coupon added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// Delete a coupon
router.delete('/:code', (req, res) => {
    const { code } = req.params;
    couponService.removeCoupon(code);
    res.send();
})

// Update a coupon
router.put('/:code', (req, res) => {
    const toUpdate = req.body;
    console.log(req.body)
    const { code } = req.params;
    const updatedcoupon = couponService.updateCoupon(code, toUpdate);
    console.log(updatedcoupon)
    if (updatedcoupon) {
        res.send(updatedcoupon);
    } else {
        res.status(400).send();
    }
})

//Redeem a coupon code

router.post('/:code/redeem', (req, res) => {
    const { code } = req.params;
    const coupon = couponService.getExistingCoupon(code)
    console.log(coupon.isRedeem)
    if (!coupon.isRedeem) {
        if (couponService.redeemedCoupon(code)) {
            res.status(202).send('redeemed coupon');
        }
    } else {
        res.status(400).send('coupon was already redeemed')
    }
})

module.exports = router;