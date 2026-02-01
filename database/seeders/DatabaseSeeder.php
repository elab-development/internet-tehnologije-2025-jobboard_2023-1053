namespace Database\Seeders;

use App\Models\Application;
use App\Models\Company;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje test korisnika
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Kreiranje admin korisnika
        User::factory()->count(5)->create(['role' => 'admin']);

        // Kreiranje kompanija
        Company::factory()->count(30)->create();

        // Kreiranje poslova
        Job::factory()->count(80)->create();

        // Kreiranje aplikacija
        Application::factory()->count(300)->create();

        // Kreiranje studenata
        User::factory()->count(30)->create(['role' => 'student']);

        // Kreiranje alumni korisnika
        User::factory()->count(30)->create(['role' => 'alumni']);
    }
}
