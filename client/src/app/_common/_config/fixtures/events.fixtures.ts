import {
    CalendarEventBuilder,
    EventLocationBuilder,
    TraceBuilder,
} from '@/app/calendar-events/business/use-case/retrieve-events/__test__/calendar-event-builder'

const event1 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832181')
    .setTitle('Valsloppet VTT')
    .setDescription(
        `Le Cyclo Club Tricastin organise sa traditionnelle rando VTT nocturne : 10ème édition de la veillée des carriers !
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
    )
    .setStartDate(new Date('2024-08-25').toDateString())
    .setEndDate(new Date('2024-08-28').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Tartas')
            .setLatLon({ lat: 43.83205527398835, lon: -0.8093727373267132 })
            .setAddress('19 Av. du Casino')
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('cd7f541a-f111-470a-b2e3-6b2e095b1ccd')
            .setUtagawaId(12345)
            .setLink(
                'https://www.utagawavtt.com/randonnee-vtt-gps/Single-de-Tartas-et-balade-le-long-de-la-Midouze-5961',
            )
            .setDistance(47)
            .setPositiveElevation(550)
            .setTraceColor('blue')
            .build(),
    ])
    .setPrices([{ price: '5€ à 10€, gratuit moins 16ans' }])
    .setOrganizer({
        name: 'Jouques Génération Raid',
        email: 'contact@jouques-generation-raid.fr',
        website: 'https://www.jouques-generation-raid.fr',
        contacts: [{ name: 'Thierry Dupond', phone: '06 80 57 95 11' }],
    })
    .setServices([
        'VTTAE autorisés',
        'Une Tombola est organisée',
        'Buvette',
        'Parking gratuit',
        'Une plaque-vélo remise à chaque participant',
    ])
    .build()

const event2 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832182')
    .setTitle('Enduro du Vercors')
    .setDescription(
        `Plus fort, plus loin, plus fou
            PLM ULTRA: le PLM, mais ULTRA...
            Depuis 30 ans, les Sangliers du Vexin migrent de Pontoise à la Mer, par les chemins de traverse, en VTT, durant le WE de l'Ascension. Quelques centaines de km, bouclées en 4 jours, avec hébergement et transport de bagages. Une Rando grand tourisme. C'est le PLM...Classique.
            
            Et si vous repreniez ces chemins, cette fois ci en mode ultra, fin mai 2024? Ultra, c'est à dire solo en toute autonomie, sur un WE, sur votre monture avec un tracker gps et une trace, un ou des points de controle.
            
            PLM Ultra: L'aventure, le challenge de A à Z, "no support", dans des paysages magnifiques. Départ de nuit le vendredi, arrivée le dimanche.
            Une épreuve bikepacking en mode ultra tout terrain d'environ 280 km, avec un point de contrôle à mi parcours et un ravitaillement à l'arrivée, service bagagerie incus. Préparez vous. C'est le PLM Ultra ! Votre aventure...
            
            Une organisation Sangliers du Vexin.
            Ce n'est pas une compétition, c'est une aventure personnelle. Votre position sera publiée pour vos proches.`,
    )
    .setStartDate(new Date('2024-06-14').toDateString())
    .setEndDate(new Date('2024-06-14').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Albi')
            .setLatLon({ lat: 43.922621380148314, lon: 2.1485700393675473 })
            .setAddress('3 Rte de Chartreuse')
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('613d74d6-d87d-415f-835e-bcc042149096')
            .setUtagawaId(23456)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Les-2-chemins-de-St-Juery-7251')
            .setDistance(20)
            .setPositiveElevation(200)
            .build(),
        new TraceBuilder()
            .setId('078552e0-df80-4bd6-b45f-674e3fe2d68a')
            .setUtagawaId(34567)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Arthes-En-suivant-un-petit-ruisseau-15709')
            .setDistance(15)
            .setPositiveElevation(150)
            .setTraceColor('green')
            .build(),
        new TraceBuilder()
            .setId('f7c4ec97-ac65-4f67-8153-799ca98805b4')
            .setUtagawaId(45678)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Rando-Lo-Capial-2017-50-km-16773')
            .setDistance(50)
            .setPositiveElevation(600)
            .setTraceColor('red')
            .build(),
    ])
    .setPrices([{ price: 'Licenciés: 3€ à 7€' }, { price: 'Non Licenciés: 10€ à 15€' }])
    .setOrganizer({
        name: 'USM cyclo et vtt Marolles-en-Hurepoix et le Vtt club VéloVertFrancilien Brétigny-sur-Orge',
        email: 'https://www.instagram.com/la_nocturne_de_lobelisque/?',
    })
    .setServices(['VTTAE autorisés', 'Une Tombola est organisée', 'Buvette', 'Parking gratuit', 'Station de lavage'])
    .build()

const event3 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832183')
    .setTitle('Les Crapauds 24 heures VTT')
    .setDescription(
        `« Le Lot, la terre des merveilles » « le Lot, une surprise à chaque pas » autant de superlatifs que les publicistes ont mis en avant pour qualifier ce département. Le tracé de l’Ultra VTT Causses & Vallées Lot Dordogne se devait de montrer les différentes facettes des paysages de notre département. C'est tout naturellement qu'il a été décidé le dessiner dans l’enceinte du Parc naturel régional des Causses du Quercy, classé depuis 2017 Géoparc mondial UNESCO, au patrimoine géologique internationalement reconnu. L'Ultra VTT Causses & Vallées Lot Dordogne présente avec L’INTEGRAL (200km), l’épreuve VTT en ligne et en solo la plus longue de France et l’une des plus longues d’Europe. Il vous est également proposé le MINÉRAL (92km) ouvert aux VTT et VTTAE. Et pour ceux qui trouvent ces épreuves trop faciles, il y a L’XTREM Challenge (200 km VTT + 92 km Trail).`,
    )
    .setStartDate(new Date('2024-07-03').toDateString())
    .setEndDate(new Date('2024-07-04').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Cahors')
            .setLatLon({ lat: 44.447683200568534, lon: 1.4378868578584774 })
            .setAddress('253 Rte de la Gare')
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('2b7249bc-0421-45b0-bb9d-282712b9ced2')
            .setUtagawaId(56789)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Les-bords-du-Lot-5399')
            .setDistance(54)
            .setPositiveElevation(850)
            .setTraceColor('black')
            .build(),
        new TraceBuilder()
            .setId('b5d405a0-98fb-44e9-8e4c-3227ee2ab693')
            .setUtagawaId(67891)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Un-lot-de-vestiges-en-Vers-30857')
            .setDistance(43)
            .setTraceColor('red')
            .build(),
    ])
    .setPrices([{ price: '5€ pour les - 10ans' }, { price: '13€ pour les + 10ans' }, { price: '16€ sur place' }])
    .setOrganizer({
        name: 'ROCQUERCYNOIS',
        email: 'rocquercynois46@gmail.com',
        website: 'http://www.rocquercynois.fr',
        contacts: [
            { name: 'Bernard Lau', phone: '06 76 28 30 33' },
            { name: 'Olivier Masbou', phone: '06 80 57 95 11' },
        ],
    })
    .setServices(['VTTAE autorisés', 'Une Tombola est organisée', 'Buvette', 'Parking gratuit', 'Station de lavage'])
    .build()

