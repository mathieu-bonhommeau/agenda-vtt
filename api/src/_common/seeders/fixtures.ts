import {
    arbitraryCalendarEvent,
    arbitraryEventLocation,
    arbitraryEventOrganizer,
    arbitraryTrace,
} from '../helpers/event-factories.helpers'
import { faker } from '@faker-js/faker'

export const eventsFixtures = [
    arbitraryCalendarEvent({
        title: 'Valsloppet VTT',
        description: `Le Cyclo Club Tricastin organise sa traditionnelle rando VTT nocturne : 10ème édition de la veillée des carriers !
            Vous aurez le choix entre de la marche et du VTT nocturne, à la carte :
            - VTT : 2 boucles, d’environ 10km et 19km
             - MARCHE : 2 boucles, d’environ 5km et 9km.
            Inscriptions à partir de 19h15, et départs libres entre 19h30 et 21h30, depuis les caves cathédrales du Mas Théo, sur le plateau de St Restitut.
             Tarifs :
             VTT: 7 euros licenciés FFCT, 9 euros les autres;
             Marche: 7 euros;
            Gratuit pour les moins de 14 ans, et pour les moins de 18 ans (si FFCT)
            Port du casque et des éclairages très fortement recommandé !
             Ravitaillement sur les parcours, et la traditionnelle soupe à l’oignon / croutons à l’arrivée.
             Vous êtes sur un massif où les sentiers sont très ludiques, mais aussi parfois techniques et physiques (poussages, passages plus techniques …) : les parcours sont le reflet du massif, et vous aurez l’occasion de découvrir quelques uns des plus jolis sentiers du massif, à la tombée de la nuit, au milieu dans anciennes carrières, avec les premières senteurs estivales ! ambiance garantie !
            
            Attention : nous allons lancer cette année une très forte action de réduction des déchets, en supprimant la distribution de gobelets aux ravitaillements. Pensez donc à vous munir de vos propres gobelets (réutilisés bien entendu) !!`,
        createdAt: faker.date.past(),
        startDate: new Date('2024-08-25'),
        endDate: new Date('2024-08-28'),
        eventLocation: arbitraryEventLocation({
            city: 'Tartas',
            region: 'Nouvelle Aquitaine',
            county: 'Landes',
            postcode: '40000',
            latLon: { lat: 43.83205527398835, lon: -0.8093727373267132 },
            address: '19 Av. du Casino',
        }),
        traces: [
            arbitraryTrace({
                utagawaId: 5961,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Single-de-Tartas-et-balade-le-long-de-la-Midouze-5961',
                distance: 47,
                positiveElevation: 550,
                traceColor: 'blue',
            }),
        ],
        prices: ['5€ à 10€, gratuit moins 16ans'],
        services: [
            'VTTAE autorisés',
            'Une Tombola est organisée',
            'Buvette',
            'Parking gratuit',
            'Une plaque-vélo remise à chaque participant',
        ],
        organizer: arbitraryEventOrganizer({
            name: 'Jouques Génération Raid',
            email: 'contact@jouques-generation-raid.fr',
            website: 'https://www.jouques-generation-raid.fr',
            contacts: [{ name: 'Thierry Dupond', phone: '06 80 57 95 11' }],
        }),
    }),
    arbitraryCalendarEvent({
        title: 'Enduro du Vercors',
        description: `Plus fort, plus loin, plus fou
            PLM ULTRA: le PLM, mais ULTRA...
            Depuis 30 ans, les Sangliers du Vexin migrent de Pontoise à la Mer, par les chemins de traverse, en VTT, durant le WE de l'Ascension. Quelques centaines de km, bouclées en 4 jours, avec hébergement et transport de bagages. Une Rando grand tourisme. C'est le PLM...Classique.
            
            Et si vous repreniez ces chemins, cette fois ci en mode ultra, fin mai 2024? Ultra, c'est à dire solo en toute autonomie, sur un WE, sur votre monture avec un tracker gps et une trace, un ou des points de controle.
            
            PLM Ultra: L'aventure, le challenge de A à Z, "no support", dans des paysages magnifiques. Départ de nuit le vendredi, arrivée le dimanche.
            Une épreuve bikepacking en mode ultra tout terrain d'environ 280 km, avec un point de contrôle à mi parcours et un ravitaillement à l'arrivée, service bagagerie incus. Préparez vous. C'est le PLM Ultra ! Votre aventure...
            
            Une organisation Sangliers du Vexin.
            Ce n'est pas une compétition, c'est une aventure personnelle. Votre position sera publiée pour vos proches.`,
        createdAt: faker.date.past(),
        startDate: new Date('2024-10-14'),
        endDate: new Date('2024-10-14'),
        eventLocation: arbitraryEventLocation({
            city: 'Albi',
            region: 'Occitanie',
            county: 'Var',
            postcode: '13542',
            latLon: { lat: 43.922621380148314, lon: 2.1485700393675473 },
            address: '3 Rte de Chartreuse',
        }),
        traces: [
            arbitraryTrace({
                utagawaId: 7251,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Les-2-chemins-de-St-Juery-7251',
                distance: 20,
                positiveElevation: 200,
            }),
            arbitraryTrace({
                utagawaId: 15709,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Arthes-En-suivant-un-petit-ruisseau-15709',
                distance: 15,
                positiveElevation: 150,
                traceColor: 'green',
            }),
            arbitraryTrace({
                utagawaId: 16773,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Rando-Lo-Capial-2017-50-km-16773',
                distance: 50,
                positiveElevation: 600,
                traceColor: 'red',
            }),
        ],
        prices: ['Licenciés: 3€ à 7€', 'Non Licenciés: 10€ à 15€'],
        services: ['VTTAE autorisés', 'Une Tombola est organisée', 'Buvette', 'Parking gratuit', 'Station de lavage'],
        organizer: arbitraryEventOrganizer({
            name: 'USM cyclo et vtt Marolles-en-Hurepoix et le Vtt club VéloVertFrancilien Brétigny-sur-Orge',
            email: 'https://www.instagram.com/la_nocturne_de_lobelisque/?',
        }),
    }),
    arbitraryCalendarEvent({
        title: 'Les Crapauds 24 heures VTT',
        description: `« Le Lot, la terre des merveilles » « le Lot, une surprise à chaque pas » autant de superlatifs que les publicistes ont mis en avant pour qualifier ce département. Le tracé de l’Ultra VTT Causses & Vallées Lot Dordogne se devait de montrer les différentes facettes des paysages de notre département. C'est tout naturellement qu'il a été décidé le dessiner dans l’enceinte du Parc naturel régional des Causses du Quercy, classé depuis 2017 Géoparc mondial UNESCO, au patrimoine géologique internationalement reconnu. L'Ultra VTT Causses & Vallées Lot Dordogne présente avec L’INTEGRAL (200km), l’épreuve VTT en ligne et en solo la plus longue de France et l’une des plus longues d’Europe. Il vous est également proposé le MINÉRAL (92km) ouvert aux VTT et VTTAE. Et pour ceux qui trouvent ces épreuves trop faciles, il y a L’XTREM Challenge (200 km VTT + 92 km Trail).`,
        createdAt: faker.date.past(),
        startDate: new Date('2024-09-03'),
        endDate: new Date('2024-09-04'),
        eventLocation: arbitraryEventLocation({
            city: 'Cahors',
            region: 'Pays de la loire',
            county: 'Loir et Cher',
            postcode: '58475',
            latLon: { lat: 44.447683200568534, lon: 1.4378868578584774 },
            address: '253 Rte de la Gare',
        }),
        traces: [
            arbitraryTrace({
                utagawaId: 5399,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Les-bords-du-Lot-5399',
                distance: 54,
                positiveElevation: 850,
                traceColor: 'black',
            }),
            arbitraryTrace({
                utagawaId: 30857,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Un-lot-de-vestiges-en-Vers-30857',
                distance: 43,
                traceColor: 'red',
            }),
        ],
        prices: ['5€ pour les - 10ans', '13€ pour les + 10ans', '16€ sur place'],
        services: ['VTTAE autorisés', 'Une Tombola est organisée', 'Buvette', 'Parking gratuit', 'Station de lavage'],
        organizer: arbitraryEventOrganizer({
            name: 'ROCQUERCYNOIS',
            email: 'rocquercynois46@gmail.com',
            website: 'http://www.rocquercynois.fr',
            contacts: [
                { name: 'Bernard Lau', phone: '06 76 28 30 33' },
                { name: 'Olivier Masbou', phone: '06 80 57 95 11' },
            ],
        }),
    }),
    arbitraryCalendarEvent({
        title: 'ValsVertaco bike',
        description: `Fort de l’expérience acquise depuis plus de 12 ans et du succès grandissant de cet événement
             VTT CSO organise sa traditionnelle randonnée annuelle VTT le 26/05/2024 pour ça 13éme édition
             Cette année nous vous proposons une édition sous la forme d’un trèfle avec 3 parcours:
            un bleu de 22 km avec 350 de D+
            un rouge de 23 km avec 400 de D+
            et un noir de 22 km avec 350 de D+
            Bien entendu tout les parcours sont cumulables 
             
             Ces parcours alternent entre nombreux singles en sous bois et vues panoramiques au milieu du vignoble champenois
            Départ libre dès 8h place de la halle à Bar sur seine
            
             Bière offerte à l’arrivée
            Les inscriptions se feront sur FACEBOOK VTT CSO via la billeterie en ligne ou sur place dès 7h30.
             Suivez nous sur notre page Facebook VTT CSO`,
        createdAt: faker.date.past(),
        startDate: new Date('2024-11-17'),
        endDate: new Date('2024-11-17'),
        eventLocation: arbitraryEventLocation({
            city: 'Rambervillers',
            region: 'Ile de France',
            county: 'Yvelines',
            postcode: '75023',
            latLon: { lat: 48.345867416163784, lon: 6.634133024680511 },
            address: '253 Rte de la Gare',
        }),
        traces: [
            arbitraryTrace({
                utagawaId: 15249,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/La-Rambuvetaise-2017-20-km-15249',
                distance: 75,
                positiveElevation: 250,
                traceColor: 'red',
            }),
            arbitraryTrace({
                utagawaId: 27716,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Jeanmenil-Gondremer-par-Autrey-27716',
                distance: 34,
                positiveElevation: 120,
                traceColor: 'blue',
            }),
        ],
        prices: ['10€ FFV - 12€'],
        services: ['VTTAE non autorisés', 'Parking sécurisé', 'Snack et Buvette'],
        organizer: arbitraryEventOrganizer({
            name: 'RCVV',
            email: 'cheminsdumont@outlook.fr',
            website: 'http://rcvv-lescheminsdumont.fr/',
        }),
    }),
    arbitraryCalendarEvent({
        title: 'Oeno-balade en Beaujolais',
        description: `TRI-LOISIRS DE MARGON
         Course à pied 3 kms
         VTT 22 kms 
         Canoë 1 kms
        2 VERSIONS
         Avec classement licence ou formulaire santé obligatoire âge minimum 16 ans
         Hors classement sous forme de randonnée ouvert à tous à partir de 10 ans
        Engagement par équipe : Prix 25 € + 5€ sur place
         Autres renseignements: Site Facebook: (https://www.facebook.com/C.S.MARGON)Nous contacter: c.s.margon@wanadoo.fr
        Inscription: https://inscriptions.ufolep.org/tri-loisirs-margonnais-2024/
        DEPART 9 H 00 AU PLAN D’EAU DE MARGON PAR EQUIPE DE DEUX
        Avec l’aimable participation des AMBULANCES CHARLES`,
        createdAt: faker.date.past(),
        startDate: new Date('2024-09-10'),
        endDate: new Date('2024-09-12'),
        eventLocation: arbitraryEventLocation({
            city: 'Le Mans',
            region: 'Bretagne',
            county: 'Morbihan',
            postcode: '13478',
            latLon: { lat: 47.99607814018611, lon: 0.1961746266174072 },
            address: "150 Chem. d' Orgeoise",
        }),
        traces: [
            arbitraryTrace({
                utagawaId: 1770,
                link: 'https://www.utagawavtt.com/randonnee-vtt-gps/Le-Mans-sud-Pruille-le-Chetif-1770',
                distance: 22,
                positiveElevation: 300,
            }),
        ],
        prices: ['7 € pour les licenciés', '10 € non licenciés', '16 € pour le 30 km chronométré'],
        services: [
            'VTTAE autorisés',
            'Parking gratuit',
            'Inscription possible sur place',
            'Buvette',
            "Sandwich gratuit à l'arrivée",
        ],
        organizer: arbitraryEventOrganizer({
            name: 'Club Omnisport de Tarentaise',
            email: 'cotarentaise@gmail.com',
            website: 'http://www.cot-tarentaise.fr/',
            contacts: [{ name: 'Olivier Durant', phone: '06 56 25 47 89' }],
        }),
    }),
]
