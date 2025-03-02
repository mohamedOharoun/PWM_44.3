# 🌟 JoinUp! 🌟

## Componentes
- Ayman Asbai Ghoudan
- Javier Castilla Moreno
- Laura Herrera Negrín
- Mohamed Oulad Haroun Zarkik  

## Descripción del Proyecto
Este proyecto consta de una aplicación web en la que, los usuarios registrados, podrán unirse y crear eventos así como relacionarse con otros usuarios de la aplicación mediante chats individuales. Dentro de los nombrados eventos, se podrán dejar comentarios y establecer un presupuesto a repartir entre los miembros del mismo.  

## Requisitos funcionales
### 1.  *Autenticación y Seguridad*
 - Registro de usuarios con correo electrónico, contraseña y datos básicos
 - Inicio y cierre de sesión
 - Recuperación de contraseña
### 2.  *Gestión de usuarios y amistades*
 - Búsqueda de otros usuarios
 - Envío y recepción de solicitudes de amistad
 - Aceptar o rechazar solicitudes de amistad
 - Listado de amigos con opciones de eliminarlos o enviar mensaje
 - Creación de grupos de amigos para facilitar la gestión de eventos
 - Bloqueo de usuarios
### 3.  *Mensajería Privada*
 - Envío y recepción de mensajes privados entre amigos
 - Historial de coversaciones almacenado
 - Notificaciónes de nuevos mensajes en tiempo real
### 4.  *Gestión de Eventos*
 - Creación de eventos con nombre, descripción, presupuesto, fecha, etiquetas y tipo (público o privado)
 - Reparto automático o manual del presupuesto del evento
 - Invitación a amigos o grupos de amigos al evento
 - Visualización y exploración de eventos
### 5.  *Tipos de eventos*
  - Capacidad de establecer eventos públicos o privados
### 6.  *Gestión de notificaciones*
 - Notificar al usuario remitente de un mensaje de otro usuario o invitación a evento
### 7.  *Administración y moderación*
 - Reportar usuarios o eventos  

## Ubicación archivo -> Mockups y Storyboard
El fichero en cuestión se localiza en la siguiente ruta del repositorio:
  *docs/storyboard.pdf*

## Páginas HTML


## Templates identificados
  - **Header**
    - Se utiliza en todas las páginas
  - **Footer**
    - Se utiliza en todas las páginas
  - **Tarjeta de usuario**
    - [Página de Miembros](src/pages/html/event_members.html)
    - [Página de crear grupo](src/pages/html/group_creation.html)
    - [Página de crear evento](src/pages/html/create_event_page.html)
  - **Mensaje**
    - [Página de chat individual](src/pages/html/chat.html)
  - **Tarjeta de eventos**
    - [Página de eventos principal](src/pages/html/events.html)
    - [Página de eventos favoritos](src/pages/html/favorite_events.html)
    - [Página de eventos unidos](src/pages/html/joined_events.html)
    - [Página de eventos creados](src/pages/html/owned_events.html)
  - **Comentario**
    - [Página de evento expandido](src/pages/html/)
  - **Tag Interactivo**
    - [Página de creación de eventos](src/pages/html/create_event_page.html)
  - **Tag no interactivo**
    - [Tarjeta de evento](src/template/html/reduced.event.html)
    - [Tarjeta de evento expandido](src/template/html/expand_card.html)
  - **Lista de usuarios**
    - []()
  - **Tarjetas de evento**
    - []()
  - **Tarjetas de evento expandido**
    - []()
  - **Usuario tipo amigo**
    - []()
  - **Usuario tipo bloqueado**
    - []()
  - **Usuario tipo solicitud recibida**
    - []()
  - **Usuario tipo solicitud enviada**
    - []()
  - **Usuario tipo grupo**
    - []()
  - **Tarjeta de evento de perfil**
    - []()
  - **Tarjetas de HomePage**
    - []()
  - **Tarjeta de feature de LandingPage**
    - []()
  - **Lista de comentario**
    - []()
  - **Entrada de mensaje**
    - []()
  - **Sidebar de eventos**
    - [Página de eventos principal](src/pages/html/events.html)
    - [Página de eventos favoritos](src/pages/html/favorite_events.html)
    - [Página de eventos unidos](src/pages/html/joined_events.html)
    - [Página de eventos creados](src/pages/html/owned_events.html)
  

El *Header* y *Footer* se utilizan en todas las páginas.  
El template de *Tarjeta de usuario*

## ❗Aspectos a tener en cuenta
### *Organización del código*
Se ha establecido el código bajo la carpeta src. Ahí, los archivos se dividen en templates y pages (otros dos directorios internos), donde se encuentra el archivo html y css en sus respectivos directorios. Además, se establece una hoja de estilo general para manejar partes comunes en diferentes páginas.  

> [!IMPORTANT]
> ### [Enlace a FIGMA](https://www.figma.com/design/ABeWHXO1qitqzbR2bnhS9T/PWM-JoinUp!?node-id=1-3&t=TyWa8IP3k8JfVk5e-1)
> ### [Enlace a TRELLO](https://trello.com/invite/b/67a24b3933b864d3cf52e972/ATTI14351afe23768f40790cf40b7db50216F78CB56A/joinup)
