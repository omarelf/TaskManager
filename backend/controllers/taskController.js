const Task = require('../models/Task');

// createTask and getTask controllers are here 

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({
      user: req.user.id,
      title,
      description,
      status
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query; // Default to page 1, limit 10 items per page
    const tasks = await Task.find()
                            .limit(limit * 1)
                            .skip((page - 1) * limit)
                            .exec();
    const count = await Task.countDocuments(); // Total count of tasks
    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalTasks: count
    });
  } catch (err) { 
    res.status(500).send('Server Error');
  }
};


// updateTask and deleteTask controllers are here

exports.updateTask = async (req, res) => {
    try {
      let task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      // Check user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      let task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      // Check user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
     const deletedTask = await Task.findByIdAndDelete(req.params.id);
  
      res.json({ id: deletedTask._id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
