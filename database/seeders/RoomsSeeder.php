<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use  Illuminate\Support\Facades\DB;


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
                'name' => 'Номер №10',
                'amount_guests' => '2',
                'price' => '4000',
                'comfort_level' => 'Эконом',
                'image' => 'images/1.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №12',
                'amount_guests' => '2',
                'price' => '4000',
                'comfort_level' => 'Эконом',
                'image' => 'images/2.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №13',
                'amount_guests' => '2',
                'price' => '3000',
                'comfort_level' => 'Стандарт',
                'image' => 'images/3.jpeg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №14',
                'amount_guests' => '2',
                'price' => '3000',
                'comfort_level' => 'Стандарт',
                'image' => 'images/4.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №15',
                'amount_guests' => '3',
                'price' => '5000',
                'comfort_level' => 'Апартамент',
                'image' => 'images/5.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №16',
                'amount_guests' => '4',
                'price' => '6000',
                'comfort_level' => 'Люкс',
                'image' => 'images/6.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №17',
                'amount_guests' => '4',
                'price' => '6000',
                'comfort_level' => 'Люкс',
                'image' => 'images/7.jpg',
                "created_at" => Carbon::now()
            ],
            [
                'name' => 'Номер №18',
                'amount_guests' => '4',
                'price' => '8000',
                'comfort_level' => 'Студия',
                'image' => 'images/9.jpg',
                "created_at" => Carbon::now()
            ],
        ]);
    }
}
