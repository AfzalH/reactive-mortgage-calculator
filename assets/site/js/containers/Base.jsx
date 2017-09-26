import React from 'react';
import {connect} from 'react-redux';
import {getAlbum} from '../actions/instanceAction';
import LayoutSelector from '../components/LayoutSelector';
import CircularLoaderRow from '../../../admin/js/components/partials/CircularLoaderRow';

// smart component with redux connect

class Base extends React.Component {
    componentDidMount() {
        const {id, getAlbum} = this.props;
        getAlbum(id);
    }

    render() {
        const {id, instances} = this.props;
        return (
            (instances[id].options_loaded) ?
                <LayoutSelector options={instances[id].options.options} id={id}/>
                :
                instances[id].error_received ?
                    <div className="red-text">{instances[id].error_received}</div> :
                    <CircularLoaderRow />
        )
    }
}

// map state
function mapStateToProps(state) {
    return {
        instances: state.instances
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        getAlbum: (id) => {
            dispatch(getAlbum(id));
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(Base);
