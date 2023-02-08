const { faker } = require('@faker-js/faker');
const inventoryPricing = {
  apple: 22.09,
  banana: 4.5,
  orange: 6.78,
};

const itemTotal = (item, quantity) => {
  return inventoryPricing[item] * quantity;
};

const orderSummary = (orderData) => {
  return {
    customerDetails: {
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
    },
    transactionId: orderData.transactionId,
    orderNumber: faker.random.numeric(6, { bannedDigits: ['0'] }),
    itemDetails: {
      name: orderData.item,
      quantity: orderData.quantity,
    },
    orderTotal: itemTotal(orderData.item, orderData.quantity),
  };
};

module.exports = {
  orderSummary,
};
