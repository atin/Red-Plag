# Django REST API and Database

This folder contains the backend code for the addition of users when they sign up and authorising users when they log in. This README explains the structure of the code

## SignUp functionlity

The `User` folder is basically like an object for every user's account. It has the fields which the user enters when signing up which are: First name, Last name, Email(primary key) and Password. The `models.py` file has the description of the `User` object which can be directly added to a database (which in our case is `db.sqlite3`).
Now, websites will return JSON objects, so we need to interconvert between JSON and `Model` for databases. This job is performed using **DjangoRestFramework's serializer**. The `serializer.py` performs exactly this job.
Now in the `views.py` file, we perform the standard API queries of `GET,POST,PUT,DELETE` which will handle adding new data in the database, retreive required data, modify and delete data, which is parallely represented in the database. Finally `urls.py` has the standard routing feature to represent data.

##How to test the API?

- Install [**Postman**](https://www.postman.com/downloads/) and run it.
- Run the django serve using `python3 manage.py runserver`. The port `127.0.0.1:8000` should be up and running.
- Copy the address in the address bar in Postman and add a `/user/` to the same. This is the url for the user.
- If you use `GET` option and click run, you should see the list of registered users as a JSON object.
- If you use `POST` option, enter a custom JSON object and click run. If entry was valid, you should see a success message. Check if the record is there using `GET`.
- If you use `PUT` option, enter the new custom JSON object keeping the primary key fixed and click run. If entry was valid, you should see a success message. Check if the record is moified there using `GET`.
- If you use `DELETE` option, add `<email to be deleted>/` and click run. If valid, the record should be successfully deleted. Check if it is still there using `GET`.
