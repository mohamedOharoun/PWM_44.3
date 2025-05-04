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
Este proyecto consta de una aplicación web en la que, los usuarios registrados, podrán unirse y crear eventos así como relacionarse con otros usuarios de la aplicación mediante chats individuales. Dentro de los nombrados eventos, se podrá establecer un presupuesto a repartir entre los miembros del mismo.

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

## Páginas
- **[Página landing](src/app/pages/landing-page)** implementa el mockup:
    - **Desktop**: [FirstPage](docs/mockups/FirstPage.png)
    - **Tablet**:  [FirstPage](docs/mockups/tablet/FirstPage.png)
    - **Móvil**:   [FirstPage](docs/mockups/mobile/FirstPage.png)

- **[Página home](src/app/pages/home-page)** implementa el mockup:
    - **Desktop**: [Home](docs/mockups/Home.png)
    - **Tablet**:  [Home](docs/mockups/tablet/Home.png)
    - **Móvil**:   [Home](docs/mockups/mobile/Home.png)

- **[Página de iniciar sesión](src/app/pages/sign-in)** implementa el mockup:
    - **Desktop**: [SignInFrame](docs/mockups/SignInFrame.png)
    - **Tablet**:  [SignInFrame](docs/mockups/tablet/SignInFrame.png)
    - **Móvil**:   [SignInFrame](docs/mockups/mobile/SignInFrame.png)

- **[Páginas de registro de cuenta](src/app/pages/sign-up-pages)** implementa los mockups:
    - **Desktop**: [SignUpFrameFirstStep](docs/mockups/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/SignUpFrameFourthStep.png)
    - **Tablet**:  [SignUpFrameFirstStep](docs/mockups/tablet/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/tablet/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/tablet/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/tablet/SignUpFrameFourthStep.png)
    - **Móvil**:   [SignUpFrameFirstStep](docs/mockups/mobile/SignUpFrameFirstStep.png), [SignUpFrameSecondStep](docs/mockups/mobile/SignUpFrameSecondStep.png), [SignUpFrameThirdStep](docs/mockups/mobile/SignUpFrameThirdStep.png), [SignUpFrameFourthStep](docs/mockups/mobile/SignUpFrameFourthStep.png)

- **[Página de recuperar contraseña](src/app/pages/reset-password)** implementa el mockup:
    - **Desktop**: [ResetPasswordFrame](docs/mockups/ResetPasswordFrame.png)
    - **Tablet**:  [ResetPasswordFrame](docs/mockups/tablet/ResetPasswordFrame.png)
    - **Móvil**:   [ResetPasswordFrame](docs/mockups/mobile/ResetPasswordFrame.png)

- **[Página de política de privacidad](src/app/pages/privacy-policy)** implementa el mockup:
    - **Desktop**: [PrivacyPolicy](docs/mockups/PrivacyPolicy.png)
    - **Tablet**:  [PrivacyPolicy](docs/mockups/tablet/PrivacyPolicy.png)
    - **Móvil**:   [PrivacyPolicy](docs/mockups/mobile/PrivacyPolicy.png)

- **[Páginas de social](src/app/pages/social)** implementa el mockup:
    - **Desktop**: [Friends](docs/mockups/Friends.png), [Pending](docs/mockups/Pending.png), [Blocked](docs/mockups/Blocked.png), [Groups](docs/mockups/Groups.png)
    - **Tablet**:  [Friends](docs/mockups/tablet/Friends.png), [Pending](docs/mockups/tablet/Pending.png), [Blocked](docs/mockups/tablet/Blocked.png), [Groups](docs/mockups/tablet/Groups.png)
    - **Móvil**:   [Friends](docs/mockups/mobile/Friends.png), [Pending](docs/mockups/mobile/Pending.png), [Blocked](docs/mockups/mobile/Blocked.png), [Groups](docs/mockups/mobile/Groups.png)

- **[Página de creación de grupo](src/app/pages/group-creation)** implementa el mockup:
    - **Desktop**: [GroupCreation](docs/mockups/GroupCreation.png)
    - **Tablet**:  [GroupCreation](docs/mockups/tablet/GroupCreation.png)
    - **Móvil**:   [GroupCreation](docs/mockups/mobile/GroupCreation.png)

- **[Página de chat](src/app/pages/messages)** implementa el mockup:
    - **Desktop**: [IndividualMessages](docs/mockups/IndividualMessages.png)
    - **Tablet**:  [IndividualMessages](docs/mockups/tablet/IndividualMessages.png)
    - **Móvil**:   [IndividualMessages1](docs/mockups/mobile/IndividualMessages1.png), [IndividualMessages2](docs/mockups/mobile/IndividualMessages2.png)

