<?php

use App\Http\Controllers\SpaHandleController;
use Illuminate\Support\Facades\Route;


Route::get('{all}', [SpaHandleController::class, 'handle'])->name('index')->where(['all' => '.*']);
