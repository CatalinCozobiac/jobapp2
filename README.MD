I am Catalin Cozobiac and this is my Web aplication!

I. Description:

This web app will take and existing real life problem I have encountered this summer while working with my father. 

We were working in construction industry as subcontractors taking daily jobs from our contractor and fufilling them.

The problem I saw was that our contractor has no means of loggin and storing our daily tasks in a place where he could
easily access and check out what had been done, by who and when. Right now he is using just and Whatsapp group for this. 

So I decided to build a concept web application that will create, read, update and delete (CRUD) those tasks on a mongodb database.


II. How it is build:
It is build using models, views, controllers (MVC) format.
- models folder has two models in it which are the "access forms" that are send and requested to the database
- views folder has all the required front end files which are used to display the content
- controllers folder contains the userController file, inside it are all the modules which control the operations, they handle the logic behind the project
- routes folder contains the router file, which is defining which controller module is summoned and for what page the user has accessed.
- database is stored on cloud in a mongo shard, as for now, it is accessible for anyone on any computer with the right key.

III. Running the build:

To run the project you dont need too much setting, just follow the next instructions:

1. Create a .env file and place the following code inside it place the database access key, just copy the following code:

//
SECRET="ABC"
DATABASE_URI="mongodb+srv://testadmin:Catalin12@cluster0.5pw41go.mongodb.net/?retryWrites=true&w=majority"
//

2. Running the project needs the following command:

npm start

3. Accessing the project from the browser:
Open any browser and type the following url link:
http://localhost:3001/

4. To login as administrator it is required to use a specific user.
email: admin@admin.com
password: Catalin12

IMMPORTANT!!!
ONLY ADMINS CAN UPDATE AND DELETE DATA FROM THE DATABASE.
You can register as many users as you want using this app, only the above mentioned login details will give  you full access to CRUD operations.


