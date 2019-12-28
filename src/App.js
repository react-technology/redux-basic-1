import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm'
import Control from './component/Control'
import TaskList from './component/TaskList'
import _ from 'lodash'
import { findIndex } from 'lodash'
import demo from './tranning/demo_v2'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],  // id: unique, name, status
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    // Compoent Did Mount: chỉ được gọi một lần, mỗi khi component đc mount
    componentDidMount() {
        console.log('componentDidMount' + ' ' + localStorage.getItem('tasks'));
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            // console.log('task = ' + tasks)
            this.setState({
                tasks: tasks
            })
            // console.log('tasks = ' + this.state.task)
        }
    }

    onGenerateDate = () => {
        var tasks = [
            {
                id: this.generateID(),
                name: 'Học Lập Trình',
                status: true
            },
            {
                id: this.generateID(),
                name: 'Đi chơi',
                status: false
            },
            {
                id: this.generateID(),
                name: 'Ngủ',
                status: true
            }
        ]
        console.log(tasks)
        this.setState({
            tasks: tasks
        })
        // console.log('generate = ' + this.state.tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks))  // conver object to string
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }

    /* Close Form */
    onCloseForm = () => {
        console.log('onCloseForm')
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    /* Show Form */
    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    /* Sunmit Form Data */
    onSubmit = (data) => {
        console.log(data)
        var { tasks } = this.state;
        if (data.id === '') {
            // insert
            data.id = this.generateID();
            tasks.push(data);
        } else {
            // update
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // var task = {
        //   id: this.generateID(),
        //   name: name,
        //   status: status
        // }

    }

    /* Update Item Status */
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id)
        console.log(index)
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /* Find Item Index */
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id == id) {
                result = index;
            }
        });
        return result;
    }

    /* Delete Item */
    onDelete = (id) => {
        console.log(id)
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    /* Update Item */
    onUpdate = (id) => {
        console.log(id)
        var { tasks } = this.state;
        // var index = this.findIndex(id);
        // var index = _.findIndex(tasks, (task) => {
        //     return task.id === id;
        // })
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        })
        var taskEditing = tasks[index];
        console.log(taskEditing)
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();
    }

    /* Filter */
    onFileter = (filterName, filterStatus) => {
        console.log(filterName + ' ' + filterStatus)
        filterStatus = parseInt(filterStatus, 10)
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    /* Search */
    onSearch = (keyword) => {
        console.log(keyword)
        this.setState({
            keyword: keyword
        })

    }

    /* Sort */
    onSort = (sortBy, sortValue) => {
        console.log(sortBy + ' ' + sortValue)
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
        console.log(this.state)
    }

    render() {
        var {
            tasks,
            isDisplayForm,
            taskEditing,
            filter,
            keyword,
            sortBy,
            sortValue
        } = this.state;  /* var task = this.state.tasks */

        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }

            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false);
                }
            })
        }

        /* Filter */
        if (keyword) {
            // tasks = tasks.filter((task) => {
            //     return task.name.toLowerCase().indexOf(keyword) !== -1;
            // })
            tasks = _.filter(tasks, (task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
        }

        /* Sort */
        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) {
                    return sortValue;
                } else if (a.name < b.name) {
                    return -sortValue;
                } else {
                    return 0;
                }
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) {
                    return -sortValue;
                } else if (a.status < b.status) {
                    return sortValue;
                } else {
                    return 0;
                }
            })
        }

        var elementTaskForm = isDisplayForm ? <TaskForm
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
            task={taskEditing}
        /> : ''
        // var tasks = this.state.tasks;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>

                        {/* Form */}
                        {/* <TaskForm /> */}
                        {elementTaskForm}
                    </div>
                    <div
                        className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={this.onGenerateDate}>
                            Generate Data
                        </button>

                        {/* Search - Sort */}
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />

                        {/* List */}
                        <TaskList
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFileter={this.onFileter}
                        />

                    </div>
                </div>
            </div>

        );
    }
}

export default App;
