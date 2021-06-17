<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoomRequest extends FormRequest
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
            'name' => 'required|min:3|unique:rooms,name',
            'price' => 'required|numeric',
            'amount_guests'  => 'required|numeric',
            'comfort_level' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg',
        ];
    }

    public function attributes()
    {
        return [
            'name'              => 'Имя',
            'price'             => 'Цена',
            'amount_guests'     => 'Количество гостей',
            'comfort_level'     => 'Уровень комфортности',
            'image'             => 'Изображение'
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
