import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Services = () => {
  const { servicesBlock } = useServiceListingQuery();

  return (
    <section id='services' className='block Services'>
      <div className='content-wrapper content-wrapper--larger'>
        <header>
          <h1 className='block__title block__title--light'>
            {servicesBlock.title}
          </h1>
          <h4 className='Services__subtext'>{servicesBlock.subtitle}</h4>
        </header>

        <main>
          <div className='Services__grid-wrapper'>
            {servicesBlock.services.map((service) => (
              <div key={service.id} className='service__item'>
                <Img
                  className='service__image'
                  fluid={service.image.fluid}
                ></Img>
                <h2 className='service__name'>{service.name}</h2>
                <h3 className='service__price'>${service.price}</h3>
                <h4 className='service__description'>{service.description}</h4>

                <button
                  className='service__button button snipcart-add-item'
                  data-item-id={service.id}
                  data-item-price={service.price}
                  data-item-name={service.name}
                  data-item-description={service.description}
                  data-item-url={'https://jmoore.netlify.app'}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Services;

const useServiceListingQuery = () => {
  const servicesData = useStaticQuery(graphql`
    query ServicesQuery {
      servicesBlock: datoCmsServicesBlock {
        title
        subtitle
        services {
          id
          price
          name
          description
          image {
            fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  `);
  return servicesData;
};
