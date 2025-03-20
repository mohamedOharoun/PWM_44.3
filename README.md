# 🌟 JoinUp! 🌟

## Componentes
- Ayman Asbai Ghoudan
- Javier Castilla Moreno
- Laura Herrera Negrín
- Mohamed O. Haroun Zarkik  

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

## Ubicación archivo Mockups y Storyboard
El fichero en cuestión se encuentra en la carpeta [*docs.*](docs/storyboard.pdf)  

## Páginas HTML
  - [Página de chat](src/pages/html/chat.html) implementa el mockup [IndividualMessages](docs/mockups/IndividualMessages.png)
  - [Página de crear evento](src/pages/html/create_event_page.html) implementa el mockup [CreateEvent](docs/mockups/CreateEvent.png)
  - [Página de lista de miembros de evento](src/pages/html/event_members.html) implementa el mockup [Members](docs/mockups/Members.png)
  - [Página de eventos](src/pages/html/events_explore.html) implementa el mockup [ExploreEvents](docs/mockups/ExploreEvents.png)
  - [Página de evento expandido](src/pages/html/expanded_event_page.html) implementa el mockup [EventsFrameExpandedJoined](docs/mockups/EventsFrameExpandedJoined.png)
  - [Página de eventos marcados como favoritos](src/pages/html/events_favourite.html) implementa el mockup [FavouriteEvents](docs/mockups/FavouriteEvents.png)
  - [Página de creación de grupo](src/pages/html/create_group_page.html) implementa el mockup [GroupCreation](docs/mockups/GroupCreation.png)
  - [Página home](src/pages/html/home_page.html) implementa el mockup [Home](docs/mockups/Home.png)
  - [Página Index](src/pages/html/index.html) implementa el mockup [FirstPage](docs/mockups/FirstPage.png)
  - [Página de eventos unidos](src/pages/html/events_joined.html) implementa el mockup [EventsJoined](docs/mockups/EventsJoined.png)
  - [Página de eventos creados](src/pages/html/events_owned.html) implementa el mockup [MyEvents](docs/mockups/MyEvents.png)
  - [Página de política de privacidad](src/pages/html/privacy_policy_page.html) implementa el mockup [PrivacyPolicy](docs/mockups/PrivacyPolicy.png)
  - [Página de recuperar contraseña](src/pages/html/reset_password_page.html) implementa el mockup [ResetPasswordFrame](docs/mockups/ResetPasswordFrame.png)
  - [Página de perfil propio](src/pages/html/profile_page_self.html) implementa el mockup [SelfProfile](docs/mockups/SelfProfile.png)
  - [Página de iniciar sesión](src/pages/html/sign_in.html) implementa el mockup [SignInFrame](docs/mockups/SignInFrame.png)
  - [Página con primer paso de registro](src/pages/html/sign_up_first_step_page.html) implementa el mockup [SignUpFirstStep](docs/mockups/SignUpFirstStep.png)
  - [Página con segundo paso de registro](src/pages/html/sign_up_second_step_page.html) implementa el mockup [SignUpSecondStep](docs/mockups/SignUpSecondStep.png)
  - [Página con tercer paso de registro](src/pages/html/sign_up_third_step_page.html) implementa el mockup [SignUpThirdStep](docs/mockups/SignUpThirdStep.png)
  - [Página con último paso de registro](src/pages/html/sign_up_fourth_step_page.html) implementa el mockup [SignUpLastStep](docs/mockups/SignUpLastStep.png)
  - [Página de usuarios bloqueados y peticiones pendientes](src/pages/html/social_block_and_send_request.html) implementa el mockup [Blocked](docs/mockups/Blocked.png)
  - [Página de amigos agregados](src/pages/html/social_friends.html) implementa el mockup [Friends](docs/mockups/Friends.png)
  - [Página de grupos de amigos](src/pages/html/social_groups.html) implementa el mockup [Groups](docs/mockups/Groups.png)
  - [Página de peticiones de amistad](src/pages/html/social_received_request.html) implementa el mockup [Pending](docs/mockups/Pending.png)
  - [Página de perfil ajeno](src/pages/html/profile_page_user.html) implementa el mockup [SomeonesProfile](docs/mockups/SomeonesProfile.png)

