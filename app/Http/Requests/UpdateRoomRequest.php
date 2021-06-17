<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
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
            'name' => 'required|min:3|unique:rooms,name,' . $this->room->id,
            'price' => 'required|numeric',
            'amount_guests'  => 'required|numeric',
            'comfort_level' => 'required|string',
        ];
    }

    public function attributes()
    {
        return [
            'name'                  => 'Имя',
            'price'                 => 'Цена',
            'amount_guests'         => 'Количество гостей',
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
