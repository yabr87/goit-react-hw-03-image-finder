import React, { Component } from 'react';
import axios from 'axios';
// import { nanoid } from 'nanoid';
import Searchbar from './Searchbar';
import Button from './Button';
import { getGalleryItems } from './utils/galleryApi';
import ImageGallery from './ImageGallery';

import { RotatingTriangles } from 'react-loader-spinner';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    page: 1,
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
      const { search, page } = this.state;
      this.setState({ loading: true });
      const { hits } = await getGalleryItems(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImage = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  render() {
    return (
      <div className="AppWrapper">
        <Searchbar onSubmit={this.searchImage} />
        <ImageGallery items={this.state.items} />
        <Button type="button" text="load more"></Button>
        <RotatingTriangles
          visible={this.state.loading}
          height="10"
          width="10"
          ariaLabel="rotating-triangels-loading"
          wrapperStyle={{}}
          wrapperClass="rotating-triangels-wrapper"
        />
      </div>
    );
  }
}

export default App;
