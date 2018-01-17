SELECT * FROM recipes 
WHERE user_id = $1
ORDER BY name ASC;