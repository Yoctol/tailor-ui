import React from 'react';

export const H1 = ({ children, ...props }) => {
  return (
    <h1 {...props} className="MDXH1">
      {children}
    </h1>
  );
};

export const H2 = ({ children, ...props }) => {
  return (
    <h2 {...props} className="MDXH2">
      {children}
    </h2>
  );
};

export const Ul = props => {
  return <ul {...props} className="MDXUl" />;
};

export const Li = props => {
  return <li {...props} className="MDXLi" />;
};
