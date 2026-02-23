Opis projekta
JobBoard je platforma koja povezuje poslodavce i kandidate. Poslodavci mogu da postavljaju oglase, 
dok kandidati i alumnisti mogu da pretražuju poslove, šalju prijave i ostavljaju komentare. 
Sistem uključuje i administraciju za nadzor sadržaja.

Korišćene tehnologije:
Backend: Laravel (PHP)

Frontend: React (JavaScript)

Baza podataka: MySQL

Instrukcije za lokalno pokretanje
Pratite ove korake da biste pokrenuli aplikaciju na svom računaru.

1. Podešavanje Backenda (Laravel)
   Otvorite terminal u glavnom (root) folderu projekta:

Instalacija zavisnosti: composer install

Napravite kopiju .env fajla: cp .env.example .env

U .env fajlu podesite ime vaše baze, username i lozinku.

Migracija i popunjavanje baze (seed): php artisan migrate:fresh --seed

Pokretanje servera: php artisan serve

Backend će raditi na adresi: http://127.0.0.1:8000

2. Podešavanje Frontenda (React)
   Otvorite novi terminal i uđite u frontend folder:


Ulazak u folder: cd frontend

Instalacija paketa: npm install

Pokretanje aplikacije: npm run dev

Frontend će raditi na adresi koju ispiše terminal (obično http://localhost:5173).

Funkcionalnosti
Registracija i prijava: Za kandidate i poslodavce.

Oglasi: Poslodavci kreiraju, menjaju i brišu oglase.

Pretraga: Filtriranje poslova po kategorijama i ključnim rečima.

Prijave: Slanje CV-a i prijavnog formulara na oglas.

Komentari: Alumnisti i korisnici mogu učestvovati u zajednici.