## Templates identificados
  - **Header**
    - Se utiliza en todas las páginas
  - **Footer**
    - Se utiliza en todas las páginas
  - **Tarjeta de usuario**
    - [Página de Miembros](src/pages/html/event_members.html)
    - [Página de crear grupo](src/pages/html/create_group_page.html)
    - [Página de crear evento](src/pages/html/create_event_page.html)
  - **Mensaje**
    - [Página de chat individual](src/pages/html/chat.html)
  - **Tarjeta de eventos**
    - [Página de eventos principal](src/pages/html/events_explore.html)
    - [Página de eventos favoritos](src/pages/html/events_favourite.html)
    - [Página de eventos unidos](src/pages/html/events_joined.html)
    - [Página de eventos creados](src/pages/html/events_owned.html)
  - **Comentario**
    - [Página de evento expandido](src/templates/html/comment.html)
  - **Tag Interactivo**
    - [Página de creación de eventos](src/pages/html/create_event_page.html)
  - **Tag no interactivo**
    - [Tarjeta de evento](src/templates/html/reduced_card.html)
    - [Tarjeta de evento expandido](src/templates/html/expand_card.html)
  - **Lista de usuarios**
    - [Template de formulario de creación de evento](src/templates/html/create_event_form.html)
    - [Página de creación de grupo](src/pages/html/create_group_page.html)
    - [Página de miembros de un evento](src/pages/html/event_members.html)
  - **Tarjetas de evento expandido**
    - [Página de evento expandido](src/pages/html/expanded_event_page.html)
  - **Usuario tipo amigo**
    - [Página de amigos](src/pages/html/social_friends.html)
  - **Usuario tipo bloqueado y solicitud enviada**
    - [Página de usuarios bloqueados y solicitudes enviadas](src/pages/html/social_block_and_sent_requests.html)
  - **Usuario tipo solicitud recibida**
    - [Página de solicitudes recibidas](src/pages/html/social_received_requests.html)
  - **Usuario tipo grupo**
    - [Página de grupos](src/pages/html/social_groups.html)
  - **Tarjeta de evento de perfil**
    - [Página de perfil propio](src/pages/html/profile_page_self.html)
    - [Página de perfil propio](src/pages/html/profile_page_user.html)
  - **Tarjetas de HomePage**
    - [HomePage](src/pages/html/home_page.html)
  - **Tarjeta de feature de LandingPage**
    - [LandingPage](src/pages/html/index.html)
  - **Lista de comentarios**
    - [Template de tarjeta de evento expandida](src/templates/html/expand_card.html)
  - **Entrada de mensaje**
    - [Template de lista de tarjeta de evento expandida](src/templates/html/expand_card.html)
    - [Página de chat individual](src/pages/html/chat.html)
  - **Sidebar de eventos**
    - [Página de eventos principal](src/pages/html/events_explore.html)
    - [Página de eventos favoritos](src/pages/html/events_favourite.html)
    - [Página de eventos unidos](src/pages/html/events_joined.html)
    - [Página de eventos creados](src/pages/html/events_owned.html)  

## ❗Aspectos a tener en cuenta
### *Organización del código*
Se ha establecido el código bajo la carpeta src. Ahí, los archivos se dividen en templates y pages (otros dos directorios internos), donde se encuentra el archivo html y css en sus respectivos directorios. Además, se establece una hoja de estilo general para manejar partes comunes en diferentes páginas.  

> [!IMPORTANT]
> ### [Enlace a FIGMA](https://www.figma.com/design/ABeWHXO1qitqzbR2bnhS9T/PWM-JoinUp!?node-id=1-3&t=TyWa8IP3k8JfVk5e-1)
> ### [Enlace a TRELLO](https://trello.com/invite/b/67a24b3933b864d3cf52e972/ATTI14351afe23768f40790cf40b7db50216F78CB56A/joinup)
