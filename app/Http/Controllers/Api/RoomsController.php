<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $itemOnPage = $request->items_on_page ? $request->items_on_page : 5;

        $rooms = Room::paginate($itemOnPage);

        return response()->json($rooms,200);

    }

    /**
     * Получить все комнаты
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllRooms(Request $request): \Illuminate\Http\JsonResponse
    {
        $rooms = Room::get();

        return response()->json($rooms,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateRoomRequest $request)
    {
        $data = $request->all();

        //картинка
        $path = $request->file('image')->store('products');
        $data['image'] = $path;

        $newRoom = Room::create($data);

        if ($newRoom){

            return response()->json($newRoom, 200);
        } else{
            return response()->json($newRoom, 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Room $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $data = $request->all();

        //загрузка файла
        if ($request->hasFile('image')) {
            $request->validate([
                'image'  => 'required|image|mimes:jpeg,png,jpg',
            ]);

            Storage::delete($room->image);
            $path = $request->file('image')->store('rooms');
            $data['image'] = $path;
        }

        $success = $room->update($data);
         if ($success){

             return response()->json($room, 200);
         }else {
             return response()->json(['message'=>'Ошибка при обновлении продукта'], 500);
         }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Room $room)
    {
        if ($room->delete()) {
            $success = "Удаление успешно!";
        } else{
            $success =  "Errrorr!!";
        }

        return response()->json(['data' => $success]);
    }
}
