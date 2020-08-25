require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Jacob's Portfolio Site`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: process.env.SNIPCART_API_TOKEN,
        autopop: true,
      },
    },
  ],
};
