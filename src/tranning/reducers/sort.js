var initalState = {
    by: 'name',
    value: -1
}

var myReducer = (state = initalState, actions) => {
    if (actions.type === 'SORT') {
        var { by, value } = actions.sort;
        return { by, value }
    }
    return state;
}

export default myReducer;