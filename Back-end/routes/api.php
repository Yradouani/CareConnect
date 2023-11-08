<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Users
Route::middleware(['throttle:login'])->group(function () {
    Route::post('/connexion', [UserController::class, 'logIn']);
});

Route::post('/inscription', [UserController::class, "registration"]);
Route::post('/mon-compte', [UserController::class, "getUserById"]);

//Routes protected by token authentication
Route::middleware(['jwt.auth'])->group(function () {
    //Appointments
    Route::post('/annuler-un-rendez-vous/{id}', [AppointmentController::class, "deleteAppointment"]);
    Route::post('/ajouter-un-rendez-vous', [AppointmentController::class, "addAppointment"]);
    Route::get('/rendez-vous/{id}', [AppointmentController::class, "getAllAppointmentsOfOneUser"]);
    Route::put('/rendez-vous/{id}', [AppointmentController::class, "makeAppointment"]);

    //Users
    Route::post('/recherche', [UserController::class, "getDoctorByNameSpecialityAndLocation"]);
    Route::put('/profile/{id}', [UserController::class, "updateProfil"]);
});
