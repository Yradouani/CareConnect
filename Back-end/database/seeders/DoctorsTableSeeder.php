<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DoctorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstname' => 'Jean',
            'lastname' => 'Dupont',
            'phone' => '0123456789',
            'role' => 'doctor',
            'email' => 'jean.dupont1@email.com',
            'password' => Hash::make('aaBB11$$'),
        ]);
        Doctor::create([
            'user_id' => 1,
            'specialization' => 'Cardiologue',
            'officeAddress' => '123 Rue Principale',
            'officePostalCode' => '75001',
            'officeCity' => 'Paris',
            'RPPSNumber' => '12345678901',
        ]);
    }
}
