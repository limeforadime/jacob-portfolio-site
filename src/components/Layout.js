import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import '../styles/index.scss';

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { site, sidebar } = useLayoutQuery();
  const closeSidebar = () => setShowMenu(false);
  const listenToScroll = () => {
    const pos = window.pageYOffset;
    setScrollPosition(pos);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll, { passive: true });
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
      <Link className='cart' to='#'>
        <span className='cart__icon fas fa-shopping-cart fa-4x' />
      </Link>
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
          <ul className='sidebar__menu'>
            <li>
              <Link to='/' onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/#services' onClick={closeSidebar}>
                My Services
              </Link>
            </li>
            <li>
              <Link to='/#contact' onClick={closeSidebar}>
                Get In Touch
              </Link>
            </li>
            <li>
              <Link to='/#testimonials' onClick={closeSidebar}>
                Testimonials
              </Link>
            </li>
            {/* <li>
              <Link to='/#about' onClick={closeSidebar}>
                About
              </Link>
            </li> */}
            <li>
              <Link to='/all-works' onClick={closeSidebar}>
                My Works
              </Link>
            </li>
            <li>
              <Link to='#' onClick={closeSidebar}>
                <span className='fas fa-shopping-cart' /> Cart (0)
              </Link>
            </li>
          </ul>
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
        phoneNumber
        copyright
      }
    }
  `);
  return layoutData;
};
