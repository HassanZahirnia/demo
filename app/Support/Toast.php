<?php

namespace App\Support;

use App\Data\Notification\ToastData;
use App\Enums\ToastType;

final class Toast
{
    public string $message = '';
    public ToastType $type = ToastType::Warning;

    public function show(): self
    {
        session()->flash('toasts', [
            ...session()->get('toasts', []),
            ToastData::from([
                'message' => $this->message,
                'type' => $this->type,
            ]),
        ]);

        return $this;
    }

    public function success(): self
    {
        $this->type = ToastType::Success;

        return $this;
    }

    public function warning(): self
    {
        $this->type = ToastType::Warning;

        return $this;
    }

    public function error(): self
    {
        $this->type = ToastType::Error;

        return $this;
    }

    public function info(): self
    {
        $this->type = ToastType::Info;

        return $this;
    }

    public function message(string $message = ''): self
    {
        $this->message = $message;

        return $this;
    }
}
