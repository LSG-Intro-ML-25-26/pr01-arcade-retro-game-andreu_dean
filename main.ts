namespace SpriteKind {
    export const Mapa = SpriteKind.create()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mini_mapa = minimap.minimap(MinimapScale.Half, 2, 0)
    enemigo = sprites.create(minimap.getImage(mini_mapa), SpriteKind.Mapa)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let enemigo: Sprite = null
let mini_mapa: minimap.Minimap = null
let nena: Sprite = null
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
tiles.placeOnRandomTile(nena, assets.tile`miMosaico9`)
controller.moveSprite(nena)
tiles.setCurrentTilemap(tilemap`nivel1`)
scene.cameraFollowSprite(nena)
