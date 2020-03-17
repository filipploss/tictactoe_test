

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;

    default:
      return state;
  }
};

export default reducer;



// const {dispatch} = store;

// это вешаем на онклик
// store.dispatch(inc());
// store.dispatch(dec());
// store.dispatch(rnd(payload));