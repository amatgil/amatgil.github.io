module TicTacToe exposing (..)
import Browser
import Html exposing (Html, Attribute, div, input, text, h1)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)



-- MAIN

main =
  Browser.sandbox { init = init, update = update, view = view }

-- MODEL

type Piece
    = Empty
    | X
    | O

type alias Model =
    { board : List Piece
    }
    
    
init : Model
init =
    { board = List.repeat 9 Empty 
    }

-- UPDATE


type Msg
  = PlacePiece Int Int Piece -- Y X Piece


update : Msg -> Model -> Model
update msg model =
  case msg of
      PlacePiece row column p ->
          model



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h1 [] [text "Tres en Ratlla" ] 
    , div [] [ text "hai" ] 
    ]
