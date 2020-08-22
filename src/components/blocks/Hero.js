import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';

const Hero = () => {
  const { hero } = useHeroQuery();
  return (
    <section id='hero' className='block Hero'>
      <div className='Hero__wrapper'>
        <header className='Hero__title Hero__title--light'>{hero.title}</header>
        <h2 className='Hero__subtitle block__content-text block__content-text--light block__content-text--center'>
          {hero.subtitle}
        </h2>
        <div className='button-wrapper'>
          <Link
            to='/#services'
            className='Hero__cta-button button button--center'
          >
            {hero.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const useHeroQuery = () => {
  const heroData = useStaticQuery(graphql`
    query HeroQuery {
      hero: datoCmsHeroBlock {
        title
        subtitle
        buttonText
      }
    }
  `);
  return heroData;
};
