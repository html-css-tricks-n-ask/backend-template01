import Todo from "../models/Todo.js";

// @desc    Get all todos for logged-in user
// @route   GET /api/todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Add new todo
// @route   POST /api/todos
export const addTodo = async (req, res) => {


    try {



        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const newTodo = new Todo({
            text,
            user: req.user.id,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Toggle todo completed
// @route   PATCH /api/todos/:id
export const toggleTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await todo.deleteOne();
        res.json({ message: "Todo removed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
