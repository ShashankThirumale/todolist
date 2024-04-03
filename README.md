# TodoList App

## Reason for Creation
This is an app meant to boost the productivity of users. I personally can be very forgetful and having a place to put all my tasks down and physically stike them out helps me stay on task.
I created this app as a fun way to learn more about how to develop a full stack application but also as a way to make my own life much easier. I know that there are many other applications
out there that allow users to accomplish similar things and that is why after this project I plan to create another project called College Calendar which will be much harder but will also
be much more unique and will defiently help a lot more college students with their college assignments. 

## Project Description
There is a login page where the users can either sign up or login to their existing account. The login information of the user is stored in a SQL database. 
After login the user will see all of the tasks that they created in the past. All of the tasks that they user has created is stored into a table in a SQL database along with the status of the
task and the task's id. 
The users have the ability to create new tasks, mark tasks as complete by clicking on the task, and delete the tasks. I am currently storing all the changes made to a task in a table in the 
SQL database to hopefully make it so that users can bring back a task incase it was a mistake.

## What are things that need to be added
1. A icon to tell if a user is logged in.
2. A way to bring back tasks that were deleted
3. Authentication with Google

## Login Page
The login page allows user to login. If they are are not signed up they will be sent an error message to try again or sign up. The login requires an email and password. I will be trying 
to authenticate with google soon but for the time being this is the best I can do. When the user tries to login I will search the login info table in my SQL database to see if the user exists. 
Once the user logs in they will be redirected to the home page.

## SignUp Page
The Signup page is very similar to the login page. When the user types in there information once the information is added to the login table in the SQLL database the user will be notified 
and asked to navigate to the login page.

## Home Screen
The home screen will first have all of the tasks that the user has created in the past.
There is will an area where they can type in text and create a new task. When submiting the add task form I will add the information to the the tasks table with the username of the user,
a unique task id, task name, and completion status. 
When a task is added to the list users can mark the task as done by simply clicking on the name of the task. There is also a button that will allow the user to edit the task and another
button to allow the user to remove the task. All of these changes will be reflected in the tasks table of the SQL database so that whenever the user logs in the changes can be seen. 
As I staed earlier I hope to add a icon that will show whether the user is logged in or not so that they are able to access the full capabilites of the app. I want to make a mode where the 
user does not need to be logged in to access all of the features but their tasks will not be saved if they decide to close the window.

## Deploying to the cloud
I want to deploy this web app to the cloud so that everyone can access it. I have been trying to host it on Microsoft Azure but I am having a hard time with the inbound ports. I will be 
trying to host this app in AWS using an EC2 instance and a MYSQL database. I am still in the process of doing this so it may take me some time.
