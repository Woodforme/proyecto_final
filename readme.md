Proyecto de Listado de Alojamientos al estilo Airbnb
Descripción general
Este proyecto es una aplicación web responsive que replica la funcionalidad principal de la interfaz de listado de alojamientos de Airbnb. Permite a los usuarios:

Explorar alojamientos disponibles con información detallada

Filtrar alojamientos por ubicación, número de huéspedes y criterios de calidad

Ver detalles de los alojamientos incluyendo fotos, calificaciones y comodidades

Usar la interfaz tanto en dispositivos móviles como en desktop

Características principales
1. Diseño Responsivo
Se adapta a pantallas móviles y de escritorio

Implementación de modales diferentes para cada tipo de dispositivo

Manejo adecuado del cambio de tamaño de la ventana

2. Listado de Alojamientos
Muestra tarjetas de alojamiento con:

Fotos de alta calidad

Insignias de Superhost (cuando aplica)

Tipo de propiedad e información de camas

Calificaciones con estrellas

Detalles de ubicación

Capacidad máxima de huéspedes

3. Filtrado Avanzado
Los usuarios pueden filtrar alojamientos por:

Ubicación: Buscar por ciudad o país

Capacidad: Especificar número de adultos y niños

Filtros de calidad:

Solo propiedades de Superhosts

Alojamientos con alta calificación (4.0+)

4. Elementos Interactivos de UI
Interfaces modales de búsqueda para móvil y desktop

Contador de huéspedes con botones de incremento/decremento

Actualizaciones en tiempo real al cambiar filtros

Retroalimentación visual en elementos interactivos

5. Gestión de Estado
Mantiene el estado actual de búsqueda (ubicación, número de huéspedes)

Sincroniza las visualizaciones entre el encabezado y los modales

Preserva las selecciones de filtros

Implementación Técnica
JavaScript Vanilla: Sin frameworks - manipulación directa del DOM

CSS Moderno: Diseño responsivo con efectos hover y transiciones

Estructura Modular: Separación clara de responsabilidades

Accesibilidad: HTML semántico y etiquetado apropiado

Cómo Usar
Haz clic en la barra de búsqueda para abrir el modal de filtros

Configura tu ubicación deseada, número de huéspedes y filtros

Haz clic en "Aplicar" para ver los alojamientos que coincidan

Explora los resultados en el diseño basado en tarjetas

La interfaz funciona de manera similar en móvil y desktop, con adaptaciones apropiadas para cada tipo de dispositivo.

Estado Inicial
Al cargar por primera vez, la aplicación:

Muestra todos los alojamientos disponibles

Muestra "Finlandia" como ubicación predeterminada

Muestra "Añadir huéspedes" hasta que se especifique un número

Este proyecto demuestra una arquitectura limpia en JavaScript y principios de diseño responsivo, proporcionando una experiencia funcional para explorar alojamientos.

