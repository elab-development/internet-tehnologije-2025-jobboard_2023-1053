<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ApplicationTest extends TestCase
{
    use RefreshDatabase;

    protected User $student;
    protected Job $job;

    protected function setUp(): void
    {
        parent::setUp();
        $this->student = User::factory()->create(['role'=>'student']);
        $this->job = Job::factory()->create();
    }

    protected function authHeader(User $user)
    {
        $token = $user->createToken('test')->plainTextToken;
        return ['Authorization'=>"Bearer $token"];
    }

    public function test_student_can_apply_for_job()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('cv.pdf', 100);

        $data = [
            'job_id'=>$this->job->id,
            'cv'=>$file,
            'linkedinUrl'=>'https://linkedin.com/test'
        ];

        $this->withHeaders($this->authHeader($this->student))
            ->postJson('/api/application/add', $data)
            ->assertStatus(201)
            ->assertJsonStructure(['application'=>['id','resume_url','status'], 'message']);
    }

    public function test_student_can_update_and_delete_application()
    {
        $application = Application::factory()->create(['user_id'=>$this->student->id, 'job_id'=>$this->job->id]);

        $updateData = ['status'=>'accepted'];
        $this->withHeaders($this->authHeader($this->student))
            ->putJson("/api/application/update/{$application->id}", $updateData)
            ->assertStatus(201)
            ->assertJsonStructure(['application']);

        $this->withHeaders($this->authHeader($this->student))
            ->deleteJson("/api/application/delete/{$application->id}")
            ->assertStatus(200)
            ->assertJson(['message'=>'Application deleted successfully']);
    }
}
