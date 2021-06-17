<?php


namespace App\Http\Repositories;


class FilterRepositories
{

    private $builder;
    private $request;

    public function __construct($builder, $request)
    {
        $this->builder = $builder;
        $this->request = $request;
    }




}
