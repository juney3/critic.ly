/*
Set up and export the API controller
*/

// Controller setup

function index (req, res) {
  res.json({
    message: 'Welcome to critic.ly!',
    documentation_url: 'https://github.com/juney3/critic.ly',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api',
        description: 'Describes available endpoints'
      }
    ]
  });
};

// Export the index function

module.exports = {
  index: index
}
