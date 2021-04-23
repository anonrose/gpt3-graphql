const complete = require('./complete');
const search = require('./search');


module.exports = {
  Query: {
    ...complete.queries,
    ...search.queries,
  }
}
