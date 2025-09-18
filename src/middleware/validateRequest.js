const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });
  
      if (error) {
        const errorDetails = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorDetails });
      }
      
      req[property] = value;
      return next();
    };
};
  
module.exports = validateRequest;