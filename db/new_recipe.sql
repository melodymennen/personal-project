INSERT INTO recipes
(name, category_id, ingredients, directions, notes, user_id)
VALUES 
($1, $2, $3, $4, $5, $6);