<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Http\Requests\SessionRequest;
use App\Http\Resources\SessionResource;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $sessions = QueryBuilder::for(Session::class)
            ->allowedFilters(['datetime'])
            ->defaultSort('datetime')
            ->get();

        if ($request->input('type') === 'client') {

            $grouped = SessionResource::collection($sessions)
                ->groupBy(['film.name'])->all();

            $res = [];
            foreach ($grouped as $filmName => $items) {

                $halls = [];
                $hallDates = [];

                $description = null;
                $duration = null;

                foreach ($items as $item) {
                    if (!$description) {
                        $description = $item->film->description;
                    }
                    if (!$duration) {
                        $duration = $item->film->duration;
                    }

                    $halls[$item->hall->name] = [];
                    $hallDates[$item->hall->name][] = [
                        'id'=>$item->id,
                        'datetime' => $item->datetime
                    ];
                }

                ksort($halls);

                foreach ($hallDates as $item->hall->name => $dates) {
                    asort($dates);
                    $halls[$item->hall->name] = [
                        'hallName' => $item->hall->name,
                        'dates' => $dates
                    ];
                }

                $res[$filmName] = [
                    'film' => $filmName,
                    'description' => $description,
                    'duration' => $duration,
                    'halls' => array_values($halls)
                ];
            }

            return response()->json($res);
        }

        $grouped = SessionResource::collection($sessions)
            ->groupBy('hall.name')->all();

        $res = [];
        foreach ($grouped as $key => $items) {
            $data = [];
            foreach ($items as $item) {
                $data[] = [
                    'film' => $item->film->name,
                    'datetime' => $item->datetime,
                    'duration' => $item->film->duration,
                ];
            }
            $res[$key] = [
                'hallName' => $key,
                'data' => $data
            ];
        }

        $res = array_values($res);

        return response()->json($res);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SessionRequest $request)
    {
        $session = Session::firstOrCreate([
            'datetime' => $request->datetime,
            'hall_id' => $request->hallId,
        ], [
            'film_id' => $request->filmId,
        ]);
        return new SessionResource($session);
    }

    /**
     * Display the specified resource.
     */
    public function show(Session $session)
    {
        return new SessionResource($session);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SessionRequest $request, SessionResource $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionResource $session)
    {
        //
    }
}
