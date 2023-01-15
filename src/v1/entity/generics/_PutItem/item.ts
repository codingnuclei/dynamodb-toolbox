import type { O } from 'ts-toolbelt'

import type {
  _Item,
  _Attribute,
  ResolvedAttribute,
  _AnyAttribute,
  _PrimitiveAttribute,
  _SetAttribute,
  _ListAttribute,
  _MapAttribute,
  AtLeastOnce,
  OnlyOnce,
  Always,
  ComputedDefault
} from 'v1/item'

import type { _AttributePutItem } from './attribute'

export type _ItemPutItem<_ITEM extends _Item> = O.Required<
  O.Partial<
    {
      // Keep all attributes
      [KEY in keyof _ITEM['_attributes']]: _AttributePutItem<_ITEM['_attributes'][KEY]>
    }
  >,
  // Enforce Required attributes
  | O.SelectKeys<_ITEM['_attributes'], { _required: AtLeastOnce | OnlyOnce | Always }>
  // Enforce attributes that have initial default
  | O.FilterKeys<_ITEM['_attributes'], { _default: undefined | ComputedDefault }>
> & // Add Record<string, ResolvedAttribute> if map is open
  (_ITEM extends { _open: true } ? Record<string, ResolvedAttribute> : {})