<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialization',
        'officeAddress',
        'officePostalCode',
        'officeCity',
        'RPPSNumber'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Jean', 'Dupont', '0123456789', 'doctor', 'jean.dupont1@email.com', 'motdepasse1');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Cardiologue', '123 Rue Principale', '75001', 'Paris', '12345678901');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Marie', 'Martin', '0987654321', 'doctor', 'marie.martin2@email.com', 'motdepasse2');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Dermatologue', '456 Avenue Elm', '69002', 'Lyon', '12345678902');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Pierre', 'Lefebvre', '0123456789', 'doctor', 'pierre.lefebvre3@email.com', 'motdepasse3');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Gynécologue', '789 Boulevard Principal', '13008', 'Marseille', '12345678903');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Sophie', 'Dubois', '0987654321', 'doctor', 'sophie.dubois4@email.com', 'motdepasse4');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Ophtalmologiste', '234 Rue Elm', '31000', 'Toulouse', '12345678904');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Thomas', 'Moreau', '0123456789', 'doctor', 'thomas.moreau5@email.com', 'motdepasse5');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Pédiatre', '567 Avenue Principale', '69001', 'Lyon', '12345678905');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Camille', 'Durand', '0987654321', 'doctor', 'camille.durand6@email.com', 'motdepasse6');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Chirurgien', '890 Boulevard Elm', '75008', 'Paris', '12345678906');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Lucie', 'Lavoie', '0123456789', 'doctor', 'lucie.lavoie7@email.com', 'motdepasse7');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Neurologue', '1234 Rue Principale', '13001', 'Marseille', '12345678907');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Philippe', 'Lefort', '0987654321', 'doctor', 'philippe.lefort8@email.com', 'motdepasse8');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Radiologue', '5678 Avenue Elm', '31001', 'Toulouse', '12345678908');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Emilie', 'Roussel', '0123456789', 'doctor', 'emilie.roussel9@email.com', 'motdepasse9');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Psychiatre', '9876 Boulevard Principal', '75002', 'Paris', '12345678909');
