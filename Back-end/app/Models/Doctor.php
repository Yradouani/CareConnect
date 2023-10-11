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


    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}


// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Jean', 'Dupont', '0123456789', 'doctor', 'jean.dupont1@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Cardiologue', '12 Rue de la Liberté', '75001', 'Paris', '12345678901');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Marie', 'Martin', '0987654321', 'doctor', 'marie.martin2@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Dermatologue', '456 Avenue Elm', '69002', 'Lyon', '12345678902');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Pierre', 'Lefebvre', '0123456789', 'doctor', 'pierre.lefebvre3@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Gynécologue', '789 Boulevard Principal', '13008', 'Marseille', '12345678903');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Sophie', 'Dubois', '0987654321', 'doctor', 'sophie.dubois4@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Ophtalmologiste', '6 Avenue des Roses', '31000', 'Toulouse', '12345678904');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Thomas', 'Moreau', '0123456789', 'doctor', 'thomas.moreau5@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Pédiatre', '89 Boulevard du bonheur', '69001', 'Lyon', '12345678905');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Camille', 'Durand', '0987654321', 'doctor', 'camille.durand6@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Chirurgien', '4 Rue de la Paix', '75008', 'Paris', '12345678906');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Lucie', 'Lavoie', '0123456789', 'doctor', 'lucie.lavoie7@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Neurologue', '567 Avenue du Soleil', '13001', 'Marseille', '12345678907');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Philippe', 'Lefort', '0987654321', 'doctor', 'philippe.lefort8@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Radiologue', '6 rue Maurice diderot', '31001', 'Toulouse', '12345678908');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Emilie', 'Roussel', '0123456789', 'doctor', 'emilie.roussel9@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Psychiatre', '9 allée de la pelouse', '75002', 'Paris', '12345678909');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('David', 'Martin', '0123456789', 'doctor', 'david.martin1@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Orthopédiste', '12 avenue des champs Elysée', '75001', 'Paris', '12345678910');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Isabelle', 'Dupont', '0987654321', 'doctor', 'isabelle.dupont2@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Pneumologue', '12 avenue Maurice Thorez', '69002', 'Lyon', '12345678911');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('François', 'Lefebvre', '0123456789', 'doctor', 'francois.lefebvre3@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Gynécologue', '7 Avenue de la République', '13008', 'Marseille', '12345678912');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Sophie', 'Martin', '0987654321', 'doctor', 'sophie.martin4@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Ophtalmologiste', '10 Rue du Château', '31000', 'Toulouse', '12345678913');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Thomas', 'Lavoie', '0123456789', 'doctor', 'thomas.lavoie5@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Pédiatre', '12 rue des Lilas', '69001', 'Lyon', '12345678914');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Lucien', 'Rousseeau', '0123456789', 'doctor', 'lucien.rousseau7@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Neurologue', '4 avenue de la tour de l\'eau', '13001', 'Marseille', '12345678916');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Corine', 'Morel', '0123456789', 'doctor', 'corine.morel8@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Radiologue', '15 rue Victor Hugo', '31001', 'Toulouse', '12345678917');

// INSERT INTO users (firstname, lastname, phone, role, email, password)
// VALUES ('Hélène', 'Jacquemont', '0123456789', 'doctor', 'helene.jacquemont@email.com', '$2y$10$juxmmSbgmklUk8kkEkWtju948mRSp0p.t3kMvJM6MMpjkm7fmqA2a');
// INSERT INTO doctors (user_id, specialization, officeAddress, officePostalCode, officeCity, RPPSNumber)
// VALUES (LAST_INSERT_ID(), 'Pédiatre', '16 rue Montaigne', '31001', 'Toulouse', '12345678917');
