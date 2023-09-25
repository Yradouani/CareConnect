<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'dateOfBirth',
        'socialSecurityNumber'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Alice', 'Dubois', '0123456789', 'patient', 'alice.patient1@email.com', 'motdepasse1');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1980-05-10', '123456789012345');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Pierre', 'Lefebvre', '0987654321', 'patient', 'pierre.patient2@email.com', 'motdepasse2');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1995-09-20', '987654321012345');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Marie', 'Martin', '0123456789', 'patient', 'marie.patient3@email.com', 'motdepasse3');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1978-03-25', '123456789012346');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Luc', 'Lavoie', '0987654321', 'patient', 'luc.patient4@email.com', 'motdepasse4');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1989-12-15', '987654321012346');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Sophie', 'Roussel', '0123456789', 'patient', 'sophie.patient5@email.com', 'motdepasse5');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1993-08-05', '123456789012347');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Paul', 'Lefort', '0987654321', 'patient', 'paul.patient6@email.com', 'motdepasse6');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1975-07-12', '987654321012347');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Emilie', 'Moreau', '0123456789', 'patient', 'emilie.patient7@email.com', 'motdepasse7');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1984-02-28', '123456789012348');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Thomas', 'Durand', '0987654321', 'patient', 'thomas.patient8@email.com', 'motdepasse8');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1992-06-18', '987654321012348');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Charlotte', 'Martin', '0123456789', 'patient', 'charlotte.patient9@email.com', 'motdepasse9');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1970-11-03', '123456789012349');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Philippe', 'Roussel', '0987654321', 'patient', 'philippe.patient10@email.com', 'motdepasse10');
// INSERT INTO patients (user_id, dateOfBirth, socialSecurityNumber)
// VALUES (LAST_INSERT_ID(), '1998-04-08', '987654321012349');
