<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Gallery;
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

        $rooms = Room::with('galleryImages')->paginate($itemOnPage);

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
     * Сохранить созданную комнату
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateRoomRequest $request)
    {
        $data = $request->all();


        //картинка
        $path = $request->file('image')->store('rooms');
        $data['image'] = $path;

        $newRoom = Room::create($data);

        //галлерея
        if (isset($data['gallery_img']) && count($data['gallery_img'])) {
            foreach ($data['gallery_img'] as $key => $imageFile){

                $path = $imageFile->store('rooms');
                $gallery['name'] = $path;

                $newRoom->galleryImages()->create($gallery);
            }

            $newRoom = Room::with('galleryImages')->find($newRoom->id);
        }


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
     * Обновление данных комнаты(номера)
     *
     * @param \Illuminate\Http\Request $request
     * @param Room $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $data = $request->all();

        //загрузка файла главного изображения
        if ($request->hasFile('image')) {
            $request->validate([
                'image'  => 'required|image|mimes:jpeg,png,jpg',
            ]);

            Storage::delete($room->image);
            $path = $request->file('image')->store('rooms');
            $data['image'] = $path;
        }


        //работа с изображениями для галереи
        if (isset($data['gallery_img']) && count($data['gallery_img'])){

            $room_id_not_del = [];
            foreach ($data['gallery_img'] as $imageData){
                //если файл значит новое изобр
                if (is_file($imageData)) {

                    $path = $imageData->store('rooms');
                    $gallery['name'] = $path;

                    $createImage = $room->galleryImages()->create($gallery);
                    $room_id_not_del[] = $createImage['id'];
                }

                //если строка значит старое, возможно что то нужно удалить
                if (is_string($imageData))
                    $room_id_not_del[] = $imageData;
            }

            //выбираем все значения, которых нет в массиве прилетевшем с фронта, их нужно удалить
            $image_for_del = $room->galleryImages()->whereNotIn('id', $room_id_not_del)->get();
            if (count($image_for_del)){
                foreach ($image_for_del as $key => $image){
                    $image->delete();
                    Storage::delete($image->name);
                }
            }

        } else {
            //если массив с галлереей пустой значится все удалили
            $gallery_image_old = $room->galleryImages()->get();
            foreach ($gallery_image_old as $image){
                $image->delete();
                Storage::delete($image->name);
            }
        }

        $success = $room->update($data);

        $room = $room::with('galleryImages')->find($room->id);
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
