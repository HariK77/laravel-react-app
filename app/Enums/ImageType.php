<?php

namespace App\Enums;

use App\Traits\EnumTrait;

enum ImageType: string
{
    use EnumTrait;

    case JPEG = 'jpeg';
    case JPG = 'jpg';
    case PNG = 'png';
}
