<?php

namespace App\Http\Controllers\Api\Video;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Video\Conversion\ConvertVideoTrackRequest;
use App\Services\Video\Conversion\ConvertVideoTrackService;

class ConversionController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ConvertVideoTrackRequest $request, ConvertVideoTrackService $service)
    {
        return $this->processResult($service->setvideoTrackId($request->validated('track_id'))->process());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
