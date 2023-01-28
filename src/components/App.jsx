import React, { Component } from 'react';
import axios from 'axios';
// import { nanoid } from 'nanoid';
import Searchbar from './Searchbar';
import Button from './Button';
import { URL } from './utils/galleryApi';
import ImageGallery from './ImageGallery';
import { RotatingTriangles } from 'react-loader-spinner';

class App extends Component {
  state = {
    items: [],
    loading: false,
    filter: '',
  };

  componentDidMount() {
    this.fetchPosts();
    // if (contacts?.length) {
    //   console.log(contacts);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate")
    // console.log("prevState", prevState);
    // console.log("currentState", this.state);
    // const { contacts } = this.state;
    // if (prevState.contacts.length !== contacts.length) {
    //   console.log('Update contacts');
    // }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(URL);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onFormSubmit = e => {
    console.log(e);
  };

  render() {
    return (
      <div className="AppWrapper">
        <Searchbar onSubmit={this.onFormSubmit} />
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
