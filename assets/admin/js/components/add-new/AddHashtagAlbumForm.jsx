import React from 'react';

class AddHashtagAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hashtag: '',
            title: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        Materialize.updateTextFields();
        this.hashtagInput.focus();

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name == 'hashtag' && /[^a-zA-Z0-9_]/.test(value))  return;

        this.setState({
            [name]: value
        });

    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.state.hashtag.trim().length > 0) {
            this.props.saveHashtagAlbum(this.state);
        }
    }

    render() {
        const {saveHashtagAlbum, cancelHashtagAlbum} = this.props;
        return (
            <div className="card small">
                <div className="card-content">
                    <div className="input-field col s12">
                        <input placeholder="Enter hashtag here (without hash)" id="hashtag" type="text"
                               name="hashtag"
                               value={this.state.hashtag}
                               onChange={this.handleInputChange}
                               onKeyPress={this.handleKeyPress}
                               ref={(input)=>{this.hashtagInput = input}}
                        />
                        <label htmlFor="hashtag">Instagram Hashtag</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="title" type="text"
                               name="title"
                               value={this.state.title}
                               onChange={this.handleInputChange}
                               onKeyPress={this.handleKeyPress}
                        />
                        <label htmlFor="title">Album Title (Optional)</label>
                    </div>
                    <div className="col s6 top20">
                        <button className="btn grey" onClick={cancelHashtagAlbum}>Cancel</button>
                    </div>
                    <div className="col s6 top20">
                        <button
                            onClick={()=>{saveHashtagAlbum(this.state)}}
                            className={'btn green ' + (this.state.hashtag.trim().length < 1 ? 'disabled' : '')}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHashtagAlbumForm;