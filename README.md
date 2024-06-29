
## About Laravel React App

This is a simple boiler plate application developed in [Laravel](https://laravel.com/) 11 and [React](https://react.dev/) 18 with [sanctum](https://laravel.com/docs/11.x/sanctum) authentication, Context api for user state management and Formik for Form validation

# Installation Instructions

## Prerequisites
- Manual setup - PHP 8.1 or above, Node 18 or above Composer 2 or above and any sql database
- With Docker - Docker with root access

## Environment Setup
- Change into project directory before running any commands
```bash
cd laravel-react-api
```
  
- Rename the .env.example file .env
```bash
cp .env.example .env
```

- (Note) For Manual way configure your database connection settings

## Setup Methods

### Docker Setup
Run this for insatalling php composer packages to run sail

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```


Start the Docker containers:
```bash
./vendor/bin/sail up
```

Install composer dependencies:
```bash
./vendor/bin/sail composer install
```

Install Node dependencies:
```bash
./vendor/bin/sail npm install
```
  
Generate Key
```bash
./vendor/bin/sail artisan key:generate
```
  
### Manual Setup

Install composer dependencies:
```bash 
composer install
```

Install Node dependencies:
```bash 
npm install
```

Generate Key
```bash 
php artisan key:generate
```

## Running the application

Run database migrations:
- Using Sail: 
```bash
./vendor/bin/sail artisan migrate
```
- Without Sail: 
```bash
php artisan migrate
```
  
Seed the database:
- Using Sail: 
```bash
./vendor/bin/sail artisan db:seed
```
- Without Sail: 
```bash
php artisan db:seed
```

run npm serve:
- Using Sail: 
```bash
./vendor/bin/sail npm run dev
```
- Without Sail: 
```bash
npm run dev
```
  
Running PHP Server:
- Using Sail: (If it's already running down it)
```bash
./vendor/bin/sail down
```
```bash
./vendor/bin/sail up
```
- Without Sail: 
```bash
php artisan serve
```

And then access `http://locahost`

## Pages
- Home - `http://locahost`
- About - `http://locahost/about`
- Contact - `http://locahost/contact`
- Register - `http://locahost/register`
- Login - `http://locahost/login`
- Profile - `http://locahost/profile`

## Postman Collection
Please import the [Post Man Collection](https://raw.githubusercontent.com/HariK77/laravel-react-app/main/Laravel%20React%20App.postman_collection.json) to interact with API Endpoints, which is included in the repo
