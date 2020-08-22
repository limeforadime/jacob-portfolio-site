import React from 'react';
import Slider from 'react-slick';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <article className='article'>
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className='article__inner'>
        <h1 className='article__title'>{data.datoCmsWork.title}</h1>
        <p className='article__lead'>{data.datoCmsWork.excerpt}</p>
        <div className='article__slider'>
          <Slider infinite={true} slidesToShow={2} dots={true}>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img
                alt={data.datoCmsWork.title}
                key={fluid.src}
                src={fluid.src}
              />
            ))}
          </Slider>
        </div>
        <div
          className='article__body'
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className='article__gallery'>
          <Img fluid={data.datoCmsWork.coverImage.fluid} />
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
