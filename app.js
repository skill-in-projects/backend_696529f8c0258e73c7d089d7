const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const testController = require('./Controllers/TestController');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'Backend API documentation'
        },
        servers: [
            {
                url: '/',
                description: 'Current server'
            }
        ]
    },
    apis: ['./Controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Also support /docs like FastAPI

// Routes
app.get('/api/test', testController.getAll);
app.get('/api/test/:id', testController.getById);
app.post('/api/test', testController.create);
app.put('/api/test/:id', testController.update);
app.delete('/api/test/:id', testController.remove);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend API is running',
        status: 'ok',
        swagger: '/swagger',
        api: '/api/test'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        service: 'Backend API'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on 0.0.0.0:${PORT}`);
});
