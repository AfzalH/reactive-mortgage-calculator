import React from 'react';
import Collage from '../lib/Gallery';
import Lightbox from 'react-images';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import replace from 'lodash.replace';
import Waypoint from 'react-waypoint';
import CircularLoaderRow from '../../../admin/js/components/partials/CircularLoaderRow';

class AlbumCollage extends React.Component {
    constructor() {
        super();
        this.state = {currentImage: 0, lightboxIsOpen: false, cols: 2};
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.updateColDebounced = debounce(this.updateCol.bind(this), 200);
        this.loadMore = throttle(()=>this.props.loadMoreData(this.props.album.options.id, this.props.album.data.pagination.next_url), 500)
    }

    openLightbox(index, event) {
        const {album} = this.props;
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
        if ((album.data.data.length - 3) < index) {
            if (album.options.options.collage_load_more_method != 'disabled') {
                this.loadMore();
            }
        }
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
        setTimeout(()=> {
            this.setState({
                cols: this.state.cols + 1
            });
        }, 100);
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        const {album} = this.props;
        if ((album.data.data.length - 5) < this.state.currentImage) {
            if (album.options.options.collage_load_more_method != 'disabled') {
                this.loadMore();
            }
        }
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    setTooltip() {
        jQuery('.srizon .show-tool-tip img').hover(function () {
            var title = jQuery(this).attr('alt');
            if (title) {
                jQuery('<p class="srizon-tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
            }
        }, function () {
            jQuery('.srizon-tooltip').remove();
        }).mousemove(function (e) {
            jQuery('.srizon-tooltip').css({top: e.pageY + 10, left: e.pageX + 20})
        });
    }

    componentDidMount() {
        this.updateColDebounced();
        this.setTooltip();
        window.addEventListener("resize", this.updateColDebounced);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColDebounced);
    }

    componentDidUpdate() {
        this.setTooltip();
        this.updateColDebounced();
    }

    updateCol() {
        const {album} = this.props;
        let newCol = 2;
        const width = this.refs["collage" + album.options.id].state.containerWidth;
        if (width < 300) newCol = 1 + parseInt(album.options.options.collage_thumb_size);
        else if (width < 600) newCol = 2 + parseInt(album.options.options.collage_thumb_size);
        else if (width < 900) newCol = 3 + parseInt(album.options.options.collage_thumb_size);
        else newCol = 4 + parseInt(album.options.options.collage_thumb_size);

        if (this.state.cols != newCol) {
            this.setState({cols: newCol});
        }
    }

    getOriginal(url) {
        let orig = url;
        orig = replace(orig, '/s640x640', '');
        orig = replace(orig, '/p640x640', '');
        return orig;
    }

    render() {
        const {album} = this.props;
        const images = album.data.data.map((img)=>({
            src: img.images.standard_resolution.url,
            srcset: [
                this.getOriginal(img.images.standard_resolution.url) + ' ' + img.images.standard_resolution.width * 2 + 'w',
                img.images.standard_resolution.url + ' ' + img.images.standard_resolution.width + 'w',
                img.images.low_resolution.url + ' ' + img.images.low_resolution.width + 'w',
                img.images.thumbnail.url + ' ' + img.images.thumbnail.width + 'w'
            ],
            sizes: [
                '(min-width: 480px) 50vw',
                '(min-width: 1024px) 33.3vw',
                '100vw'
            ],
            width: img.images.standard_resolution.width,
            height: img.images.standard_resolution.height,
            alt: img.caption ? img.caption.text : null,
            caption: img.caption ? img.caption.text : null
        }));
        return (
            <div className={album.options.options.collage_show_hover?"show-tool-tip":null}>
                <Collage ref={"collage"+album.options.id} photos={images} cols={this.state.cols}
                         onClickPhoto={this.openLightbox} margin={parseInt(album.options.options.collage_margin)}/>
                <Lightbox
                    theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
                    images={images}
                    backdropClosesModal={true}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    width={1600}
                />
                {album.data.pagination.next_url && album.options.options.collage_load_more_method == 'button' ?
                    <div className="row top20">
                        <div className="col s12 center">
                            {album.loading_more ?
                                <CircularLoaderRow /> :
                                <button className="btn no-transform"
                                        onClick={this.loadMore}>
                                    {album.options.options.load_more_text}</button>}
                        </div>
                    </div> :
                    album.data.pagination.next_url && album.options.options.collage_load_more_method == 'auto' ?
                        album.loading_more ?
                            <CircularLoaderRow />
                            :
                            <div>
                                <CircularLoaderRow />
                                <Waypoint onEnter={this.loadMore}/>
                            </div> : null
                }
            </div>

        )
    }
}

export default AlbumCollage;