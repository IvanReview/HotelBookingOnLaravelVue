<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRoomRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name'          => 'required|string|min:3',
            'surname'       => 'required|string|min:3',
            'phone'         => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'email'         => 'sometimes|nullable|email',
            'passport'      => 'required|numeric',
        ];
    }

    public function attributes(): array
    {
        return [
            'name'       => 'Имя',
            'surname'    => 'Фамилия',
            'phone'      => 'Телефон',
            'passport'   => 'Паспорт',


        ];
    }

    public function messages(): array
    {
        return [
            'required'     =>  'Поле :attribute обязательно для заполнения',
            'min'          =>  'Поле :attribute должно иметь минимум :min символов',
            'unique'       =>  'Поле :attribute должно быть уникальным',
            'numeric'      =>  'Поле :attribute должно быть числом',
        ];
    }
}
