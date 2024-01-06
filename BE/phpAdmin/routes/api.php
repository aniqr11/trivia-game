<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/google/login/url', '\App\Http\Controllers\api\GoogleController@getAuthUrl');
Route::post('/google/auth/login', '\App\Http\Controllers\api\GoogleController@postLogin');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/stuff', '\App\Http\Controllers\api\StuffController@getStuff');
});


