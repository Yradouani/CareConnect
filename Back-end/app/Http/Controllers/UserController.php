<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function registration(Request $request)
    {
        try {
            $userInfo = $request->validate([
                "firstname" => ["required", "string", "min:2", "max:30"],
                "lastname" => ["required", "string", "min:2", "max:30"],
                "phone" => ["required", "string", "min:10", "max:13"],
                "role" => ["required", "string", "in:patient,doctor"],
                "email" => ["required", "email"],
                "password" => ["required", "string", "min:8", "max:30"],
                "confirm_password" => ["required", "same:password"]
            ]);

            if (User::where('email', $userInfo['email'])->exists()) {
                return response()->json(['error' => 'Email already exists'], 422);
            }

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
        } catch (Exception $e) {
            echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
        }
    }

    public function logIn(Request $request)
    {
        $userInfo = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required", "string"],
        ]);

        $user = User::where("email", $userInfo["email"])->first();
        if (!$user) return response(["message" => "No user find with this email : $userInfo[email]"], 401);
        if (!Hash::check($userInfo["password"], $user->password)) return response(["message" => "No user find with this password"], 401);

        $customClaims = [
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'phone' => $user->phone,
            'email' => $user->email,
            'role' => $user->role,
            'issued_at' => now()->timestamp,
        ];
        $token = JWTAuth::claims($customClaims)->fromUser($user);

        $csrfToken = csrf_token();

        return response([
            "token" => $token,
            "csrf_token" => $csrfToken
        ], 200);
    }

    public function getUserById(User $id)
    {
        try {
            $user = User::find($id);
            if ($user->role == "doctor") {
                $doctor = DB::table("doctors")
                    ->join("users", "doctors.user_id", "=", "users.id")
                    ->select("doctors.*")
                    ->where("doctors.user_id", "=", $id)
                    ->get();

                $user += $doctor;
            } else if ($user->role == "patient") {
                $patient = DB::table("patients")
                    ->join("users", "patients.user_id", "=", "users.id")
                    ->select("patients.*")
                    ->where("patients.user_id", "=", $id)
                    ->get();

                $user += $patient;
            }
        } catch (Exception $e) {
            echo '</br> <b> Exception Message: ' . $e->getMessage() . '</b>';
        }
        return $user;
    }

    public function updateProfil(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $key = $request->input('property');
            $value = $request->input('value');

            if ($key && $user->isFillable($key)) {
                $user->$key = $value;
                $user->save();
                return response()->json(['message' => 'Success updated profil'], 200);
            } else {
                return response()->json(['error' => 'Invalid key'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Update profil error'], 500);
        }
    }

    public function getDoctorByNameSpecialityAndLocation(Request $request)
    {
        $search = $request->validate([
            'searchinput' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);
        $searchinput = $search['searchinput'];
        $searchlocation = $search['location'];
        $doctors = Doctor::query();

        if ($searchinput) {
            $doctors->where(function ($query) use ($searchinput) {
                $query->whereHas('user', function ($subquery) use ($searchinput) {
                    $subquery->where('firstname', 'like', '%' . $searchinput . '%')
                        ->orWhere('lastname', 'like', '%' . $searchinput . '%');
                })
                    ->orWhere('specialization', 'like', '%' . $searchinput . '%');
            });
        }

        if ($searchlocation) {
            $doctors->where(function ($query) use ($searchlocation) {
                $query->where('officeCity', 'like', '%' . $searchlocation . '%')
                    ->orWhere('officePostalCode', 'like', '%' . $searchlocation . '%');
            });
        }

        $doctors->with('user');
        $doctors = $doctors->get();

        $doctorsAndAppointments = [];
        foreach ($doctors as $doctor) {
            $doctorData = $doctor->toArray();

            $appointment = Appointment::where('doctor_id', $doctor->user_id)
                ->where('dateOfAppointment', '>=', now())
                ->orderBy('dateOfAppointment')
                ->first();

            $doctorData['appointments'] = $appointment;
            $doctorsAndAppointments[] = $doctorData;
        }

        return response()->json($doctorsAndAppointments, 200);
    }
}
