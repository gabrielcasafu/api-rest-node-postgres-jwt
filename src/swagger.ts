import swaggerJSDoc from 'swagger-jsdoc'

// Metadata info about our api
export const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Node Postgres API", 
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Development server"
            },
        ],
    },
    apis: ["./src/routes/*.ts"]
}

// Docs en JSON format
export const swaggerSpect = swaggerJSDoc(options)