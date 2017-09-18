import React from 'react';
import {connect} from 'react-redux';
import InstanceListItem from './InstanceListItem';
import CardLoading from '../components/partials/CardLoading';
import AddInstanceCard from './AddInstanceCard';
import {cancelInstance, saveInstance} from '../actions/instancesAction';
import FlipMove from 'react-flip-move';


// smart component with redux connect

const InstanceList = ({loaded, instances, saving_instance, cancelUserAlbum, saveUserAlbum, settings_open}) => (
    <div className="row">
        {settings_open ?
            <InstanceListItem key={settings_open} instance={instances.find((instance)=>(instance.id==settings_open))}/>
            :
            <FlipMove duration={500} easing="ease-out">
                <div key="static1">
                    {saving_instance ? <CardLoading title="Saving"/> : <AddInstanceCard />}
                </div>

                {!loaded ?
                    <div key="static2"><CardLoading title="Loading Albums"/></div> :
                    instances.map(instance=>(
                        <InstanceListItem key={instance.id} instance={instance}/>
                    ))
                }
            </FlipMove>}
    </div>
);

// map state
function mapStateToProps(state) {
    return {
        saving_instance: state.settings.saving_instance_in_progress,
        loaded: state.instances.initial_load,
        instances: state.instances.instances,
        settings_open: state.instances.settings_open
    }
}

// map dispatch
function mapDispatchToProps(dispatch) {
    return {
        cancelUserAlbum: ()=> {
            dispatch(cancelInstance())
        },
        saveUserAlbum: (instance)=> {
            dispatch(saveInstance(instance))
        }
    }
}

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(InstanceList);
