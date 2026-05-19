# Corte de Caja PWA

Versión compacta sin imágenes de billetes.

## Cambios incluidos

- Ya no usa imágenes para las denominaciones.
- Cada paso muestra una tarjeta visual hecha con CSS.
- Se agregó billete de $1000 después de dólares.
- Interfaz compacta para evitar scroll durante la captura.
- Dólares separados del total en pesos.
- Sin historial ni almacenamiento permanente.
- Lista para GitHub Pages.

## Orden de captura

1. Dólares
2. Billetes de $1000
3. Billetes de $500
4. Billetes de $200
5. Billetes de $100
6. Billetes de $50
7. Billetes de $20
8. Monedas de $10
9. Monedas de $5
10. Monedas de $2
11. Monedas de $1
12. Monedas de $0.50

## Publicar

Sube estos archivos a la raíz del repositorio y activa GitHub Pages desde `Settings > Pages`.

## Actualizaciones

Esta versión usa:

```js
const CACHE_NAME = "corte-caja-pwa-v2";
```

Si haces cambios y la app instalada no se actualiza, cambia a `v3`, `v4`, etc.
