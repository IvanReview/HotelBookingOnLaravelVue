<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRoomRequest extends FormRequest
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
            'dateStart'     => 'required|date|date_format:Y-m-d',
            'dateEnd'       => 'required|date|date_format:Y-m-d',
            'guestAmount'   => 'required|numeric',
            'comfortLevel'  => 'required|string',
        ];
    }

    public function attributes()
    {
        return [
            'dateStart'       => 'Дата заезда',
            'dateEnd'         => 'Дата выезда',
            'guestAmount'     => 'Количество гостей',
            'comfortLevel'    => 'Уровень комфортности',

        ];
    }

    public function messages()
    {
        return [
            'required'     =>  'Поле :attribute обязательно для заполнения',
            'min'          =>  'Поле :attribute должно иметь минимум :min символа',
            'unique'       =>  'Поле :attribute должно быть уникальным',
            'numeric'      =>  'Поле :attribute должно быть числом',
        ];
    }
}
