<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;
use App\Http\Requests\FilmRequest;
use App\Http\Resources\FilmResource;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FilmResource::collection(Film::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FilmRequest $request)
    {
        $film = Film::create($request->validated());

        return new FilmResource($film);
    }

    /**
     * Display the specified resource.
     */
    public function show(Film $film)
    {
        return new FilmResource($film);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FilmRequest $request, Film $film)
    {
        $film->update($request->validated());

        return new FilmResource($film);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Film $film)
    {
        $film->delete();

        return response()->noContent();
    }
}
