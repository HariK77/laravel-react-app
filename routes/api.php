<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\StatusController;

Route::get('/status', [StatusController::class, 'index']);

Route::middleware('guest')->group(function () {
    Route::post('/login', [LoginController::class, 'index']);
    Route::post('/register', [RegisterController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LogoutController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::post('/profile', [ProfileController::class, 'update']);
});
