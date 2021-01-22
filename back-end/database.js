/* 
This file contains the db connection and db helper functions.
All SQL queries should go in here.
*/

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// EXAMPLES QUERIES
const getExampleWithID = (id) => {
  return db.query("SELECT * FROM examples WHERE id = $1;", [id]).then((res) => {
    console.log("whats res.rows[0]", res.rows[0]);
    return res.rows[0];
  });
};

exports.getExampleWithID = getExampleWithID;

const getExample = (text) => {
  return db
    .query(
      `INSERT INTO examples (text)
    VALUES ($1)
    RETURNING *;`,
      [text]
    )
    .then((res) => {
      console.log("whats res.rows[0]", res.rows[0]);
      return res.rows[0];
    });
};

exports.getExample = getExample;

//update example
const updateExample = (id, text) => {
  return db
    .query(
      `UPDATE examples
  SET text = $2 
  WHERE id = $1;`,
      [id, text]
    )
    .then((res) => {
      console.log("whats res.rows[0]", res.rows);
      return res.rows;
    });
};
exports.updateExample = updateExample;

//delete example
const deleteExample = (id) => {
  return db.query(`DELETE FROM examples WHERE id = $1;`, [id]).then((res) => {
    console.log("whats res.rows[0]", res.rows);
    return res.rows;
  });
};

exports.deleteExample = deleteExample;

// USERS QUERIES

