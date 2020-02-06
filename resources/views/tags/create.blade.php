@extends('layouts.app')


@section('content')

 <div class="card card-default">

      <div class="card-header">

          {{ isset($tag) ? 'Edit Tag' : 'Create Tag' }}

      </div>

      <div class="card-body">

        <!-- @if($errors->any())

            <div class="alert alert-danger">

                <ul class="list-group">

                    @foreach($errors->all() as $error)

                        <li class="list-group-item text-danger">

                            {{ $error }}

                        </li>

                    @endforeach

                </ul>

            </div>

          @endif -->

        <form action="{{ isset($tag) ? route('tags.update', $tag->id) : route('tags.store') }}" method="Post">

          @csrf

              @if(isset($tag))

                  @method('PUT')

              @endif

            <div class="form-group">

                <label for="name">Name</label>

                @if($errors->any())

                    <div>

                        <input type="text" id="name" class="form-control is-invalid" name="name">

                          @foreach($errors->all() as $error)

                        <div class="invalid-feedback">

                          <strong>  {{ $error }}    </strong>

                        </div>

                        @endforeach

                    </div>

                @else

                  <input type="text" id="name" class="form-control" name="name" value="{{ isset($tag) ? $tag->name : " "}}">

                @endif

            </div>

            <div class="form-group">

                <button type="submit" class="btn btn-success">

                    {{ isset($tag) ? 'Update Tag' : 'Add Tag' }}

                </button>

            </div>

        </form>

      </div>

</div>

@endsection
