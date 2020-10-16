const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'db'
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  console.log(email);
  return pool.query(`
    SELECT id, name, email, password
    FROM users
    WHERE email = $1;
  `, [`${email}`])
  .then (res => {
    console.log(res.rows);
    return res.rows[0];
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  return pool.query(`
    SELECT id, name, email, password
    FROM users
    WHERE id = $1;
  `, [`${id}`])
  .then (res => {
    console.log(res.rows);
    return res.rows[0];
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
  .then( res => {
    return res.rows[0];
  })
}
exports.addUser = addUser;

/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  return pool.query(`
    SELECT reservations.*, properties.*, AVG(rating) AS average_rating
    FROM reservations
    JOIN properties ON  properties.id = property_id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1 
    AND end_date > now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY start_date
    LIMIT $2;`, [guest_id, limit])
  .then(res => {
    return res.rows;
  });
}
exports.getAllReservations = getAllReservations;

/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  //init params and query
  let optionParams = [];
  let queryString = "SELECT properties.*, AVG(property_reviews.rating) AS average_rating FROM properties LEFT JOIN property_reviews ON properties.id = property_id";

  //function to insert 'AND' or 'WHERE' as necessary for query constraints
  function addQueryCondition() {
    queryString += optionParams.length > 1 ? ` AND ` : ` WHERE `
  }

  //look through options and add them as params if present
  if (options) {
    if (options.city) {
      optionParams.push(`%${options.city}%`);
      addQueryCondition();
      queryString += ` city LIKE $${optionParams.length}`;
    }
    if (options.owner_id) {
      optionParams.push(options.owner_id);
      addQueryCondition();
      queryString += ` owner_id = $${optionParams.length} `
    }
    if (options.minimum_price_per_night) {
      optionParams.push(options.minimum_price_per_night);
      addQueryCondition();
      queryString += ` cost_per_night >= $${optionParams.length}`;
    }
    if (optionParams.maximum_price_per_night) {
      optionParams.push(options.maximum_price_per_night);
      addQueryCondition();
      queryString += ` cost_per_night <= $${optionParams.length}`;
    }
  }

  queryString += ` GROUP BY properties.id `;
  
  //last conditional, minimum rating, if present as HAVING on aggregate
  if (options.minimum_rating) {
    optionParams.push(options.minimum_rating);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${optionParams.length}`;
  }
  
  //adding limits and ordering
  optionParams.push(limit);
  queryString +=` ORDER BY cost_per_night LIMIT $${optionParams.length};`;
  
  // console.log(queryString);

  return pool.query(queryString, optionParams)
  .then(res => {
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
