const server = require('./api/server')

const port = process.env.PORT || 5060;

server.listen(port, () => console.log(`Server listening on port: ${port}.`))