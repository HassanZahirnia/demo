<?php

namespace App\Data\Hybridly;

use App\Data\Notification\ToastData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class SharedData extends Data
{
    public function __construct(
        public readonly SecurityData $security,
        #[DataCollectionOf(ToastData::class)]
        public readonly ?DataCollection $toasts,
    ) {
    }
}
