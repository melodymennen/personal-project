INSERT INTO recipes
(name, category_id, ingredients, directions, notes, user_id, picture_url)
VALUES 
($1, $2, $3, $4, $5, $6, $7);