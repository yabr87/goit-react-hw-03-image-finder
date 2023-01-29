import ImageGalleryItem from './ImageGalleryItem';
// import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

// id, webformatURL, largeImageURL, tags, previewURL

const ImageGallery = ({ items, openModal }) => {
  const elements = items.map(({ id, tags, previewURL, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      tags={tags}
      webformatURL={previewURL}
      openModal={() => openModal(largeImageURL)}
    />
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
