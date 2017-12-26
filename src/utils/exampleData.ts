/* tslint:disable:max-line-length */

import { StoreState } from '../store'

const uuids = {
  category:
  {
    reactnative: 'e2f049c8-03c2-4d9f-a374-eef12624cf59',
    life: '51903ae7-8261-4b42-a5e4-a1655d9b3883',
  },
  serie: {
    cooking: '6cfee3a8-577c-4e1f-b7b6-d6a55da3fabc',
    awesomern: '3598bc0f-5498-4480-a9b3-fb4926e9c4d3',
    react: '82c74f31-fb63-4169-b659-4f35ac67f03b',
  },
  cards: {
    pepper: 'bae162fd-d1e7-40ba-b580-66fa31663798',
    pizza: '139b5951-d9f6-4017-8362-695a5545ef3f',
    pizza_day: '31e43956-3a19-49c9-a67b-50a396fe34fa',
    r_jss: '2185f5e8-8747-4f81-8cdc-8ce40eb74283',
    r_jslib: 'e2b7d149-ed59-45c7-a089-d1e82a372185',
    r_yeah: '3bd7519e-ffe7-48f6-a6e3-ef6078aafb2c',
  },
}

export const exampleData: StoreState = {
  cards: {
    [uuids.cards.pepper]: {
      id: uuids.cards.pepper,
      seriesId: uuids.serie.cooking,
      date: 1513767433,
      question: 'According to the children song, when a gingerbreadbaker bakes gingerbreads, how much pepper does he use?',
      points: 70,
      options: [
        {
          displayText: 'A tablespoon',
          correct: false
        },
        {
          displayText: 'A kg',
          correct: false
        },
        {
          displayText: 'No pepper',
          correct: false
        },
        {
          displayText: 'A teaspoon',
          correct: true
        },
      ]
    },
    [uuids.cards.pizza]: {
      id: uuids.cards.pizza,
      seriesId: uuids.serie.cooking,
      date: 1513267033,
      question: 'How much pizza do the Americans consume per second?',
      points: 70,
      options: [
        {
          displayText: 'Americans and pizza? Only Italians eat pizza',
          correct: false
        },
        {
          displayText: '100 slices',
          correct: false
        },
        {
          displayText: '550 slices',
          correct: false
        },
        {
          displayText: '350 slices',
          correct: true
        },
      ]
    },
    [uuids.cards.pizza]: {
      id: uuids.cards.pizza,
      seriesId: uuids.serie.cooking,
      date: 1513267033,
      question: 'How much pizza do the Americans consume per second?',
      points: 70,
      options: [
        {
          displayText: 'Americans and pizza? Only Italians eat pizza',
          correct: false
        },
        {
          displayText: '100 slices',
          correct: false
        },
        {
          displayText: '550 slices',
          correct: false
        },
        {
          displayText: '350 slices',
          correct: true
        },
      ]
    },
    [uuids.cards.pizza_day]: {
      id: uuids.cards.pizza_day,
      seriesId: uuids.serie.cooking,
      date: 1323704833,
      question: 'What is the most popular day of the week to order pizza?',
      points: 70,
      options: [
        {
          displayText: 'Monday, nobody wants to go hungry on a Monday',
          correct: false
        },
        {
          displayText: 'Wednesday, because who can bother with cooking',
          correct: false
        },
        {
          displayText: 'Sunday, no work on sunday',
          correct: false
        },
        {
          displayText: 'Saturday, PARTYPARTY',
          correct: true
        },
      ]
    },
    [uuids.cards.r_jslib]: {
      id: uuids.cards.r_jslib,
      seriesId: uuids.serie.react,
      date: 1323704833,
      question: 'Do JavaScript-libraries work in React Native?',
      points: 70,
      options: [
        {
          displayText: 'No, React only uses BASIC, so only BASIC-libraries.',
          correct: false
        },
        {
          displayText: 'Yes, it is just JS, afterall.',
          correct: true
        },
        {
          displayText: 'Yes, but they need to be recompiled into BASIC',
          correct: false
        },
        {
          displayText: 'Yes, but only the ones officially authorized by FaceBook. Attempting to use any other library will result in instant ban and deletion from all social media.',
          correct: false
        },
      ]
    },
    [uuids.cards.r_jss]: {
      id: uuids.cards.r_jss,
      seriesId: uuids.serie.react,
      date: 1323704833,
      question: 'How do styling work in React',
      points: 70,
      options: [
        {
          displayText: 'Style from a Word-document and export as .xml file into component.',
          correct: false
        },
        {
          displayText: 'CSS-file injected through backdoor-code',
          correct: false
        },
        {
          displayText: 'Awesomely with JSS, or CSS in JS',
          correct: true
        },
        {
          displayText: 'Only Apple and Google can use style, as this needs special native-code.',
          correct: false
        },
      ]
    },
    [uuids.cards.r_yeah]: {
      id: uuids.cards.r_yeah,
      seriesId: uuids.serie.awesomern,
      date: 1323704833,
      question: 'Why is it so awesome?',
      points: 70,
      options: [
        {
          displayText: 'It lets you use BASIC instead of Swift and Go',
          correct: false
        },
        {
          displayText: 'It is just point and click',
          correct: false
        },
        {
          displayText: 'It increases reaction-time while coding',
          correct: false
        },
        {
          displayText: 'Multiple platforms from one codebase',
          correct: true
        },
      ]
    },
  },
  series: {
    [uuids.serie.cooking]: {
      id: uuids.serie.cooking,
      categoryId: uuids.category.life,
      displayText: 'Food',
    },
    [uuids.serie.awesomern]: {
      id: uuids.serie.awesomern,
      categoryId: uuids.category.reactnative,
      displayText: 'Why React Native is awesome',
    },
    [uuids.serie.react]: {
      id: uuids.serie.react,
      categoryId: uuids.category.reactnative,
      displayText: 'React for all',
    },
  },
  categories: {
    [uuids.category.reactnative]: {
      id: uuids.category.reactnative,
      displayText: 'React',
    },
    [uuids.category.life]: {
      id: uuids.category.life,
      displayText: 'Life',
    }
  },
}
