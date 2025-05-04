import {Component, ElementRef, ViewChild} from '@angular/core';
import {ReducedCardComponent} from '../../components/reduced-card/reduced-card.component';
import {Event} from '../../../architecture/model/Event';
import {ServiceFactory} from "../../services/service-factory.service";
import {EventService} from "../../../architecture/io/services/EventService";
import {EventMembersComponent} from "../../components/event-members/event-members.component";
import {GenericButtonComponent} from "../../components/generic-button/generic-button.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../../architecture/io/services/UserService";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-events',
    imports: [ReducedCardComponent, EventMembersComponent, GenericButtonComponent, RouterLink, FormsModule],
    templateUrl: './events.component.html',
    styleUrl: './events.component.css'
})
export class EventsComponent {
    protected events: Event[] = [];
    protected filteredEvents: Event[] = [];
    protected selectedEventID: string = "";
    protected isVisible: boolean = false;
    protected title: string = "Explore";
    protected loggedUserID!: string;

    @ViewChild('aside') private aside!: ElementRef;
    @ViewChild('toggle_button') private toggleButton!: ElementRef;

    constructor(
        private serviceFactory: ServiceFactory,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(res => {
            this.title = res.get('section')!;
            (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
                this.loggedUserID = res?.id!;
                (this.serviceFactory.get('event') as EventService).events().subscribe(res => {
                    const eventsResponse = res;
                    if (this.title === 'Favourite') {
                        (this.serviceFactory.get('user') as UserService).likedEventsOf(this.loggedUserID).subscribe(res => {
                            this.events = [...eventsResponse].filter(e => res.find(e2 => e2.id === e.id));
                            this.filterEvents('');
                        });
                    } else if (this.title === 'Joined') {
                        (this.serviceFactory.get('user') as UserService).joinedEventsOf(this.loggedUserID).subscribe(res => {
                            this.events = [...eventsResponse].filter(e => res.find(e2 => e2.id === e.id));
                            this.filterEvents('');
                        });
                    } else if (this.title === 'Owned') {
                        (this.serviceFactory.get('user') as UserService).ownedEventsOf(this.loggedUserID).subscribe(res => {
                            this.events = [...eventsResponse].filter(e => res.find(e2 => e2.id === e.id));
                            this.filterEvents('');
                        });
                    } else {
                        this.events = [...res];
                        this.filterEvents('');
                    }
                });
            });
        });
    }

    protected close() {
        this.isVisible = false;
        this.selectedEventID = "";
    }

    openWith(id: string) {
        this.selectedEventID = id;
        this.isVisible = true;
    }

    protected filterEvents(name: string) {
        this.filteredEvents = this.events.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    }

    toggleAside() {
        this.aside.nativeElement.classList.toggle('active');
        this.toggleButton.nativeElement.classList.toggle('active');
    }
}
