import React, { Component } from 'react';
import { TfiSearch } from 'react-icons/tfi';
// import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form}>
          <button type="submit" className={s.button}>
            <TfiSearch className={s.test} />
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  // bla: PropTypes.string,
};

Searchbar.defaultProps = {
  // bla: 'test',
};

export default Searchbar;
