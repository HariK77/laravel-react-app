<?php


namespace App\Traits;

trait EnumTrait
{
    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function commaSeperatedString(): string
    {
        return implode(',', array_column(self::cases(), 'value'));
    }
}
