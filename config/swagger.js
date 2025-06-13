const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
  },
  apis: ['./api/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
