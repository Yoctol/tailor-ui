import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Flex } from 'tailor-ui';

const CCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 22.3%;
  height: 220px;
  margin: 0 calc(8% / 6);
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const CCDisplay = styled(Flex)`
  width: 100%;
  min-height: 170px;
  border-bottom: 1px solid #ddd;
  border-radius: 3px 3px 0 0;
  background: #f7f9fc;
`;

const CCTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: #ecf3fc;
  }

  &:hover p {
    color: #1070ca;
  }

  &:active {
    background: #3da1ff;
  }

  &:active p {
    color: #fff;
  }
`;

const CCTitle = styled.p`
  margin: 0;
  color: gray;
  font-size: 1.2em;
  font-weight: 300;
`;

const ComponentCard = ({
  children,
  title,
  href = '/',
  justifyContent = 'space-around',
  alignItems = 'stretch',
  flexDirection = 'column',
  padding = '15px',
}) => {
  return (
    <CCWrapper>
      <CCDisplay
        justifyContent={justifyContent}
        alignItems={alignItems}
        flexDirection={flexDirection}
        style={{ padding }}
      >
        {children}
      </CCDisplay>
      <Link prefetch href={href}>
        <CCTitleWrapper>
          <CCTitle>{title}</CCTitle>
        </CCTitleWrapper>
      </Link>
    </CCWrapper>
  );
};

export default ComponentCard;
