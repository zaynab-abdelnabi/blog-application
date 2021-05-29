import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
        if(localStorage.getItem('token')){
            this.props.history.push('/');
        }
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
        };
    }

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };
    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };
    onChangePassword = e => {
        this.setState({ password: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/api/register', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = {'Authorization' : res.data.token};
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    renderError = () => {
        return this.state.error ? (
        <blockquote>{this.state.error}</blockquote>
        ) : "";
    };

    render() {
        return (
            <div className="column column-50 column-offset-25">
                <br />
                <h4>إنشاء حساب جديد</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>الاسم</label>
                    <input type="text" id="name" value={this.state.name} onChange={this.onChangeName} />
                    <label>البريد الالكتروني</label>
                    <input type="email" id="email" value={this.state.email} onChange={this.onChangeEmail} />
                    <label>كلمة المرور</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.onChangePassword} />
                    <input className="button-primary" type="submit" value="التسجيل" />
                </form>
            </div>
        );
    }
}

export default Register;