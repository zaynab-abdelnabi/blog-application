import React from 'react';
import axios from 'axios';

class EditPost extends React.Component {

    constructor(props) {
        super(props);
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        this.state = {
            title: '',
            content: '',
            authorId:'',
            isLoading: true,
            error: ''
        };
    }

    onChangeTitle = e => {
        this.setState({
            title: e.target.value,
            error: ''
        });
    };
    onChangeContent = e => {
        this.setState({
            content: e.target.value,
            error: ''
        });
    };
    onSubmit = e => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            content: this.state.content
        };
        axios.put('/api/posts/'+this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    componentDidMount(){
        axios.get('/api/posts/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                title: res.data.title,
                content: res.data.content,
                authorId: res.data.author._id,
                isLoading:false
            })
        })
    }

    renderError = () => {
        return this.state.error ? (
            <blockquote>{this.state.error}</blockquote>
        ) : "";
    };

    render() {
        if(this.state.isLoading){
            return(<h4>الرجاء الإنتظار</h4>)
        }
        if(localStorage.getItem('_id') !== this.state.authorId){
            return(<blockquote>خطأ 403</blockquote>)
        }
        return (
            <div className="column column-50 column-offset-25">
                <br />
                <h4>تعديل التدوينة</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>عنوان التدوينة</label>
                    <input type="text" id="content" value={this.state.title} onChange={this.onChangeTitle} />
                    <label>المحتوى</label>
                    <textarea id="content" value={this.state.content} onChange={this.onChangeContent}></textarea>
                    <input className="button-primary" type="submit" value="تعديل التدوينة" />
                </form>
            </div>
        );
    }
}

export default EditPost