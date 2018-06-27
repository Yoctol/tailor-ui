export const imports = {
  'src/Button/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-button-index" */ 'src/Button/index.mdx'),
  'src/Heading/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-heading-index" */ 'src/Heading/index.mdx'),
  'src/Icon/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-icon-index" */ 'src/Icon/index.mdx'),
}
