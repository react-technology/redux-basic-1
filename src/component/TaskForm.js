import React, {Component} from 'react'

export default class TaskForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (!nextProps.task) {
            this.state = {
                id: '',
                name: '',
                status: false
            }
        }

    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name
        var value = target.value
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.onSubmit(this.state);
        // Cancel && Close Form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        var {id} = this.state;
        return (

            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        {id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                        <span
                            className="fa fa-times-circle text-right mr-5"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div class="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="">Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Input field"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div class="form-group">
                            <label for="">Trạng Thái :</label>
                            <select
                                name="status"
                                className="form-control"
                                value={this.state.status}
                                onChange={this.onChange}
                                required="required"
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Hide</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" class="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-danger" onClick={this.onClear}>
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}