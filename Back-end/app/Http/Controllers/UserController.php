<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

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
            "password" => ["required", "string", "min:8", "max:30", "confirmed"],
        ]);

        $user = User::create([
            "firstname" => $userInfo["firstname"],
            "lastname" => $userInfo["lastname"],
            "phone" => $userInfo["phone"],
            "role" => $userInfo["role"],
            "email" => $userInfo["email"],
            "password" => bcrypt($userInfo["password"]),
        ]);

        $userId = $user->id;
        if ($userInfo["role"] === "doctor") {
            $doctorInfo = $request->validate([
                "specialization" => ["required", "string"],
                "officeAddress" => ["required", "string"],
                "officePostalCode" => ["required", "string", "size:5"],
                "officeCity" => ["required", "string", "min:2", "max:30"],
            ]);

            $doctor = Doctor::create([
                "user_id" => $user->id,
                "specialization" => $doctorInfo["specialization"],
                "officeAddress" => $doctorInfo["officeAddress"],
                "officePostalCode" => $doctorInfo["officePostalCode"],
                "officeCity" => $doctorInfo["officeCity"],
            ]);
        } else if ($userInfo["role"] === "patient") {
            $patientInfo = $request->validate([
                "dateOfBirth" => ["required", 'date'],
                "SocialSecurityNumber" => ["required", "string", "size:15"]
            ]);

            $patient = Patient::create([
                "user_id" => $user->id,
                "dateOfBirth" => $patientInfo["dateOfBirth"],
                "SocialSecurityNumber" => $patientInfo["SocialSecurityNumber"],
            ]);
        }
        return response($doctor, 201);
    }
}
