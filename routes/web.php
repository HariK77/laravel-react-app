<?php

use App\Http\Controllers\SpaHandleController;
use Illuminate\Support\Facades\Route;


Route::get('{page?}', [SpaHandleController::class, 'handle'])->name('index');
