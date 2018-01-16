INSERT INTO users
(name, email, picture_url, auth0_id)
VALUES 
($1, $2, $3, $4)
RETURNING *;