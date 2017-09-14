import React from 'react';
import { connect } from 'react-redux';
import { getAlbum, getAlbumData, loadMoreData } from '../actions/albumAction';
import LayoutSelector from '../components/LayoutSelector';
import CircularLoaderRow from '../../../admin/js/components/partials/CircularLoaderRow';

// smart component with redux connect

class Base extends React.Component {
    componentDidMount() {
        const { id, getAlbum, getAlbumData } = this.props;
        getAlbum(id);
        getAlbumData(id);
    }

    render() {
        const { id, albums, loadMoreData } = this.props;
        return (
            (albums[id].data_loaded && albums[id].options_loaded) ?
                <LayoutSelector album={albums[id]} loadMoreData={loadMoreData} />
                :
                albums[id].error_received ?
                    <div className="red-text">{albums[id].error_received}</div> :
                    <CircularLoaderRow />
        )
    }
}

// map state
function mapStateToProps(state) {
    return {
        albums: state.instances
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        getAlbum: (id) => {
            dispatch(getAlbum(id));
        },
        getAlbumData: (id) => {
            dispatch(getAlbumData(id));
        },
        loadMoreData: (id, url) => {
            dispatch(loadMoreData(id, url));
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(Base);
