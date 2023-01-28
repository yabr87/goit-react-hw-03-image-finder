import React, { Component } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={s.searchbar}>
        <form onSubmit={handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <TfiSearch className={s.test} />
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={handleChange}
            value={search}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
