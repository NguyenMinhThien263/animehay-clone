import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import FeatureBar from './FeatureBar';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import FilmItem from './Film/FilmItem';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        neutral: {
            main: '#fff',
            contrastText: '#fff',
        },
    },
});
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allFilm: [],
            windowWidth: window.innerWidth,
            page: 1,
            count: 0,
            pageSize: 32,
        };
    }


    async componentDidMount() {
        let { page, pageSize } = this.state
        let params = this.getRequestParams(page, pageSize)
        await this.props.fetchAllFilmStart(params.page, params.size);
        this.resizeScreen();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.state.windowWidth !== prevState.windowWidth) {
            this.resizeScreen();
        }
        if (prevState.page !== this.state.page) {
            let { filmData } = this.props;
            let { page, pageSize } = this.state;
            let params = this.getRequestParams(page, pageSize);
            this.props.fetchAllFilmStart(params.page, params.size)
            this.setState({
                allFilm: filmData.films,
                count: filmData.totalPages
            });
        }
        if (prevProps.filmData !== this.props.filmData) {
            let { filmData } = this.props;
            this.setState({
                allFilm: filmData.films,
                count: filmData.totalPages,
            })
        }
    }
    getRequestParams = (page, pageSize) => {
        let params = {};
        if (page) {
            params.page = page - 1;
        }
        if (pageSize) {
            params.size = pageSize;
        }
        return params;
    };
    handlePageChange = (event, value) => {
        this.setState({ page: value });
    }
    resizeScreen = () => {
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth
            });
        }, false);
    }

    render() {
        const settings = {
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };
        const { windowWidth, count, page, allFilm } = this.state;
        let isMobile = windowWidth > 1200
        return (
            <div className="homepage-container">
                <HomeHeader
                    isMobile={isMobile}
                />
                <div className="homepage-content">
                    {isMobile &&
                        <div className="carousel">
                            <FeatureBar
                                text={'Phim đề cử'}
                            />
                            <div>
                                <Slider {...settings}>
                                    {
                                        allFilm && allFilm.length > 0 &&
                                        allFilm.map((item) => {
                                            return (
                                                <FilmItem
                                                    film={item}
                                                />
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    }
                    <div className="section-homepage">
                        <FeatureBar
                            text={'Mới cập nhật'}
                        />
                        <div className="list-film">
                            {
                                allFilm && allFilm.length > 0 &&
                                allFilm.map((item) => {
                                    return (
                                        <FilmItem
                                            itemPage={'item-page'}
                                            film={item}
                                        />
                                    )
                                })
                            }
                        </div>
                        <ThemeProvider theme={theme}>
                            <Pagination
                                className="pagination-container my-3"
                                count={count}
                                page={page}
                                siblingCount={0}
                                boundaryCount={2}
                                variant="outlined"
                                shape="rounded"
                                color="neutral"
                                onChange={this.handlePageChange}
                                showFirstButton
                                showLastButton
                            />
                        </ThemeProvider>

                    </div>
                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        filmData: state.admin.filmData,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllFilmStart: (page, pageSize) => dispatch(actions.fetchAllFilmStart(page, pageSize)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
