import {Component} from '@angular/core';
import {GenericButtonComponent} from "../../components/generic-button/generic-button.component";
import {UsersListComponent} from "../../components/users-list/users-list.component";
import {User} from "../../model/User";
import {Group} from "../../model/Group";

@Component({
    selector: 'app-group-creation',
    imports: [
        GenericButtonComponent,
        UsersListComponent
    ],
    templateUrl: './group-creation.component.html',
    styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent {
    protected members: User[] = [
        {
            email: "string",
            name: "string",
            username: "string",
            description: "string",
            image: "string",
            friends: [],
            pending: [],
            sentRequests: [],
            blocked: [],
            groups: []
        },
        {
            email: "string",
            name: "string",
            username: "string",
            description: "string",
            image: "string",
            friends: [],
            pending: [],
            sentRequests: [],
            blocked: [],
            groups: []
        },
        {
            email: "string",
            name: "string",
            username: "string",
            description: "string",
            image: "string",
            friends: [],
            pending: [],
            sentRequests: [],
            blocked: [],
            groups: []
        },
        {
            email: "string",
            name: "string",
            username: "string",
            description: "string",
            image: "string",
            friends: [],
            pending: [],
            sentRequests: [],
            blocked: [],
            groups: []
        },
        {
            email: "string",
            name: "string",
            username: "string",
            description: "string",
            image: "string",
            friends: [],
            pending: [],
            sentRequests: [],
            blocked: [],
            groups: []
        }
    ]
    protected image: string = "";

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
}
