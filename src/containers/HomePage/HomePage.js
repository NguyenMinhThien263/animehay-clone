import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import FeatureBar from './FeatureBar';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import FilmItem from './Film/FilmItem';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
        };
    }


    componentDidMount() {
        this.resizeScreen();

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.state.windowWidth !== prevState.windowWidth) {
            this.resizeScreen();
        }

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
        const { windowWidth } = this.state;
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
                                    <FilmItem />
                                    <FilmItem />
                                    <FilmItem />
                                    <FilmItem />
                                </Slider>
                            </div>
                        </div>
                    }
                    <div className="section-homepage">
                        <FeatureBar
                            text={'Mới cập nhật'}
                        />
                        <div className="list-film">
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                            <FilmItem itemPage={'item-page'} />
                        </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
