# Getting Started

- Please ensure that you have python3 installed, after which you may create a virtual environment, the steps are mentioned [here](https://naysan.ca/2019/08/05/install-python-3-virtualenv-on-ubuntu/).

- Create a new virtual environment having the name 'venv'

- Git clone this repo to your PC
  ```
      $ git clone https://github.com/vishal2098govind/ComViz_2.0.git
  ```

## Running Backend Server

- Then proceed to install the dependencies from the requirements.txt, using the command below

  ```
      $ pip install -r requirements.txt
  ```

- Then cd to the /backend directory and enter the following command to start the server

  ```
      $ python manage.py runserver
  ```

- The above commands will start the server at localhost port 8000

## Running Frontent Server

- cd to the /client directory and enter the following command to install client side dependencies

  ```
      $ npm install
  ```

- Now, in the /client directory enter the following command to run client side dev server

  ```
      $ npm start
  ```
