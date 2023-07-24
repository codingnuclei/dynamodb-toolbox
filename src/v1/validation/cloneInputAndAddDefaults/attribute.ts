import type { Attribute, AdditionalResolution, ResolvedAttribute } from 'v1/schema'

import type { CloneInputAndAddDefaultsOptions } from './types'
import { clonePrimitiveAttributeInputAndAddDefaults } from './primitive'
import { cloneListAttributeInputAndAddDefaults } from './list'
import { cloneMapAttributeInputAndAddDefaults } from './map'
import { cloneRecordAttributeInputAndAddDefaults } from './record'
import { cloneAnyOfAttributeInputAndAddDefaults } from './anyOf'

export const cloneAttributeInputAndAddDefaults = <
  ADDITIONAL_RESOLUTION extends AdditionalResolution
>(
  attribute: Attribute,
  input: ResolvedAttribute<ADDITIONAL_RESOLUTION>,
  options: CloneInputAndAddDefaultsOptions = {}
): ResolvedAttribute<ADDITIONAL_RESOLUTION> => {
  switch (attribute.type) {
    case 'any':
    case 'string':
    case 'number':
    case 'binary':
    case 'boolean':
    case 'set':
      return clonePrimitiveAttributeInputAndAddDefaults(attribute, input, options)
    case 'list':
      return cloneListAttributeInputAndAddDefaults(attribute, input, options)
    case 'map':
      return cloneMapAttributeInputAndAddDefaults(attribute, input, options)
    case 'record':
      return cloneRecordAttributeInputAndAddDefaults(attribute, input, options)
    case 'anyOf':
      return cloneAnyOfAttributeInputAndAddDefaults(attribute, input, options)
  }
}
