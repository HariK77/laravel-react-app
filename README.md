
## About Laravel React App

This is a simple boiler plate application developed in Laravel 11 and React 18 with sanctum authentication, Context api for user state management and Formik for Form validation

# Installation Instructions

## Prerequisites
- Manual setup - PHP 8.1 or above, Node 18 or above and any sql database
- With Docker - Docker with root access

## Environment Setup
Change into project directory before running any commands
- `cd /laravel-react-api`
  
Rename the .env.example file .env
- `cp .env.example .env`

- (Note) For Manual way configure your database connection settings

## Setup Methods

### Docker Setup
    Run this for insatalling php composer packages to run sail
`
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
`


Start the Docker containers:
- `./vendor/bin/sail up`

Install composer dependencies:
- `./vendor/bin/sail composer install`

Install Node dependencies:
- `./vendor/bin/sail npm install`
  
Generate Key
- Run `./vendor/bin/sail artisan key:generate`
  
### Manual Setup

Install composer dependencies:
- `composer install`

Install Node dependencies:
- `npm install`

Generate Key
- Run `php artisan key:generate`

## Running the application

Run database migrations:
- Using Sail: `./vendor/bin/sail artisan migrate`
- Without Sail: `php artisan migrate`
  
Seed the database:
- Using Sail: `./vendor/bin/sail artisan db:seed`
- Without Sail: `php artisan db:seed`

run npm serve:
- Using Sail: `./vendor/bin/sail npm run dev`
- Without Sail: `npm run dev`
  
Running PHP Server:
- Using Sail: `./vendor/bin/sail down` and then run `./vendor/bin/sail up`
- Without Sail: `php artisan serve`

And then access `http://locahost`

## Pages
- Home - `http://locahost`
- About - `http://locahost/about`
- Contact - `http://locahost/contact`
- Register - `http://locahost/register`
- Login - `http://locahost/login`
- Profile - `http://locahost/profile`

## Postman Collection
Please import the [Post Man Collection]("Laravel React App.postman_collection.json") to interact with API Endpoints, which is included in the repo
