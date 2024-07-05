<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class FileHelper
{
    public static function fileUpload(string $path, UploadedFile $file): ?string
    {
        $filenameWithExt = $file->getClientOriginalName();
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $fileName = preg_replace('/[-\s]+/', '_', trim($filename)) . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path($path), $fileName);

        return $path . '/' . $fileName;
    }

    public static function multipleFileUpload(string $path, array $files): array
    {
        $filePaths = [];

        foreach ($files as $file) {
            $filePaths[] = self::fileUpload($path, $file);
        }

        return $filePaths;
    }

    public static function multipleFileDelete(string $path, array $files): void
    {
        foreach ($files as $file) {
            $filePaths[] = self::fileDelete($path, $file);
        }
    }

    public static function fileDelete(string $filePath): void
    {
        if (file_exists(public_path($filePath))) {
            unlink(public_path($filePath));
        }
    }
}


// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Storage;
// use ProtoneMedia\LaravelFFMpeg\FFMpeg\FFProbe;
// use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

// $directories = Storage::disk('videos')->directories('Movies');
//         // dd($directories);
//         $data = [];

//         foreach ($directories as $key => $directory) {
//             $filePaths = Storage::disk('videos')->files($directory);
//             foreach ($filePaths as $key => $filePath) {
//                 if (Str::contains($filePath, '.mkv')) {
//                     $data[] = FFProbe::create()->streams(Storage::disk('videos')->path('/'.$filePath))->all();
//                 }
//             }
//         }
//         dd($data);
