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
  - [Página de chat](src/pages/html/chat.html) implementa el mockup [IndividualMessages](docs/mockups/IndividualMessages.png) en desktop, [IndividualMessages](docs/mockups/tablet/IndividualMessages.png) en tablet y [IndividualMessages1](docs/mockups/mobile/IndividualMessages1.png) y [IndividualMessages2](docs/mockups/mobile/IndividualMessages2.png) en móvil.
  - [Página de crear evento](src/pages/html/create_event_page.html) implementa el mockup [CreateEvent](docs/mockups/CreateEvent.png) en desktop, [CreateEvent](docs/mockups/tablet/CreateEvent.png) en tablet y  
    [CreateEvent](docs/mockups/mobile/CreateEvent.png) en móvil.
  - [Página de lista de miembros de evento](src/pages/html/event_members.html) implementa el mockup [Members](docs/mockups/Members.png) en desktop, [Members](docs/mockups/tablet/Members.png) en tablet y  
    [Members](docs/mockups/mobile/Members.png) en móvil.
  - [Página de eventos](src/pages/html/events.html) implementa el mockup [ExploreEvents](docs/mockups/ExploreEvents.png) en desktop, [ExploreEvents](docs/mockups/tablet/ExploreEvents.png) y [ExpandedExploreEvents](docs/mockups/tablet/ExpandedExploreEvents.png) en tablet, y  
    [ExploreEvents](docs/mockups/mobile/ExploreEvents.png) en móvil.
  - [Página de evento expandido](src/pages/html/expanded_event_page.html) implementa el mockup [EventsFrameExpandedJoined](docs/mockups/EventsFrameExpandedJoined.png) en desktop,  
    [EventsFrameExpandedJoined](docs/mockups/tablet/EventsFrameExpandedJoined.png) y [ExpandedEventsFrameExpandedJoined](docs/mockups/tablet/ExpandedEventsFrameExpandedJoined.png) en tablet, y [EventsFrameExpandedJoined](docs/mockups/mobile/EventsFrameExpandedJoined.png) en móvil.
  - [Página de eventos marcados como favoritos](src/pages/html/favorite_events.html) implementa el mockup [FavouriteEvents](docs/mockups/FavouriteEvents.png) en desktop,  
    [FavouriteEvents](docs/mockups/tablet/FavouriteEvents.png) y [ExpandedFavouriteEvents](docs/mockups/tablet/ExpandedFavouriteEvents.png) en tablet, y [FavouriteEvents](docs/mockups/mobile/FavouriteEvents.png) en móvil.
  - [Página de creación de grupo](src/pages/html/group_creation.html) implementa el mockup [GroupCreation](docs/mockups/GroupCreation.png) en desktop, [GroupCreation](docs/mockups/tablet/GroupCreation.png) en tablet y  
    [GroupCreation](docs/mockups/mobile/GroupCreation.png) en móvil.
  - [Página home](src/pages/html/home_page.html) implementa el mockup [Home](docs/mockups/Home.png) en desktop, [Home](docs/mockups/tablet/Home.png) en tablet y  
    [Home](docs/mockups/mobile/Home.png) en móvil.
  - [Página Index](src/pages/html/index.html) implementa el mockup [FirstPage](docs/mockups/FirstPage.png) en desktop, [FirstPage](docs/mockups/tablet/FirstPage.png) en tablet y  
    [FirstPage](docs/mockups/mobile/FirstPage.png) en móvil.
  - [Página de eventos unidos](src/pages/html/joined_events.html) implementa el mockup [EventsJoined](docs/mockups/EventsJoined.png) en desktop, [EventsJoined](docs/mockups/tablet/EventsJoined.png) y [ExpandedEventsJoined](docs/mockups/tablet/ExpandedEventsJoined.png) en tablet, y  
    [EventsJoined](docs/mockups/mobile/EventsJoined.png) en móvil.
  - [Página de eventos creados](src/pages/html/owned_events.html) implementa el mockup [MyEvents](docs/mockups/MyEvents.png) en desktop, [MyEvents](docs/mockups/tablet/MyEvents.png) y [ExpandedMyEvents](docs/mockups/tablet/ExpandedMyEvents.png) en tablet, y  
    [MyEvents1](docs/mockups/mobile/MyEvents1.png) y [MyEvents2](docs/mockups/mobile/MyEvents2.png) en móvil.
  - [Página de política de privacidad](src/pages/html/privacypolicypage.html) implementa el mockup [PrivacyPolicy](docs/mockups/PrivacyPolicy.png) en desktop, [PrivacyPolicy](docs/mockups/tablet/PrivacyPolicy.png) en tablet y  
    [PrivacyPolicy](docs/mockups/mobile/PrivacyPolicy.png) en móvil.
  - [Página de recuperar contraseña](src/pages/html/reset_password_page.html) implementa el mockup [ResetPasswordFrame](docs/mockups/ResetPasswordFrame.png) en desktop,  
    [ResetPasswordFrame](docs/mockups/tablet/ResetPasswordFrame.png) en tablet y [ResetPasswordFrame](docs/mockups/mobile/ResetPasswordFrame.png) en móvil.
  - [Página de perfil propio](src/pages/html/self_profile_page.html) implementa el mockup [SelfProfile](docs/mockups/SelfProfile.png) en desktop, [SelfProfile](docs/mockups/tablet/SelfProfile.png) en tablet y  
    [SelfProfile](docs/mockups/mobile/SelfProfile.png) en móvil.
  - [Página de iniciar sesión](src/pages/html/sign_in.html) implementa el mockup [SignInFrame](docs/mockups/SignInFrame.png) en desktop, [SignInFrame](docs/mockups/tablet/SignInFrame.png) en tablet y  
    [SignInFrame](docs/mockups/mobile/SignInFrame.png) en móvil.
  - [Página con primer paso de registro](src/pages/html/signupfirststep.html) implementa el mockup [SignUpFirstStep](docs/mockups/SignUpFirstStep.png) en desktop, [SignUpFirstStep](docs/mockups/tablet/SignUpFirstStep.png) en tablet y  
    [SignUpFirstStepFrame](docs/mockups/mobile/SignUpFirstStepFrame.png) en móvil.
  - [Página con segundo paso de registro](src/pages/html/signupsecondstep.html) implementa el mockup [SignUpSecondStep](docs/mockups/SignUpSecondStep.png) en desktop, [SignUpSecondStep](docs/mockups/tablet/SignUpSecondStep.png) en tablet y  
    [SignUpSecondStepFrame](docs/mockups/mobile/SignUpSecondStepFrame.png) en móvil.
  - [Página con tercer paso de registro](src/pages/html/signupthirdstep.html) implementa el mockup [SignUpThirdStep](docs/mockups/SignUpThirdStep.png) en desktop, [SignUpThirdStep](docs/mockups/tablet/SignUpThirdStep.png) en tablet y  
    [SignUpThirdStepFrame](docs/mockups/mobile/SignUpThirdStepFrame.png) en móvil.
  - [Página con último paso de registro](src/pages/html/signuplaststep.html) implementa el mockup [SignUpLastStep](docs/mockups/SignUpLastStep.png) en desktop, [SignUpLastStep](docs/mockups/tablet/SignUpLastStep.png) en tablet y  
    [SignUpFourthStepFrame](docs/mockups/mobile/SignUpFourthStepFrame.png) en móvil.
  - [Página de usuarios bloqueados y peticiones pendientes](src/pages/html/social_block_and_send_request.html) implementa el mockup [Blocked](docs/mockups/Blocked.png) en desktop, [Blocked](docs/mockups/tablet/Blocked.png) en tablet y  
    [Blocked](docs/mockups/mobile/Blocked.png) en móvil.
  - [Página de amigos agregados](src/pages/html/social_friends.html) implementa el mockup [Friends](docs/mockups/Friends.png) en desktop, [Friends](docs/mockups/tablet/Friends.png) en tablet y  
    [Friends](docs/mockups/mobile/Friends.png) en móvil.
  - [Página de grupos de amigos](src/pages/html/social_groups.html) implementa el mockup [Groups](docs/mockups/Groups.png) en desktop, [Groups](docs/mockups/tablet/Groups.png) en tablet y  
    [Groups](docs/mockups/mobile/Groups.png) en móvil.
  - [Página de peticiones de amistad](src/pages/html/social_received_request.html) implementa el mockup [Pending](docs/mockups/Pending.png) en desktop, [Pending](docs/mockups/tablet/Pending.png) en tablet y  
    [Pending](docs/mockups/mobile/Pending.png) en móvil.
  - [Página de perfil ajeno](src/pages/html/user_profile_page.html) implementa el mockup [SomeonesProfile](docs/mockups/SomeonesProfile.png) en desktop, [SomeonesProfile](docs/mockups/tablet/SomeonesProfile.png) en tablet y  
    [SomeonesProfile](docs/mockups/mobile/SomeonesProfile.png) en móvil.

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
    - [Página de evento expandido](src/templates/html/comment.html)
  - **Tag Interactivo**
    - [Página de creación de eventos](src/pages/html/create_event_page.html)
  - **Tag no interactivo**
    - [Tarjeta de evento](src/templates/html/reduced_card.html)
    - [Tarjeta de evento expandido](src/templates/html/expand_card.html)
  - **Lista de usuarios**
    - [Template de formulario de creación de evento](src/templates/html/create_event_form.html)
    - [Página de creación de grupo](src/pages/html/group_creation.html)
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
    - [Página de perfil propio](src/pages/html/self_profile_page.html)
    - [Página de perfil propio](src/pages/html/user_profile_page.html)
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
    - [Página de eventos principal](src/pages/html/events.html)
    - [Página de eventos favoritos](src/pages/html/favorite_events.html)
    - [Página de eventos unidos](src/pages/html/joined_events.html)
    - [Página de eventos creados](src/pages/html/owned_events.html)  

## ❗Aspectos a tener en cuenta
### *Organización del código*
Se ha establecido el código bajo la carpeta src. Ahí, los archivos se dividen en templates y pages (otros dos directorios internos), donde se encuentra el archivo html y css en sus respectivos directorios. Además, se establece una hoja de estilo general para manejar partes comunes en diferentes páginas.  

> [!IMPORTANT]
> ### [Enlace a FIGMA](https://www.figma.com/design/ABeWHXO1qitqzbR2bnhS9T/PWM-JoinUp!?node-id=1-3&t=TyWa8IP3k8JfVk5e-1)
> ### [Enlace a TRELLO](https://trello.com/invite/b/67a24b3933b864d3cf52e972/ATTI14351afe23768f40790cf40b7db50216F78CB56A/joinup)
