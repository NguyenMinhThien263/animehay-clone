import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './GenreList.scss';
import GenreItem from './GenreItem';
class GenreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveHeader: false,
            nameHeader: '',
            allcodeData: []
        };
    }


    componentDidMount() {
        this.props.getAllcodeByTypeStart();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.allCodeData.genreData !== prevProps.allCodeData.genreData) {
            const { allCodeData } = this.props;
            let genreData = allCodeData.genreData;
            this.setState({
                isActiveHeader: true,
                nameHeader: 'cate',
                allcodeData: genreData,
            })
        }

    }
    handleOnClickHeaderItem = (id) => {
        this.setState({
            isActiveHeader: true,
            nameHeader: id,
            allcodeData: this.buildAllCodeData(id),
        });
    }
    buildAllCodeData = (type) => {
        const { allCodeData } = this.props;
        let data = []
        switch (type) {
            case 'cate':
                data = allCodeData.genreData;
                break;
            case 'year':
                data = allCodeData.yearData;
                break;
            default:
                break;
        }
        return data
    }

    render() {
        const { isActiveHeader, nameHeader, allcodeData } = this.state;
        return (
            <div className="genre-container">
                <DropdownMenu>
                    <div className="dropdown-header-menu">
                        <DropdownItem header className={`${nameHeader === 'cate' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('cate')}
                            >
                                <ion-icon name="shapes-outline"></ion-icon><span>Thể loại</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader === 'year' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('year')}
                            >
                                <ion-icon name="sparkles-outline"></ion-icon><span>Năm</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader === 'filter' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('filter')}
                            >
                                <ion-icon name="filter-outline"></ion-icon><span>Lọc Phim</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem header className={`${nameHeader === 'movie' && isActiveHeader ? 'red-btn' : ''}`} >
                            <div className="DropdownItem-content"
                                onClick={() => this.handleOnClickHeaderItem('movie')}
                            >
                                <ion-icon name="sparkles-outline"></ion-icon><span>Phim lẻ</span>
                            </div>
                        </DropdownItem>
                    </div>
                    <div className="menu-content">
                        {allcodeData && allcodeData.length > 0 &&
                            allcodeData.map((item, index) => {
                                return (
                                    <DropdownItem>
                                        <GenreItem
                                            key={index.toString()}
                                            keyMap={item.keyMap}
                                            value={item.value}
                                        />
                                    </DropdownItem>
                                )
                            })}
                    </div>
                </DropdownMenu >
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCodeData: state.admin.allCodeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeByTypeStart: () => dispatch(actions.getAllcodeByTypeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
