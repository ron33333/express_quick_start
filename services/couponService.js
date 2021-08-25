const fs = require('fs');
const { get } = require('../routes/couponRoutes');

function getAllCoupons(){
    return require('../db/coupons.json');
}

function getExistingCoupon(code){
   return getAllCoupons().find(existingCoupon => existingCoupon.code === code);
}

function createCoupon(coupon){
    if(!getExistingCoupon(coupon.code)){
       let coupons = getAllCoupons();
       coupons.push({
            code : coupon.code,
            couponDate : coupon.couponDate,
            isRedeem : coupon.isRedeem
        });
        saveToLocalDB(coupons);
        return true
    }
    return false;
}

function checkValidChangingCode(coupon,newCode){
    const filteredCoupons = getAllCoupons().filter(thisCoupon => thisCoupon.code !== coupon.code)
    if(filteredCoupons.find(thisCoupon => thisCoupon.code === newCode)){
        return false;
    }
        return true;
}

function updateCoupon(code, data){
    let coupons = getAllCoupons(); 
    let foundCoupon = getExistingCoupon(code);
    if(foundCoupon && checkValidChangingCode(foundCoupon, data.code)){
        Object.keys(foundCoupon).forEach(key => {
            if (data[key]) {
                foundCoupon[key] = data[key];
            }
        });
        saveToLocalDB(coupons);
        return true;
    }
    return false;
}

function removeCoupon(code){
    let coupons = getAllCoupons(); 
    let filteredCoupons = coupons.filter(existingCoupon => existingCoupon.code !== code)
    saveToLocalDB(filteredCoupons);
}

function redeemedCoupon(code){
    let coupon = getExistingCoupon(code)
    if(coupon.isRedeem === true){
        return false;
    }
        let UpdatedCoupon = {code : coupon.code,
            couponDate : coupon.couponDate,
            isRedeem : true};

        return updateCoupon(code, UpdatedCoupon);
}

function saveToLocalDB(coupons) {
    fs.writeFileSync("./db/coupons.json", JSON.stringify(coupons));
}

module.exports={
    getAllCoupons,
    getExistingCoupon,
    createCoupon,
    redeemedCoupon,
    updateCoupon,
    removeCoupon
}