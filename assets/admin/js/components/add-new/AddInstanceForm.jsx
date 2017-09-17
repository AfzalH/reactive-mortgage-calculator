import React from 'react';

class AddCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        Materialize.updateTextFields();
        this.userTitleInput.focus();

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.state.title.trim().length > 0) {
            this.props.saveUserAlbum(this.state);
        }
    }

    handleKeyDown(event) {
        if (event.keyCode == 27) {
            console.log('escape');
            this.props.cancelUserAlbum();
        }
    }


    render() {
        const {cancelUserAlbum, saveUserAlbum} = this.props;
        return (
            <div className="card small">
                <div className="card-content">
                    <div className="input-field col s12">
                        <input id="title" type="text"
                               name="title"
                               value={this.state.title}
                               onChange={this.handleInputChange}
                               onKeyPress={this.handleKeyPress}
                               onKeyDown={this.handleKeyDown}
                               ref={(input)=>{this.userTitleInput = input}}
                        />
                        <label htmlFor="title">Instance Title</label>
                    </div>
                    <div className="col s6 top20">
                        <button className="btn grey" onClick={cancelUserAlbum}>Cancel</button>
                    </div>
                    <div className="col s6 top20">
                        <button
                            onClick={()=>{saveUserAlbum(this.state)}}
                            className={'btn green ' + (this.state.title.trim().length < 1 ? 'disabled' : '')}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCardForm;