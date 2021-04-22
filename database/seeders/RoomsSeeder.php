<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rooms')->insert([
            [
                'name' => 'Номер №1',
                'amount_guests' => '2',
                'price' => '4000',
                'comfort_level' => 'Эконом',
                'image' => '',
            ],
            [
                'name' => 'Номер №2',
                'amount_guests' => '2',
                'price' => '4000',
                'comfort_level' => 'Эконом',
                'image' => '',
            ],
            [
                'name' => 'Номер №3',
                'amount_guests' => '2',
                'price' => '3000',
                'comfort_level' => 'Стандарт',
                'image' => '',
            ],
            [
                'name' => 'Номер №4',
                'amount_guests' => '2',
                'price' => '3000',
                'comfort_level' => 'Стандарт',
                'image' => '',
            ],
            [
                'name' => 'Номер №5',
                'amount_guests' => '3',
                'price' => '5000',
                'comfort_level' => 'Апартамент',
                'image' => '',
            ],
            [
                'name' => 'Номер №6',
                'amount_guests' => '4',
                'price' => '6000',
                'comfort_level' => 'Люкс',
                'image' => '',
            ],
            [
                'name' => 'Номер №7',
                'amount_guests' => '4',
                'price' => '6000',
                'comfort_level' => 'Люкс',
                'image' => '',
            ],
            [
                'name' => 'Номер №8',
                'amount_guests' => '4',
                'price' => '8000',
                'comfort_level' => 'Студия',
                'image' => '',
            ],
        ]);
    }
}