const event4 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832184')
    .setTitle('ValsVertaco bike')
    .setDescription(
        `Fort de l’expérience acquise depuis plus de 12 ans et du succès grandissant de cet événement
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
    )
    .setStartDate(new Date('2024-11-17').toDateString())
    .setEndDate(new Date('2024-11-17').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Rambervillers')
            .setLatLon({ lat: 48.345867416163784, lon: 6.634133024680511 })
            .setAddress('253 Rte de la Gare')
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('ac5a4564-7533-4489-8066-e746d865e26c')
            .setUtagawaId(78912)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/La-Rambuvetaise-2017-20-km-15249')
            .setDistance(75)
            .setPositiveElevation(250)
            .setTraceColor('red')
            .build(),
        new TraceBuilder()
            .setId('9bc7dfb3-b0dd-42c2-90fc-96fd3c39bb7d')
            .setUtagawaId(89123)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Jeanmenil-Gondremer-par-Autrey-27716')
            .setDistance(34)
            .setPositiveElevation(120)
            .setTraceColor('blue')
            .build(),
    ])
    .setPrices([{ price: '10€ FFV - 12€' }])
    .setOrganizer({
        name: 'RCVV',
        email: 'cheminsdumont@outlook.fr',
        website: 'http://rcvv-lescheminsdumont.fr/',
    })
    .setServices(['VTTAE non autorisés', 'Parking sécurisé', 'Snack et Buvette'])
    .build()

const event5 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832185')
    .setTitle('Oeno-balade en Beaujolais')
    .setDescription(
        `TRI-LOISIRS DE MARGON
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
    )
    .setStartDate(new Date('2024-09-10').toDateString())
    .setEndDate(new Date('2024-09-12').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Le Mans')
            .setLatLon({ lat: 47.99607814018611, lon: 0.1961746266174072 })
            .setAddress("150 Chem. d' Orgeoise")
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('c40b7367-cddf-46d8-a072-c1fa23b99eaa')
            .setUtagawaId(91234)
            .setLink('https://www.utagawavtt.com/randonnee-vtt-gps/Le-Mans-sud-Pruille-le-Chetif-1770')
            .setDistance(22)
            .setPositiveElevation(300)
            .build(),
    ])
    .setPrices([
        { price: '7 € pour les licenciés' },
        { price: ' 10 € non licenciés' },
        { price: '16 € pour le 30 km chronométré' },
    ])
    .setOrganizer({
        name: 'Club Omnisport de Tarentaise',
        email: 'cotarentaise@gmail.com',
        website: 'http://www.cot-tarentaise.fr/',
        contacts: [{ name: 'Olivier Durant', phone: '06 56 25 47 89' }],
    })
    .setServices([
        'VTTAE autorisés',
        'Parking gratuit',
        'Inscription possible sur place',
        'Buvette',
        "Sandwich gratuit à l'arrivée",
    ])
    .build()

