CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    passwd VARCHAR(255),
    pfp LONGTEXT,
    bio VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT,
    user_id INT,
    book_id VARCHAR(1024),
    content VARCHAR(8192),
    created_at DATETIME,
    edited BOOLEAN DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE objectives (
    user_id INT,
	objective_year INT,
    to_read INT,
    PRIMARY KEY (user_id, objective_year),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE books (
    id VARCHAR(256),
    title VARCHAR(1024),
    image VARCHAR(1024),
    pages INT,
    PRIMARY KEY (id)
);

CREATE TABLE states (
    id INT AUTO_INCREMENT,
	state_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE bookshelf (
    user_id INT,
    book_id VARCHAR(255),
    state_id INT,
    review INT DEFAULT NULL,
    progress INT DEFAULT 0,
    favorited BOOLEAN,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (state_id) REFERENCES states(id)
);

INSERT INTO states (state_name)
VALUES ("Reading"), ("Plan to read"), ("Completed");

