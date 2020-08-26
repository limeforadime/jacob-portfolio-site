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
          <form
            className='Contact__form Contact__form__grid-wrapper'
            action='https://formspree.io/xbjzenav'
            method='POST'
          >
            <input type='text' name='_gotcha' style={{ display: 'none' }} />
            <div className='Contact__grid-item--name'>
              <label>
                Name
                <input id='name' type='text' name='name' required />
              </label>
            </div>

            <div className='Contact__grid-item--email'>
              <label>
                Email
                <input id='email' type='email' name='_replyto' required />
              </label>
            </div>

            <div className='Contact__grid-item--message'>
              <label>
                Message
                <textarea
                  id='message'
                  name='message'
                  placeholder='Enter message here...'
                  rows='7'
                  required
                />
              </label>
            </div>

            <button type='submit' className='Contact__send-btn button'>
              Send
            </button>
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
