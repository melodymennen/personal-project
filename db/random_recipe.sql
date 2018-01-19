SELECT * FROM recipes
WHERE id = $1
ORDER BY random()
LIMIT 1;