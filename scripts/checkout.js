import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
//import "../data/cart-class.js";
//import "../../Exercises/17/data/car.js";
//import "../data/backend-practice.js";

//async makes a function return a promise
//async let us use await
//await let us wait for a promise to finish before going to its next line
//below code is euqal to code...
// function loadPage() {
//   return new Promise((resolve) => {
//     console.log("load page");
//     resolve();
//   })
//     .then(() => {
//       return loadProductsFetch();
//     })
//     .then(() => {
//       return new Promise((resolve) => {
//         resolve("value2");
//       });
//     });
// }
async function loadPage() {
  try {
    await Promise.all((resolve) => {
      loadProductsFetch();
      loadCartFetch();
    });
    //throw "error1"; //manually create in an error
    //try catch can be use with sunchronous code/ normal code
    //when code inside try gets an error we can catch it
    //await loadProductsFetch();
    //use await instead of using .then(() => {});
    //cna only use await when inside an async function

    // const value = await new Promise((resolve, reject) => {
    //   // throw "error2"; //throw does not work in the future. so need reject
    //   loadCart(() => {
    //     //reject("error3"); //create error in the future
    //     resolve("value3");
    //   });
    // });
    //await loadCartFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();
/*
Promise.all([
  loadProductsFetch(),
  // new Promise((resolve) => {
  //   loadProductsFetch(() => {
  //     resolve("value1");
  //   });
  // }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});*/

/*
new Promise((resolve) => {
  //promise runs inner function immediately
  //resolve control when to go to the next step
  loadProducts(() => {
    resolve("value1"); //passable parameter to the next step
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
  */

//Promise create a seperate thread of code
//function above and below runs at the same time
//so that JS can do multiplay things at the same time
//With Promise out codes are more flat

//Promis.all(), let us run multiple promises at the same time
//,and wait for att of them to finish

//code before making Promise
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   });
// });

//promise does the same thing as a callback
//callback causes a lot of nesting making code hard to work with
