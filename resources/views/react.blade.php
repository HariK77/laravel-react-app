<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-100">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>

    @vite('resources/sass/app.scss')
</head>

<body class="d-flex flex-column h-100">
    <div id="app" class="d-flex flex-column h-100"></div>

    @viteReactRefresh
    @vite('resources/js/index.jsx')
</body>

</html>