// SQLite database schema definitions

// Table for users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

// Table for salaries
CREATE TABLE salaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2) NOT NULL,
    date_paid DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

// Table for departments
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

// Table for user_department relationship
CREATE TABLE user_department (
    user_id INTEGER,
    department_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (user_id, department_id)
);