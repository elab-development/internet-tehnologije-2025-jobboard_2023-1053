<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    protected User $student;
    protected Company $company;

    protected function setUp(): void
    {
        parent::setUp();
        $this->student = User::factory()->create(['role'=>'student']);
        $this->company = Company::factory()->create();
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_student_can_add_update_delete_comment()
    {
        $data = ['comment'=>'Great!', 'rating'=>5, 'company_id'=>$this->company->id];

        $response = $this->withHeaders($this->authHeader($this->student))
            ->postJson('/api/comment/add', $data)
            ->assertStatus(201)
            ->assertJsonStructure(['comment']);

        $commentId = $response->json('comment.id');

        $this->withHeaders($this->authHeader($this->student))
            ->putJson("/api/comment/update/{$commentId}", ['comment'=>'Updated!'])
            ->assertStatus(201)
            ->assertJsonStructure(['comment']);

        $this->withHeaders($this->authHeader($this->student))
            ->deleteJson("/api/comments/{$commentId}")
            ->assertStatus(201)
            ->assertJson(['message'=>"Comment successfully deleted"]);
    }

    public function test_get_comments_for_user_and_company()
    {
        Comment::factory()->create(['user_id'=>$this->student->id, 'company_id'=>$this->company->id]);

        $this->withHeaders($this->authHeader($this->student))
            ->getJson('/api/comments/user')
            ->assertStatus(201)
            ->assertJsonStructure(['comments','message']);

        $this->withHeaders($this->authHeader($this->student))
            ->getJson("/api/comments/company/{$this->company->id}")
            ->assertStatus(200)
            ->assertJsonStructure(['comments']);
    }
}
