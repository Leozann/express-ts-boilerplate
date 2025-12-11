import cors from 'cors'

const corsMiddleware = cors({
  origin: '*', // allow all origins for development only; adjust as needed for production
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: [
    'X-Requested-With',
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'ngrok-skip-browser-warning',
  ],
  credentials: true, // enable cookies and credentials
  exposedHeaders: ['Content-Disposition'],
})

export default corsMiddleware
