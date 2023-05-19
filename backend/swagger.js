import swaggerAutogen from "swagger-autogen"

const outputFile = './swagger_output.json'
const endpointsFile = ['./src/routes/userRoutes.js']

swaggerAutogen(outputFile, endpointsFile)