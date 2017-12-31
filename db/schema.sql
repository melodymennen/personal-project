CREATE TABLE categories (
id SERIAL PRIMARY KEY, 
category TEXT
);

CREATE TABLE recipes (
id SERIAL PRIMARY KEY,
name VARCHAR (100),
category_id INTEGER references categories(id),
ingredients TEXT, 
directions TEXT,
notes TEXT,
favorites BOOLEAN
);