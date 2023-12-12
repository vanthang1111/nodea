const notFound = (req,res,next)=>{
    const  error = new Error(`not found- ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let errorMessage = err.message;
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 400; // Bad Request
      errorMessage = 'Invalid ObjectId';
    }
  
    res.status(statusCode);
    res.json({
      message: errorMessage,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };