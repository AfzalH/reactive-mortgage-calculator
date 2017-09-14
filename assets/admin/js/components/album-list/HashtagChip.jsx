import React from 'react';

class HashtagChip extends React.Component {
    render() {
        const {album} = this.props;
        return (
            <div className="col s12 chip-col plr0">
                <div className="chip connected-user">
                    <a target="_blank" href={"https://www.instagram.com/explore/tags/"+album.hashtag}>
                        #{album.hashtag}
                    </a>
                </div>
            </div>
        );
    }
}

export default HashtagChip;