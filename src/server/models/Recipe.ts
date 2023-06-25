import type { SchemaObject } from 'neode'

const Recipe : SchemaObject = {
  recipeId: {
    type: 'uuid',
    primary: true
  },
  name: {
    type: 'string',
    required: true,
  },
  steps: 'string',
  notes: 'string',
  defaultVolume: {
    type: 'float',
    required: true,
  },
  defaultMeasure: {
    type: 'string',
    required: true,
  },
  dateCreated: {
    type: 'datetime', 
    required: true,
  },
  imageUrl: {
    type: 'string',
  },

  hasIngredient: {
    type: 'relationships',
    direction: 'out',
    relationship: 'HAS_INGREDIENT',
    target: 'Ingredient',
    properties: {
      unitOfMeasure: 'string',
      measure: 'number',
    }
  },
  hasTag: {
    type: 'relationships',
    direction: 'out',
    relationship: 'HAS_TAG',
    target: 'Tag'
  },
};

export default Recipe