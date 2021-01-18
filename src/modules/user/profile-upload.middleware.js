import formidable from "formidable";

const profileUploadMiddleware = (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    Object.assign(req, { fields, files, express_formidable: { parsed: true } });
    next();
  });
};

export default profileUploadMiddleware;
