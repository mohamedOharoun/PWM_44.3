import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericButtonComponent} from '../generic-button/generic-button.component';
import {ServiceFactory} from "../../services/service-factory.service";
import {UserService} from "../../../architecture/io/services/UserService";
import {EventService} from "../../../architecture/io/services/EventService";
import { Event } from "../../../architecture/model/Event";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {DatabaseService} from "../../services/database.service";

@Component({
    selector: 'app-reduced-card',
    imports: [
        GenericButtonComponent
    ],
    templateUrl: './reduced-card.component.html',
    styleUrl: './reduced-card.component.css'
})
export class ReducedCardComponent {
    icons = {
        report: 'icons/report_icon.svg',
        share: 'icons/share_icon.svg',

        date: 'icons/clock_icon.svg',
        place: 'icons/location_icon.svg',
        price: 'icons/money_icon.svg',

        like: 'icons/heart_icon.svg',
        filled_like: 'icons/filled_heart_icon.svg',
        square: 'icons/square_message_icon.svg',

        participants: 'icons/participants_icon.svg',

        edit: 'icons/edit_icon.svg',
        remove: 'icons/bin_icon.svg'
    }

    @Input() eventID!: string;
    @Output() openMembersListEmitter = new EventEmitter<string>();
    @Output() unlikeEvent = new EventEmitter<string>();

    protected event!: Event;
    protected eventCreator: string = "";
    protected loggedUserID!: string;
    protected isLiked: boolean = false;
    protected isJoined: boolean = false;
    protected isOwned: boolean = false;

    constructor(
        private serviceFactory: ServiceFactory,
        private databaseService: DatabaseService
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('event') as EventService).eventWith(this.eventID).subscribe(res => {
            this.event = res;
            (this.serviceFactory.get('user') as UserService).userWith(res.creator).subscribe(res => this.eventCreator = res.username);
            (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
                this.loggedUserID = res?.id!;
                this.databaseService.isFavorite(this.eventID).then(res => this.isLiked = res);
                (this.serviceFactory.get('event') as EventService).isJoinedEvent(this.eventID, this.loggedUserID).subscribe(res => this.isJoined = res);
                this.isOwned = this.loggedUserID === this.event.creator;
            });
        });
    }

    parseDateTimeLocal(timestamp: string): string {
        const date = new Date(timestamp);

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const timeString = `${hours}:${minutes}`;

        return `${dayOfWeek} ${dayOfMonth}, ${month} ${timeString}`;
    }

    priceFormat(): string {
        return (this.event.price  === 0) ? 'FREE' : `$${this.event.price}`;
    }

    compactNumbers(number: number) {
        if (number <= 999) return number;
        if (number <= 999_999) return Math.floor(number / 1000) + "K";
        return Math.floor(number / 1_000_000) + "M";
    }

    protected openMembersList() {
        this.openMembersListEmitter.emit(this.eventID);
    }

    protected toggleLike() {
        if (!this.isLiked) {
            this.databaseService.addFavorite(this.event);
        } else {
            this.databaseService.removeFavorite(this.event.id!);
            this.unlikeEvent.emit(this.event.id);
        }
        this.isLiked = !this.isLiked;
    }

    toggleJoin() {
        if (!this.isJoined) (this.serviceFactory.get('event') as EventService).joinEvent(this.event, this.loggedUserID);
        else (this.serviceFactory.get('event') as EventService).leaveEvent(this.event, this.loggedUserID);
    }

    removeEvent() {
        (this.serviceFactory.get('event') as EventService).removeEventGiven(this.eventID);
    }
}
