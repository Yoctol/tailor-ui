import React from 'react';
import Router, { withRouter } from 'next/router';
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
  overflow: auto;
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children, router: { pathname } }) => {
  let activeValue = '1';
  if (pathname.includes('components')) activeValue = '2';

  return (
    <LayoutWrapper>
      <TopNav>
        <Title>Tailor UI</Title>
        <StyledTabs activeValue={activeValue} size="lg">
          <Tabs.Tab
            value="1"
            label="Home"
            onClick={() => {
              Router.push('/');
            }}
          />
          <Tabs.Tab
            value="2"
            label="Components"
            onClick={() => {
              Router.push('/components');
            }}
          />
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
      `}</style>
    </LayoutWrapper>
  );
};

export default withRouter(Layout);
