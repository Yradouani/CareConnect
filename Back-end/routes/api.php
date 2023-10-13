<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\UserController;
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

//Users
Route::post('/inscription', [UserController::class, "registration"]);
Route::post('/connexion', [UserController::class, "logIn"]);
Route::post('/mon-compte', [UserController::class, "getUserById"]);
Route::post('/recherche', [UserController::class, "getDoctorByNameSpecialityAndLocation"]);

//Appointments
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/annuler-un-rendez-vous/{id}', [AppointmentController::class, "deleteAppointment"]);
    Route::post('/ajouter-un-rendez-vous', [AppointmentController::class, "addAppointment"]);
    Route::get('/rendez-vous/{id}', [AppointmentController::class, "getAllAppointmentsOfOneDoctor"]);
    Route::put('/rendez-vous/{id}', [AppointmentController::class, "makeAppointment"]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
