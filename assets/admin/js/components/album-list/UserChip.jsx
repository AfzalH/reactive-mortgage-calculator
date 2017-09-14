import React from 'react';

class UserChip extends React.Component {
    render() {
        const {album} = this.props;
        return (
            <div className="col s12 chip-col plr0">
                <div className="chip connected-user">
                    <img src={album.profile_picture} alt={album.username}/>
                    <a target="_blank" href={"https://www.instagram.com/"+album.username}>
                        {album.full_name ? album.full_name : album.username}
                    </a>
                </div>
            </div>
        );
    }
}

export default UserChip;