import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Services = () => {
  const serviceList = [];
  const { services } = useServiceListingQuery();

  services.edges.forEach((serviceEdge) => {
    serviceList.push({
      name: serviceEdge.node.name,
      id: serviceEdge.node.id,
      description: serviceEdge.node.description,
      price: serviceEdge.node.price,
    });
  });

  return (
    <section id='services'>
      <h1
        style={{
          fontSize: '1.5rem',
          marginBottom: '20px',
        }}
      >
        My Services
      </h1>
      <div className='services__flex-wrapper'>
        {serviceList.map((service) => (
          <div className='service__item'>
            <h2 className='service__name'>{service.name}</h2>
            <h4>{service.description}</h4>
            <h3>${service.price}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

const useServiceListingQuery = () => {
  const serviceListData = useStaticQuery(graphql`
    query ServiceQuery {
      services: allDatoCmsService {
        edges {
          node {
            id
            description
            price
            name
          }
        }
      }
    }
  `);
  return serviceListData;
};
