var initalState = false;

var myReducer = (state = initalState, actions) => {
    if (actions.type === 'TOGGLE_STATUS') {
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;