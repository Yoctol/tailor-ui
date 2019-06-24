import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { MDXProvider } from '@mdx-js/tag';

import { UIProvider } from 'tailor-ui';

import Layout from './hoc/Layout';
import { H1, H2, Li, Ul } from './components/MDXComponents';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={{ h1: H1, h2: H2, ul: Ul, li: Li }}>
        <Container>
          <Head>
            <title>Tailor UI</title>
          </Head>
          <UIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UIProvider>
        </Container>
      </MDXProvider>
    );
  }
}
