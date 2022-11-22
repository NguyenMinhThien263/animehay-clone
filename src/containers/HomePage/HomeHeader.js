import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import GenreList from './Genre/GenreList';
import UserComponent from './User/UserComponent';
import { withRouter } from 'react-router';
import SearchBar from '../HomePage/Search/SearchBar';
// import './HomeHeader.scss';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
            //UI
            isShowIcon: false,
            nameIcon: '',
            dropdownOpen: false,
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleShowIcon = (id) => {
        this.setState({
            isShowIcon: !this.state.isShowIcon,
            nameIcon: id
        });
    }
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    handleSignIn = () => {
        if (this.props.history) {
            this.props.history.push(`/log-in`);
        }
    }
    render() {
        const { isShowIcon, nameIcon } = this.state;
        const { isMobile } = this.props;

        return (
            <div className={`homeheader-container ${isMobile ? 'mobile' : ''}`}>
                <div className="header-logo">
                    <div className="logo"></div>
                </div>
                {isMobile === true ?
                    <div className={`homeheader-search-bar`}>
                        <SearchBar/>
                    </div>
                    :
                    <div className={`homeheader-search-bar`}>
                        {nameIcon === 'search' && isShowIcon &&
                            <SearchBar />
                        }
                    </div>
                }
                <div className="header-navigate">
                    {isMobile === false &&
                        <div className={`custom-nav-link ${nameIcon === 'search' && isShowIcon ? 'red-icon' : ''}`}
                            onClick={() => this.handleShowIcon('search')}
                        >
                            {nameIcon === 'search' && isShowIcon ?
                                <i className="far fa-times-circle"></i>
                                :
                                <i className="fas fa-search"></i>
                            }
                        </div>
                    }
                    <div className="custom-nav-link">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                            <DropdownToggle>
                                <i className="fas fa-bars"></i>
                            </DropdownToggle>
                            <GenreList />

                        </Dropdown>
                    </div>
                    <div className="custom-nav-link">
                        <i className="fas fa-history"></i>
                    </div>
                    <div className="custom-nav-link">
                        <i className="fas fa-bookmark"></i>
                    </div>
                    {this.props.isLoggedIn ?
                        <>
                            <div className={`custom-nav-link ${nameIcon === 'user' && isShowIcon ? 'red-icon' : ''}`}
                                onClick={() => this.handleShowIcon('user')}
                            >
                                <UserComponent
                                    isShowIcon={isShowIcon}
                                    nameIcon={nameIcon} />
                                {nameIcon === 'user' && isShowIcon ?
                                    <i className="far fa-times-circle"></i>
                                    :
                                    <i className="far fa-user-circle"></i>
                                }
                            </div>
                            <div className="custom-nav-link">
                                <i className="fas fa-bell"></i>
                            </div>
                        </>
                        :
                        <div className="custom-nav-link"
                            onClick={() => this.handleSignIn()}
                        >
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
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
