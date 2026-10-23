import type { ValueTypeContent } from '../../../types/profile'

const fr: ValueTypeContent = {
  label: 'Votre type de valeurs',
  types: {
    'justice-freedom': {
      name: 'Éclaireur de l’aube',
      tagline: 'Vous croyez que les règles doivent protéger la liberté, pas l’étouffer.',
    },
    'justice-life': {
      name: 'Arbitre au flambeau',
      tagline: 'Vous acceptez de remettre la règle en balance pour sauver une vie.',
    },
    'justice-family': {
      name: 'Juste du foyer',
      tagline: 'Vous voulez que les vôtres soient jugés avec la même balance.',
    },
    'justice-faith': {
      name: 'Chevalier du serment',
      tagline: 'Vous tirez votre justice de votre foi, et vous agissez pour elle.',
    },
    'justice-truth': {
      name: 'Arbitre au miroir',
      tagline: 'Vous cherchez d’abord les faits avant de désigner un responsable.',
    },
    'justice-loyalty': {
      name: 'Épée des compagnons',
      tagline: 'Vous défendez les vôtres sans jamais trahir le sens du juste.',
    },
    'justice-safety': {
      name: 'Sentinelle des remparts',
      tagline: 'Vous protégez l’ordre, mais aussi les personnes qu’il abrite.',
    },
    'justice-environment': {
      name: 'Arbitre des forêts',
      tagline: 'Vous intégrez le prix de la nature dans le calcul de la justice.',
    },
    'justice-contract': {
      name: 'Gardien du sceau',
      tagline: 'Vous croyez qu’une promesse écrite doit tenir à l’épreuve.',
    },
    'freedom-life': {
      name: 'Chasseur de lumière',
      tagline: 'Vous ne sacrifiez pas le goût de vivre à la sécurité.',
    },
    'freedom-family': {
      name: 'Gardien du fil',
      tagline: 'Vous voulez voler loin, sans oublier qui tient le fil.',
    },
    'freedom-faith': {
      name: 'Pèlerin de la lumière',
      tagline: 'Vous donnez un cap à votre liberté : la lumière en laquelle vous croyez.',
    },
    'freedom-truth': {
      name: 'Marcheur du brouillard',
      tagline: 'Vous préférez entrer seul dans le brouillard pour voir la vérité.',
    },
    'freedom-loyalty': {
      name: 'Compagnon de route',
      tagline: 'Rien ne vous enferme, mais vous restez pour vos compagnons.',
    },
    'freedom-safety': {
      name: 'Sentinelle des vents',
      tagline: 'Vous gardez la frontière, et la liberté qu’elle protège.',
    },
    'freedom-environment': {
      name: 'Arpenteur des cimes',
      tagline: 'Vous vous sentez vous-même en pleine nature, sans vouloir la troubler.',
    },
    'freedom-contract': {
      name: 'Signataire sans chaînes',
      tagline: 'Vous refusez qu’on vous dirige, mais vous tenez parole une fois signé.',
    },
    'life-family': {
      name: 'Gardien du foyer',
      tagline: 'Vous donnez à votre vie la forme concrète de la sécurité des vôtres.',
    },
    'life-faith': {
      name: 'Enfant de la lumière',
      tagline: 'Vous croyez que la vie a une direction et une lumière à attendre.',
    },
    'life-truth': {
      name: 'Chercheur à la lame',
      tagline: 'Pour connaître la vérité, vous acceptez d’ouvrir ce qui fait mal.',
    },
    'life-loyalty': {
      name: 'Protecteur des siens',
      tagline: 'Vous protégez les proches, et vous laissez une chance aux inconnus.',
    },
    'life-safety': {
      name: 'Sentinelle de vie',
      tagline: 'Vous tracez une ligne rouge simple : que personne d’autre ne meure.',
    },
    'life-environment': {
      name: 'Nourricier des bois',
      tagline: 'Vous ne pensez pas seulement à vivre aujourd’hui, mais à vivre demain.',
    },
    'life-contract': {
      name: 'Gardien du pacte vital',
      tagline: 'Vous protégez la vie au moyen d’accords clairs et tenus.',
    },
    'family-faith': {
      name: 'Pèlerin du foyer',
      tagline: 'Vous vivez votre foi au quotidien, comme une lampe pour les vôtres.',
    },
    'family-truth': {
      name: 'Veilleur du retour',
      tagline: 'Vous affrontez la vérité pour les vôtres, et les vôtres pour la vérité.',
    },
    'family-loyalty': {
      name: 'Gardien du lignage',
      tagline: 'Vous tenez une promesse faite aux vôtres plus qu’un engagement public.',
    },
    'family-safety': {
      name: 'Sentinelle du toit',
      tagline: 'Ce que vous gardez n’est pas une maison, mais ceux qui l’habitent.',
    },
    'family-environment': {
      name: 'Gardien du sol natal',
      tagline: 'Vous voulez aussi laisser à vos enfants la terre sous leurs pieds.',
    },
    'family-contract': {
      name: 'Scribe du foyer',
      tagline: 'Vous tenez les accords de votre famille pour gravés dans la pierre.',
    },
    'faith-truth': {
      name: 'Pèlerin de vérité',
      tagline: 'Vous cherchez une vérité qui résiste à l’épreuve de vos convictions.',
    },
    'faith-loyalty': {
      name: 'Compagnon du serment',
      tagline: 'Vous faites de votre loyauté une promesse dite, pas une habitude.',
    },
    'faith-safety': {
      name: 'Sentinelle sacrée',
      tagline: 'En veillant sur l’ordre, vous veillez aussi sur votre lumière.',
    },
    'faith-environment': {
      name: 'Pèlerin des forêts',
      tagline: 'Dans l’ordre du vivant, vous retrouvez ce en quoi vous croyez.',
    },
    'faith-contract': {
      name: 'Graveur de serments',
      tagline: 'Vous croyez que certaines promesses, une fois faites, ne se reprennent pas.',
    },
    'truth-loyalty': {
      name: 'Compagnon de vérité',
      tagline: 'Vous accompagnez vos amis jusqu’au bout, sans fermer les yeux.',
    },
    'truth-safety': {
      name: 'Sentinelle de vérité',
      tagline: 'Vous préférez donner l’alerte plutôt que laisser cacher le danger.',
    },
    'truth-environment': {
      name: 'Interprète du silence',
      tagline: 'Dans le silence de la nature, vous cherchez ce que l’humanité doit savoir.',
    },
    'truth-contract': {
      name: 'Notaire de vérité',
      tagline: 'Vous exigez des accords lisibles et des faits jamais retouchés.',
    },
    'loyalty-safety': {
      name: 'Fidèle des remparts',
      tagline: 'Là où vous avez promis de rester, vous ne partez pas la nuit.',
    },
    'loyalty-environment': {
      name: 'Ami des forêts',
      tagline: 'Vous aimez la terre comme un vieil ami, d’un attachement qui dure.',
    },
    'loyalty-contract': {
      name: 'Fidèle à la parole',
      tagline: 'Vous promettez peu, mais une fois la promesse faite, vous la tenez.',
    },
    'safety-environment': {
      name: 'Veilleur de la terre',
      tagline: 'Vous protégez les gens, et la terre dont ils dépendent.',
    },
    'safety-contract': {
      name: 'Veilleur de la règle',
      tagline: 'Pour vous, des règles claires sont le premier rempart contre le désastre.',
    },
    'environment-contract': {
      name: 'Signataire des forêts',
      tagline: 'Vous signez au nom de ceux qui n’ont pas de voix.',
    },
  },
}

export default fr
