import status from './status'
import sort from './sort'
import { combineReducers } from 'redux'

const myReducer = combineReducers({
    status: status,
    sort: sort
})

/* var initalState = {
    status: false,
    sort: {
        by: 'name',
        value: -1
    }
}

var myReducer = (state = initalState, actions) => {
    if (actions.type === 'TOGGLE_STATUS') {
        state.status = !state.status;
        return state;
    }
    if (actions.type === 'SORT') {
        var { by, value } = actions.sort;
        var { status } = state;
        return {
            status: status,
            by: by,
            value: value
        }
    }
    return state;
}
 */
export default myReducer;