<?php

namespace App\Data\Notification;

use App\Enums\ToastType;
use Spatie\LaravelData\Data;

final class ToastData extends Data
{
    public string $id;

    public function __construct(
        public readonly string $message,
        public readonly ToastType $type,
    ) {
        $this->id = str()->orderedUuid();
    }
}
