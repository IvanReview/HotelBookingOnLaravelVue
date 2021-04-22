<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Guest;
use App\Models\Room;
use Illuminate\Http\Request;

class MainController extends Controller
{
    /**
     * Отображение найденых номеров на главной странице
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->all();

        if (isset($data['dateStart']) && isset($data['dateEnd'])){
            //находим занятые номера на текущие даты и исключаем из выдачи
            $booking = Booking::where('date_start', '<', $data['dateStart'])
                        ->where('date_end', '>', $data['dateStart'])
                        ->orWhere('date_start', '<', $data['dateEnd'])
                        ->where('date_end', '>', $data['dateEnd'])
                        ->orWhereBetween('date_start', [$data['dateStart'],$data['dateEnd']])
                        ->get();

            $except = [];
            foreach ($booking as $key => $item){
                $except[] = $item->room_id;
            };

            $rooms = Room::whereNotIn('id', $except)
                    ->where('amount_guests', '>=', $data['guestAmount'])
                    ->get()
                    ->groupBy('comfort_level');
        } else {
            $rooms = Room::get()->groupBy('comfort_level');
        }

        return response()->json($rooms,  200);
    }


    /**
     * Получить данные из формы и забронировать
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function bookingRoom(Request $request, Guest $guest): \Illuminate\Http\JsonResponse
    {
        $dataAll = $request->all();

        $newGuest = $guest->create($dataAll);

        $data['guest_id'] = $newGuest['id'];
        $data['room_id'] =  $dataAll['room_id'];
        $data['date_start'] = $dataAll['date_start'];
        $data['date_end'] = $dataAll['date_end'];

        $success = Booking::create($data);

        if ($success) {
            return response()->json(['data' => "Бронь успешна!"]);
        } else {
            return response()->json(['data' => "Чето пошло не так!!"]);
        }

    }
}
