import App, { Container } from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';
import { MDXProvider } from '@mdx-js/tag';
import { ThemeProvider } from 'styled-components';

import { H1, H2, Li, Ul } from 'docs/src/modules/components';
import { Layout } from 'docs/src/modules/hoc';
import { UIProvider } from 'tailor-ui';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

export default class MyApp extends App {
  render() {
    const { Component, pageProps, route } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <MDXProvider components={{ h1: H1, h2: H2, ul: Ul, li: Li }}>
            <Head>
              <title>Tailor UI</title>
            </Head>
            <UIProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UIProvider>
          </MDXProvider>
        </ThemeProvider>
      </Container>
    );
  }
}
