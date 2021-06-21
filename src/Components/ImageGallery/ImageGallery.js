import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.scss';

const ImageGallery = ({ images, tag }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL }) => (
      <ImageGalleryItem key={id} url={webformatURL} tag={tag} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGallery;
