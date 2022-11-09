import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './GenreList.scss';
class GenreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveHeader: false,
            nameHeader: '',
        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleOnClickHeaderItem = (id) => {
        this.setState({
            isActiveHeader: !this.state.isActiveHeader,
            nameHeader: id,
        },);
        
    }

    render() {
        const { isActiveHeader, nameHeader } = this.state;
        return (
            <div className="genre-container">
                <DropdownMenu>
                    <div className="dropdown-header-menu">
                        <DropdownItem header className={`${nameHeader==='cate' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('cate')}
                            >
                                <ion-icon name="shapes-outline"></ion-icon><span>Thể loại</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader==='year' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('year')}
                            >
                                <ion-icon name="sparkles-outline"></ion-icon><span>Năm</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader==='filter' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('filter')}
                            >
                                <ion-icon name="filter-outline"></ion-icon><span>Lọc Phim</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader==='movie' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('movie')}
                            >
                                <ion-icon name="sparkles-outline"></ion-icon><span>Phim lẻ</span>
                            </div>
                        </DropdownItem>
                    </div>
                    <div className="menu-content">
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Action</DropdownItem>
                    </div>
                </DropdownMenu >
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
