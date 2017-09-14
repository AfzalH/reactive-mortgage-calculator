import React from 'react';
import {connect} from 'react-redux';
import InstanceListItem from './InstanceListItem';
import CardLoading from '../components/partials/CardLoading';
import AddInstanceCard from './AddInstanceCard';
import {cancelUserAlbum, saveUserAlbum} from '../actions/albumsAction';
import FlipMove from 'react-flip-move';


// smart component with redux connect

const InstanceList = ({loaded, albums, saving_instance, cancelUserAlbum, saveUserAlbum}) => (
    <div className="row">
        <FlipMove duration={500} easing="ease-out">
            <div key="static1">
                {saving_instance ? <CardLoading title="Saving"/> : <AddInstanceCard />}
            </div>

            {!loaded ?
                <div key="static3"><CardLoading title="Loading Albums"/></div> :
                albums.map(album=>(
                    <InstanceListItem key={album.id} album={album}/>
                ))
            }
        </FlipMove>
    </div>
);

// map state
function mapStateToProps(state) {
    return {
        saving_instance: state.settings.saving_instance_in_progress,
        loaded: state.instances.initial_load,
        albums: state.instances.albums
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        cancelUserAlbum: ()=> {
            dispatch(cancelUserAlbum())
        },
        saveUserAlbum: (album)=> {
            dispatch(saveUserAlbum(album))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(InstanceList);
