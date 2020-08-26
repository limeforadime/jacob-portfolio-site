import React from 'react';
import Layout from '../components/layout';
import About from '../components/blocks/about';
import Services from '../components/blocks/services';
import Hero from '../components/blocks/hero';
import Contact from '../components/blocks/contact';
import Testimonials from '../components/blocks/testimonials';
import FeaturedWork from '../components/blocks/featured-work';

const IndexPage = () => (
  <Layout>
    <>
      <Hero />
      <About />
      <Services />
      <Contact />
      <Testimonials />
      <FeaturedWork />
    </>
  </Layout>
);

export default IndexPage;
