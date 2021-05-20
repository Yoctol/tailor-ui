/* eslint-disable import/no-unresolved */
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

// const features = [
//   {
//     title: <>Easy to Use</>,
//     imageUrl: 'img/undraw_docusaurus_mountain.svg',
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//   },
//   {
//     title: <>Focus on What Matters</>,
//     imageUrl: 'img/undraw_docusaurus_tree.svg',
//     description: (
//       <>
//         Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//         ahead and move your docs into the <code>docs</code> directory.
//       </>
//     ),
//   },
//   {
//     title: <>Powered by React</>,
//     imageUrl: 'img/undraw_docusaurus_react.svg',
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
// ];

const users = [
  {
    title: <>Creator</>,
    imageUrl: 'img/creator.svg',
    url: 'https://yoctol.ai/creator/',
    description: (
      <>
        Messaging marketing and customer support bot builder for your business,
        in one place.
      </>
    ),
  },
  {
    title: <>Seeker</>,
    imageUrl: 'img/seeker.svg',
    url: 'https://yoctol.ai/seeker/',
    description: <>Grow your ads performances on Facebook by 200%.</>,
  },
  {
    title: <>YOCTOL.AI</>,
    imageUrl: 'img/yoctol-ai.svg',
    url: 'https://yoctol.ai/',
    description: (
      <>
        YOCTOL.AI - Solution provider in AI Chatbot Ecosystem. From bot builder
        to marketing tool.
      </>
    ),
  },
];

// function Feature({ imageUrl, title, description }) {
//   const imgUrl = useBaseUrl(imageUrl);
//   return (
//     <div className={classnames('col col--4', styles.feature)}>
//       {imgUrl && (
//         <div className="text--center">
//           <img className={styles.featureImage} src={imgUrl} alt={title} />
//         </div>
//       )}
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// }

function User({ imageUrl, url, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className={classnames('text--center', styles.featureTitle)}>
        {title}
      </h3>
      <p className={classnames('text--center', styles.featureDescription)}>
        {description}
      </p>
      <a
        className={classnames('button', styles.featureLinkButton)}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
      </a>
    </div>
  );
}

function Home() {
  const { siteConfig: { customFields = {}, tagline } = {} } =
    useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/tailor-ui-dark.svg');

  return (
    <Layout
      permalink="/"
      title={tagline}
      description={customFields.description}
    >
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img src={logoUrl} width="140px" alt="Tailor UI" />
          <p className={classnames('hero__subtitle', styles.heroSubtitle)}>
            {tagline}
          </p>
          <div className={styles.buttons}>
            <Link
              className={classnames('button button--lg', styles.gettingStarted)}
              to={useBaseUrl('docs')}
            >
              Getting Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {/* {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )} */}
        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Who is using Tailor UI?</h2>
            <div className="row">
              {users.map((props, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <User key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
