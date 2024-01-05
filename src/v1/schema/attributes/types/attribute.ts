import type { $AnyAttributeState, $AnyAttribute, AnyAttribute } from '../any'
import type {
  $PrimitiveAttributeState,
  $PrimitiveAttribute,
  ResolvedPrimitiveAttribute,
  PrimitiveAttribute,
  PrimitiveAttributeType
} from '../primitive'
import type { $SetAttributeState, $SetAttribute, SetAttribute } from '../set'
import type { $ListAttributeState, $ListAttribute, ListAttribute } from '../list'
import type { $MapAttributeState, $MapAttribute, MapAttribute } from '../map'
import type { $RecordAttributeState, $RecordAttribute, RecordAttribute } from '../record'
import type { $AnyOfAttributeState, $AnyOfAttribute, AnyOfAttribute } from '../anyOf'

/**
 * Possible attributes types
 */
export type $AttributeState =
  | $AnyAttributeState
  | $PrimitiveAttributeState
  | $SetAttributeState
  | $ListAttributeState
  | $MapAttributeState
  | $RecordAttributeState
  | $AnyOfAttributeState

export type $Attribute =
  | $AnyAttribute
  | $PrimitiveAttribute
  | $SetAttribute
  | $ListAttribute
  | $MapAttribute
  | $RecordAttribute
  | $AnyOfAttribute

export type Attribute =
  | AnyAttribute
  | PrimitiveAttribute
  | SetAttribute
  | ListAttribute
  | MapAttribute
  | RecordAttribute
  | AnyOfAttribute

/**
 * Dictionary of attributes
 */
export interface $SchemaAttributeStates {
  [key: string]: $AttributeState
}

export interface SchemaAttributes {
  [key: string]: Attribute
}

export type Extension = {
  type: Attribute['type'] | '*'
  value: unknown
}

export type ExtendedValue<
  EXTENSION extends Extension,
  TYPE extends Attribute['type'] | '*'
> = Extract<EXTENSION, { type: TYPE | '*' }>['value']

export type PrimitiveAttributeValue<EXTENSION extends Extension = never> =
  | ExtendedValue<EXTENSION, PrimitiveAttributeType>
  | PrimitiveAttributeBasicValue

export type PrimitiveAttributeBasicValue = ResolvedPrimitiveAttribute

export type SetAttributeValue<EXTENSION extends Extension = never> =
  | ExtendedValue<EXTENSION, 'set'>
  | SetAttributeBasicValue<EXTENSION>

export type SetAttributeBasicValue<EXTENSION extends Extension = never> = Set<
  AttributeValue<EXTENSION>
>

export type ListAttributeValue<EXTENSION extends Extension = never> =
  | ExtendedValue<EXTENSION, 'list'>
  | ListAttributeBasicValue<EXTENSION>

export type ListAttributeBasicValue<
  EXTENSION extends Extension = never
> = AttributeValue<EXTENSION>[]

export type MapAttributeValue<EXTENSION extends Extension = never> =
  | ExtendedValue<EXTENSION, 'map'>
  | MapAttributeBasicValue<EXTENSION>

export type MapAttributeBasicValue<EXTENSION extends Extension = never> = {
  [key: string]: AttributeValue<EXTENSION>
}

export type RecordAttributeValue<EXTENSION extends Extension = never> =
  | ExtendedValue<EXTENSION, 'record'>
  | RecordAttributeBasicValue<EXTENSION>

export type RecordAttributeBasicValue<EXTENSION extends Extension = never> = {
  [key: string]: AttributeValue<EXTENSION> | undefined
}

/**
 * Any possible resolved attribute type
 */
export type AttributeValue<EXTENSION extends Extension = never> =
  | PrimitiveAttributeValue<EXTENSION>
  | SetAttributeValue<EXTENSION>
  | ListAttributeValue<EXTENSION>
  | MapAttributeValue<EXTENSION>
  | RecordAttributeValue<EXTENSION>

export type Item<EXTENSION extends Extension = never> = {
  [key: string]: AttributeValue<EXTENSION>
}

export type AttributeBasicValue<EXTENSION extends Extension = never> =
  | PrimitiveAttributeBasicValue
  | SetAttributeBasicValue<EXTENSION>
  | ListAttributeBasicValue<EXTENSION>
  | MapAttributeBasicValue<EXTENSION>
  | RecordAttributeBasicValue<EXTENSION>

export type UndefinedAttrExtension = { type: '*'; value: undefined }