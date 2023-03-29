CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    passwd VARCHAR(255),
    pfp LONGTEXT,
    bio VARCHAR(255),
    states JSON,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE comments (
    id int AUTO_INCREMENT,
    user_id INT,
    book VARCHAR(1024),
    content VARCHAR(8192),
    created_at DATETIME,
    edited BOOLEAN DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE social (
    user_id INT,
    book VARCHAR(255),
    favorited BOOLEAN,
    shared BOOLEAN,
    PRIMARY KEY (user_id, book),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE objectives (
    user_id INT,
	objective_year DATE,
    to_read INT,
    done BOOLEAN,
    PRIMARY KEY (user_id, objective_year),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bookshelf (
    user_id INT,
    book VARCHAR(255),
    state VARCHAR(255),
    review INT,
    progress INT,
    PRIMARY KEY (user_id, book),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

