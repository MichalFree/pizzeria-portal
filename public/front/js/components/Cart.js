import { settings, select, classNames, templates } from './../settings.js';
import { utils } from './../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
  }
  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = element.querySelector(select.cart.deliveryFee);
    thisCart.dom.totalNumber = element.querySelector(select.cart.totalNumber);
    thisCart.dom.subtotalPrice = element.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = element.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.address = thisCart.dom.form.querySelector(select.cart.address);
    thisCart.dom.phone = thisCart.dom.form.querySelector(select.cart.phone);
  }
  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.prepareOrder();
    });
  }
  add(menuProduct) {
    console.log('Cart.add: ', menuProduct);
    const thisCart = this;
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('thisCart.products', thisCart.products);
    thisCart.update();
  }
  remove(removedProduct) {
    const thisCart = this;
    const indexOfRemovedProduct = thisCart.products.indexOf(removedProduct);
    removedProduct.dom.wrapper.remove();
    thisCart.products.splice(indexOfRemovedProduct, 1);
    thisCart.update();
  }
  update() {
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;
    for (const product of thisCart.products) {
      thisCart.totalNumber += product.amount;
      thisCart.subtotalPrice += product.price;
    }
    thisCart.totalNumber == 0 ? thisCart.deliveryFee = 0 : thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    thisCart.dom.subtotalPrice.innerHTML = thisCart.subtotalPrice;
    thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
    for (const domTotalPrice of thisCart.dom.totalPrice) {
      domTotalPrice.innerHTML = thisCart.totalPrice;
    }
  }
  prepareOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    let payload = {};
    payload.address = thisCart.dom.address.value;
    payload.phone = thisCart.dom.phone.value;
    payload.totalPrice = thisCart.totalPrice;
    payload.subtotalPrice = thisCart.subtotalPrice;
    payload.totalNumber = thisCart.totalNumber;
    payload.deliveryFee = thisCart.deliveryFee;
    payload.products = [];
    for (let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }
    thisCart.send(url, payload);
  }
  send (url, payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options);
  }
}

export default Cart;
