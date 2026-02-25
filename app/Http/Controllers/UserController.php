<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Service\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;


class UserController extends Controller
{
    protected UserService $userService;
    public function __construct(UserService $userService){
        $this->userService=$userService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

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
        //
    }

    /**
     * Display the specified resource.
     */
    
    public function show(User $user)
    {
        $user=$this->userService->getUserById($user);
        return response()->json(['user'=>new UserResource($user)],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $userUpdated=$this->userService->updateUser($request->toArray(),$user);
        return response()->json(['user'=>new UserResource($userUpdated)],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * @OA\Delete(
 *   path="/user/delete/{user}",
 *   tags={"Users"},
 *   summary="Delete user (admin)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(name="user", in="path", required=true, @OA\Schema(type="integer"), example=1),
 *   @OA\Response(response=200, description="Deleted"),
 *   @OA\Response(response=401, description="Unauthenticated"),
 *   @OA\Response(response=404, description="Not found")
 * )
 */
    public function destroy(User $user)
    {
        $userDeleted=$this->userService->deleteUser($user);
        return response()->json(['message'=>"User deleted successfully"],200);
    }
    /**
 * @OA\Get(
 *   path="/users/{role}/role",
 *   tags={"Users"},
 *   summary="Get users for role (company)",
 *   security={{"sanctum":{}}},
 *   @OA\Parameter(
 *     name="role",
 *     in="path",
 *     required=true,
 *     @OA\Schema(type="string", enum={"admin","company","student","alumni"}),
 *     example="student"
 *   ),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=400, description="Validation error"),
 *   @OA\Response(response=401, description="Unauthenticated")
 * )
 */
    public function getUsersForRole($role){
        $validator=Validator::make(['role'=>$role],[
            'role'=> 'required|in:admin,company,student,alumni',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $users=$this->userService->getUsersByRole($role,10);
        return response()->json(['users'=>UserResource::collection($users),"message"=>"Users for role $role founded successfully "],200);
    }
    public function me(Request $request){
        $user=$this->userService->getUserById($request->user()->id);
        return response()->json(['user'=>new UserResource($user)],200);
    }

}
