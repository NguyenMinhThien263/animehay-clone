import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { CommonUtils, CRUD_ACTIONS } from '../../utils';
import Select from 'react-select';
import './FilmManage.scss';
import Lightbox from 'react-image-lightbox';
import FilmTable from './FilmTable';
import { Pagination } from '@mui/material';
class FilmManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: '',
            selectedGenre: '',
            selectedYear: '',
            filmName: '',
            subFilmName: '',
            scorePoint: '',
            totalEps: '',
            description: '',
            avatar: '',
            allStatus: [],
            allGenre: [],
            allYear: [],
            allFilm: [],
            filmEditId: '',
            //UI
            previewImgURL: '',
            isOpen: false,
            action: '',
            page: 1,
            count: 0,
            pageSize: 3,
            pageSizes: [],
        }
    }

    componentDidMount() {
        let { page, pageSize } = this.state;
        let params = this.getRequestParams(page, pageSize);
        this.props.fetchAllFilmStart(params.page, params.size)
        this.props.getAllcodeByTypeStart();
        this.setState({ pageSizes: this.getPageSizes() });
    }
    buildAllCodeData = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.keyMap;
                object.label = item.value;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allCodeData.statusData !== this.props.allCodeData.statusData) {
            this.setState({ allStatus: this.buildAllCodeData(this.props.allCodeData.statusData), });
        }
        if (prevProps.allCodeData.genreData !== this.props.allCodeData.genreData) {
            this.setState({ allGenre: this.buildAllCodeData(this.props.allCodeData.genreData), });
        }
        if (prevProps.allCodeData.yearData !== this.props.allCodeData.yearData) {
            this.setState({ allYear: this.buildAllCodeData(this.props.allCodeData.yearData), });
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
        if (prevState.pageSize !== this.state.pageSize) {
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
                selectedStatus: '',
                selectedGenre: '',
                selectedYear: '',
                filmName: '',
                subFilmName: '',
                scorePoint: '',
                totalEps: '',
                description: '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleChangeSelectOption = (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption
        this.setState({ ...copyState });
    };
    handleChangeSetText = (e) => {
        let stateName = e.target.name;
        let copyState = { ...this.state };
        copyState[stateName] = e.target.value;
        this.setState({ ...copyState });
    };
    handleSelectedMultiple = (data) => {
        this.setState({ selectedGenre: data });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let imageURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: imageURL,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    saveInforFilm = () => {
        let { action } = this.state;
        let valueArr = [];
        this.state.selectedGenre.map((item) => {
            let object = {
                keyMap: item.value
            }
            valueArr.push(object)
        })
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createFilmStart({
                id: '',
                selectedStatus: !this.state.selectedStatus ? '' : this.state.selectedStatus.value,
                selectedGenre: valueArr ? valueArr : [],
                selectedYear: !this.state.selectedYear ? '' : this.state.selectedYear.value,
                filmName: this.state.filmName,
                subFilmName: this.state.subFilmName,
                scorePoint: this.state.scorePoint,
                totalEps: this.state.totalEps,
                description: this.state.description,
                avatar: this.state.avatar,
                page: 0,
                pageSize: 3,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editFilmStart({
                id: this.state.filmEditId,
                selectedStatus: !this.state.selectedStatus ? '' : this.state.selectedStatus.value,
                selectedGenre: valueArr ? valueArr : [],
                selectedYear: !this.state.selectedYear ? '' : this.state.selectedYear.value,
                filmName: this.state.filmName,
                subFilmName: this.state.subFilmName,
                scorePoint: this.state.scorePoint,
                totalEps: this.state.totalEps,
                description: this.state.description,
                avatar: this.state.avatar,
                page: 0,
                pageSize: 3,
            })
        }
        this.setState({ page: 1 });
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
    handlePageSizeChange = (event) => {
        this.setState({
            pageSize: event.target.value,
            page: 1
        });
    }
    handlePageChange = (event, value) => {
        this.setState({ page: value });
    }
    getPageSizes = () => {
        let pageSizes = [];
        let i = 1;
        do {
            pageSizes.push(i++);
        } while (i <= 10);
        return pageSizes;
    }
    getInfoFilmFromParent = async (film) => {
        let imageBase64 = '';
        if (film.image) {
            imageBase64 = Buffer.from(film.image, 'base64').toString('binary');
        }
        let statusData = this.changeIntoDropdownValue(film.statusData, 'status');
        let yearData = this.changeIntoDropdownValue(film.yearData, 'year');
        let genreData = this.changeIntoDropdownValue(film.genreData, 'genre');
        await this.setState({
            selectedStatus: statusData.object,
            selectedGenre: genreData.arr,
            selectedYear: yearData.object,
            filmName: film.title,
            subFilmName: film.subTitle,
            scorePoint: film.scrores,
            totalEps: film.totalEpisode,
            description: film.description,
            avatar: '',
            filmEditId: film.id,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        });
    }
    changeIntoDropdownValue = (data, name) => {
        let object = {};
        let arr = []
        if (name && name === 'genre') {
            data.map(item => {
                object = {
                    value: item.keyMap,
                    label: item.value,
                };
                arr.push(object)
            })
        } else {
            object.value = data.keyMap
            object.label = data.value
        }
        return { object, arr }
    }
    render() {
        let { allFilm, filmName, subFilmName, scorePoint, totalEps, description, pageSize, count, page, pageSizes, action } = this.state;
        return (
            <div className="film-container">
                <div className="title-page text-center">Quản lý phim</div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Tựa Phim
                            </label>
                            <input name="filmName" type="text" className="form-control"
                                value={filmName}
                                onChange={(e) => this.handleChangeSetText(e)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Cách gọi khác
                            </label>
                            <input name="subFilmName" type="text" className="form-control"
                                value={subFilmName}
                                onChange={(e) => this.handleChangeSetText(e)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Trạng thái
                            </label>
                            <Select name={"selectedStatus"}
                                value={this.state.selectedStatus}
                                onChange={this.handleChangeSelectOption}
                                options={this.state.allStatus}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Điểm
                            </label>
                            <input name="scorePoint" type="text" className="form-control"
                                value={scorePoint}
                                onChange={(e) => this.handleChangeSetText(e)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Năm ra mắt
                            </label>
                            <Select
                                name={"selectedYear"}
                                value={this.state.selectedYear}
                                onChange={this.handleChangeSelectOption}
                                options={this.state.allYear}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label htmlFor="">
                                Tổng số tập
                            </label>
                            <input name="totalEps" type="text" className="form-control"
                                value={totalEps}
                                onChange={(e) => this.handleChangeSetText(e)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <div className="preview-img-container">
                                <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                <input id="previewImg" type="file" hidden className="form-control"
                                    onChange={(e) => { this.handleOnChangeImage(e) }}
                                />
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => { this.openPreviewImage() }}
                                >

                                </div>
                            </div>
                        </div>
                        <div className="col-12 form-group mt-3">
                            <label htmlFor="">
                                Thể loại
                            </label>
                            <Select
                                isMulti
                                value={this.state.selectedGenre}
                                options={this.state.allGenre}
                                onChange={this.handleSelectedMultiple}
                            />
                        </div>
                        <div className="col-12 form-group mt-3">
                            <label htmlFor="">
                                Mô tả phim
                            </label>
                            <textarea name="description" className="form-control" rows="3"
                                value={description}
                                onChange={(e) => this.handleChangeSetText(e)}
                            ></textarea>
                        </div>
                    </div>
                    <button className={`btn ${action === CRUD_ACTIONS.CREATE ? 'btn-primary' : 'btn-warning'} mt-3`} onClick={() => this.saveInforFilm()}>
                        {`${action === CRUD_ACTIONS.CREATE ? 'Tạo' : 'Lưu'}`} Thông Tin</button>
                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={(e) => this.handlePageSizeChange(e)} value={pageSize}>
                            {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>

                        <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={0}
                            boundaryCount={2}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        />
                    </div>
                    <div className="film-table-manage">
                        <FilmTable
                            getInfoFilmFromParent={this.getInfoFilmFromParent}
                            filmData={allFilm}
                            page={0}
                            pageSize={3}
                        />
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allCodeData: state.admin.allCodeData,
        filmData: state.admin.filmData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeByTypeStart: () => dispatch(actions.getAllcodeByTypeStart()),
        createFilmStart: (data) => dispatch(actions.createFilmStart(data)),
        editFilmStart: (data) => dispatch(actions.editFilmStart(data)),
        fetchAllFilmStart: (page, pageSize) => dispatch(actions.fetchAllFilmStart(page, pageSize)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmManage);
