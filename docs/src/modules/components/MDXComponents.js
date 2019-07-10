import React from 'react';
import styled from 'styled-components';

const CustomH1 = styled.h1`
  display: table;
  position: relative;
  margin: 10px 0 20px;
  font-size: 70px;
  font-weight: 700;
  letter-spacing: -0.02em;

  &::before {
    content: '';
    position: absolute;
    bottom: 5%;
    left: 0;
    width: 35%;
    height: 2px;
    background: rgb(60, 90, 208);
  }
`;

const H1 = ({ children, ...props }) => {
  return <CustomH1 {...props}>{children}</CustomH1>;
};

const CustomH2 = styled.h2`
  position: relative;
  margin: 40px 0 20px;
  padding-bottom: 5px;
  border-bottom: 1px dashed rgb(206, 212, 222);
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2em;
`;

const H2 = ({ children, ...props }) => {
  return (
    <CustomH2 {...props} className="MDXH2">
      {children}
    </CustomH2>
  );
};

const CustonUl = styled.ul`
  padding: 0;
  list-style: none;
`;

const Ul = props => {
  return <CustonUl {...props} className="MDXUl" />;
};

const CustonLi = styled.li`
  &::before {
    content: '● ';
    margin-right: 5px;
    color: rgb(206, 212, 222);
    font-weight: bold;
  }
`;

const Li = props => {
  return <CustonLi {...props} className="MDXLi" />;
};

const MDXWrapper = styled.div`
  width: 75%;
  min-width: 700px;
  margin: auto;
`;

const wrapper = props => (
  <MDXWrapper>
    <main {...props} />
  </MDXWrapper>
);

export default { h1: H1, h2: H2, ul: Ul, li: Li, wrapper };
