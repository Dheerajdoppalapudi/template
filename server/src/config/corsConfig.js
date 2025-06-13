const corsOptions = {
    // origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
  
  export default corsOptions;
