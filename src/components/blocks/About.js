import React from 'react';
// import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

const About = () => {
  const { about } = useAboutQuery();
  return (
    <section id='about'>
      <article className='sheet'>
        {/* <HelmetDatoCms seo={about.seoMetaTags} /> */}
        <div className='sheet__inner'>
          <header>
            <h1 className='sheet__title'>{about.title}</h1>
          </header>
          <p className='sheet__lead'>{about.subtitle}</p>
          <div className='sheet__gallery'>
            <Img fluid={about.photo.fluid} />
          </div>
          <div
            className='sheet__body'
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
        </div>
      </article>
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
        subtitle
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