- **[Página de eventos](src/app/pages/events)** implementa el mockup:
    - **Desktop**: [MyEvents](docs/mockups/MyEvents.png), [EventsJoined](docs/mockups/EventsJoined.png), [FavouriteEvents](docs/mockups/FavouriteEvents.png), [ExploreEvents](docs/mockups/ExploreEvents.png), [EventsFrameExpandedJoined](docs/mockups/EventsFrameExpandedJoined.png)
    - **Tablet**:  [MyEvents1](docs/mockups/tablet/MyEvents1.png) & [MyEvents2](docs/mockups/tablet/MyEvents2.png), [EventsJoined](docs/mockups/tablet/EventsJoined.png) & [ExpandedEventsJoined](docs/mockups/tablet/ExpandedEventsJoined.png), [FavouriteEvents1](docs/mockups/tablet/FavouriteEvents1.png) & [FavouriteEvents2](docs/mockups/tablet/FavouriteEvents2.png), [ExploreEvents1](docs/mockups/tablet/ExploreEvents1.png) & [ExploreEvents2](docs/mockups/tablet/ExploreEvents2.png), [EventsFrameExpandedJoined1](docs/mockups/tablet/EventsFrameExpandedJoined1.png) & [EventsFrameExpandedJoined2](docs/mockups/tablet/EventsFrameExpandedJoined2.png)
    - **Móvil**:   [MyEvents1](docs/mockups/mobile/MyEvents1.png) & [MyEvents2](docs/mockups/mobile/MyEvents2.png), [EventsJoined](docs/mockups/mobile/EventsJoined.png), [FavouriteEvents](docs/mockups/mobile/FavouriteEvents.png), [ExploreEvents](docs/mockups/mobile/ExploreEvents.png), [EventsFrameExpandedJoined](docs/mockups/mobile/EventsFrameExpandedJoined.png)

- **[Páginas de crear evento](src/app/pages/event-creation-pages)** implementa el mockup:
    - **Desktop**: [CreateEvent](docs/mockups/CreateEvent.png)
    - **Tablet**:  [CreateEvent](docs/mockups/tablet/CreateEvent.png)
    - **Móvil**:   [CreateEvent](docs/mockups/mobile/CreateEvent.png)

- **[Página de perfil](src/app/pages/profile-page-user)** implementa el mockup:
    - **Desktop**: [SelfProfile](docs/mockups/SelfProfile.png), [SomeonesProfile](docs/mockups/SomeonesProfile.png)
    - **Tablet**:  [SelfProfile](docs/mockups/tablet/SelfProfile.png), [SomeonesProfile](docs/mockups/tablet/SomeonesProfile.png)
    - **Móvil**:   [SelfProfile](docs/mockups/mobile/SelfProfile.png), [SomeonesProfile](docs/mockups/mobile/SomeonesProfile.png)

## Templates identificados (componentes)
- **Header**
    - Se utiliza en todas las páginas
- **Footer**
  - Se utiliza en todas las páginas
- **[Modal de lista de miembros de evento](src/app/components/event-members)**
  - [Página de eventos](src/app/pages/events)
- **[Buscador y lista de usuarios](src/app/components/users-search-input)**
    - [Páginas de crear eventos](src/app/pages/event-creation-pages)
    - [Página de crear grupos](src/app/pages/group-creation)
- **[Tarjeta de usuario]()**
    - [Modal de miembros de evento](src/app/components/event-members)
    - [Buscador y lista de usuarios](src/app/components/users-search-input)
- **Mensaje**
    - [Página de chat individual](src/app/pages/messages)
- **Tarjeta de eventos**
    - [Página de eventos](src/app/pages/events)
- **Tag Interactivo**
    - [Páginas de creación de eventos](src/app/pages/event-creation-pages)
- **Tag no interactivo**
    - [Tarjeta de evento](src/app/components/reduced-card)
- **Usuario tipo amigo**
    - [Página de amigos](src/app/pages/social/friends)
- **Usuario tipo bloqueado y solicitud enviada**
    - [Página de usuarios bloqueados](src/app/pages/social/blocked)
    - [Página de solicitudes enviadas](src/app/pages/social/pending)
- **Usuario tipo solicitud recibida**
    - [Página de solicitudes recibidas](src/app/pages/social/sent-requests)
- **Usuario tipo grupo**
    - [Página de grupos](src/app/pages/social/groups)
- **Tarjeta de evento de perfil**
    - [Página de perfil](src/app/pages/profile-page-user)
- **Tarjetas de HomePage**
    - [HomePage](src/app/pages/home-page)
- **Tarjeta de feature de LandingPage**
    - [LandingPage](src/app/pages/landing-page)
- **Entrada de mensaje**
    - [Página de chat individual](src/app/pages/messages)

## ❗Aspectos a tener en cuenta
### *Organización del código*
Se ha divido en código en **architecture**, **app** y **environment**. **Architecture** corresponde a la parte de la web que no tiene dependencia con ninguna librería externa al dominio de la misma. En esta zona del proyecto también puede encontrarse el modelo de las entidades de la web. Por otro lado, en **app** se encuentran las carpetas correspondientes a **architecture** que tienen una implementación usando alguna dependencia externa, por ejemplo, los servicios que usan Firebase. Además, **app** se divide a su vez en **pages**, donde se encuentran aquellos componentes enrutables, y en **components**, alojando aquellos componentes que utilizan los enrutables y no son páginas. Los elementos restantes pertenecientes a angular ( servicios y guards ), se han guardado en sus respectivas carpetas. Por último, en **environment** se almacena la API Key de Firebase. Véase a continuación un diagrama de la estructura definida:

- **app**
    - *components*
    - *pages*
    - *io*
    - *services*
    - *guards*
- **architecture**
    - *io*
    - *model*
- **environment**

> [!IMPORTANT]
> ### [Enlace a FIGMA](https://www.figma.com/design/ABeWHXO1qitqzbR2bnhS9T/PWM-JoinUp!?node-id=1-3&t=TyWa8IP3k8JfVk5e-1)
> ### [Enlace a TRELLO](https://trello.com/invite/b/67a24b3933b864d3cf52e972/ATTI14351afe23768f40790cf40b7db50216F78CB56A/joinup)
