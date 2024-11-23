const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
  };
  
export default errorMiddleware;
  