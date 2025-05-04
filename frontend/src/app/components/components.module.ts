import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormComponent } from "./form/form.component";

@NgModule({
  declarations: [FormComponent],
    exports: [FormComponent],
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})

export class ComponentsModule{}