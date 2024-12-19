module TicTacToe exposing (main)
-- import Browser
-- import Html exposing (Html, Attribute, div, input, text, h1)
-- import Html.Attributes exposing (..)
-- import Html.Events exposing (onInput)



-- MAIN

-- main =
--   Browser.sandbox { init = init, update = update, view = view }
-- 
-- -- MODEL
-- 
-- type Piece
--     = Empty
--     | X
--     | O
-- 
-- type alias Model =
--     { board : List Piece
--     }
--     
--     
-- init : Model
-- init =
--     { board = List.repeat 9 Empty 
--     }
-- 
-- -- UPDATE
-- 
-- 
-- type Msg
--   = PlacePiece Int Int Piece -- Y X Piece
-- 
-- 
-- update : Msg -> Model -> Model
-- update msg model =
--   case msg of
--       PlacePiece row column p ->
--           model
-- 
-- 
-- 
-- -- VIEW
-- 
-- 
-- view : Model -> Html Msg
-- view model =
--   div []
--     [ h1 [] [text "Testing 123 123" ] 
--     , div [] [ text "hai" ] 
--     ]

import Browser
import Browser.Events exposing (onAnimationFrameDelta)
import Canvas exposing (rect, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (rotate, transform, translate)
import Color
import Html exposing (Html, div)
import Html.Attributes exposing (style)


type alias Model =
    { count : Float }


type Msg
    = Frame Float


main : Program () Model Msg
main =
    Browser.element
        { init = \() -> ( { count = 0 }, Cmd.none )
        , view = view
        , update =
            \msg model ->
                case msg of
                    Frame _ ->
                        ( { model | count = model.count + 1 }, Cmd.none )
        , subscriptions = \model -> onAnimationFrameDelta Frame
        }


width =
    400


height =
    400


centerX =
    width / 2


centerY =
    height / 2


view : Model -> Html Msg
view { count } =
    div
        [ style "display" "flex"
        , style "justify-content" "center"
        , style "align-items" "center"
        ]
        [ Canvas.toHtml
            ( width, height )
            [ style "border" "10px solid rgba(0,0,0,0.1)" ]
            [ clearScreen
            , render count
            ]
        ]


clearScreen =
    shapes [ fill Color.white ] [ rect ( 0, 0 ) width height ]


render count =
    let
        size =
            width / 3

        x =
            -(size / 2)

        y =
            -(size / 2)

        rotation =
            degrees (count * 3)

        hue =
            toFloat (count / 4 |> floor |> modBy 100) / 100
    in
    shapes
        [ transform
            [ translate centerX centerY
            , rotate rotation
            ]
        , fill (Color.hsl hue 0.3 0.7)
        ]
        [ rect ( x, y ) size size ]
