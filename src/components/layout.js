import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import '../styles/index.scss';

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { site, sidebar } = useLayoutQuery();
  const closeSidebar = () => setShowMenu(false);
  const listenToScroll = () => {
    const pos = window.pageYOffset;
    setScrollPosition(pos);
  };

  const listenToSnipcartElement = () => {
    const targetNode = document.getElementById('snipcart');
    const targetClass = 'snipcart-modal__container';
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        console.dir(mutation);
        if (mutation.type === 'childList') {
          if (mutation.addedNodes[0] && mutation.addedNodes[0].classList) {
            if ([...mutation.addedNodes[0].classList].includes(targetClass)) {
              setCartActive(true);
              document.querySelector('body').classList.add('noscroll');
            }
          }
          if (targetNode.children.length == 0) {
            setCartActive(false);
            document.querySelector('body').classList.remove('noscroll');
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll, { passive: true });
    listenToSnipcartElement();
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <div className={`container ${showMenu ? 'is-open' : ''}`}>
      <HelmetDatoCms
        favicon={site.faviconMetaTags}
        seo={sidebar.seoMetaTags}
        title={site.globalSeo.siteName}
      >
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
          integrity='sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=='
          crossorigin='anonymous'
        />
      </HelmetDatoCms>

      <div
        className={`modal ${showMenu ? 'is-open' : ''}`}
        onClick={closeSidebar}
      ></div>
      <div className={`mobile-header__menu ${showMenu ? 'is-open' : ''}`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
        />
      </div>
      <button className='cart snipcart-checkout'>
        <span className='cart__icon fas fa-shopping-cart fa-3x' />
      </button>
      <div className='container__sidebar'>
        <div className='sidebar'>
          <h6 className='sidebar__title'>
            <Link to='/'>{site.globalSeo.siteName}</Link>
          </h6>
          <div className='sidebar__intro__wrapper'>
            <div
              className='sidebar__intro'
              dangerouslySetInnerHTML={{
                __html: sidebar.aboutSummaryNode.childMarkdownRemark.html,
              }}
            />
          </div>
          <nav>
            <ul className='sidebar__menu'>
              <li>
                <Link
                  to='/'
                  className='sidebar__menu__item'
                  onClick={closeSidebar}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/#services'
                  className='sidebar__menu__item'
                  onClick={closeSidebar}
                >
                  My Services
                </Link>
              </li>
              <li>
                <Link
                  to='/#contact'
                  className='sidebar__menu__item'
                  onClick={closeSidebar}
                >
                  Get In Touch
                </Link>
              </li>
              <li>
                <Link
                  to='/#testimonials'
                  className='sidebar__menu__item'
                  onClick={closeSidebar}
                >
                  Testimonials
                </Link>
              </li>
              {/* <li>
                <Link to='/#about' onClick={closeSidebar}>
                  About
                </Link>
              </li> */}
              <li>
                <Link
                  to='/all-works'
                  className='sidebar__menu__item'
                  onClick={closeSidebar}
                >
                  My Works
                </Link>
              </li>
              <li>
                <button
                  className='sidebar__menu__item sidebar__button-reset snipcart-checkout'
                  onClick={closeSidebar}
                >
                  <span className='fas fa-shopping-cart' />{' '}
                  <span className='snipcart-total-price'> $0.00</span> (
                  <span className='snipcart-items-count'>0</span>)
                </button>
              </li>
            </ul>
          </nav>
          <p className='sidebar__phone'>{sidebar.email}</p>
          <p className='sidebar__phone'>{sidebar.phoneNumber}</p>
          <p className='sidebar__social'>
            {sidebar.sidebarSocialLinks.map((profile) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target='blank'
                className={`social social--${profile.profileType.toLowerCase()}`}
              >
                {' '}
              </a>
            ))}
          </p>
          <div className='sidebar__copyright'>{sidebar.copyright}</div>
        </div>
      </div>
      <div className={`container__body ${showMenu ? 'is-open' : ''}`}>
        {!showMenu && (
          <div
            className={`container__mobile-header ${
              scrollPosition > 0 ? 'is-scrolled' : ''
            }`}
          >
            <div className='mobile-header'>
              <div
                className={`mobile-header__logo ${
                  scrollPosition > 5 ? 'is-scrolled' : ''
                }`}
              >
                <Link to='/'>{site.globalSeo.siteName} </Link>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;

const useLayoutQuery = () => {
  const layoutData = useStaticQuery(graphql`
    query SidebarQuery {
      site: datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      sidebar: datoCmsSidebar {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        aboutSummaryNode {
          childMarkdownRemark {
            html
          }
        }
        sidebarSocialLinks {
          url
          profileType
        }
        email
        phoneNumber
        copyright
      }
    }
  `);
  return layoutData;
};
