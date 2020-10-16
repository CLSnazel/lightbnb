SELECT properties.*, AVG(property_reviews.rating) AS average_rating 
FROM properties 
LEFT JOIN property_reviews ON properties.id = property_id
WHERE city LIKE `%Van%`;
