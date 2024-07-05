<?php

namespace App\Http\Controllers\Api\Video;

use App\Helpers\FileUploadHelper;
use App\Models\VideoAlbum;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Video\VideoAlbumResource;
use App\Services\Video\Albums\StoreVideoAlbumService;
use App\Http\Requests\Video\Albums\StoreVideoAlbumRequest;
use App\Http\Requests\Video\Albums\UpdateVideoAlbumRequest;
use App\Services\Video\Albums\UpdateVideoAlbumService;

class VideoAlbumController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sendResponse(
            VideoAlbumResource::collection(VideoAlbum::all())
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoAlbumRequest $request, StoreVideoAlbumService $service): JsonResponse
    {
        return $this->processResult($service->setRequest($request)->process());
    }

    /**
     * Display the specified resource.
     */
    public function show(VideoAlbum $videoAlbum)
    {
        return $this->sendResponse(
            new VideoAlbumResource($videoAlbum)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateVideoAlbumRequest $request,
        VideoAlbum $videoAlbum,
        UpdateVideoAlbumService $service
    ) {
        return $this->processResult($service->setRequest($request)->setVideoAlbum($videoAlbum)->process());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoAlbum $videoAlbum)
    {
        FileUploadHelper::fileDelete($videoAlbum->thumbnail);
        $videoAlbum->delete();

        return $this->sendResponse(
            [],
            'Video album deleted successfully.'
        );
    }
}
