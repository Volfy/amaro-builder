import type { SchemaObject } from 'neode'

const Tag : SchemaObject = {
  tagId: {
    type: 'uuid',
    primary: true
  },
  name: {
    type: 'string',
    required: true,
  },
};

export default Tag