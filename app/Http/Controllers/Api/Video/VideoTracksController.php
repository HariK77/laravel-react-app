<?php

namespace App\Http\Controllers\Api\Video;

use App\Models\VideoTrack;
use App\Helpers\FileUploadHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Video\VideoTrackResource;
use App\Services\Video\Tracks\StoreVideoTrackService;
use App\Services\Video\Tracks\UpdateVideoTrackService;
use App\Http\Requests\Video\Tracks\StoreVideoTrackRequest;
use App\Http\Requests\Video\Tracks\UpdateVideoTrackRequest;

class VideoTracksController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sendResponse(
            VideoTrackResource::collection(VideoTrack::all())
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoTrackRequest $request, StoreVideoTrackService $service)
    {
        return $this->processResult($service->setValidatedData($request->validated())->actOn());
    }

    /**
     * Display the specified resource.
     */
    public function show(VideoTrack $videoTrack)
    {
        return $this->sendResponse(
            new VideoTrackResource($videoTrack)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateVideoTrackRequest $request,
        VideoTrack $videoTrack,
        UpdateVideoTrackService $service
    ) {
        return $this->processResult($service->setValidatedData($request->validated())->setVideoTrack($videoTrack)->actOn());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoTrack $videoTrack)
    {
        FileUploadHelper::fileDelete($videoTrack->thumbnail);
        FileUploadHelper::fileDelete($videoTrack->original_source_url);
        $videoTrack->delete();

        return $this->sendResponse(
            [],
            'Video track deleted successfully.'
        );
    }
}
