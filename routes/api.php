<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Files\ReadController;
use App\Http\Controllers\Api\Video\ConversionController;
use App\Http\Controllers\Api\Video\VideoAlbumController;
use App\Http\Controllers\Api\Video\VideoTracksController;

Route::get('/status', [StatusController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LogoutController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::apiResources(
        [
            '/videos/albums' => VideoAlbumController::class,
            '/videos/tracks' => VideoTracksController::class
        ],
        [
            'as' => 'videos',
            'parameters' => [
                'albums' => 'video_album',
                'tracks' => 'video_track'
            ]
        ]
    );
    Route::apiResource('videos/conversions', ConversionController::class);
});

Route::resource('files', ReadController::class);

Route::middleware('guest')->group(function () {
    Route::post('/login', [LoginController::class, 'index']);
    Route::post('/register', [RegisterController::class, 'index']);
    Route::apiResource('/videos', VideoController::class)->parameter('videos', 'video_track:slug');
});
