<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Setup test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();
        // Preskoči sve middleware-ove (CSRF, auth) za testove
        $this->withoutMiddleware();
    }

    /** @test */
    public function register_student_success()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test Student',
            'email' => 'student@example.com',
            'password' => 'password123',
            'role' => 'student'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role','company'],
                'token'
            ]);

        // Proveri da li je korisnik upisan u bazu
        $this->assertDatabaseHas('users', [
            'email' => 'student@example.com',
            'role' => 'student'
        ]);
    }

    /** @test */
    public function login_success()
    {
        // Napravi korisnika
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => bcrypt('password123'),
            'role' => 'student'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role'],
                'token'
            ]);
    }

    /** @test */
    public function login_fail_wrong_credentials()
    {
        // Napravi korisnika
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => bcrypt('password123'),
            'role' => 'student'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'wrongpassword'
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'The provided credentials are incorrect.'
            ]);
    }
}
