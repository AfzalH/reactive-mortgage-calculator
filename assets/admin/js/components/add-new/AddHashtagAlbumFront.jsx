import React from 'react';

class AddHashtagAlbumFront extends React.Component {


    render() {
        const {newHashtagAlbum} = this.props;
        return (
            <div className="card small clickable" onClick={newHashtagAlbum}>
                <div className="card-content">
                    <div className="row">
                        <div className="col s12 center">
                            <span className="blue-text text-lighten-3 big-icon">+</span>
                        </div>
                        <div className="s12 center">
                            <h5 className="thin"><span className="blue-text text-darken-4">Add #hashtag Album</span>
                            </h5>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHashtagAlbumFront;