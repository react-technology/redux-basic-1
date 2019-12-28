import { createStore } from 'redux';
import { status, sort } from './actions/index'
import myReducer from './reducers/index'

const store = createStore(myReducer);
console.log(store);
console.log('Default: ', store.getState())

/* Thêm công việc thay đổi status */
store.dispatch(status())
console.log('TOGGLE_STATUS: ', store.getState())

/* Thêm công việc sắp xếp Z -> A */
store.dispatch(sort({
    by: 'name',
    value: -1
}))
console.log('SORT: ', store.getState())
