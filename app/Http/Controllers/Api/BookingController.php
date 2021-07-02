<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRoomRequest;
use App\Http\Requests\SearchRoomRequest;
use App\Models\Booking;
use App\Models\Guest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{

    /**
     * Отобразить данные брони
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $status = $request->input('status');

        $itemOnPage = $request->items_on_page ? $request->items_on_page : 8;

        $bookingQuery = Booking::with(['room', 'guest']);
        if($request->filled('sort_params')){
            switch ($request->sort_params){
                case 0:
                    $bookingQuery->orderBy('created_at', 'DESC');
                    break;
                case 1:
                    $bookingQuery->orderBy('created_at', 'ASC');
                    break;
                case 2:
                    $bookingQuery->orderBy('status', 'DESC');
                    break;
                case 3:
                    $bookingQuery->orderBy('status', 'ASC');
                    break;
            }

        }

        /*if ( $status === "0") {
            // status - скоуп
            $bookingData = Booking::status()->get();
            return response()->json($bookingData);
        }*/

        $bookingData = $bookingQuery->orderBy('created_at', 'DESC')->paginate($itemOnPage);
        return response()->json($bookingData);

    }

    /**
     * Поиск номеров в админке для бронирования
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchRoom(SearchRoomRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->all();

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

        if($data['comfortLevel'] === 'Все категории')  {
            $data['comfortLevel'] = '';
            $operand = '<>';
        } else {
            $operand = '=';
        }

        $rooms = Room::whereNotIn('id', $except)
                ->where('amount_guests', '>=', $data['guestAmount'])
                ->where('comfort_level', $operand, $data['comfortLevel'])
                ->get()
                ->groupBy('comfort_level');


        return response()->json($rooms, 200);
    }


    /**
     * Сохранить бронь
     *
     * @param Request $request
     * @param Guest $guest
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(BookingRoomRequest $request, Guest $guest)
    {
        $dataAll = $request->all();

        $newGuest = $guest->create($dataAll);

        $dataAll['guest_id'] = $newGuest['id'];
        $dataAll['status'] = 1;

        $newBooking = Booking::create($dataAll);
        $finalBook = $newBooking::with(['room', 'guest'])->find($newBooking->id);

        return response()->json( $finalBook, 200);
    }


    /**
     * Обновление данных брони
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(BookingRoomRequest $request, Booking $booking): \Illuminate\Http\JsonResponse
    {
        $data = $request->all();

        $guest = Guest::find($data['guest_id']);
        $success_update_guest = $guest->update($data);


        if ($data['date_start'] !== $booking->date_start) {

            if ($data['date_start'] < date("Y-m-d")) {
                throw ValidationException::withMessages([
                    'bookingFailStart' => ['Дата брони не может быть меньше текущей даты'],
                ]);
            }

            //Передвинуть дату заезда
            if ($booking->date_start < $data['date_start'] && $data['date_start'] < $booking->date_end){
                $booking->update(['date_start' => $data['date_start']]);
            }
            
            if ($booking->date_start > $data['date_start']) {
                $result = Booking::where('room_id', $data['room_id'])
                    ->where('id', '<>', $data['booking_id'])
                    ->where('date_end', '>' ,$data['date_start'])
                    ->where('date_end', '<' ,$data['date_end'])
                    ->get();


                if (!count($result)) {
                    $booking->update(['date_end' => $data['date_end']]);
                } else {
                    throw ValidationException::withMessages([
                        'bookingFailStart' => ['Невозможно пекренести бронь на текущую дату'],
                    ]);
                }
            }
        }

        //Передвинуть дату выезда
        if ($booking->date_end > $data['date_end'] && $data['date_end'] > $booking->date_start){

            $booking->update(['date_end' => $data['date_end']]);
        }

        if ($booking->date_end < $data['date_end']) {

            $result = Booking::where('room_id', $data['room_id'])
                            ->where('id', '<>', $data['booking_id'])
                            ->where('date_start', '<' ,$data['date_end'])
                            ->where('date_end', '>' ,$data['date_start'])
                            ->get();


            if (!count($result)) {
                $booking->update(['date_end' => $data['date_end']]);
            } else {
                throw ValidationException::withMessages([
                    'bookingFail' => ['Невозможно продлить бронь до текущей даты'],
                ]);
            }
        }

        $success = $booking->update($data);
        $bookingEnd = $booking::with(['room', 'guest'])->find($booking->id);


        if ($success) {
            return response()->json($bookingEnd);
        } else {
            return response()->json(['data' => "Ошибка при обновлении"]);
        }

    }

    /**
     * Удалить бронь
     *
     * @param Booking $booking
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Booking $booking): \Illuminate\Http\JsonResponse
    {

        if ($booking->delete()) {
            $success = "Удаление успешно!";
        } else{
            $success =  "Errrorr!!";
        }

        return response()->json(['data' => $success]);

    }
}
