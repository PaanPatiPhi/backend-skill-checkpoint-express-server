# Question & Answer REST API

This project is a RESTful API for managing questions and answers.  
Users can create, view, search, update, and delete questions, as well as create and manage answers for each question.

---

## Features

### Questions
- Create a question with title, description, and category
- View all questions
- View a single question by question ID
- Update a question (title, description, category)
- Delete a question
- Search questions by title or category

### Answers
- Create an answer for a specific question
- Answer content must not exceed 300 characters
- View all answers of a specific question
- Delete all answers of a question
- When a question is deleted, all related answers are deleted as well

---

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

---

## Installation & Run

1. Clone the repository
```bash
git clone https://github.com/PaanPatiPhi/backend-skill-checkpoint-express-server.git
cd project-folder
2. Install dependencies
npm install
3. Create .env file
PORT=4000
DATABASE_URL = postgresql://username:password@localhost:5432/database_name
4. Start the server
npm run dev
Server will run at: http://localhost:4000

---

## API Endpoints
Questions
Method	Endpoint	                      Description
GET	    /questions	                    Get all questions
GET	    /questions/:questionId	        Get a question by ID
POST	  /questions	                    Create a new question
PUT	    /questions/:questionId	        Update a question
DELETE	/questions/:questionId	        Delete a question
GET	    /questions/search	              Search questions by title or category
POST	  /questions/:questionId/vote	    Vote a question (agree / disagree)

Answers
Method	Endpoint	                      Description
POST	  /questions/:questionId/answers	Create an answer
GET	    /questions/:questionId/answers	Get answers of a question
DELETE	/questions/:questionId/answers	Delete all answers of a question

Answer_Votes
Method	Endpoint	                      Description
POST	  /answers/:answerId/vote	        Vote an answer (agree / disagree)

Validation
Create Question
title is required
description is required
category is required
Search Question
At least one of title or category must be provided
Create Answer
content is required
content must be a string
content length must not exceed 300 characters
vote must be 1 or -1
Invalid requests will return:
{
  "message": "Invalid request data."
}

---

## Error Handling

400: Invalid request data

404: Resource not found

500: Internal server error

---

##Author

Developed by Patiparn Thamboonrak (Phi)