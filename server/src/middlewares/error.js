export default function errorHandler(err, req, res, next) {
const status = err.status || err.statusCode || 500;
const payload = {
message: err.message || 'Internal Server Error',
// en dev conviene ver el stack
...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
};
if (process.env.NODE_ENV !== 'production') {
console.error('[error]', err);
}
res.status(status).json(payload);
}