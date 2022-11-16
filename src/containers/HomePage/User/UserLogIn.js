import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import FeatureBar from '../FeatureBar';
import './UserLogIn.scss';
import { withRouter } from 'react-router';
class UserLogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleSignIn = async () => {
        let { email, password } = this.state;
        this.setState({
            errMessage: ''
        })
        try {
            await this.props.getUserStart({
                email: email,
                password: password,
            })
            let { userData } = this.props;
            console.log('check res', this.props.userData);
            if (userData && userData.errCode !== 0) {
                this.setState({ errMessage: userData.errMessage });
            }
            if (userData && userData.errCode === 0) {
                this.props.userLoginSuccess(userData.user)
            }
            if (this.props.history) {
                this.props.history.push(`/home`);
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
    handleToSignUp = () => {
        if (this.props.history) {
            this.props.history.push(`/sign-up`);
        }
    }
    handleTextonChange = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({ ...copyState });
    }
    handleTogglePassword = () => {
        this.setState({
            isTogglePassword: !this.state.isTogglePassword
        })
    }
    render() {
        let { email, password } = this.state;
        console.log("check state", this.state);
        return (
            <>
                <HomeHeader />
                <FeatureBar
                    text={'Trang đăng nhập'}
                />
                <div className="UserLogIn-container">
                    <div className="userLogIn-content">
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
                            <button className='sign-in-input'
                                onClick={() => this.handleSignIn()}
                            >Đăng nhập</button>
                            <label className="forget-pass" htmlFor="">Quên Mật khẩu ?</label>
                        </div>
                        <div className="custom-login form-group">
                            <button className='sign-up-input'
                                onClick={() => this.handleToSignUp()}
                            >Đăng ký</button>
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
        userData: state.admin.userData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserStart: (data) => dispatch(actions.getUserStart(data)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLogIn));
