<?php

namespace App\Enums;

use App\Traits\EnumTrait;

enum Gender: string
{
    use EnumTrait;

    case MALE = 'Male';
    case FEMALE = 'Female';
    case OTHERS = 'Others';
}
