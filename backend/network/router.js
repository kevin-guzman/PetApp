const user = require('../components/user/network')
const publications = require('../components/publications/network')

const router = (server) => {
  server.use('/api/user', user)
  server.use('/api/publications', publications)
}

module.exports = router