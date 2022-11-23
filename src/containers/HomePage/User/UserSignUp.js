import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import FeatureBar from '../FeatureBar';
import './UserSignUp.scss';
import { withRouter } from 'react-router';
class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            isTogglePassword: false,
            errMessage: ''
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleToLogIn = () => {
        if (this.props.history) {
            this.props.history.push(`/log-in`);
        }
    }
    handleTextonChange = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({ ...copyState });
    }
    handleAddnewUser = async () => {
        let { username, email, password } = this.state;
        this.setState({
            errMessage: ''
        })
        try {
            let res = await this.props.addNewUserStart({
                username: username,
                email: email,
                password: password,
            })
            let { resAddUser } = this.props;
            if (resAddUser && resAddUser.errCode !== 0) {
                this.setState({ errMessage: resAddUser.errMessage });
            }
        } catch (error) {
            let errData = error.response.data;
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: errData.message,
                    })
                }
            }
        }

    }
    handleTogglePassword = () => {
        this.setState({
            isTogglePassword: !this.state.isTogglePassword
        })
    }
    render() {
        let { username, email, password } = this.state;
        return (
            <>
                <HomeHeader />
                <FeatureBar
                    text={'Đăng ký'}
                />
                <div className="UserSignUp-container">
                    <div className="UserSignUp-content">
                        <div className="custom-input form-group">
                            <label htmlFor="">Biệt danh</label>
                            <input type="text"
                                value={username}
                                onChange={(e) => this.handleTextonChange(e, 'username')}
                            />
                        </div>
                        <div className="custom-input form-group">
                            <label htmlFor="">Email</label>
                            <input type="email"
                                value={email}
                                onChange={(e) => this.handleTextonChange(e, 'email')}
                            />
                        </div>
                        <div className="custom-input form-group password-input">
                            <label htmlFor="">Mật khẩu</label>
                            <input
                                value={password}
                                onChange={(e) => this.handleTextonChange(e, 'password')}
                                type={this.state.isTogglePassword ? 'text' : 'password'}
                            />
                            <span
                                className='toggleEye'
                                onClick={() => { this.handleTogglePassword() }}
                            >
                                <i className={this.state.isTogglePassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                            </span>
                        </div>
                        <div className={`message ${this.state.errMessage === "OK" ? 'green-txt' : 'red-txt'}`}>
                            <span>{this.state.errMessage}</span>
                        </div>
                        <div className="custom-login form-group">
                            <button className='sign-up-input'
                                onClick={() => this.handleAddnewUser()}
                            >Đăng ký</button>
                        </div>
                        <div className="custom-login form-group">
                            <label className="forget-pass" htmlFor=""
                            >Bạn đã có tài khoản ?</label>
                            <label className="forget-pass" htmlFor=""
                                onClick={() => this.handleToLogIn()}
                            >Đăng nhập</label>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        resAddUser: state.admin.resAddUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewUserStart: (data) => dispatch(actions.addNewUserStart(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSignUp));
