import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [AccordionModule, CommonModule, AnimateOnScroll],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  sections = [
    {
      title: 'Général & Fonctionnement',
      tabs: [
        {
          title: "Qu'est-ce que SimSwap ?",
          content:
            "SimSwap est une application de face swap basée sur l'IA permettant de remplacer un visage sur une image ou une vidéo de façon réaliste.",
          value: '0',
        },
        {
          title: 'Comment fonctionne le face swap ?',
          content:
            'Notre IA analyse les traits du visage pour effectuer une fusion naturelle et réaliste.',
          value: '1',
        },
        {
          title: 'Dois-je créer un compte ?',
          content:
            'Oui, un compte est requis afin de sécuriser vos données et gérer vos créations.',
          value: '2',
        },
      ],
    },
    {
      title: 'Abonnements & Paiements',
      tabs: [
        {
          title: 'Quels abonnements proposez-vous ?',
          content:
            'Nous proposons des abonnements mensuels et annuels avec des fonctionnalités premium.',
          value: '0',
        },
        {
          title: 'Les paiements sont-ils sécurisés ?',
          content:
            'Oui, tous les paiements sont gérés via Stripe et sont entièrement sécurisés.',
          value: '1',
        },
        {
          title: 'Puis-je annuler mon abonnement ?',
          content:
            "Oui, l'annulation est possible à tout moment depuis votre espace personnel.",
          value: '2',
        },
      ],
    },
    {
      title: 'Sécurité, légalité & confidentialité',
      tabs: [
        {
          title: 'Mes données personnelles sont-elles protégées ?',
          content:
            'Oui, SimSwap applique des mesures de sécurité strictes pour protéger vos données et respecter la confidentialité des utilisateurs.',
          value: '0',
        },
        {
          title: 'SimSwap est-il conforme au RGPD ?',
          content:
            'Oui, nous respectons le RGPD. Vous pouvez demander la suppression de vos données à tout moment.',
          value: '1',
        },
        {
          title: 'Puis-je utiliser SimSwap avec des visages de tiers ?',
          content:
            "Vous devez disposer du consentement explicite de la personne concernée avant d'utiliser son visage.",
          value: '2',
        },
        {
          title: "L'utilisation de célébrités est-elle autorisée ?",
          content:
            "L'utilisation de visages de célébrités sans autorisation est interdite. SimSwap encourage un usage responsable et légal.",
          value: '3',
        },
      ],
    },
  ];




  // tabs = [
  //   { title: 'Title 1', content: 'Content 1', value: '0' },
  //   { title: 'Title 2', content: 'Content 2', value: '1' },
  //   { title: 'Title 3', content: 'Content 3', value: '2' },
  // ];
  // tabs2 = [
  //   { title: 'Title 1', content: 'Content 1', value: '0' },
  //   { title: 'Title 2', content: 'Content 2', value: '1' },
  //   { title: 'Title 3', content: 'Content 3', value: '2' },
  // ];
}
