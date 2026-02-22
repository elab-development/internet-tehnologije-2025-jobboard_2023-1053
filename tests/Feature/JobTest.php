<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Company;
use App\Models\Job;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobTest extends TestCase
{
    use RefreshDatabase;

    protected User $companyUser;
    protected Company $company;

    protected function setUp(): void
    {
        parent::setUp();
        $this->companyUser = User::factory()->create(['role'=>'company']);
        $this->company = Company::factory()->create(['user_id'=>$this->companyUser->id]);
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_company_can_create_job()
    {
        $category = \App\Models\Category::factory()->create();

        $data = [
            'title' => 'Test Job',
            'description' => 'Job Description',
            'company_id' => $this->company->id,
            'deadline' => now()->addDays(5)->toDateString(),
            'salary' => 1000,
            'category_id' => $category->id,

        ];

        $this->withHeaders($this->authHeader($this->companyUser))
            ->postJson('/api/job/add', $data)
            ->assertStatus(201)
            ->assertJsonStructure(['job', 'message']);
    }


    public function test_company_can_update_and_delete_job()
    {
        $job = Job::factory()->create(['company_id'=>$this->company->id]);

        $updateData = ['title'=>'Updated Job'];
        $this->withHeaders($this->authHeader($this->companyUser))
            ->putJson("/api/job/update/{$job->id}", $updateData)
            ->assertStatus(201)
            ->assertJsonStructure(['jobUpdated']);

        $this->withHeaders($this->authHeader($this->companyUser))
            ->deleteJson("/api/job/delete/{$job->id}")
            ->assertStatus(201)
            ->assertJson(['message'=>'Job deleted successfully']);
    }
}
