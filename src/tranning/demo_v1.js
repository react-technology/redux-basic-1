import { createStore } from 'redux';
import { status, sort } from './actions/index'

/* Init */
var initialSate = {
    status: false,
    sort: {
        by: 'name',
        value: 1    // 1: tăng, -1 giảm
    }
}

/*  Create Reducer */
var myReducer = (state = initialSate, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        // var { by, value } = state.sort;
        // var { status } = state;
        // return {
        //     status: !status,
        //     sort: {
        //         by: by,
        //         value: value
        //     }
        // };
        state.status = !state.status;
        return state;
    }
    if (action.type === 'SORT') {
        var { by, value } = action.sort;
        var { status } = state;

        /*         state.sort = {
                    by: action.sort.by,
                    value: action.sort.value
                } */
        return {
            status: status,
            sort: {
                by: by,
                value: value
            }
        };
    }
    return state;
}

const store = createStore(myReducer);
console.log(store)

console.log('Default: ', store.getState())

/* Thực hiện công việc thay đổi status */
/* var action = { type: 'TOGGLE_STATUS' }; */
store.dispatch(status());
console.log(status())
console.log('TOGGLE_STATUS: ', store.getState())

// Thực hiện công việc sắp xếp từ Z -> A
/* var sortAction = {
    type: 'SORT',
    sort: {
        by: 'name',
        value: -1
    }
} */

store.dispatch(sort({
    by: 'name',
    value: -1
}))
console.log('SORT : ', store.getState())