const env = require("dotenv").config();
require("./config/database");

const Task = require("./models/tasks");
const User = require("./models/users");

const seedData = [
  {
    title: "Task 1",
    dueDate: new Date("2024-06-25"),
    priority: "high",
    status: "in progress",
    startDate: new Date("2024-06-20"),
    completedDate: null,
    isArchived: false,
    description: "Description for Task 1",
  },
  {
    title: "Task 2",
    dueDate: new Date("2024-06-30"),
    priority: "medium",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 2",
  },
  {
    title: "Task 3",
    dueDate: new Date("2024-07-05"),
    priority: "normal",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 3",
  },
  {
    title: "Task 4",
    dueDate: new Date("2024-07-10"),
    priority: "low",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 4",
  },
  {
    title: "Task 5",
    dueDate: new Date("2024-07-15"),
    priority: "high",
    status: "completed",
    startDate: new Date("2024-07-10"),
    completedDate: new Date("2024-07-13"),
    isArchived: false,
    description: "Description for Task 5",
  },
  {
    title: "Task 6",
    dueDate: new Date("2024-07-20"),
    priority: "medium",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 6",
  },
  {
    title: "Task 7",
    dueDate: new Date("2024-07-25"),
    priority: "normal",
    status: "in progress",
    startDate: new Date("2024-07-22"),
    completedDate: null,
    isArchived: false,
    description: "Description for Task 7",
  },
  {
    title: "Task 8",
    dueDate: new Date("2024-07-30"),
    priority: "low",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 8",
  },
  {
    title: "Task 9",
    dueDate: new Date("2024-08-05"),
    priority: "high",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 9",
  },
  {
    title: "Task 10",
    dueDate: new Date("2024-08-10"),
    priority: "medium",
    status: "to-do",
    startDate: null,
    completedDate: null,
    isArchived: false,
    description: "Description for Task 10",
  },
];

async function seedTasks() {
  try {
    await Task.deleteMany();
    const user = await User.findOne();

    if (!user) {
      console.error(
        "No user found. Please create a user before seeding tasks."
      );
      return;
    }

    const tasksWithCreatedBy = seedData.map((task) => ({
      ...task,
      createdBy: user._id,
    }));

    const createdTasks = await Task.create(tasksWithCreatedBy);
    console.log("Seed data inserted:", createdTasks);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    process.exit();
  }
}

seedTasks();
