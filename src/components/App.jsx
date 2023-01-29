import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';

import { getGalleryItems } from './utils/galleryApi';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    page: 1,
    totalPages: 1,
    perPage: 12,

    showModal: false,
    imgModal: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('Update');
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }

  async fetchImage() {
    try {
      const { search, page, perPage } = this.state;
      this.setState({ loading: true });
      const { hits, totalHits } = await getGalleryItems(search, page, perPage);

      this.getTotalPages(totalHits);

      this.setState(({ items }) => ({
        items: [...items, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  getTotalPages(totalHits) {
    const { perPage } = this.state;
    let pages = Math.floor(totalHits / 12);
    pages = totalHits % perPage ? pages + 1 : pages;
    console.log(pages);
    this.setState({ totalPages: pages });
  }

  searchImage = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({
      imgModal: largeImageURL,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imgModal: '',
    });
  };

  render() {
    const { items, page, loading, totalPages, showModal, imgModal } =
      this.state;
    return (
      <div className="AppWrapper">
        <Searchbar onSubmit={this.searchImage} />
        <ImageGallery items={items} openModal={this.openModal} />
        <Loader
          page={page}
          loading={loading}
          totalPages={totalPages}
          onBtnClick={this.loadMore}
        />
        {showModal && <Modal close={this.closeModal} bigImg={imgModal} />}
      </div>
    );
  }
}

export default App;
