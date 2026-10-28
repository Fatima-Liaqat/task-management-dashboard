import React from 'react';

const CardWrapper = ({ children, title }) => {
  return (
   <div className="card-wrapper">
  {title && <h3>{title}</h3>}
  {children}
</div>
  );
};

export default CardWrapper;