SELECT * FROM recipes 
WHERE user_id = $1 AND category_id = $2;