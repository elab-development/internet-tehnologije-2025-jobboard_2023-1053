<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Service\CompanyService;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

class CompanyController extends Controller
{

    protected CompanyService $companyService;

    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        $company=$this->companyService->getCompanyById($company->id);
        return response()->json(['company'=>new CompanyResource($company)]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    /**
 * @OA\Put(
 *   path="/company/update/{company}",
 *   tags={"Companies"},
 *   summary="Update company (company role)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="company", in="path", required=true, @OA\Schema(type="integer"), example=2),
 *   @OA\RequestBody(
 *     required=false,
 *     @OA\JsonContent(
 *       @OA\Property(property="name", type="string", example="Nova Company d.o.o."),
 *       @OA\Property(property="description", type="string", example="Novi opis")
 *     )
 *   ),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function update(Request $request, Company $company)
    {

        $companyUpdated=$this->companyService->updateCompany($request->toArray(),$company);
        return response()->json(['company'=>new CompanyResource($companyUpdated),'message'=>'Company updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * @OA\Delete(
 *   path="/company/delete/{company}",
 *   tags={"Companies"},
 *   summary="Delete company (admin)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="company", in="path", required=true, @OA\Schema(type="integer"), example=2),
 *   @OA\Response(response=200, description="Deleted"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function destroy(Company $company)
    {
        $this->companyService->deleteCompany($company);
        return response()->json(['message'=>'Company deleted successfully.']);
    }

    /**
 * @OA\Get(
 *   path="/companies/name",
 *   tags={"Companies"},
 *   summary="Search companies by name",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="name", in="query", required=false, @OA\Schema(type="string"), example="microsoft"),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function searchCompany(Request $request){
        $name = $request->input('name');

        $companies = $this->companyService->getCompaniesByName($name);

        return response()->json([
            'companies' => CompanyResource::collection($companies)
        ]);
    }
}
