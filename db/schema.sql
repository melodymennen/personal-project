CREATE TABLE users (
id SERIAL PRIMARY KEY, 
name TEXT, 
email TEXT, 
picture_url TEXT,
auth0_id TEXT
);

CREATE TABLE categories (
id SERIAL PRIMARY KEY, 
category TEXT
);

CREATE TABLE recipes (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
category_id INTEGER references categories(id),
ingredients TEXT, 
directions TEXT,
notes TEXT, 
user_id INTEGER references users(id)
);

CREATE TABLE favorites (
id SERIAL PRIMARY KEY, 
user_id INTEGER references users(id),
recipe_id INTEGER references recipes(id) ON DELETE CASCADE
);