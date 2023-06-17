import type { SchemaObject } from 'neode'

const User : SchemaObject = {
  userId: {
    type: 'uuid',
    primary: true
  },
  clerkId: {
    type: 'string',
    primary: true,
    unique: true,
  },
  active: 'boolean',
  
  authored: {
    type: 'relationship',
    direction: 'out',
    relationship: 'AUTHORED',
    target: 'Recipe'
  },
  liked: {
    type: 'relationships',
    direction: 'out',
    relationship: 'LIKED',
    target: 'Recipe'
  }
};

export default User