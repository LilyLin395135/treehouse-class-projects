const order = false;

//create a new promise called breakfast promise
//promise 的參數，完成時是 resolve，失敗時是 reject
const breakfastPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (order) {
            resolve('Your order is ready. Come and get it!');
        }
        else {
            reject(Error('Oh no! There was a problem with your order'));
        }
    }, 3000);

});

console.log(breakfastPromise); // Promise { <pending> }

//promise 的方法，then()，接收兩個參數，第一個是成功時的 callback，第二個是失敗時的 callback
//第一個參數是resolve的值，第二個參數是reject的值
breakfastPromise.then(val => console.log(val), err => console.log(err));

//promise 的方法，catch()，只接收一個參數，是失敗時的 callback
breakfastPromise.catch(err => console.log(err));
