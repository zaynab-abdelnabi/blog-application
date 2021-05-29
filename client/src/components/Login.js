import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        if(localStorage.getItem('token')){
            this.props.history.push('/');
        }
        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };
    onChangePassword = e => {
        this.setState({ password: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/api/auth', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token };
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
                <h4>تسجيل دخول</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>البريد الالكتروني</label>
                    <input type="email" id="email" value={this.state.email} onChange={this.onChangeEmail} />
                    <label>كلمة المرور</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.onChangePassword} />
                    <input className="button-primary" type="submit" value="تسجيل الدخول" />
                </form>
            </div>
        );
    }
}

export default Login;