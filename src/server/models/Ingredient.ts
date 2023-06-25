import type { SchemaObject } from 'neode'

const Ingredient : SchemaObject = {
  ingredientId: {
    type: 'uuid',
    primary: true
  },
  primaryName: {
    type: 'string',
    required: true,
  },
  altNames: 'string',
  longDesc: 'string',
  shortDesc: 'string',
  usageNotes: 'string',

  hasTag: {
    type: 'relationships',
    direction: 'out',
    relationship: 'HAS_TAG',
    target: 'Tag'
  },

};

export default Ingredient