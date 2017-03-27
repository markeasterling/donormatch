# Donormatch
Donormatch is a a tool to help facilitate a deeper connection between charitable organizations and the community. Organizations can post requests or offers for services, and individuals can reply with how they would like to help, or offer their own time or donations.

## Running Donormatch
First, you'll want to make sure you have pip, npm, and bower installed on your machine. Here are some links to aid in this process
Machines that have python 2 or 3 installed already have pip. Open your command line interface and type python -V. if the version is less than two, [look here.](https://pip.pypa.io/en/stable/installing/)   <br />
[Installing NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm) <br />
[Installing Bower](https://www.npmjs.com/package/bower)

Then, you'll want to clone the project
```
git clone https://github.com/markeasterling/donormatch.git
```
```
cd donormatch
echo '3.4.0' > .python-version
pip install django djangorestframework
npm install http-server
cd server
```

At this point you may want to create a superuser to let you browse the API, if so
```
python manage.py createsuperuser
--follow prompts--
```

To start serving the API, we'll have to migrate the database and host it locally
```
python manage.py migrate
python manage.py runserver
paste the given url into your browser
```
Then, we will serve the client in a new tab, from the project folder
```
cd donormatch/client
bower install
http-server

then, copy one of the two "Available on:" URLs into your browser
```
From here, you'll want to register a new user. You can then create requests and message others!

