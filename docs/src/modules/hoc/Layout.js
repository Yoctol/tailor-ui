import React from 'react';
import styled from 'styled-components';

import { Tabs } from 'tailor-ui';

const LayoutWrapper = styled.div`
  position: relative;
  min-width: 1000px;
`;

const TopNav = styled.div`
  display: flex;
  position: sticky;
  z-index: 1;
  top: 0;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
`;

const StyledTabs = styled(Tabs)``;

const Title = styled.h1`
  margin: 0 10px;
  color: gray;
  font-size: 1.8em;
  font-weight: 400;
`;

const ChildrenWrapper = styled.div`
  width: 70%;
  min-width: 936px;
  margin: auto;
  overflow: scroll;
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children }) => {
  const [value, setValue] = React.useState();

  return (
    <LayoutWrapper>
      <TopNav>
        <Title>Tailor UI</Title>
        <StyledTabs activeValue={value} onChange={setValue} size="lg">
          <Tabs.Tab value="1" label="Home" />
          <Tabs.Tab value="2" label="Components" />
        </StyledTabs>
      </TopNav>
      <MainWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MainWrapper>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .MDXH1 {
          font-size: 70px;
          position: relative;
          display: table;
          font-family: Roboto;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 10px 0px 20px;
        }
        .MDXH1:before {
          position: absolute;
          content: '';
          bottom: 5%;
          left: 0px;
          width: 35%;
          height: 2px;
          background: rgb(60, 90, 208);
        }

        .MDXH2 {
          position: relative;
          padding-bottom: 5px;
          line-height: 1.2em;
          font-family: Roboto;
          font-weight: 400;
          font-size: 32px;
          letter-spacing: -0.02em;
          border-bottom: 1px dashed rgb(206, 212, 222);
          margin: 40px 0px 20px;
        }

        .MDXUl {
          list-style: none;
          padding: 0;
        }

        .MDXLi::before {
          content: '● ';
          color: rgb(206, 212, 222);
          font-weight: bold;
          margin-right: 5px;
        }
      `}</style>
    </LayoutWrapper>
  );
};

export default Layout;
