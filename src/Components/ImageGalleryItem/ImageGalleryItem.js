import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ url, tag }) => (
  <li className="ImageGalleryItem">
    <img src={url} alt={tag} className="ImageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
