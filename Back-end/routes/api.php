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
Route::middleware(['throttle:login'])->group(function () {
    Route::post('/connexion', [UserController::class, 'logIn']);
});

Route::post('/inscription', [UserController::class, "registration"]);
Route::post('/mon-compte', [UserController::class, "getUserById"]);
Route::post('/recherche', [UserController::class, "getDoctorByNameSpecialityAndLocation"]);


Route::middleware(['jwt.auth'])->group(function () {
    //Appointments
    Route::post('/annuler-un-rendez-vous/{id}', [AppointmentController::class, "deleteAppointment"]);
    Route::post('/ajouter-un-rendez-vous', [AppointmentController::class, "addAppointment"]);
    Route::get('/rendez-vous/{id}', [AppointmentController::class, "getAllAppointmentsOfOneUser"]);
    Route::put('/rendez-vous/{id}', [AppointmentController::class, "makeAppointment"]);

    //Users
    Route::put('/profile/{id}', [UserController::class, "updateProfil"]);
});
