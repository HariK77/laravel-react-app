<?php

namespace App\Http\Controllers\Api;

use App\Models\VideoTrack;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Video\GetVideoRequest;
use App\Http\Requests\Video\GetAllVideoRequest;
use App\Http\Resources\Video\VideoTrackResource;

class VideoController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetAllVideoRequest $request)
    {
        return response()->json(VideoTrack::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        // return $this->processResult($service->setRequest($request)->actOn());
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, VideoTrack $videoTrack)
    {
        return $this->sendResponse(new VideoTrackResource($videoTrack));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VideoTrack $VideoTrack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoTrack $VideoTrack)
    {
        //
    }
}
