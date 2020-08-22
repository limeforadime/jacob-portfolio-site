import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Contact = () => {
  const { availability } = useContactQuery();

  return (
    <section id='contact' className='block Contact'>
      <div className='Contact__flex-wrapper'>
        <div className='Contact__contact'>
          <header>
            <h1 className='Contact__contact__title block__title block__title--dark'>
              Contact Me
            </h1>
          </header>
          <form className='Contact__form Contact__form__grid-wrapper' action=''>
            <div className='Contact__grid-item--name'>
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' name='name' required />
            </div>

            <div className='Contact__grid-item--email'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' name='email' required />
            </div>

            <div className='Contact__grid-item--message'>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                placeholder='Enter message here...'
                rows='7'
                required
              />
            </div>

            <button className='Contact__send-btn button'>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

const useContactQuery = () => {
  const contactData = useStaticQuery(graphql`
    query ContactQuery {
      availability: datoCmsContactAvailabilityBlock {
        title
        tuesday
        wednesday
        thursday
        sunday
        saturday
        monday
        friday
      }
    }
  `);
  return contactData;
};
