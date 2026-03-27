const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'rewards.db');

const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (` +
            `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
            `username TEXT UNIQUE NOT NULL,` +
            `email TEXT UNIQUE NOT NULL,` +
            `password TEXT NOT NULL,` +
            `points INTEGER DEFAULT 0,` +
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

        db.run(`CREATE TABLE IF NOT EXISTS tasks (` +
            `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
            `title TEXT NOT NULL,` +
            `description TEXT,` +
            `points INTEGER NOT NULL,` +
            `completed_by INTEGER,` +
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP,` +
            `FOREIGN KEY (completed_by) REFERENCES users(id))`);

        db.run(`CREATE TABLE IF NOT EXISTS rewards (` +
            `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
            `user_id INTEGER NOT NULL,` +
            `points_earned INTEGER NOT NULL,` +
            `task_id INTEGER,` +
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP,` +
            `FOREIGN KEY (user_id) REFERENCES users(id),` +
            `FOREIGN KEY (task_id) REFERENCES tasks(id))`);

        db.run(`CREATE TABLE IF NOT EXISTS gift_cards (` +
            `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
            `name TEXT NOT NULL,` +
            `points_required INTEGER NOT NULL,` +
            `description TEXT,` +
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

        db.run(`CREATE TABLE IF NOT EXISTS redemptions (` +
            `id INTEGER PRIMARY KEY AUTOINCREMENT,` +
            `user_id INTEGER NOT NULL,` +
            `gift_card_id INTEGER NOT NULL,` +
            `points_spent INTEGER NOT NULL,` +
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP,` +
            `FOREIGN KEY (user_id) REFERENCES users(id),` +
            `FOREIGN KEY (gift_card_id) REFERENCES gift_cards(id))`);

        console.log('Database initialized successfully');
    });
};

const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const getQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const allQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = { db, initializeDatabase, runQuery, getQuery, allQuery };