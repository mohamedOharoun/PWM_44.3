import {Component, Input} from '@angular/core';
import {Group} from "../../../../architecture/model/Group";
import {ServiceFactory} from "../../../services/service-factory.service";
import {GroupService} from "../../../../architecture/io/services/GroupService";
import {Router} from "@angular/router";

@Component({
    selector: 'app-group-card',
    imports: [],
    templateUrl: './group-card.component.html',
    styleUrl: '../social-cards.css'
})
export class GroupCardComponent {
    @Input() groupID!: string;
    protected group!: Group;

    constructor(
        private serviceFactory: ServiceFactory,
        private router: Router
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('group') as GroupService).groupWith(this.groupID).subscribe(res => this.group = res);
    }

    removeGroup() {
        (this.serviceFactory.get('group') as GroupService).removeWith(this.groupID);
    }

    editGroup() {
        this.router.navigate(['/group_creation'], {queryParams: {'groupID': this.groupID}}).then();
    }
}
