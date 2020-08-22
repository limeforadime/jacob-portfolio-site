import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

const FeaturedWork = () => {
  const { featuredWorksData } = useFeaturedWorkQuery();

  return (
    <section id='featured-work' className='block FeaturedWork'>
      <div className='content-wrapper'>
        <header>
          <h1 className='FeaturedWork__title block__title block__title--dark'>
            {featuredWorksData.title}
          </h1>
        </header>

        <main>
          <div className='FeaturedWork__flex-wrapper'>
            {featuredWorksData.featuredWorks.map((work) => (
              <div key={work.id} className='FeaturedWork__item'>
                <figure className='card'>
                  <Link to={`/works/${work.slug}`} className='card__image'>
                    <Img fluid={work.coverImage.fluid} />
                  </Link>
                  <figcaption className='card__caption'>
                    <h6 className='card__title'>
                      <Link to={`/works/${work.slug}`}>{work.title}</Link>
                    </h6>
                    <div className='card__description'>
                      <p>{work.excerpt}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <Link
            className='FeaturedWork__button button button--dark button--center'
            to='/all-works'
          >
            Show All
          </Link>
        </main>
      </div>
    </section>
  );
};

export default FeaturedWork;

const useFeaturedWorkQuery = () => {
  const featuredWorkData = useStaticQuery(graphql`
    query FeaturedWorkQuery {
      featuredWorksData: datoCmsFeaturedWorkBlock {
        title
        featuredWorks {
          title
          id
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  `);
  return featuredWorkData;
};
