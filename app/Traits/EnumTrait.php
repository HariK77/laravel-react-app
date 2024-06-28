<?php


namespace App\Traits;

trait EnumTrait
{
    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
