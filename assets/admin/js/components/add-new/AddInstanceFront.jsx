import React from 'react';

class AddCardFront extends React.Component {


    render() {
        const {newUserAlbum} = this.props;
        return (
            <div className="card small clickable" onClick={newUserAlbum}>
                <div className="card-content">
                    <div className="row">
                        <div className="col s12 center">
                            <span className="green-text text-lighten-3 big-icon">+</span>
                        </div>
                        <div className="s12 center">
                            <h5 className="thin"><span
                                className="green-text text-darken-3">Add New Instance</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCardFront;