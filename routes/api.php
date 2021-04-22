<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\GuestsController;
use App\Http\Controllers\Api\RoomsController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\MainController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/search-rooms', [MainController::class, 'index']);
Route::post('/booking-rooms', [MainController::class, 'bookingRoom']);


Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});


Route::group(['prefix' => 'auth'], function ($router) {
    Route::group(['middleware' => 'auth:sanctum'], function (){

        Route::apiResource('/users', UsersController::class);
        Route::get('logout', [AuthController::class, 'logout']);
        Route::apiResource('/rooms', RoomsController::class);
        Route::apiResource('/guests', GuestsController::class);
        Route::apiResource('/booking', BookingController::class);
        Route::get('/booking-search', [BookingController::class, 'searchRoom']);
        /*Route::post('/booking-final', [BookingController::class, 'createBooking']);*/
        Route::get('/rooms-all', [RoomsController::class, 'getAllRooms']);


    });


});
