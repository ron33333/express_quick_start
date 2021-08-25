const fs = require('fs');

/*
    given an interface of user (from above) make the following functions:
    add, delete, get, update
*/

function getUsers() {
    return require('../db/users.json');
}

function setUsers(users) {
    fs.writeFileSync("./db/users.json", JSON.stringify(users));
}

function add(user) {
    const foundUser = getUser(user.email);
    const users = getUsers();
    if (!foundUser) {
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        users.push(newUser);
        setUsers(users);
        return true;
    }
    return false;
}

function getUser(email) {
    const users = getUsers();
    const foundUser = users.find(existingUser => existingUser.email === email);
    return foundUser;
}

function deleteUser(email) {
    const users = getUsers();
    const filteredUsers = users.filter(existingUser => existingUser.email !== email);
    setUsers(filteredUsers);
}

function update(email, data) {
    const users = getUsers();
    const foundUser = users.find(existingUser => existingUser.email === email);
    if (!foundUser) return false;
    Object.keys(foundUser).forEach(key => {
        if (data[key]) {
            foundUser[key] = data[key];
        }
    });
    setUsers(users);
    return foundUser;
}

function getAll() {
    return getUsers();
}

module.exports = {
    update,
    getAll,
    getUser,
    deleteUser,
    add
}








































// function createCoupon(coupon){

//     const newCoupon = createCoupon(coupon.code);
//     const coupons = createCoupon();
//     if (!newCoupon) {
//         const newCoupons = {
//             coupon: coupon.code,
//             couponDate: coupon.couponDate,
//             isRedeem : coupon.isRedeem
//         }
//         coupons.push(newCoupon);
//         setUsers(users);
//         return true;
//     }
//     return false;


// }

// function getAllCoupons(code){
//     const allCoupons = getAllCoupons();
//     const foundCoupon = allCoupons.find(existingCoupon => existingCoupon.code === code);
//     return foundCoupon;
// }

// function update(code, data) {
//     const coupons = createCoupon();
//     const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
//     if (!foundCoupon) return false;
//     Object.keys(foundCoupon).forEach(key => {
//         if (data[key]) {
//             foundCoupon[key] = data[key];
//         }
//     });
//     setCoupons(coupons);
//     return foundCoupon;

//     function deleteCoupon(code) {
//         const coupons = getAllCoupons();
//         const filter = coupons.filter(existingCoupon => existingCoupon.code !== code);
//         setCoupons(filteredCoupons);
//     }