<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;


class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [

          'title','description','content','image','published_at','category_id','user_id'

    ];

    public function getImageAttribute($image)
    {

        return asset($image);

    }

    public function category()
    {

        return $this->belongsTo(Category::class);

    }

    public function tags()
    {

        return $this->belongsToMany(Tag::class);

    }

    public function hasTag($tagId)
    {

        return in_array($tagId,$this->tags->pluck('id')->toArray());

    }

    public function user()
    {

        return $this->belongsTo(User::class);

    }

    public function scopeSearched($query)
    {

        $search = request()->query('search');

        if(!$search) {

            return $query;

        }

        return $query->where('title','LIKE',"%{$search}%");

    }

}
