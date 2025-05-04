import { Component } from '@angular/core';
import { ReducedCardComponent } from '../../components/reduced-card/reduced-card.component';
import { Event } from '../../../architecture/model/Event';

@Component({
  selector: 'app-events',
  imports: [ReducedCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events_source : Event[] = [
    {
      name: "Event 1",
      description: "Pequeña descripción para probar",
      creator: {
        email: "correo@gmail.com",
        name: "Name User 1",
        description: "Lorem Ipsum",
        username: "Mini username",
        image: ""
      },
      location: "Event1 location",
      likes: 1_000_000,
      comments: 30_000,
      members: [
        {
          email: "correo@gmail.com",
          name: "Name User 1",
          description: "Lorem Ipsum",
          username: "Mini username",
          image: ""
        }
      ],
      date: new Date("2025-05-03T14:30"),
      tags: ["tag1", "tag2", "tag3"],
      price: 22.3
    },
    {
      name: "Workshop 2",
      description: "Un taller para aprender cosas nuevas",
      creator: {
        email: "ana@example.com",
        name: "Ana Torres",
        description: "Apasionada por la educación",
        username: "ana_t",
        image: ""
      },
      location: "Centro Cultural Norte",
      likes: 45,
      comments: 12,
      members: [
        {
          email: "ana@example.com",
          name: "Ana Torres",
          description: "Apasionada por la educación",
          username: "ana_t",
          image: ""
        },
        {
          email: "miguel@example.com",
          name: "Miguel Ruiz",
          description: "Estudiante de arte",
          username: "mikeruiz",
          image: ""
        }
      ],
      date: new Date("2025-06-10T09:00"),
      tags: ["taller", "creatividad", "manualidades"],
      price: 15.0
    },
    {
      name: "Tech Meetup",
      description: "Encuentro de desarrolladores web",
      creator: {
        email: "dev@example.com",
        name: "Carlos Pérez",
        description: "Fullstack developer",
        username: "carl_dev",
        image: ""
      },
      location: "Coworking Space Zona 3",
      likes: 150,
      comments: 89,
      members: [
        {
          email: "dev@example.com",
          name: "Carlos Pérez",
          description: "Fullstack developer",
          username: "carl_dev",
          image: ""
        },
        {
          email: "laura@example.com",
          name: "Laura Gómez",
          description: "Frontend enthusiast",
          username: "lau_front",
          image: ""
        },
        {
          email: "jose@example.com",
          name: "José Ramírez",
          description: "Backend specialist",
          username: "j_ramirez",
          image: ""
        }
      ],
      date: new Date("2025-07-20T18:00"),
      tags: ["tech", "networking", "javascript"],
      price: 0
    },
    {
      name: "Concierto Acústico",
      description: "Noche de música en vivo con artistas locales",
      creator: {
        email: "musiclover@example.com",
        name: "Lucía Fernández",
        description: "Cantante y organizadora de eventos",
        username: "lucia_music",
        image: ""
      },
      location: "Auditorio Parque Central",
      likes: 78,
      comments: 25,
      members: [
        {
          email: "musiclover@example.com",
          name: "Lucía Fernández",
          description: "Cantante y organizadora de eventos",
          username: "lucia_music",
          image: ""
        }
      ],
      date: new Date("2025-08-15T20:00"),
      tags: ["música", "acústico", "concierto"],
      price: 10.5
    }
  ];

  events : Event[] = this.events_source;
}
