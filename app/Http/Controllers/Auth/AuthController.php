<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\UserResource;
use App\Http\Service\CompanyService;
use App\Http\Service\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;


class AuthController extends Controller
{
    protected UserService $userService;
    protected CompanyService $companyService;
    public function __construct(UserService $userService, CompanyService $companyService){
        $this->userService = $userService;
        $this->companyService = $companyService;
    }
    /**
 * @OA\Post(
 *   path="/login",
 *   tags={"Auth"},
 *   summary="Login",
 *   description="Vraca user resurs i Sanctum token.",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"email","password"},
 *       @OA\Property(property="email", type="string", format="email", example="milan@mail.com"),
 *       @OA\Property(property="password", type="string", format="password", example="secret12345")
 *     )
 *   ),
 *   @OA\Response(response=200, description="OK"),
 *   @OA\Response(response=400, description="Validation failed"),
 *   @OA\Response(response=401, description="Invalid credentials")
 * )
 */
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user=$this->userService->getUserByEmail($request->email);
        if(!$user||!Hash::check($request->password,$user->password)){
            return response()->json(['message' => 'The provided credentials are incorrect.'],401);
        }
        $token=$user->createToken('authToken')->plainTextToken;
        return response()->json(['user'=>new UserResource($user),'token'=>$token],200);

    }
    /**
 * @OA\Post(
 *   path="/register",
 *   tags={"Auth"},
 *   summary="Register",
 *   description="Registracija korisnika. Ako je role=company, zahteva dodatna polja za kompaniju.",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"name","email","password","role"},
 *       @OA\Property(property="name", type="string", example="Milan"),
 *       @OA\Property(property="email", type="string", format="email", example="milan@mail.com"),
 *       @OA\Property(property="password", type="string", format="password", minLength=8, example="secret12345"),
 *       @OA\Property(property="role", type="string", enum={"admin","company","student","alumni"}, example="student"),
 *
 *       @OA\Property(property="phone", type="string", nullable=true, example="+38164111222"),
 *       @OA\Property(property="address", type="string", nullable=true, example="Beograd"),
 *       @OA\Property(property="description", type="string", nullable=true, example="Opis kompanije"),
 *       @OA\Property(property="company_name", type="string", nullable=true, example="My Company d.o.o.")
 *     )
 *   ),
 *   @OA\Response(response=201, description="Created"),
 *   @OA\Response(response=400, description="Validation failed")
 * )
 */
    public function register(Request $request){
        $validator=Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|string|min:8',
            'phone'=>'required_if:role,company|unique:companies',
            'address'=>'required_if:role,company',
            'description'=>'required_if:role,company',
            'role'=> 'required|in:admin,company,student,alumni',
            'company_name'=>'required_if:role,company',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $user=$this->userService->addUser($request);
        if($request->role ==='company'){
            $company=$this->companyService->addCompany($request,$user->id);
        }
        $token=$user->createToken('authToken')->plainTextToken;
        return response()->json(['user'=>new UserResource($user),'token'=>$token],201);
    }

}
