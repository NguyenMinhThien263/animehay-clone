import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import SearchResult from './SearchResult';
import * as actions from "../../../store/actions";
// import './SearchBar.scss';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            filmData: []
        };
    }


    componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.state.searchInput !== prevState.searchInput) {
            let { searchInput } = this.state;
            await this.props.getFilmBySearchStart(searchInput)
            this.setState({
                filmData: this.props.searchData,
            });
        }

    }
    handleSearchFilm = () => {
    }
    handleOnChangeSearch = (e) => {
        let name = e.target.name;
        let copyState = { ...this.state };
        copyState[name] = e.target.value;
        this.setState({ ...copyState });
    }
    render() {
        let { filmData } = this.state
        return (
            <div className="searchBar-container">
                <div className="search-content">
                    <i className="fas fa-search"
                        onClick={() => this.handleSearchFilm()}
                    ></i>
                    <input className="input-search" type="text"
                        name="searchInput"
                        placeholder="Nhập từ khoá..."
                        value={this.state.searchInput}
                        onChange={(e) => this.handleOnChangeSearch(e)}
                    />
                </div>
                <SearchResult
                    filmData={filmData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        searchData: state.admin.searchData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFilmBySearchStart: (inputSearch) => dispatch(actions.getFilmBySearchStart(inputSearch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
