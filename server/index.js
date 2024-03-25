const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
var pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "ShaShre@0507",
    database: "TodoList",
    connectionLimit: 10,
});

app.post("/register", (req, res) => {
    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            const email = req.body.email;
            const password = req.body.password;
            db.query("INSERT INTO LoginInfo (UserEmail, UserPassword) VALUES (?,?);", [email, password],
                (err2, result) => {
                    if (err2) {
                        console.log(err2);
                    }
                    db.release();
                })
        }
    })
})

app.post("/render", (req, res) => {
    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            const email = req.body.email;
            db.query(
                "SELECT TaskId AS id, Task AS task, CASE Complete WHEN 1 THEN true WHEN 0 THEN false END AS completed, false AS isEditing FROM TodoList.Tasks WHERE UserEmail = ?;",
                email,
                (err2, result) => {
                    if (err2) {
                        res.send({ err: err2 });
                    }
                    if (result.length > 0) {
                        console.log(result);
                        res.send(result);
                    } else {
                        res.send(result);
                    }
                    db.release();
                }
            );
        }
    })
})

app.post("/login", (req, res) => {
    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            const username = req.body.username;
            const password = req.body.password;
            db.query(
                "SELECT * FROM LoginInfo WHERE UserEmail = ?;",
                username,
                (err2, result) => {
                    if (err2) {
                        res.send({ err: err2 });
                    }
                    if (result.length > 0) {
                        console.log(result);
                        console.log(password);
                        if (password === result[0].UserPassword) {
                            res.send(result);
                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    } else {
                        res.send({ message: "User doesn't exist" });
                    }
                    db.release();
                }
            );
        }
    })
});

app.post("/create", (req, res) => {
    console.log(req.body);
    const task = req.body.task;
    const taskId = req.body.taskId;
    const email = req.body.email;
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    let minute = now.getMinutes();
    let hour = now.getHours();
    let sec = now.getSeconds();
    let date =
        year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;

    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            db.query(
                "INSERT INTO Tasks (UserEmail, TaskId, Task, Complete) VALUES (?, ?, ?, ?)",
                [email, taskId, task, 0],
                (err2, result) => {
                    if (err2) {
                        console.log(err);
                    }
                }
            );
            /*db.query(
                "INSERT INTO TaskStatus (TaskId, Status, Time) VALUES (?,?,?);",
                [taskId, "created", date],
                (err2, result) => {
                    if (err2) {
                        console.log(err2);
                    }
                }
            );
            db.query(
                "INSERT INTO TaskStatus (TaskId, Status, Time) VALUES (?,?,?);",
                [taskId, "incomplete", date],
                (err2, result) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        res.send("Task Status Incomplete");
                    }
                    db.release();
                }
            );*/
        }
    });
});

app.post("/delete", (req, res) => {
    console.log(req.body);
    const taskId = req.body.taskId;
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    let minute = now.getMinutes();
    let hour = now.getHours();
    let sec = now.getSeconds();
    let date =
        year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;

    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            db.query("DELETE FROM Tasks WHERE TaskId = ?;", [taskId], (err2, result) => {
                if (err2) {
                    console.log(err2);
                }
            });
            /*db.query(
                "INSERT INTO TaskStatus(TaskId, Status, Time) VALUES(?,?,?);",
                [taskId, "removed", date],
                (err2, result) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        res.send("Task Removed");
                    }
                    db.release();
                }
            );*/
        }
    });
});

app.post("/update", (req, res) => {
    console.log(req.body);
    const taskId = req.body.taskId;
    let taskComplete = req.body.completed;
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    let minute = now.getMinutes();
    let hour = now.getHours();
    let sec = now.getSeconds();
    let date =
        year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;

    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            db.query(
                "UPDATE Tasks SET Complete = ? WHERE TaskId = ?;",
                [taskComplete, taskId],
                (err2, result) => {
                    if (err) {
                        console.log(err2);
                    }
                }
            );

            /*db.query(
                "INSERT INTO TaskStatus(TaskId, Status, Time) VALUES(?,?,?);",
                [taskId, taskComplete, date],
                (err2, result) => {
                    if (err) {
                        console.log(err2);
                    } else {
                        res.send("Task Updated");
                    }
                    db.release();
                }
            );*/
        }
    });
});
app.post("/updateTask", (req, res) => {
    console.log(req.body);
    const taskId = req.body.taskId;
    const task = req.body.task;

    pool.getConnection(function (err, db) {
        if (err) {
            res.send(err);
        } else {
            db.query(
                "UPDATE Tasks SET Task = ? WHERE TaskId = ?;",
                [task, taskId],
                (err2, result) => {
                    if (err) {
                        console.log(err2);
                    } else {
                        res.send("Task Updated");
                    }
                    db.release();
                }
            );
        }
    });
});
app.listen(3001, () => {
    console.log("Running on port 3001");
});
