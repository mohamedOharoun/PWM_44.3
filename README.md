# 🌟 JoinUp! 🌟

> [!CAUTION]
> ## Credenciales para iniciar sesión en la página
> Email: ernestina@gmail.com  
> Contraseña: 123456

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
- **[Página Index](src/pages/html/index.html)** implementa el mockup:  
  - **Desktop**: [FirstPage](docs/mockups/FirstPage.png)  
  - **Tablet**:  [FirstPage](docs/mockups/tablet/FirstPage.png)  
  - **Móvil**:   [FirstPage](docs/mockups/mobile/FirstPage.png)

- **[Página home](src/pages/html/home_page.html)** implementa el mockup:  
  - **Desktop**: [Home](docs/mockups/Home.png)  
  - **Tablet**:  [Home](docs/mockups/tablet/Home.png)  
  - **Móvil**:   [Home](docs/mockups/mobile/Home.png)  

- **[Página de iniciar sesión](src/pages/html/sign_in.html)** implementa el mockup:  
  - **Desktop**: [SignInFrame](docs/mockups/SignInFrame.png)  
  - **Tablet**:  [SignInFrame](docs/mockups/tablet/SignInFrame.png)  
  - **Móvil**:   [SignInFrame](docs/mockups/mobile/SignInFrame.png)

- **[Página de registro de cuenta](src/pages/html/sign_up.html)** implementa los mockups:  
  - **Desktop**: [SignUpFrameFirstStep](docs/mockups/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/SignUpFrameFourthStep.png)  
  - **Tablet**:  [SignUpFrameFirstStep](docs/mockups/tablet/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/tablet/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/tablet/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/tablet/SignUpFrameFourthStep.png)  
  - **Móvil**:   [SignUpFrameFirstStep](docs/mockups/mobile/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/mobile/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/mobile/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/mobile/SignUpFrameFourthStep.png)

- **[Página de recuperar contraseña](src/pages/html/reset_password_page.html)** implementa el mockup:  
  - **Desktop**: [ResetPasswordFrame](docs/mockups/ResetPasswordFrame.png)  
  - **Tablet**:  [ResetPasswordFrame](docs/mockups/tablet/ResetPasswordFrame.png)  
  - **Móvil**:   [ResetPasswordFrame](docs/mockups/mobile/ResetPasswordFrame.png)

- **[Página de política de privacidad](src/pages/html/privacy_policy_page.html)** implementa el mockup:  
  - **Desktop**: [PrivacyPolicy](docs/mockups/PrivacyPolicy.png)  
  - **Tablet**:  [PrivacyPolicy](docs/mockups/tablet/PrivacyPolicy.png)  
  - **Móvil**:   [PrivacyPolicy](docs/mockups/mobile/PrivacyPolicy.png) 

- **[Página de social](src/pages/html/social.html)** implementa el mockup:  
  - **Desktop**: [Friends](docs/mockups/Friends.png), [Pending](docs/mockups/Pending.png), [Blocked](docs/mockups/Blocked.png), [Groups](docs/mockups/Groups.png)  
  - **Tablet**:  [Friends](docs/mockups/tablet/Friends.png), [Pending](docs/mockups/tablet/Pending.png), [Blocked](docs/mockups/tablet/Blocked.png), [Groups](docs/mockups/tablet/Groups.png)  
  - **Móvil**:   [Friends](docs/mockups/mobile/Friends.png), [Pending](docs/mockups/mobile/Pending.png), [Blocked](docs/mockups/mobile/Blocked.png), [Groups](docs/mockups/mobile/Groups.png)

- **[Página de lista de miembros de evento](src/pages/html/event_members.html)** implementa el mockup:  
  - **Desktop**: [Members](docs/mockups/Members.png)  
  - **Tablet**:  [Members](docs/mockups/tablet/Members.png)  
  - **Móvil**:   [Members](docs/mockups/mobile/Members.png)

- **[Página de creación de grupo](src/pages/html/create_group_page.html)** implementa el mockup:  
  - **Desktop**: [GroupCreation](docs/mockups/GroupCreation.png)  
  - **Tablet**:  [GroupCreation](docs/mockups/tablet/GroupCreation.png)  
  - **Móvil**:   [GroupCreation](docs/mockups/mobile/GroupCreation.png)

- **[Página de chat](src/pages/html/chat.html)** implementa el mockup:  
  - **Desktop**: [IndividualMessages](docs/mockups/IndividualMessages.png)  
  - **Tablet**:  [IndividualMessages](docs/mockups/tablet/IndividualMessages.png)  
  - **Móvil**:   [IndividualMessages1](docs/mockups/mobile/IndividualMessages1.png), [IndividualMessages2](docs/mockups/mobile/IndividualMessages2.png)  