const event6 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832118')
    .setTitle('Expired Event')
    .setDescription(`blabla`)
    .setStartDate(new Date('2023-08-25').toDateString())
    .setEndDate(new Date('2023-08-28').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('YO NO SE')
            .setLatLon({ lat: 45.95104692578515, lon: 2.2642373313446584 })
            .setAddress('19 Av. du Casino')
            .build(),
    )
    .setTraces([
        new TraceBuilder()
            .setId('cd7f541a-f111-470a-b2e3-6b2e095b1ccd')
            .setUtagawaId(12345)
            .setLink(
                'https://www.utagawavtt.com/randonnee-vtt-gps/Single-de-Tartas-et-balade-le-long-de-la-Midouze-5961',
            )
            .setDistance(47)
            .setPositiveElevation(550)
            .setTraceColor('blue')
            .build(),
    ])
    .setPrices([{ price: '5€ à 10€, gratuit moins 16ans' }])
    .setOrganizer({
        name: 'Jouques Génération Raid',
        email: 'contact@jouques-generation-raid.fr',
        website: 'https://www.jouques-generation-raid.fr',
        contacts: [{ name: 'Thierry Dupond', phone: '06 80 57 95 11' }],
    })
    .setServices([
        'VTTAE autorisés',
        'Une Tombola est organisée',
        'Buvette',
        'Parking gratuit',
        'Une plaque-vélo remise à chaque participant',
    ])
    .build()

export const eventsFixtures = [event1, event2, event3, event4, event5, event6]
