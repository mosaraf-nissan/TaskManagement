# Task Management System

This is a simple Task Management System built using React. It allows users to create, manage, and track tasks across three categories: "TODO," "In Progress," and "Done." Users can also include subtasks and additional details for each task.

## Features

- Create new tasks with detailed information.
- Categorize tasks into "TODO," "In Progress," and "Done" lists.
- Include subtasks within each task.
- View and edit task details.


## Installation

1. Clone the repository or download the source code.
2. Open your terminal and navigate to the project directory.
3. Run `npm install` to install the project dependencies.
4. Run `npm run dev` to start the development server.
5. Open your web browser and go to `http://localhost:3000` to access the Task Management System.

## Usage

1. **Adding a Task**: Click the "Create Task" button to add a new task. You can specify the task's title, description, priority, dates, status, assigned person, and attach files.

2. **Managing Tasks**: Tasks are organized into "TODO," "In Progress," and "Done" lists. You can move tasks between lists as they progress.

3. **Editing Task Details**: Click on a task to view and edit its details. Make changes and save the updates.

4. **Subtasks**: Each task can have subtasks. Expand a task to view and manage its subtasks.

5. **Attachments**: Attach files (e.g., images, PDFs) to tasks for reference.

6. **Searching and Filtering**: Use the search and filter options to find specific tasks quickly.

## Form Validation

Form validation is implemented using standard React techniques. When creating or updating tasks, the following validation rules are applied:

- Task title is required and must be less than 100 characters.
- Task description is required and must be less than 150 characters.
- Priority, start date, end date, status, and assigned person are required fields.

Validation error messages are displayed for any violations.

## Screenshots
![image](https://github.com/mosaraf-nissan/TaskManagement/assets/117709837/cd2de80f-df1b-4073-b8b3-798c5a8be0ad)


## Built With

- React
- Local storage (for data persistence)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
