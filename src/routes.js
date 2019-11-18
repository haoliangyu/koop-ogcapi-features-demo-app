module.exports = [
  {
    method: 'GET',
    path: '/',
    controller: (req, res) => {
      res.status(200).send('Welcome to Koop!')
    }
  },
  {
    method: 'GET',
    path: '/agol/:host/:id',
    controller: (req, res) => {
      res.status(200).json({
        message: 'Welcome to use Koop OGC provider!'
      })
    }
  }
]
