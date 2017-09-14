import React from 'react';
import {connect} from 'react-redux';


// smart component with redux connect

const SelectUser = ({users, cancelUserAlbum, title, saveUserAlbum}) => (
    <div className="col s12">
        <div className="card">
            <div className="card-content">
                <h5 className="thin">Username Not Found... Chose one from below or <span
                    className="btn red" onClick={cancelUserAlbum}>Cancel</span></h5>
                <div className="row"></div>
                <div className="row">
                    {users.map((u, i)=>(
                        <div key={i} className="col s12 m6 l4 chip-col pl0">
                            <div className="chip clickable"
                                 onClick={()=>saveUserAlbum({username:u.username,title:title})}>
                                <img src={u.profile_picture} alt={u.username}/>
                                {u.full_name ? u.full_name : u.username}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// connect and export
export default SelectUser;
