import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="navbar">
                    <ul>
                        <li><Link to="/">الرئيسية</Link></li>
                        <li><Link to="/post/create">إنشاء تدوينة</Link></li>
                        <li><a href="#logout" onClick={this.logout}>تسجيل الخروج</a></li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="navbar">
                <ul>
                    <li><Link to="/">الرئيسية</Link></li>
                    <li><Link to="/post/create">إنشاء تدوينة</Link></li>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/register">التسجيل</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header);