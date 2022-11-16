import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './UserComponent.scss';
import defaultPic from '../../../assets/images/0.jpg';
class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }




    render() {
        let { isShowIcon, nameIcon, userInfo } = this.props;
        let imageBase64 = '';
        if (userInfo.image) {
            imageBase64 = Buffer.from(userInfo.image, 'base64').toString('binary');
        } else {
            imageBase64 = defaultPic
        }
        return (
            <div className={`userComponent-container ${nameIcon === 'user' && isShowIcon ? 'onClick' : ''}`}>
                <div className="custom-profile">
                    <div className="profile-image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                    <div className="profile-name">
                        HaHa
                    </div>
                </div>
                <div className="user-link">
                    <i className="fas fa-sync-alt"></i>
                    <span>Đồng bộ</span>
                </div>
                <div className="user-link">
                    <i className="fas fa-portrait"></i>
                    <span>Thông tin</span>
                </div>
                <div className="user-link">
                    <i className="fas fa-key"></i>
                    <span>Thay đổi mật khẩu</span>
                </div>
                <div className="user-link"
                    onClick={this.props.processLogout}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Đăng Xuất</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
