<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    /**
     * Регистрация пользователя
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRequest $request)
    {

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password =  bcrypt($request->password);

        if ($user->save()){
            return response()->json(['message'=>'Пользователь создан успешно!'], 201);
        } else{
            return response()->json(['message'=>'Ошибка при создании пользователя!'], 500);
        }
    }


    /**
     * Авторизация
     *
     * @param LoginRequest $request
     * @return mixed
     * @throws ValidationException
     */
    public function login(LoginRequest $request)
    {

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'loginFail' => ['Предоставленные учетные данные неверны'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'user'          =>  $user,
            'access_token'  =>  $token,
            'token_type'    =>  'Bearer',
        ],200);
    }


    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request...
        $request->user()->currentAccessToken()->delete();

        return response()->json(['msg'=> 'Выход из профиля произведен успешно'],200);

    }
}
