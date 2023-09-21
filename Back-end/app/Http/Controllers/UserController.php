<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registration(Request $request)
    {
        $userInfo = $request->validate([
            "firstname" => ["required", "string", "min:2", "max:30"],
            "lastname" => ["required", "string", "min:2", "max:30"],
            "phone" => ["required", "string", "min:10", "max:13"],
            "role" => ["required", "string", "in:patient,doctor"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "string", "min:8", "max:30"],
            "confirm_password" => ["required", "same:password"]
        ]);

        $user = User::create([
            "firstname" => $userInfo["firstname"],
            "lastname" => $userInfo["lastname"],
            "phone" => $userInfo["phone"],
            "role" => $userInfo["role"],
            "email" => $userInfo["email"],
            "password" => bcrypt($userInfo["password"]),
        ]);

        if ($userInfo["role"] === "doctor") {
            $doctorInfo = $request->validate([
                "specialization" => ["required", "string"],
                "officeAddress" => ["required", "string"],
                "officePostalCode" => ["required", "string", "size:5"],
                "officeCity" => ["required", "string", "min:2", "max:30"],
                "RPPSNumber" => ["required", "string", "size:11"],
            ]);

            $doctor = Doctor::create([
                "user_id" => $user->id,
                "specialization" => $doctorInfo["specialization"],
                "officeAddress" => $doctorInfo["officeAddress"],
                "officePostalCode" => $doctorInfo["officePostalCode"],
                "officeCity" => $doctorInfo["officeCity"],
                "RPPSNumber" => $doctorInfo["RPPSNumber"],
            ]);
        } else if ($userInfo["role"] === "patient") {
            $patientInfo = $request->validate([
                // "YYYY-MM-DD"
                "dateOfBirth" => ["required", 'date'],
                "socialSecurityNumber" => ["required", "string", "size:15"]
            ]);

            $patient = Patient::create([
                "user_id" => $user->id,
                "dateOfBirth" => $patientInfo["dateOfBirth"],
                "socialSecurityNumber" => $patientInfo["socialSecurityNumber"],
            ]);
        }
        return response($patient, 201);
    }

    public function logIn(Request $request)
    {
        $userInfo = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required", "string", "min:8", "max:30"],
        ]);

        $user = User::where("email", $userInfo["email"])->first();
        if (!$user) return response(["message" => "Aucun utilisateur de trouver avec l'email suivant $userInfo[email]"], 401);
        if (!Hash::check($userInfo["password"], $user->password)) return response(["message" => "Aucun utilisateur de trouver avec ce mot de passe"], 401);
        $token = $user->createToken('SECRET_KEY')->plainTextToken;
        return response([
            "user" => $user,
            "token" => $token
        ], 200);
    }
}
