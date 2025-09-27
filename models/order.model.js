const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/online-shop";

const orderSchema = mongoose.Schema({
    productName: String,
    productId: String,
    amount: Number,
    totalPrice: Number,
    userId: String,
    address: String,
    status: String,
    timestamp: Number
});

const OrderItem = mongoose.model("order", orderSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL)
        .then(() => {
            return OrderItem.find({productId: data.productId})
        })
        .then((z) => {
            if(z.length==0) {
                let item = new OrderItem(data);
                //console.log(item)
                return item.save();
            }
            else {
                return OrderItem.updateOne({productId: data.productId}, data)
            }
        })
        .then((items) => {
            mongoose.disconnect();
            //console.log(items)
            resolve(items);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.getOrdersByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => OrderItem.find({ userId: userId },{}, {sort: {timestamp: 1}}))
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};