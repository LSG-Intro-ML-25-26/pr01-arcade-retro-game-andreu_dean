namespace SpriteKind {
    export const Mapa = SpriteKind.create()
    export const Apuntes = SpriteKind.create()
}
function generar_apuntes () {
    total_apuntes = 0
    apuntes_recogidos = 0
    for (let posicion of tiles.getTilesByType(assets.tile`miMosaico9`)) {
        apunte = sprites.create(assets.image`miImagen1`, SpriteKind.Apuntes)
        tiles.placeOnTile(apunte, posicion)
        total_apuntes += 1
    }
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
    if (mini_mapa_abierto == true) {
        sprites.destroy(ventana_mini_mapa)
        mini_mapa_abierto = false
    } else {
        let tercer_profesor: Sprite = null
        let segundo_profesor: Sprite = null
        let primer_profesor: Sprite = null
        let alumno: Sprite = null
        mini_mapa = minimap.minimap(MinimapScale.Quarter, 2, 15)
        ventana_mini_mapa = sprites.create(minimap.getImage(mini_mapa), SpriteKind.Mapa)
        ventana_mini_mapa.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        ventana_mini_mapa.z = 5
        mini_mapa_abierto = true
        for (let paginas_apuntes of sprites.allOfKind(SpriteKind.Apuntes)) {
            minimap.includeSprite(mini_mapa, paginas_apuntes, MinimapSpriteScale.Double)
        }
        minimap.includeSprite(mini_mapa, alumno, MinimapSpriteScale.Quadruple)
        minimap.includeSprite(mini_mapa, primer_profesor, MinimapSpriteScale.Double)
        minimap.includeSprite(mini_mapa, segundo_profesor, MinimapSpriteScale.Double)
        minimap.includeSprite(mini_mapa, tercer_profesor, MinimapSpriteScale.Double)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let mini_mapa: minimap.Minimap = null
let ventana_mini_mapa: Sprite = null
let apunte: Sprite = null
let apuntes_recogidos = 0
let total_apuntes = 0
let nena: Sprite = null
let mini_mapa_abierto = false
mini_mapa_abierto = false
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.z = 6
tiles.placeOnRandomTile(nena, assets.tile`miMosaico9`)
controller.moveSprite(nena)
tiles.setCurrentTilemap(tilemap`nivel1`)
scene.cameraFollowSprite(nena)
generar_apuntes()
