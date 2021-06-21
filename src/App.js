import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import Modal from './Components/Modal';
import imageFinderApi from './services/image-finder-api';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    bigImageUrl: '',
  };

  componentDidMount() {
    window.addEventListener('click', this.handleOnImageClick);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOnImageClick);
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
      bigImageUrl: '',
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imageFinderApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleOnImageClick = event => {
    const { images, showModal } = this.state;

    if (event.target.nodeName === 'IMG' && !showModal) {
      const clickedImage = images.find(
        image => image.webformatURL === event.target.src,
      );

      this.setState({ bigImageUrl: clickedImage.largeImageURL });
      this.toggleModal();
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, searchQuery, isLoading, showModal, bigImageUrl } =
      this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} tag={searchQuery} />

        {isLoading && (
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        )}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={bigImageUrl} alt={searchQuery} width={1000} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
