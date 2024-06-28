<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class UploadHelper
{
    public static function fileUpload(string $path, UploadedFile $file): ?string
    {
        $filenameWithExt = $file->getClientOriginalName();
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $fileName = $filename . '_' . time() . '.' . $file->getClientOriginalExtension();
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
