import React from 'react';
import ImageGallery from 'react-image-gallery';
import replace from 'lodash.replace';

class AlbumCarousel extends React.Component {
    componentDidMount() {
        jQuery('.show-tool-tip .image-gallery-thumbnails-container img').hover(function () {
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

    getOriginal(url) {
        let orig = url;
        orig = replace(orig, '/s640x640', '');
        orig = replace(orig, '/p640x640', '');
        return orig;
    }

    render() {
        const {album} = this.props;
        const images = album.data.data.map((img)=>({
            original: this.getOriginal(img.images.standard_resolution.url),
            thumbnail: img.images.low_resolution.url,
            description: (img.caption && album.options.options.carousel_img_txt_overlay) ? img.caption.text : null,
            thumbnailAlt: img.caption ? img.caption.text : null,
            originalAlt: img.caption ? img.caption.text : null
        }));
        return (
            <div className={album.options.options.carousel_thumb_show_hover?"show-tool-tip":null}>
                <ImageGallery
                    showThumbnails={album.options.options.carousel_show_thumb}
                    thumbnailPosition={album.options.options.carousel_thumb_position}
                    showIndex={album.options.options.carousel_show_count}
                    autoPlay={album.options.options.carousel_auto_play}
                    slideInterval={album.options.options.carousel_slide_interval * 1000}
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                />
            </div>
        )
    }
}

export default AlbumCarousel;