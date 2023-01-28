import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

import { getGalleryItems } from './utils/galleryApi';
import { RotatingTriangles } from 'react-loader-spinner';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    page: 1,
    totalPages: 1,
    perPage: 12,
  };

  componentDidMount() {
    // this.fetchImage();
    // if (contacts?.length) {
    //   console.log(contacts);
    // }
  }

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

  render() {
    const { items, page, loading, totalPages } = this.state;
    return (
      <div className="AppWrapper">
        <Searchbar onSubmit={this.searchImage} />
        <ImageGallery items={items} />
        {!(page === totalPages || !totalPages) && (
          <Button type="button" text="load more" />
        )}
        <RotatingTriangles
          visible={loading}
          height="100"
          width="100"
          ariaLabel="rotating-triangels-loading"
          wrapperClass="rotating-triangels-wrapper"
        />
      </div>
    );
  }
}

export default App;
