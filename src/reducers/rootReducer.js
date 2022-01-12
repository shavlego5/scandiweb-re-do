const initState = {
  defaultCurrency: "USD",
  filterCategory: "all",
  detailsID: "",
  cart: [],
  cartsItemsCount: 0,
  totalCost: 0,
  givenID: 0,
  cartLength: 0,
};

const rootReducer = (state = initState, action) => {
  function cartsItemsCount() {
    let counter = 0;
    state.cart.forEach((item) => (counter += item.quantity));
    state = {
      ...state,
      cartsItemsCount: counter,
    };
  }
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) =>
      item.price.forEach((cur) =>
        cur.currency === state.defaultCurrency
          ? (sum = cur.amount * item.quantity + sum)
          : 0
      )
    );
    state = {
      ...state,
      totalCost: Math.floor(sum * 100) / 100,
    };
  }
  if (action.type === "FILTER_CATEGORY") {
    state = {
      ...state,
      filterCategory: action.name,
    };
  }
  if (action.type === "CHANGE_CURRENCY") {
    state = {
      ...state,
      defaultCurrency: action.currency,
    };
    cartsItemsCount();
    calculateTotal();
  }
  if (action.type === "GET_PRODUCT_ID") {
    state = {
      ...state,
      detailsID: action.id,
    };
  }
  if (action.type === "ADD_TO_CART") {
    if (state.cart.filter((e) => e.id === action.item.id).length < 1) {
      state = {
        ...state,
        cart: [...state.cart, action.item],
      };
      cartsItemsCount();
      calculateTotal();
    } else if (state.cart.filter((e) => e.id === action.item.id).length > 0) {
      let contains = "no";
      let obj = state.cart.filter((e) => e.id === action.item.id);
      obj.forEach((x) =>
        Object.values(x.attr).toString() ===
        Object.values(action.item.attr).toString()
          ? ((x.quantity = x.quantity + 1), (contains = "yes"))
          : null
      );

      if (contains === "no") {
        state = {
          ...state,
          cart: [...state.cart, action.item],
        };
      }
      cartsItemsCount();
      calculateTotal();
    }
    state.cart[state.cart.length - 1]["givenID"] =
      "item-" + (state.cart.length - 1);
  }
  if (action.type === "CHANGE_ITEMS_PROPERTY") {
    let toChange = state.cart.find((el) => el.givenID === action.item[2]);
    toChange.attr[action.item[0]] = action.item[1];
    state = {
      ...state,
      cart: state.cart.map((item) =>
        item.givenID !== action.item[2] ? item : toChange
      ),
    };
  }
  if (action.type === "INCREMENT") {
    let toChange = state.cart.find((el) => el.givenID === action.item);
    toChange.quantity += 1;
    state = {
      ...state,
      cart: state.cart.map((item) =>
        item.givenID !== action.item ? item : toChange
      ),
    };
    cartsItemsCount();
    calculateTotal();
  }
  if (action.type === "DECREMENT") {
    let toChange = state.cart.find((el) => el.givenID === action.item);
    toChange.quantity -= 1;
    state = {
      ...state,
      cart: state.cart.map((item) =>
        item.givenID !== action.item ? item : toChange
      ),
    };
    cartsItemsCount();
    calculateTotal();
  }
  if (action.type === "DELETE_CART_ITEM") {
    let newCart = state.cart.filter((cart) => {
      return action.item !== cart.givenID;
    });
    state = {
      ...state,
      cart: newCart
    };
    for(let i=0; i< state.cart.length; i++) {
      state.cart[i]["givenID"] = "item-" + i
    }
    cartsItemsCount();
    calculateTotal();
  }
  return state;
};

export default rootReducer;
