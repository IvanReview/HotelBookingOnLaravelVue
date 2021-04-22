<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'                   => 'required|string|max:255',
            'email'                  => 'required|string|email|unique:users',
            'password'               => 'min:6|string|confirmed',
            'password_confirmation'  => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'name'                  => 'Имя',
            'email'                 => 'E-mail',
            'password'              => 'Пароль',
            'password_confirmation' => 'Подтверждение пароля'
        ];
    }

    public function messages()
    {
        return [
            'required'     =>  'Поле :attribute обязательно для заполнения',
            'min'          =>  'Поле :attribute должно иметь минимум :min символа',
            'unique'       =>  'Поле :attribute должно быть уникальным',
            'email'        =>  'Поле :attribute должно быть валидным :attribute адресом',
            'confirmed'    =>  'Пароли должны совпадать'
        ];
    }
}
