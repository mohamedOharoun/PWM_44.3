import {Component} from '@angular/core';
import {GenericButtonComponent} from "../../components/generic-button/generic-button.component";
import {UsersListComponent} from "../../components/users-list/users-list.component";
import {ServiceFactory} from "../../services/service-factory.service";
import {UsersSearchInputComponent} from "../../components/users-search-input/users-search-input.component";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {FormsModule, NgForm} from "@angular/forms";
import {GroupService} from "../../../architecture/io/services/GroupService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-group-creation',
    imports: [
        GenericButtonComponent,
        UsersListComponent,
        UsersSearchInputComponent,
        FormsModule
    ],
    templateUrl: './group-creation.component.html',
    styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent {
    protected members: string[] = []
    protected image: string = "";
    protected name: string = "";
    protected groupID: string = "";
    protected editing: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.route.queryParams.subscribe(params => {
                if (params['groupID']) (this.serviceFactory.get('group') as GroupService).groupWith(params['groupID']).subscribe(res => {
                    this.name = res.name;
                    this.image = res.image ? res.image : 'icons/logo.svg';
                    this.members = res.members;
                    this.groupID = res.id!;
                    this.editing = true;
                })
                else this.members.push(res?.id!);
            });
        });
    }

    protected onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    protected onDrop(event: DragEvent) {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    protected handleFile(file: File) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.setImageValue(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    }

    protected triggerFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    }

    protected onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    private setImageValue(value: string) {
        this.image = value;
    }

    addMember(id: string) {
        this.members.push(id);
    }

    removeMember(id: string) {
        this.members = this.members.filter(m => m !== id);
    }

    createGroup(form: NgForm) {
        if (form.invalid || this.members.length < 2) return;
        (this.serviceFactory.get('group') as GroupService).create({
            creator: this.members[0],
            image: this.image,
            members: this.members,
            name: this.name
        });
        this.router.navigate(['/social/groups']).then();
    }

    updateGroup(form: NgForm) {
        if (form.invalid || this.members.length < 2) return;
        (this.serviceFactory.get('group') as GroupService).update({
            creator: this.members[0],
            image: this.image,
            members: this.members,
            name: this.name,
            id: this.groupID
        });
        this.router.navigate(['/social/groups']).then();
    }
}
