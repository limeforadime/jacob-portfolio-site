import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// import quote from '/images/quote.svg';
import Img from 'gatsby-image';

const Testimonials = () => {
  const { testimonialsBlock } = useTestimonialsQuery();

  return (
    <section id='testimonials' className='block Testimonials'>
      <div className='content-wrapper content-wrapper--larger'>
        <header>
          <h1 className='block__title block__title--light'>
            {testimonialsBlock.title}
          </h1>
        </header>
        <main>
          <div className='Testimonials__flex-wrapper'>
            {testimonialsBlock.testimonials.map((testimonial, i) => (
              <div key={i} className='testimonial__item'>
                <Img
                  className='Testimonials__photo'
                  fluid={testimonial.photo.fluid}
                />
                <div className='Testimonials__quote__wrapper'>
                  <img
                    className='Testimonials__quote-icon'
                    src='/images/quote.svg'
                    alt='quote icon'
                  />
                  <h3 className='Testimonials__quote-text'>
                    {testimonial.quote}
                  </h3>
                </div>
                <h5 className='Testimonials__quote-text Testimonials__quote-text--subtitle'>
                  - {testimonial.clientName}
                </h5>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Testimonials;

const useTestimonialsQuery = () => {
  const testimonialsData = useStaticQuery(graphql`
    query TestimonialsQuery {
      testimonialsBlock: datoCmsTestimonialsBlock {
        title
        testimonials {
          quote
          clientName
          photo {
            fluid(maxWidth: 100, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  `);
  return testimonialsData;
};
