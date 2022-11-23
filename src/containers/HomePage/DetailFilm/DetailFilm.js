import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './DetailFilm.scss';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { grey } from '@mui/material/colors';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import GenreItem from '../Genre/GenreItem';
class DetailFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aFilmData: {},
            arrEps: []
        };
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let param = this.getParamsInfoFilm(id);
            await this.props.fetchAFilmStart(param);
            let res = this.props.aFilmData;     
            let arrEps = this.renderEps();
            this.setState({
                aFilmData: res,
                arrEps: arrEps,
            });

        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    getParamsInfoFilm = (id) => {
        let param;
        param = id.split('-')[1];
        return param
    }
    renderEps = () => {
        let { totalEpisode } = this.props.aFilmData;
        console.log('cehck',totalEpisode );
        let result = [];
        for (let i = 1; i <= totalEpisode; i++) {
            result.push(i)
        }
        return result
    }
    render() {
        let { aFilmData,arrEps } = this.state;
        console.log('check state', this.state);
        return (
            <>
                <HomeHeader />
                <div className="detail-film-container">
                    <h1 className="heading-title">TitleFilm</h1>
                    <div className="detail-content">
                        <div className="detail-image">
                            <div className="image"
                                style={{ backgroundImage: `url(${aFilmData && aFilmData.image ? aFilmData.image : ''})` }}
                            ></div>
                        </div>
                        <div className="detail-info">
                            <div className="genre-list">
                                <div className="">Thể loại</div>
                                <div className="list">
                                    {aFilmData && aFilmData.genreData && aFilmData.genreData.length > 0 &&
                                        aFilmData.genreData.map((item, index) => {
                                            return (
                                                <GenreItem
                                                    key={index.toString()}
                                                    keyMap={item.keyMap}
                                                    value={item.value}
                                                />
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="status">
                                <div className="">Trạng thái</div>
                                <div className="">{aFilmData && aFilmData.statusData ? aFilmData.statusData.value : ''}</div>
                            </div>
                            <div className="score">
                                <div className="">Điểm</div>
                                <div className="">{aFilmData && aFilmData.scrores ? aFilmData.scrores : ''}/10</div>
                            </div>
                            <div className="release-date">
                                <div className="">Phát hành</div>
                                <div className="">{aFilmData && aFilmData.yearData ? aFilmData.yearData.value : ''}</div>
                            </div>
                            <div className="total-eps">
                                <div className="">Thời lượng</div>
                                <div className="">{aFilmData && aFilmData.totalEpisode ? aFilmData.totalEpisode : ''} Tập</div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-options">
                        <div className="left">
                            <div className="play">
                                <PlayCircleOutlineRoundedIcon
                                    sx={{
                                        fontSize: 35,
                                        color: grey[300]
                                    }}
                                />
                            </div>
                            <div className="marklist">
                                <BookmarkAddRoundedIcon
                                    sx={{
                                        fontSize: 35,
                                        color: grey[300]
                                    }}
                                />
                            </div>
                        </div>
                        <div className="right">

                            <div className="rating">
                                <StarsRoundedIcon
                                    sx={{
                                        fontSize: 35,
                                        color: grey[300]
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ops-and-desc">
                        <div className="ops-list">
                            <div className="head-list">Danh sách tập</div>
                            <div className="body-list">
                                {arrEps && arrEps.length > 0 && 
                                arrEps.map((item,index)=>{
                                    return (
                                        <div className="">{item}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="description">
                            <div className="head-description">Nội dung</div>
                            <div className="body-description">
                            {aFilmData && aFilmData.description ? aFilmData.description : ''}
                            </div>
                        </div>
                    </div>
                    {/* <div className="comment">
                        <div className="head-comment"></div>
                        <div className="body-comment"></div>
                    </div> */}
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        aFilmData: state.admin.aFilmData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAFilmStart: (id) => dispatch(actions.fetchAFilmStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailFilm);
