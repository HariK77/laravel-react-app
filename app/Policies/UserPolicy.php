<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the given profile data can be updated by the user.
     */
    public function update(User $user, $args): bool
    {
        return $user->id === $args['id'];
    }
}
