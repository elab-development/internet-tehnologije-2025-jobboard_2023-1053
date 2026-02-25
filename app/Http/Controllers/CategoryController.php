<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Service\CategoryService;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;


class CategoryController extends Controller
{
    protected CategoryService $categoryService;
    public function __construct(CategoryService $categoryService){
        $this->categoryService = $categoryService;
    }
    /**
     * Display a listing of the resource.
     */
    /**
 * @OA\Get(
 *   path="/category",
 *   tags={"Categories"},
 *   summary="List categories",
 *   security={{"sanctum":{}}},
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function index()
    {
        $categories = $this->categoryService->getCategories();
        return response()->json(['categories'=>CategoryResource::collection($categories)],200);
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
    /**
 * @OA\Post(
 *   path="/category",
 *   tags={"Categories"},
 *   summary="Create category (admin)",
 *   security={{"sanctum":{}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"name"},
 *       @OA\Property(property="name", type="string", example="IT")
 *     )
 *   ),
 *   @OA\Response(response=201, description="Created"),
 *   @OA\Response(response=400, description="Validation error"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|unique:category',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $category = $this->categoryService->create($request->toArray());
        return response()->json(['category'=>new CategoryResource($category),'message'=>"Category added successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    /**
 * @OA\Get(
 *   path="/category/{category}",
 *   tags={"Categories"},
 *   summary="Get category",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="category", in="path", required=true, @OA\Schema(type="integer"), example=3),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function show(Category $category)
    {
        $categoryId=$category->id;
        $categoryFounded=$this->categoryService->getCategoryById($categoryId);
        return response()->json(['category'=>new CategoryResource($categoryFounded)],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
 * @OA\Put(
 *   path="/category/update",
 *   tags={"Categories"},
 *   summary="Update category (admin)",
 *   security={{"sanctum":{}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       @OA\Property(property="name", type="string", example="IT & Software")
 *     )
 *   ),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function update(Request $request, Category $category)
    {
        $categoryUpdate=$this->categoryService->update($category,$request->toArray());
        return response()->json(['category'=>new CategoryResource($categoryUpdate)],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * @OA\Delete(
 *   path="/category/{category}",
 *   tags={"Categories"},
 *   summary="Delete category (admin)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="category", in="path", required=true, @OA\Schema(type="integer"), example=3),
 *   @OA\Response(response=200, description="Deleted"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function destroy(Category $category)
    {
        $this->categoryService->delete($category);
        return response()->json(['message'=>"Category successfully deleted"],200);
    }
    /**
 * @OA\Get(
 *   path="/category/search",
 *   tags={"Categories"},
 *   summary="Search categories",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="name", in="query", required=false, @OA\Schema(type="string"), example="it"),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function searchCategory(Request $request){
        $name=$request->get('name');
        $categories=$this->categoryService->searchCategory($name);
        return response()->json(['categories'=>CategoryResource::collection($categories)],200);

    }
}
