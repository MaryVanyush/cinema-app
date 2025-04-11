<?php

use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\PlaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HallController;
use App\Http\Controllers\Api\SessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('hall', HallController::class);
Route::apiResource('film', FilmController::class);
Route::apiResource('session', SessionController::class);
Route::apiResource('place', PlaceController::class);

