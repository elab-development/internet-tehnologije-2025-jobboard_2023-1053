<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Service\CommentService;
use App\Http\Service\CompanyService;
use App\Http\Service\UserService;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use OpenApi\Annotations as OA;

class CommentController extends Controller
{
    protected CommentService $commentService;
    protected CompanyService $companyService;
    public function __construct(CommentService $commentService, CompanyService $companyService)
    {
        $this->commentService = $commentService;
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
    /**
 * @OA\Post(
 *   path="/comment/add",
 *   tags={"Comments"},
 *   summary="Add comment (student/alumni)",
 *   security={{"sanctum":{}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"comment","rating","company_id"},
 *       @OA\Property(property="comment", type="string", example="Super iskustvo."),
 *       @OA\Property(property="rating", type="number", example=4.5),
 *       @OA\Property(property="company_id", type="integer", example=2)
 *     )
 *   ),
 *   @OA\Response(response=201, description="Created"),
 *   @OA\Response(response=400, description="Validation error"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Company not found")
 * )
 */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'comment'=>'required',
            'rating'=>'required|numeric',
            'company_id'=>'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $company=$this->companyService->getCompanyById($request->get('company_id'));
        if(!$company){
            return response()->json(['message'=>'Company not found'],404);
        }
        $userId=$request->user()->id;
        $data = $request->only(['comment', 'rating', 'company_id']);
        $data['user_id'] = $userId;
        $comment=$this->commentService->addComment($data);

        return response()->json(["comment"=>new CommentResource($comment)],201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
 * @OA\Put(
 *   path="/comment/update/{comment}",
 *   tags={"Comments"},
 *   summary="Update comment (student/alumni)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="comment", in="path", required=true, @OA\Schema(type="integer"), example=21),
 *   @OA\RequestBody(
 *     required=false,
 *     @OA\JsonContent(
 *       @OA\Property(property="comment", type="string", example="Izmenjen komentar."),
 *       @OA\Property(property="rating", type="number", example=5)
 *     )
 *   ),
 *   @OA\Response(response=201, description="Updated (your code returns 201)"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function update(Request $request, Comment $comment)
    {
        $commentUpdated = $this->commentService->updateComment($comment, $request->toArray());
        return response()->json(["comment"=>new CommentResource($commentUpdated),'message'=>"Comment successfully updated"],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * @OA\Delete(
 *   path="/comments/{comment}",
 *   tags={"Comments"},
 *   summary="Delete comment (student/alumni/admin)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="comment", in="path", required=true, @OA\Schema(type="integer"), example=21),
 *   @OA\Response(response=204, description="Deleted (route suggests delete)"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function destroy(Comment $comment)
    {
        $this->commentService->deleteComment($comment);
        return response()->json(['message'=>"Comment successfully deleted"],201);
    }
    /**
 * @OA\Get(
 *   path="/comments/user",
 *   tags={"Comments"},
 *   summary="Get comments for current user",
 *   security={{"sanctum":{}}},
 *   @OA\Response(response=201, description="OK (your code returns 201)"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function getCommentsForUser(Request $request){
        $userId=$request->user()->id;
        $comments=$this->commentService->getCommentsForUser($userId);
        return response()->json(["comments"=>CommentResource::collection($comments),'message'=>"Comments founded successfully"],201);
    }
    /**
 * @OA\Get(
 *   path="/comments/company/{companyId}",
 *   tags={"Comments"},
 *   summary="Get comments for a company",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="companyId", in="path", required=true, @OA\Schema(type="integer"), example=2),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function getCommentsForCompany($companyId){
        $comments=$this->commentService->getCommentsForCompany($companyId);
        return response()->json(["comments"=>CommentResource::collection($comments)],200);

    }

}