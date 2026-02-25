<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Http\Service\CompanyService;
use App\Http\Service\JobService;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;


class JobController extends Controller
{

    protected JobService $jobService;
    protected CompanyService $companyService;
    public function __construct(JobService $jobService, CompanyService $companyService){
        $this->jobService = $jobService;
        $this->companyService = $companyService;
    }
    /**
 * @OA\Get(
 *   path="/jobs",
 *   tags={"Jobs"},
 *   summary="List jobs",
 *   security={{"sanctum":{}}},
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function index()
    {
        $jobs=Job::all();
        return response()->json(["jobs"=>JobResource::collection($jobs)],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    /**
 * @OA\Post(
 *   path="/job/add",
 *   tags={"Jobs"},
 *   summary="Create job (company)",
 *   security={{"sanctum":{}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"title","description","company_id","deadline"},
 *       @OA\Property(property="title", type="string", example="Backend Intern"),
 *       @OA\Property(property="description", type="string", example="Opis posla..."),
 *       @OA\Property(property="company_id", type="integer", example=2),
 *       @OA\Property(property="deadline", type="string", format="date", example="2026-06-30")
 *     )
 *   ),
 *   @OA\Response(response=201, description="Created"),
 *   @OA\Response(response=400, description="Validation error / bad request"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'title'=>'required',
            'description'=>'required',
            'company_id'=>'required',
            'deadline'=>'required|date',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $company=$this->companyService->getCompanyById($request->get('company_id'));
        if ($company ===null){
            return response()->json(['message'=>"Company doesn't exist"], 400);
        }


        $job=$this->jobService->addJob($request->toArray());
        return response()->json(["job"=>new JobResource($job),'message'=>"Job created successfully"],201);
    }


    public function show(Job $job)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    /**
 * @OA\Put(
 *   path="/job/update/{job}",
 *   tags={"Jobs"},
 *   summary="Update job (company)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="job", in="path", required=true, @OA\Schema(type="integer"), example=7),
 *   @OA\RequestBody(
 *     required=false,
 *     @OA\JsonContent(
 *       @OA\Property(property="title", type="string", example="Updated title"),
 *       @OA\Property(property="description", type="string", example="Updated description"),
 *       @OA\Property(property="deadline", type="string", format="date", example="2026-07-15")
 *     )
 *   ),
 *   @OA\Response(response=201, description="Updated (your code returns 201)"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function update(Request $request, Job $job)
    {
        $jobUpdated=$this->jobService->updateJob($job,$request->toArray());
        return response()->json(["jobUpdated"=>new JobResource($jobUpdated)],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * @OA\Delete(
 *   path="/job/delete/{job}",
 *   tags={"Jobs"},
 *   summary="Delete job (company)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="job", in="path", required=true, @OA\Schema(type="integer"), example=7),
 *   @OA\Response(response=201, description="Deleted (your code returns 201)"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function destroy(Job $job)
    {
        $this->jobService->deleteJob($job);
        return response()->json(["message"=>"Job deleted successfully"],201);
    }
    /**
 * @OA\Get(
 *   path="/jobs/search",
 *   tags={"Jobs"},
 *   summary="Search jobs",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="name", in="query", required=false, @OA\Schema(type="string"), example="backend"),
 *   @OA\Parameter(name="category_id", in="query", required=false, @OA\Schema(type="integer"), example=3),
 *   @OA\Parameter(name="salary_min", in="query", required=false, @OA\Schema(type="number"), example=600),
 *   @OA\Parameter(name="salary_max", in="query", required=false, @OA\Schema(type="number"), example=1200),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function searchJobs(Request $request)
    {
        $filters = $request->only([
            'name',
            'category_id',
            'salary_min',
            'salary_max'
        ]);

        $jobs = $this->jobService->searchJobs($filters);

        return response()->json([
            'jobs' => JobResource::collection($jobs),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ]
        ]);
    }
    /**
 * @OA\Get(
 *   path="/jobs/company/{company_id}",
 *   tags={"Jobs"},
 *   summary="Get jobs for company",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="company_id", in="path", required=true, @OA\Schema(type="integer"), example=2),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function getJobsForCompany($company_id){
        $jobs=$this->jobService->getJobsForCompany($company_id);
        return response()->json(['jobs'=>JobResource::collection($jobs)]);
    }
}
