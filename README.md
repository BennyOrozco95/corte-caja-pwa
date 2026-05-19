# Corte de Caja PWA

Herramienta web instalable para contar el corte de caja por cantidad de billetes y monedas.

## Características

- JavaScript puro, sin frameworks.
- Lista para GitHub Pages.
- Teclado numérico en pantalla.
- Captura por cantidad de piezas.
- Dólares separados, sin sumarlos al total en pesos.
- Total en pesos mexicanos.
- Botón para enviar el resumen por WhatsApp.
- PWA instalable en Android.
- Funciona offline después de la primera carga.
- No guarda cortes ni historial.

## Orden de captura

1. Dólares
2. Billetes de $500
3. Billetes de $200
4. Billetes de $100
5. Billetes de $50
6. Billetes de $20
7. Monedas de $10
8. Monedas de $5
9. Monedas de $2
10. Monedas de $1
11. Monedas de $0.50

## Reemplazar imágenes

Puedes reemplazar los archivos dentro de:

```txt
assets/img/
```

Nombres esperados:

```txt
dolar.png
500.png
200.png
100.png
50.png
20.png
10.png
5.png
2.png
1.png
050.png
```

Mantén los mismos nombres para no modificar el código.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos estos archivos a la raíz del repositorio.
3. Entra a Settings > Pages.
4. En Source, selecciona la rama principal y la carpeta raíz.
5. Guarda.
6. Abre la URL de GitHub Pages desde Android.
7. En Chrome, usa "Agregar a pantalla principal" para instalarla.

## Nota sobre datos

La app no usa `localStorage`, no usa base de datos y no guarda el corte.
Los valores solo existen mientras se está usando la pantalla actual.
