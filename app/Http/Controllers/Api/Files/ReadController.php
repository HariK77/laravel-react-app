<?php

namespace App\Http\Controllers\Api\Files;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use ProtoneMedia\LaravelFFMpeg\FFMpeg\FFProbe;

class ReadController extends ApiController
{
    public function index()
    {
        try {
            $directories = Storage::disk('music')->directories('app/source/FLAC');
            $data = [];

            foreach ($directories as $key => $directory) {
                $filePaths = Storage::disk('music')->files($directory);
                $album = [];
                foreach ($filePaths as $key => $filePath) {
                    if (Str::contains($filePath, '.flac')) {
                        $properties = FFProbe::create()->format(Storage::disk('music')->path('/' . $filePath))->all();
                        $fileData = FFProbe::create()->streams(Storage::disk('music')->path('/' . $filePath))->all();
                        $trackDetails = [
                            'folderPath' => $filePath,
                            'track' => pathinfo($filePath)['filename'],
                            'codec_name' => $fileData[0]->get('codec_name'),
                            'sample_rate' => $fileData[0]->get('sample_rate'),
                            'channels' => $fileData[0]->get('channels'),
                            'bits_per_sample' => $fileData[0]->get('bits_per_sample'),
                            'duration_in_sec' => $fileData[0]->get('duration'),
                            'bit_rate' => $fileData[0]->get('bit_rate')
                        ];
                        $album[] = [...$trackDetails, ...$properties];
                    }
                }
                $data[] = $album;
            }
            return $this->sendResponse($data);
        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage(), 500, [$th]);
        }
    }
}
