import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {iconSize} from "./@iconSize";

const ArrowDownLeft = forwardRef(({ color = 'currentColor', size = iconSize, ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <line x1="17" y1="7" x2="7" y2="17" />
      <polyline points="17 17 7 17 7 7" />
    </svg>
  );
});

ArrowDownLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowDownLeft.displayName = 'ArrowDownLeft';

export default ArrowDownLeft;
