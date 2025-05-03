import {Component} from '@angular/core';
import {GenericButtonComponent} from "../../components/generic-button/generic-button.component";
import {UsersListComponent} from "../../components/users-list/users-list.component";
import {User} from "../../../architecture/model/User";
import {ServiceFactory} from "../../services/service-factory.service";
import {UsersSearchInputComponent} from "../../components/users-search-input/users-search-input.component";

@Component({
    selector: 'app-group-creation',
    imports: [
        GenericButtonComponent,
        UsersListComponent,
        UsersSearchInputComponent
    ],
    templateUrl: './group-creation.component.html',
    styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent {
    protected members: User[] = []
    protected image: string = "";
    protected isUserListVisible: boolean = false;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
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

    showUsersList() {
        this.isUserListVisible = true;
    }

    hideUsersList() {
        this.isUserListVisible = false;
    }

    addMember(user: User) {
        this.members.push(user);
        this.isUserListVisible = true;
    }
}
