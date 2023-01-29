import React from 'react';
import PropTypes from 'prop-types';
import { RotatingTriangles } from 'react-loader-spinner';
import Button from 'components/Button';

const Loading = ({ page, totalPages, loading, onBtnClick }) => {
  if (loading) {
    return (
      <RotatingTriangles
        visible={loading}
        height="70"
        width="70"
        ariaLabel="rotating-triangels-loading"
        wrapperClass="rotating-triangels-wrapper"
      />
    );
  }
  if (page !== totalPages || !totalPages) {
    return <Button type="button" text="load more" onBtnClick={onBtnClick} />;
  }
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Loading;
