import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';

@Component({
  selector: 'app-process-timeline',
  imports: [Timeline],
  templateUrl: './process-timeline.html',
  styleUrl: './process-timeline.css',
})
export class ProcessTimeline {
events: any[];

    constructor() {
        this.events = [
            { 
                title: 'Rejoignez FaceSwap', 
                description: 'Créez votre compte en quelques secondes et accédez à notre interface intuitive.'
            },
            { 
                title: 'Choisissez votre forfait', 
                description: "Sélectionnez l'abonnement qui correspond à vos besoins pour débloquer la puissance de notre IA."
            },
            { 
                title: 'Préparez le Swap', 
                description: "Importez votre photo source et choisissez l'image de destination."
            },
            { 
                title: 'Lancez la magie', 
                description: "L'IA traite votre demande instantanément. Admirez et téléchargez votre création HD !"
            },
        ];
    }
}
