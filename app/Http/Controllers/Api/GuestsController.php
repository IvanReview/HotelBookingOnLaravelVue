<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateGuestRequest;
use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GuestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $itemOnPage = $request->items_on_page ? $request->items_on_page : 8;

        $guests = Guest::paginate($itemOnPage);

        return response()->json($guests,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
     * @param Guest $guest
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateGuestRequest $request, Guest $guest)
    {
        $data = $request->all();


        $success = $guest->update($data);
        if ($success){
            return response()->json($guest, 200);
        }else {
            return response()->json(['message'=>'Ошибка при обновлении данных гостя'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Guest $guest
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Guest $guest)
    {
        if ($guest->delete()) {
            $success = "Удаление успешно!";
        } else{
            $success =  "Errrorr!!";
        }

        return response()->json(['data' => $success]);
    }
}
