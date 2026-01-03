-- TEST TABLE
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO items (name, quantity) VALUES ('item1', 10);
INSERT INTO items (name, quantity) VALUES ('item2', 20);
