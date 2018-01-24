SELECT * FROM recipes r
JOIN favorites f ON r.id = f.recipe_id 
WHERE f.user_id = $1
ORDER BY r.name;