- **[Página de eventos](src/pages/html/events.html)** implementa el mockup:  
  - **Desktop**: [MyEvents](docs/mockups/MyEvents.png), [EventsJoined](docs/mockups/EventsJoined.png), [FavouriteEvents](docs/mockups/FavouriteEvents.png), [ExploreEvents](docs/mockups/ExploreEvents.png), [EventsFrameExpandedJoined](docs/mockups/EventsFrameExpandedJoined.png)  
  - **Tablet**:  [MyEvents1](docs/mockups/tablet/MyEvents1.png) & [MyEvents2](docs/mockups/tablet/MyEvents2.png), [EventsJoined](docs/mockups/tablet/EventsJoined.png) & [ExpandedEventsJoined](docs/mockups/tablet/ExpandedEventsJoined.png), [FavouriteEvents1](docs/mockups/tablet/FavouriteEvents1.png) & [FavouriteEvents2](docs/mockups/tablet/FavouriteEvents2.png), [ExploreEvents1](docs/mockups/tablet/ExploreEvents1.png) & [ExploreEvents2](docs/mockups/tablet/ExploreEvents2.png), [EventsFrameExpandedJoined1](docs/mockups/tablet/EventsFrameExpandedJoined1.png) & [EventsFrameExpandedJoined2](docs/mockups/tablet/EventsFrameExpandedJoined2.png)  
  - **Móvil**:   [MyEvents1](docs/mockups/mobile/MyEvents1.png) & [MyEvents2](docs/mockups/mobile/MyEvents2.png), [EventsJoined](docs/mockups/mobile/EventsJoined.png), [FavouriteEvents](docs/mockups/mobile/FavouriteEvents.png), [ExploreEvents](docs/mockups/mobile/ExploreEvents.png), [EventsFrameExpandedJoined](docs/mockups/mobile/EventsFrameExpandedJoined.png)  

- **[Página de crear evento](src/pages/html/create_event_page.html)** implementa el mockup:  
  - **Desktop**: [CreateEvent](docs/mockups/CreateEvent.png)  
  - **Tablet**:  [CreateEvent](docs/mockups/tablet/CreateEvent.png)  
  - **Móvil**:   [CreateEvent](docs/mockups/mobile/CreateEvent.png)

- **[Página de perfil propio](src/pages/html/profile_page_user.html)** implementa el mockup:  
  - **Desktop**: [SelfProfile](docs/mockups/SelfProfile.png), [SomeonesProfile](docs/mockups/SomeonesProfile.png)  
  - **Tablet**:  [SelfProfile](docs/mockups/tablet/SelfProfile.png), [SomeonesProfile](docs/mockups/tablet/SomeonesProfile.png)  
  - **Móvil**:   [SelfProfile](docs/mockups/mobile/SelfProfile.png), [SomeonesProfile](docs/mockups/mobile/SomeonesProfile.png)         

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

## JSON para la carga dinámica
  - [Texto estático](src/db/config.json)
  - [Eventos](src/db/events.json)
  - [Grupos](src/db/groups.json)
  - [Messages](src/db/messages.json)
  - [Usuarios](src/db/users.json)

## Código validación de formulario
  - [Sgin Up](src/ja/sign_up.js)
  - [Sign In](src/js/sign_in_validation.json)
  - [Create Event](src/js/create_event_form_validation.js)
  - [Create Group](src/js/create_group_form_validation.js)

## ❗Aspectos a tener en cuenta
### *Organización del código*
Se ha divido en código en **architecture** y en **app**. **Architecture** corresponde a la parte de la web que no tiene dependencia con ninguna librería externa al dominio de la misma. En esta zona del proyecto también puede encontrarse el modelo de las entidades de la web. Por otro lado, en **app** se encuentran las carpetas correspondientes a **architecture** que tienen una implementación usando alguna dependencia externa, por ejemplo, los servicios que usan Firebase. Además, **app** se divide a su vez en **pages**, donde se encuentran aquellos componentes enrutables, y en **components**, alojando aquellos componentes que utilizan lso enrutables y no son páginas.

> [!IMPORTANT]
> ### [Enlace a FIGMA](https://www.figma.com/design/ABeWHXO1qitqzbR2bnhS9T/PWM-JoinUp!?node-id=1-3&t=TyWa8IP3k8JfVk5e-1)
> ### [Enlace a TRELLO](https://trello.com/invite/b/67a24b3933b864d3cf52e972/ATTI14351afe23768f40790cf40b7db50216F78CB56A/joinup)
