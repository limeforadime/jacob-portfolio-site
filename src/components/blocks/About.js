import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

const About = () => {
  const { about } = useAboutQuery();
  return (
    <section id='about' className='block About'>
      <div className='content-wrapper'>
        <header>
          <h1 className='About__title block__title block__title--dark'>
            {about.title}
          </h1>
        </header>
        <main className='About__flex-wrapper'>
          <div className='photo__wrapper'>
            <Img className='About__photo' fluid={about.photo.fluid} />
          </div>
          <div
            className='About__content-text block__content-text block__content-text--dark'
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
        </main>
      </div>
    </section>
  );
};

export default About;

const useAboutQuery = () => {
  const aboutData = useStaticQuery(graphql`
    query AboutQuery {
      about: datoCmsAboutBlock {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        title
        photo {
          fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        bioNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `);
  return aboutData;
};
