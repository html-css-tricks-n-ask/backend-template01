import Todo from "../models/todo.js";

// @desc    Get all todos for logged-in user
// @route   GET /api/todos

export const getTodos = async (req, res) => {
  try {
    const { id } = req.params; // ✅ read id from payload
    const todos = await Todo.find({ user: id });
    console.log(todos, "todos from get todo");

    console.log(id, "id from get todo");

    console.log(req.body, "req.body");
    console.log(todos, "todos");
    res.json(todos);
    console.log("enter try");
    //  res.status(200).json({ message: "Data geting Suceess" });
  } catch (error) {
    console.log(error, "error in get todo");
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add new todo`
// @route   POST /api/todos

export const addTodo = async (req, res) => {
  try {
    const { text, id } = req.body;


    console.log(text?.text, "text");
    console.log(text?.id, "id");  
    console.log(req.body, "req.body");

    if (!text) return res.status(400).json({ message: "Text is required" });
    if (!text?.id) return res.status(400).json({ message: "UserId is required" });

    const newTodo = new Todo({
      text : text?.text,
      user: text?.id,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Add Todo Error:", error);
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

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNhYWZlNjkyNmUzYzRjODA3YmVmMzQiLCJpYXQiOjE3NTgxMTQ3ODAsImV4cCI6MTc1ODExODM4MH0.71HFWkK4YPXJqHV5d2fozsRlxLNEJLHGDgBgQwHOKwk",
//     "user": {
//         "id": "68caafe6926e3c4c807bef34",
//         "name": "name",
//         "email": "email@gamil.com"
//     }
// }
