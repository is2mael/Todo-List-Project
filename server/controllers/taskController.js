const { Task } = require("../models");
// console.log(Tasks);

class TaskController {
  static async findAll(req, res, next) {
    try {
      let data = await Task.findAll();
      res.status(200).json({ data:data });
    } catch (err) {
      console.log("🚀 ~ TaskController ~ findAll ~ err:", err);
      next(err);
    }
  }

  static async createTodo(req, res, next) {
    const { title, description, isCompleted } = req.body;
    try {
      let newTask = await Task.create({
        title,
        description,
        isCompleted
      });
      if (!newTask) {
        throw { name: "BadRequest", message: "Bad Request" };
      }
      res.status(201).json({ newTask });
    } catch (err) {
      console.log("🚀 ~ TaskController ~ createTodo ~ err:", err);
      next(err);
    }
  }

  static async detail(req, res, next) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw { name: "NotFound", message: "Task not found" };
      }
      res.status(200).json({
        task,
        id: task.id,
        title: task.title,
      });
    } catch (err) {
      console.log("🚀 ~ TaskController ~ detail ~ err:", err);
      next(err);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw { name: "NotFound", message: "Task not found" };
      }
      await task.update({
        title,
        description,
        isCompleted
      });
      res.status(200).json({
        task,
        id: task.id,
        title: task.title,
      });
    } catch (err) {
      console.log("🚀 ~ TaskController ~ update ~ err:", err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
        const data = await Task.findByPk(id)
        if (!data) {
            throw { name: "NotFound", message: "Task not found" };
        }

        await data.destroy()
        res.status(200).json(
        {   
            message: "Task has been deleted", 
            id: data.id,
            title: data.title
        });
    } catch (err) {
      console.log("🚀 ~ TaskController ~ delete ~ err:", err);
      next(err);
    }
  }
}

module.exports = TaskController;
