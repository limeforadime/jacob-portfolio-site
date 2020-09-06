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
        <h4 className='article__created-by'>By Jacob Moore</h4>
        <h4 className='article__creation-date'>
          Created at:{' '}
          {new Date('2016-11-23T14:54:58.995+00:00').toLocaleTimeString(
            'en-US',
            { month: 'long', day: 'numeric', year: 'numeric' }
          )}
        </h4>

        {data.datoCmsWork.showCoverImage && (
          <div className='article__cover-image article__gallery'>
            <Img fluid={data.datoCmsWork.coverImage.fluid} />
          </div>
        )}

        {data.datoCmsWork.showExcerpt && (
          <div
            className='article__excerpt'
            dangerouslySetInnerHTML={{
              __html: data.datoCmsWork.excerptNode.childMarkdownRemark.html,
            }}
          />
        )}
        {/* <div className='article__slider'>
          <Slider infinite={true} slidesToShow={2} dots={true}>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img
                alt={data.datoCmsWork.title}
                key={fluid.src}
                src={fluid.src}
              />
            ))}
          </Slider>
        </div> */}
        <div
          className='article__body'
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
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
      showExcerpt
      excerpt
      excerptNode {
        childMarkdownRemark {
          html
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      showCoverImage
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      meta {
        createdAt
      }
    }
  }
`;
/*
gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
*/
