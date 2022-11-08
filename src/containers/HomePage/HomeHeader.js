import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
// import './HomeHeader.scss';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //UI
            isShowIcon: false,
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleShowIcon = () => {
        this.setState({
            isShowIcon: !this.state.isShowIcon,
        });
    }
    render() {
        const { isShowIcon } = this.state;
        return (
            <div className="homeheader-container">
                <div className="header-logo">
                    <div className="logo"></div>
                </div>
                {isShowIcon &&
                    <div className="homeheader-search-bar">
                        <i className="fas fa-search"></i>
                        <input className="input-search" type="text"
                            placeholder="Nhập từ khoá..."
                        />
                    </div>
                }
                <div className="header-navigate">
                    <div className={`custom-nav-link ${isShowIcon ? 'red-icon' : ''}`}
                        onClick={() => this.handleShowIcon()}
                    >
                        {isShowIcon ?
                            <i className="far fa-times-circle"></i>
                            :
                            <i className="fas fa-search"></i>
                        }
                    </div>
                    <div className="custom-nav-link">
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className="custom-nav-link">
                        <i className="fas fa-history"></i>
                    </div>
                    <div className="custom-nav-link">
                        <i className="fas fa-bookmark"></i>
                    </div>
                    {this.props.isLoggedIn ?
                        <>
                            <div className="custom-nav-link">
                                <i className="far fa-user-circle"></i>
                            </div>
                            <div className="custom-nav-link">
                                <i className="fas fa-bell"></i>
                            </div>
                        </>
                        :
                        <div className="custom-nav-link">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
