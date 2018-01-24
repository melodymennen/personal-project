UPDATE recipes
SET name = $2,
category_id = $3,
ingredients = $4,
directions = $5,
notes = $6,
picture_url = $7
WHERE id = $1;