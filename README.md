# Final Project - NodeJS - Interview Scheduler

## Description

Interview Scheduler is a single page application (SPA) built with React that allows users to book, edit and cancel interviews.

Data is persisted by the API server using a PostgreSQL database.

The client application communicates with an API server over HTTP, using the JSON format.

Any updates can be seen in real time.

## Entities

- Appointment

  - id: Unique value for each appointment
  - time: Time of the appointment (You can set as string)
  - day_id: Id of the day of the appointment

- Day

  - id: Unique value for each day
  - name: Name of the day (Monday to Friday)

- Interview

  - id: Unique value for each interview
  - student: Name of the student
  - interviewer_id: Id of the interviewer
  - appointment_id: Id of the appointment

- Interviewer

  - id: Unique value for each interviewer
  - name: Name of the interviewer
  - avatar: Url of the interviewer's avatar

- Available Interviewer

  - id: Unique value for each available interviewer
  - interviewer_id: Id of the interviewer
  - day_id: Id of the day

## Goals

- Create ERD diagram Done
- Create a database schema using PostgreSQL
- Build an API server with Node/Express
- Build the communication between React app and API server over HTTP, using the JSON format
- Use WebSockets to build a realtime experience.
- **Bonus:** Implement user authentication.

## Plan ahead

- Before you start coding, you need to prepare a few things:

  - Understand what data you need to store in the database
  - Create an ERD diagram (Use [draw.io](https://www.draw.io/) and add it to your presentation)
  - Decide what routes you need to create in the API server
    / : get all the appointment data and display them (GET): Yuto
    /interviewers: See the available interviewers (GET): Yuto
    These 3 should be a realtime communication.
    /create: book a new appointment (socket): Tatiana
    /edit/:id  : edit an existing appointment (socket): Tatiana
    /cancel/:id : delete an appointment (socket): Tatiana
    /day : Fetch data from Day table and show n the left(GET):Tatiana

  - Understand what data you need to fetch from the API server
    1. appointments (Appointment table) includes date
    2. interview (Interview table)
    3. available interviewer (Available interviewer table)
    4. days (Day table)
   
  - Investigate how components will communicate with each other
  - Where we need the data
  
    DayList component passes those state to DayListItem component
    1. Day name form Day table
    2. Available spots from Appointment
       Calculate the maximum number of spots(5) - the number of Appointment confirmed

    index.js(each appointment card)
      Form: Student name, available interviewer (Interview table)
        InterviewerList: Interviewer name and avatar. Pass those to InterviewerListItem component

    Ask Arthur.
    If the different student try to make an appointment with different interviewer, should we make it available? Not necessary

  - Investigate where you should make the API calls and where you should store the data(state?)
   Where we call API
   Form component (Interview table)
   InterviewerList component (Available Interview table)
   DayList component (Day table)

   App.js
   Day table
   Appointment table
   Interview table

   Where we store the data
   DayList component: (Appointment, day)
   Show component: student name, interviewer name (Appointment, interview, interviewer, available interviewer table)

## Game plan

With this information, you can present to the instructor and, if approved, you can start coding.

For the database, you need to:

- Create a database Done
- Create the schema for a new appointment Done
- Seed the database (You can create it manually) Done

For the API server, you need to:

- Create the routes　
- Create the controllers
- Create the queries


For the client, you need to:
- Create the API requests to fetch the data from the API server
Talk to Arthur!!!!
- Create socket.io connection to update the data in real time

## How to split the work

- Member 1 (Easy): Days Feature

  - Database - Days and Appointments tables Done
  - API Server - Days route (Get all days and quantity of appointments available)
  - Client - Days component (List of days and quantity of appointments available per day)

---

- Member 2 (Hard): Schedule Feature (Can be split in 2 parts if 3 members)

  - Database - Interviewers, Available Interviewers and Interviews tables Done

  - API Server - Schedule route

    - Get all interviews for a given day Done
    - Get all interviewers Done
    - Get all available interviewers for a given day Done

  - Client - Schedule component

    - List of interviews and interviewers available per day
    - Update the schedule in real time in case of:

      - Create an interview
      - Edit an interview
      - Delete an interview

## Setup

- Install dependencies with `npm install`. You have 2 apps in this project, one for the client and one for the server. You will need to run `npm install` in `root` and `frontend` folders.
- Run the development web server using the `npm run server` command. The app will be served at <http://localhost:8000/>.
- Run the development web client using the `npm run client` command. The app will be served at <http://localhost:3000/>.
- The `npm run dev` command will run both the client and server with a single command.

## Resources

- [Draw.io](https://www.draw.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Socket.io](https://socket.io/)
