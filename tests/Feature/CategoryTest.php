<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role'=>'admin']);
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_admin_can_crud_category()
    {
        $data = ['name'=>'Category 1'];

        $response = $this->withHeaders($this->authHeader($this->admin))
            ->postJson('/api/category', $data)
            ->assertStatus(201)
            ->assertJsonStructure(['category','message']);

        $categoryId = $response->json('category.id');

        $this->withHeaders($this->authHeader($this->admin))
            ->putJson('/api/category/update', ['id'=>$categoryId, 'name'=>'Updated Category'])
            ->assertStatus(200)
            ->assertJsonStructure(['category']);

        $this->withHeaders($this->authHeader($this->admin))
            ->deleteJson("/api/category/{$categoryId}")
            ->assertStatus(200)
            ->assertJson(['message'=>"Category successfully deleted"]);
    }

    public function test_search_category()
    {
        Category::factory()->create(['name'=>'TestCategory']);
        $this->withHeaders($this->authHeader($this->admin))
            ->getJson('/api/category/search?name=TestCategory')
            ->assertStatus(200)
            ->assertJsonStructure(['categories']);
    }
}
