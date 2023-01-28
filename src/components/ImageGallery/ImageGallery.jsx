import ImageGalleryItem from './ImageGalleryItem';
// import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

// id, webformatURL, largeImageURL, tags, previewURL

const ImageGallery = ({ items }) => {
  const elements = items.map(({ id, tags, previewURL }) => (
    <ImageGalleryItem key={id} tags={tags} webformatURL={previewURL} />
  ));

  return <ul className={s.ImageGallery}>{elements}</ul>;
};

ImageGallery.propTypes = {
  // bla: PropTypes.string,
};

ImageGallery.defaultProps = {
  // bla: 'test',
};

export default ImageGallery;
