<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Resources\PlaceResource;
use Illuminate\Http\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PlaceController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return PlaceResource::collection(Place::where('hall_id', $request->get('hallID'))->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        Place::where('hall_id', $request->input('hallId'))
            ->where('seat_id', $request->input('idSeat'))
            ->update(['status' => $request->input('type')]);

        if ($request->input('type')==3){
            $id = Ticket::create([
                'hall' => $request->input('hall'),
                'film' => $request->input('fill'),
                'datetime'=>$request->input('datetime'),
                'seat'=>$request->input('idSeat')
            ])->id;

            $png = QrCode::format('png')->size(256)->generate('/ticket/'.$id);
            Place::where('id', $id)
                ->update(['qrcode_image' => base64_encode($png)]);
            return Response::json(['data'=>['id'=>$id]]);
        }
    }

}