//user collections
const getCatsCollections = (id) => {
  return db
    .query(
      `SELECT cats.id, cat_name, image_url, description, date_unlocked
        FROM cats 
        JOIN user_unlocked_cats on cat_id = cats.id
        WHERE user_id = $1`,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getCatsCollections error", err.stack));
};
exports.getCatsCollections = getCatsCollections;

/*--------- todo -----------*/
const getAllCats = () => {
  return db
    .query(
      `SELECT cats.id, cat_name, image_url, description
        FROM cats 
        `,
      []
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getAllCats error", err.stack));
};
exports.getAllCats = getAllCats;

/*--------- todo -----------*/
//create todo
const createTodo = (action_name) => {
  return db
    .query(
      `INSERT INTO actions (user_id,category_id,action_name,date_created,is_completed)
      VALUES (1, 1, $1, CURRENT_DATE, false)
      RETURNING *;`,
      [action_name]
    )
    .then((res) => {
      console.log("createTodo", res.rows[0]);
      return res.rows[0];
    })
    .catch((error) => console.log(error));
};

exports.createTodo = createTodo;

//get todo
const getTodos = (id) => {
  return db
    .query(
      `SELECT actions.id, user_id, action_name, date_created, is_completed
      FROM actions 
      JOIN categories on category_id = categories.id
      WHERE categories.id = 1 and user_id = $1`,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getTodos error", err.stack));
};
exports.getTodos = getTodos;

// create habit

const createHabit = (action_name) => {
  return db
    .query(
      `INSERT INTO actions (user_id,category_id,action_name,date_created,is_completed)
      VALUES (1, 2, $1, CURRENT_DATE, false)
      RETURNING *;`,
      [action_name]
    )
    .then((res) => {
      console.log("createHabit", res.rows[0]);
      return res.rows[0];
    })
    .catch((error) => console.log(error));
};

exports.createHabit = createHabit;

//get habit list

const getHabits = (id) => {
  return db
    .query(
      `SELECT actions.id, user_id, action_name, date_created, is_completed
      FROM actions 
      JOIN categories on category_id = categories.id
      WHERE categories.id = 2 and user_id = $1`,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getHabits error", err.stack));
};
exports.getHabits = getHabits;

//updateAction habit | todo

const updateAction = (id, action_name, is_completed) => {
  return db
    .query(
      `UPDATE actions
      SET action_name = $2, is_completed = $3
      WHERE id = $1
      RETURNING *;`,
      [id, action_name, is_completed]
    )
    .then((res) => {
      console.log("updateAction res.rows[0]", res.rows[0]);
      return res.rows[0];
    });
};
exports.updateAction = updateAction;

//update is_completed
const updateCompletion = (id, is_completed) => {
  return db
    .query(
      `UPDATE actions
      SET is_completed = $2
      WHERE id = $1
      RETURNING *;`,
      [id, is_completed]
    )
    .then((res) => {
      console.log("updateCompletion res.rows[0]", res.rows[0]);
      return res.rows[0];
    });
};

exports.updateCompletion = updateCompletion;

//delete habit/todo
const deleteAction = (id) => {
  return db
    .query(`DELETE FROM actions WHERE id = $1 RETURNING *;`, [id])
    .then((res) => {
      console.log("whats res.rows[0]", res.rows[0]);
      return res.rows[0];
    });
};

exports.deleteAction = deleteAction;

//get actions
const getActions = (id) => {
  return db
    .query(
      `SELECT actions.id, category_id, user_id, action_name, date_created, is_completed
    FROM actions 
    JOIN categories on category_id = categories.id
    WHERE user_id = $1`,
      [id]
    )
    .then((res) => {
      console.log("whats res.rows[0]", res.rows);
      return res.rows;
    });
};

exports.getActions = getActions;

/*--------- get user by username accounts -----------*/
const getUser = (username) => {
  return db
    .query(
      `SELECT *
      FROM users 
      WHERE users.username = $1
      ;`,
      [username]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getUser error", err.stack));
};
exports.getUser = getUser;

/*--------- get user by id accounts -----------*/
const getUserId = (id) => {
  return db
    .query(
      `SELECT *
      FROM users 
      WHERE users.id = $1
      ;`,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getUserId error", err.stack));
};
exports.getUserId = getUserId;

/*--------- register user accounts -----------*/
const registerUser = (username, email, name, password) => {
  return db
    .query(
      `INSERT INTO users (username, email, name, password)
      VALUES (
        $1, $2, $3, $4)
      ;`,
      [username, email, name, password]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query registerUser error", err.stack));
};
exports.registerUser = registerUser;

/*--------- update accounts -----------*/
const updateAccount = (id, email, username, password) => {
  return db
    .query(
      `UPDATE users
      SET email = $2, username = $3, password = $4
      WHERE id = $1
      ;`,
      [id, email, username, password]
    )
    .then((res) => {
      console.log("whats res.rows[0]", res.rows);
      return res.rows;
    });
};

exports.updateAccount = updateAccount;

/*--------- Streaks -----------*/
const getStreaks = (id) => {
  return db
    .query(
      ` SELECT user_id, streak, current_streak
        FROM streaks
        WHERE user_id = $1;
        `,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getAllCats error", err.stack));
};
exports.getStreaks = getStreaks;

/*--------- Get data log -----------*/
const getLogData = (id) => {
  return db
    .query(
      `
        SELECT *
        FROM logDatas
        WHERE user_id = $1;
        `,
      [id]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getAllCats error", err.stack));
};
exports.getLogData = getLogData;

/*--------- Post data log -----------*/
const postLogData = (user_id, is_completed, date_created) => {
  return db
    .query(
      `INSERT INTO logDatas (user_id, date_created, is_completed)
      VALUES ($1, $3, $2);
        `,
      [user_id, is_completed, date_created]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getAllCats error", err.stack));
};
exports.postLogData = postLogData;

// /*--------- update data log -----------*/
const updateLogData = (id, is_completed, date_created) => {
  return db
    .query(
      `UPDATE logDatas
      SET is_completed = $2 
      WHERE id = $1 AND date_created = $3; 
        `,
      [id, is_completed, date_created]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query getAllCats error", err.stack));
};
exports.updateLogData = updateLogData;

/*--------- update streak -----------*/
const updateStreak = (id, streak, current_streak) => {
  return db
    .query(
      `UPDATE streaks
      SET streak = $2, current_streak = $3
      WHERE user_id = $1
      ;`,
      [id, streak, current_streak]
    )
    .then((res) => {
      console.log("whats res.rows[0]", res.rows);
      return res.rows;
    });
};

exports.updateStreak = updateStreak;
