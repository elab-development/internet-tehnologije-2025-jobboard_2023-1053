<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $student;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role'=>'admin']);
        $this->student = User::factory()->create(['role'=>'student']);
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_admin_can_delete_user()
    {
        $userToDelete = User::factory()->create();

        $this->withHeaders($this->authHeader($this->admin))
            ->deleteJson("/api/user/delete/{$userToDelete->id}")
            ->assertStatus(200)
            ->assertJson(['message'=>"User deleted successfully"]);
    }

    public function test_get_users_by_role()
    {
        $this->withHeaders($this->authHeader($this->admin))
            ->getJson("/api/users/student/role")
            ->assertStatus(200)
            ->assertJsonStructure(['users', 'message']);
    }

    public function test_me_endpoint()
    {
        $this->withHeaders($this->authHeader($this->student))
            ->getJson('/api/me')
            ->assertStatus(200)
            ->assertJsonStructure(['user']);
    }
}
