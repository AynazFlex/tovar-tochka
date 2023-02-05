class Store {
  constructor({ initState, reducer }) {
    this.reducer = reducer;
    this.state = initState;
    this.consumers = [];
  }

  dispatchEvent(actions) {
    const newState = actions.reduce((state, action) => this.reducer(state, action), this.state)
    this.consumers.forEach((item) => item(newState));
    this.state = newState;
  }

  getSelector(callback) {
    return callback({...this.state})
  }

  addConsumer(callback) {
    this.consumers.push(callback);
  }
}

const initState = {
  products: [
    {
      id: "UZcotton",
      productAmount: 1,
      maxValue: 2,
      productSelected: true,
      unitPrice: 1051,
      unitDiscountPrice: 522,
      totalPrice: 1051,
      totalDiscountPrice: 522,
    },
    {
      id: "case",
      productAmount: 200,
      maxValue: null,
      productSelected: true,
      unitPrice: 11500.235,
      unitDiscountPrice: 10500.235,
      totalPrice: 2300047,
      totalDiscountPrice: 2100047,
    },
    {
      id: "pencils",
      productAmount: 2,
      maxValue: 2,
      productSelected: true,
      unitPrice: 475,
      unitDiscountPrice: 247,
      totalPrice: 950,
      totalDiscountPrice: 494,
    },
  ],
  totalDiscountSum: 2101063,
  totalSum: 2302048,
  discountSum: -200985,
  selectAll: true,
  amount: 3,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };
    }
    case "SELECT_PRODUCT": {
      return {
        ...state,
        products: state.products.map((product) =>
          action.id === product.id
            ? {
                ...product,
                productSelected: action.checked,
              }
            : product
        ),
      };
    }
    case "SELECT_PRODUCTS": {
      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          productSelected: action.checked,
        })),
      };
    }
    case "PLUS_PRODUCT": {
      const product = state.products.find(
        (product) => product.id === action.id
      );
      const prev = product.productAmount;
      const max = product.maxValue;
      const amount = max ? (max > prev ? prev + 1 : prev) : prev + 1;
      return {
        ...state,
        products: [
          ...state.products.map((product) =>
            action.id === product.id
              ? {
                  ...product,
                  productAmount: amount,
                  totalPrice: Math.round(amount * product.unitPrice),
                  totalDiscountPrice: Math.round(
                    amount * product.unitDiscountPrice
                  ),
                }
              : product
          ),
        ],
      };
    }
    case "MINUS_PRODUCT": {
      const product = state.products.find(
        (product) => product.id === action.id
      );
      const prev = product.productAmount;
      const amount = prev > 1 ? prev - 1 : prev;
      return {
        ...state,
        products: [
          ...state.products.map((product) =>
            action.id === product.id
              ? {
                  ...product,
                  productAmount: amount,
                  totalPrice: Math.round(amount * product.unitPrice),
                  totalDiscountPrice: Math.round(
                    amount * product.unitDiscountPrice
                  ),
                }
              : product
          ),
        ],
      };
    }
    case "CALCULATE": {
      const [totalDiscountSum, totalSum] = state.products.reduce(
        (arr, item) => {
          if (item.productSelected) {
            arr[0] += item.totalDiscountPrice;
            arr[1] += item.totalPrice;
          }
          return arr;
        },
        [0, 0]
      );
      return {
        ...state,
        totalDiscountSum,
        totalSum,
        discountSum: totalDiscountSum - totalSum,
        selectAll: !state.products.find(
          (product) => product.productSelected === false
        ),
        amount: state.products.filter(product => product.productSelected).length
      };
    }
  }
  return state;
};

const products = new Store({ initState, reducer });

export default products;
