import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import { Flex, Box } from '../../';

storiesOf('General|Typography', module)
  .addDecorator(centered)
  .add('Heading', () => (
    <div>
      <h1>
        H1 Heading <small>40px</small>
      </h1>
      <h2>
        H2 Heading <small>32px</small>
      </h2>
      <h3>
        H3 Heading <small>28px</small>
      </h3>
      <h4>
        H4 Heading <small>24px</small>
      </h4>
      <h5>
        H5 Heading <small>20px</small>
      </h5>
      <h6>
        H6 Heading <small>16px</small>
      </h6>
    </div>
  ))
  .add('Semantic text', () => (
    <Flex flexWrap="wrap" width={400}>
      <Box width={1 / 2} p={2}>
        <abbr title="Internationalization">I18N</abbr>
        <code>&lt;abbr&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <strong>Bold</strong>
        <code>&lt;strong&gt;</code> <code>&lt;b&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <cite>Citation</cite>
        <code>&lt;cite&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <code>Hello World!</code>
        <code>&lt;code&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <del>Deleted</del>
        <code>&lt;del&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <em>Emphasis</em>
        <code>&lt;em&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <i>Italic</i>
        <code>&lt;i&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <ins>Inserted</ins>
        <code>&lt;ins&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <kbd>Ctrl + S</kbd>
        <code>&lt;kbd&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <mark>Highlighted</mark>
        <code>&lt;mark&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <ruby>
          漢 <rt>kan</rt>
          字 <rt>ji</rt>
        </ruby>
        <code>&lt;ruby&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <s>Strikethrough</s>
        <code>&lt;s&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <samp>Sample</samp>
        <code>&lt;samp&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        Text <sub>Subscripted</sub>
        <code>&lt;sub&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        Text <sup>Superscripted</sup>
        <code>&lt;sup&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <time>20:00</time>
        <code>&lt;time&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <u>Underline</u>
        <code>&lt;u&gt;</code>
      </Box>
      <Box width={1 / 2} p={2}>
        <var>x</var> = <var>y</var> + 2
        <code>&lt;var&gt;</code>
      </Box>
    </Flex>
  ))
  .add('Blockquote', () => (
    <blockquote>
      <p>
        The advance of technology is based on making it fit in so that you
        don&#39;t really even notice it, so it&#39;s part of everyday life.{' '}
      </p>
      <cite>- Bill Gates</cite>
    </blockquote>
  ))
  .add('Lists', () => (
    <Flex width={600}>
      <Box width={1 / 3}>
        <ul>
          <li>list item 1</li>
          <li>
            list item 2
            <ul>
              <li>list item 2.1</li>
              <li>list item 2.2</li>
              <li>list item 2.3</li>
            </ul>
          </li>
          <li>list item 3</li>
        </ul>
      </Box>
      <Box width={1 / 3}>
        <ol>
          <li>list item 1</li>
          <li>
            list item 2
            <ol>
              <li>list item 2.1</li>
              <li>list item 2.2</li>
              <li>list item 2.3</li>
            </ol>
          </li>
          <li>list item 3</li>
        </ol>
      </Box>
      <Box width={1 / 3}>
        <dl>
          <dt>description list term 1</dt>
          <dd>description list description 1</dd>
          <dt>description list term 2</dt>
          <dd>description list description 2</dd>
          <dt>description list term 3</dt>
          <dd>description list description 3</dd>
        </dl>
      </Box>
    </Flex>
  ));
