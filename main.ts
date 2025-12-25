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
    ventana_mini_mapa = sprites.create(minimap.getImage(mini_mapa), SpriteKind.Mapa)
    ventana_mini_mapa.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let ventana_mini_mapa: Sprite = null
let mini_mapa: minimap.Minimap = null
let nena: Sprite = null
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
tiles.placeOnRandomTile(nena, assets.tile`miMosaico9`)
controller.moveSprite(nena)
tiles.setCurrentTilemap(tilemap`nivel1`)
scene.cameraFollowSprite(nena)
