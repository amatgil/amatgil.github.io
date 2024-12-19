module TicTacToe exposing (main)
import Browser
import Browser.Events exposing (onAnimationFrameDelta)
import Canvas exposing (rect, shapes, circle, lineTo, moveTo, path, Point)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (rotate, transform, translate)
import Color
import Dict
import Html exposing (Html, div, h1, text)
import Html.Attributes exposing (style)
import Catppuccin.Macchiato


 -- MODEL
 
type Piece
    = Empty
    | X
    | O

type alias Model =
    { board : List Piece }
     
-- UPDATE


type Msg
  = PlacePiece Int Int Piece -- Y X Piece

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
      PlacePiece row column p ->
          (model, Cmd.none)




main : Program () Model Msg
main =
    Browser.element
        { init =  \() -> ({ board = List.repeat 9 Empty }, Cmd.none)
        , subscriptions = subscriptions
        , view = view
        , update = update
        }


width : number
width =
    800


height : number
height =
    width

centerX : Float
centerX =
    width / 2


centerY : Float
centerY =
    height / 2


view : Model -> Html Msg
view model =
    div
        [ style "justify-content" "center"
        , style "align-items" "center"
        ]
        [ h1 [ ] [ text "Tres en Ratlla" ]
        , Canvas.toHtml
            ( width, height )
            [ style "border" "10px solid rgba(0,0,0,0.1)" ]
            [ clearScreen
            , renderGrid
            , render model
            ]
        ]


clearScreen : Canvas.Renderable
clearScreen =
    shapes [ fill (Catppuccin.Macchiato.subtext0) ] [ rect ( 0, 0 ) width height ]

renderGrid : Canvas.Renderable
renderGrid =
    let
        padProp = 0.95
        padWidthMin = width * (1 - padProp)
        padHeightMin = height * (1 - padProp)
        padWidthMax = width * padProp
        padHeightMax = height * padProp
    in
    shapes
        []
        [ path ( 1 * width/3, padHeightMin) [ lineTo (1 * width/3, padHeightMax)]
        , path ( 2 * width/3, padHeightMin) [ lineTo (2 * width/3, padHeightMax)]
        , path ( padWidthMin, 1 * height/3 ) [ lineTo (padWidthMax, 1 * height/3 )]
        , path ( padWidthMin, 2 * height/3 ) [ lineTo (padWidthMax, 2 * height/3 )]
        ]

crossShape : Point -> Float -> Float -> Canvas.Shape
crossShape topleft w h =
    let
        pad = 0.9
        trueLeft = (Tuple.first topleft)
        trueTop = (Tuple.second topleft)
        left = trueLeft + (w * (1 - pad))
        top = trueTop + (h * (1 - pad))
        right = trueLeft + (w * pad)
        bottom = trueTop + (h * pad)
    in
    path (left, top)
        [ lineTo (right, bottom)
        , moveTo (left, bottom)
        , lineTo (right, top)
        ]

circleShape : Point -> Float -> Float -> Canvas.Shape
circleShape topleft w h =
    let
        pad = 0.9
        trueLeft = (Tuple.first topleft)
        trueTop = (Tuple.second topleft)
        center_horizontal = trueLeft + w / 2
        center_vertical = trueTop + h / 2
    in
        circle (center_horizontal, center_vertical) (w*pad / 2)
        
render : Model -> Canvas.Renderable
render { board } =
    let
        wThird = (toFloat width) / 3.0
        hThird = (toFloat height) / 3.0
    in
    shapes
        []
        [ crossShape (wThird, 0) wThird hThird
        , circleShape (0, hThird) wThird hThird
        ]

-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none
