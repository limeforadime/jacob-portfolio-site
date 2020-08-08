import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Hero = () => {
  const { hero } = useHeroQuery();
  return (
    <section id='hero'>
      <header>Hero section</header>
      <main>
        <h2>{hero.title}</h2>
      </main>
    </section>
  );
};

export default Hero;

const useHeroQuery = () => {
  const heroData = useStaticQuery(graphql`
    query HeroQuery {
      hero: datoCmsHeroBlock {
        title
      }
    }
  `);
  return heroData;
};
