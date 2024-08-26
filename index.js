const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors"); // Middleware para manejar CORS

const app = express();
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

app.use(bodyParser.json());
app.use(cors()); // Permitir solicitudes desde cualquier origen

// Ruta para crear una nueva tarea (POST /tasks)
app.post("/tasks", (req, res) => {
    const { taskId, title, description, status } = req.body;

    const params = {
        TableName: "Tasks",
        Item: {
            taskId: taskId,
            title: title,
            description: description,
            status: status,
        },
    };

    dynamoDB.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add task. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: "Could not create task" });
        } else {
            res.status(201).json({ success: "Task created successfully", data: params.Item });
        }
    });
});

// Ruta para obtener todas las tareas (GET /tasks)
app.get("/tasks", (req, res) => {
    const params = {
        TableName: "Tasks",
    };

    dynamoDB.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to fetch tasks. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: "Could not fetch tasks" });
        } else {
            res.status(200).json(data.Items);
        }
    });
});

// Ruta para obtener una tarea por ID (GET /tasks/:id)
app.get("/tasks/:id", (req, res) => {
    const params = {
        TableName: "Tasks",
        Key: {
            taskId: req.params.id,
        },
    };

    dynamoDB.get(params, (err, data) => {
        if (err) {
            console.error("Unable to fetch task. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: "Could not fetch task" });
        } else if (!data.Item) {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.status(200).json(data.Item);
        }
    });
});

// Ruta para actualizar una tarea (PUT /tasks/:id)
app.put("/tasks/:id", (req, res) => {
    const { title, description, status } = req.body;

    const params = {
        TableName: "Tasks",
        Key: {
            taskId: req.params.id,
        },
        UpdateExpression: "set title = :t, description = :d, #st = :s",
        ExpressionAttributeNames: {
            "#st": "status", // Alias para la palabra reservada 'status' (ESTO FUE UN GRAN PROBLEMA)
        },
        ExpressionAttributeValues: {
            ":t": title,
            ":d": description,
            ":s": status,
        },
        ReturnValues: "UPDATED_NEW",
    };

    dynamoDB.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update task. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: "Could not update task" });
        } else {
            res.status(200).json(data.Attributes);
        }
    });
});



// Ruta para eliminar una tarea (DELETE /tasks/:id)
app.delete("/tasks/:id", (req, res) => {
    const params = {
        TableName: "Tasks",
        Key: {
            taskId: req.params.id,
        },
    };

    dynamoDB.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete task. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: "Could not delete task" });
        } else {
            res.status(200).json({ success: "Task deleted successfully" });
        }
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
