<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $companyUser;
    protected Company $company;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role'=>'admin']);
        $this->companyUser = User::factory()->create(['role'=>'company']);
        $this->company = Company::factory()->create(['user_id'=>$this->companyUser->id]);
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_admin_can_delete_company()
    {
        $this->withHeaders($this->authHeader($this->admin))
            ->deleteJson("/api/company/delete/{$this->company->id}")
            ->assertStatus(200)
            ->assertJson(['message'=>'Company deleted successfully.']);
    }

    public function test_company_user_can_update_company()
    {
        $data = ['name'=>'Updated Company'];
        $this->withHeaders($this->authHeader($this->companyUser))
            ->putJson("/api/company/update/{$this->company->id}", $data)
            ->assertStatus(200)
            ->assertJson(['message'=>'Company updated successfully.']);
    }

    public function test_search_company()
    {
        $this->withHeaders($this->authHeader($this->companyUser))
            ->getJson('/api/companies/name?name='.$this->company->name)
            ->assertStatus(200)
            ->assertJsonStructure(['companies']);
    }
}
