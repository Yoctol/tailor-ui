import React from 'react';
import styled from 'styled-components';

import { Menu } from 'tailor-ui';

const TOP_NAV_HEIGHT = '50px';

const Layout = styled.div`
  position: relative;
`;

const TopNav = styled.div`
  z-index: 1;
  height: ${TOP_NAV_HEIGHT};
  /* border-bottom: 1px black solid; */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
`;

const SideMenu = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  min-width: 20%;
  height: 100vh;
  overflow: scroll;
  background-color: #eee;
  @media only screen and (max-width: 768px) {
    position: static;
    width: 100%;
  }
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  padding: 20px;
  overflow: scroll;
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
`;

export default ({ children }) => {
  const [value, setValue] = React.useState('1');

  return (
    <Layout>
      <TopNav>TOP NAV</TopNav>
      <MainWrapper>
        <SideMenu>
          <Menu>
            <Menu.SubMenu id="understood" title="Group 1" icon="understood">
              <Menu.Item active={value === '1'} onClick={() => setValue('1')}>
                Item 1
              </Menu.Item>
              <Menu.Item active={value === '2'} onClick={() => setValue('2')}>
                Item 2
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu id="kurator" title="Group 2" icon="kurator">
              <Menu.Item active={value === '3'} onClick={() => setValue('3')}>
                Item 3
              </Menu.Item>
              <Menu.Item active={value === '4'} onClick={() => setValue('4')}>
                Item 4
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu id="touch" title="Group 3" icon="touch">
              <Menu.Item active={value === '5'} onClick={() => setValue('5')}>
                Item 5
              </Menu.Item>
              <Menu.Item active={value === '6'} onClick={() => setValue('6')}>
                Item 6
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </SideMenu>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MainWrapper>
      <style jsx global>{`
        .MDXH1 {
          font-size: 70px;
          position: relative;
          display: table;
          font-family: Roboto;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 30px 0px 20px;
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

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Layout>
  );
};
