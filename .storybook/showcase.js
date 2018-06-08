import React, { createElement, Children } from 'react';
import PropTypes from 'prop-types';
import jsxToString from 'jsx-to-string';
import CopyIcon from 'react-icons/lib/md/content-copy';
import copy from 'copy-to-clipboard';
import omitBy from 'lodash/omitBy';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';

import { Flex, Box, Icon, Tooltip, Heading } from '../';

const renderToString = component => {
  const { displayName } = component.type;
  if (displayName.includes('PropsTransformer')) {
    // eslint-disable-next-line no-param-reassign
    component.type.displayName = displayName.slice(17, -1);
  }

  const jsxString = jsxToString(
    createElement(
      component.type,
      omitBy(component.props, value => !value),
      component.props.children
    ),
    {
      shortBooleanSyntax: true,
      useFunctionCode: true,
      functionNameOnly: true,
    }
  );

  const code = prettier.format(jsxString, {
    parser: 'babylon',
    plugins: [babylon],
  });

  return {
    preview: (
      <pre className="language-jsx">
        <code className="language-jsx">{code}</code>
      </pre>
    ),
    code,
  };
};

const renderTreeToString = tree => {
  const result = Children.map(tree, renderToString);

  return {
    preview: result.map(({ preview }) => preview),
    code: result.map(({ code }) => code).join('\n'),
  };
};

const ShowcaseWrapper = props => (
  <Flex
    flexDirection="column"
    alignItems="center"
    border="1px dashed rgb(229, 229, 229)"
    px="50px"
    {...props}
  >
    {props.children}
  </Flex>
);

ShowcaseWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const Showcase = ({ children, bg }) => {
  const { preview, code } = renderTreeToString(children);
  return (
    <>
      <ShowcaseWrapper mt="16px" py="35px" bg={bg}>
        {children}
      </ShowcaseWrapper>
      <ShowcaseWrapper position="relative" mt="5px" mb="16px" py="10px">
        <Box position="absolute" right="10px" top="10px">
          <Tooltip
            content="Copy to Clipboard"
            minWidth="135px"
            placement="left"
          >
            <Icon type={CopyIcon} cursor="pointer" onClick={() => copy(code)} />
          </Tooltip>
        </Box>
        <Box>{preview}</Box>
      </ShowcaseWrapper>
    </>
  );
};

Showcase.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Showcase.defaultProps = {
  bg: 'light',
};

const ShowcasePage = ({ children, title }) => (
  <Flex flexDirection="column" p={5}>
    <Heading.h1 mb={5}>{title}</Heading.h1>
    {children}
  </Flex>
);

export { Showcase, ShowcasePage };

