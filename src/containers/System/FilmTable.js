import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './FilmTable.scss';
class FilmTable extends Component {
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
        const { getInfoFilmFromParent, filmData } = this.props;
        // console.log('check props table', this.props);
        return (
            <>
                <table id="TableManageFilm">
                    <tbody>

                        <tr>
                            <th>Title</th>
                            <th>subTitle</th>
                            <th>releaseDate</th>
                            <th>totalEpisode</th>
                            <th>Action</th>
                        </tr>
                        {filmData && filmData.length > 0 &&
                            filmData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.subTitle}</td>
                                        <td>{item.releaseDate}</td>
                                        <td>{item.totalEpisode}</td>
                                        <td>
                                            <button type="button" className="btn-edit" onClick={() => { this.handleEditUser(item) }}><i className="fas fa-edit"></i></button>
                                            <button type="button" className="btn-delete" onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilmTable);
