import type { ListAttribute, AttributeValue, ListAttributeValue } from 'v1/schema'
import { isArray } from 'v1/utils/validation'
import { DynamoDBToolboxError } from 'v1/errors'

import type { FormatOptions } from './schema'
import { formatSavedAttribute } from './attribute'
import { matchProjection } from './utils'

export const formatSavedListAttribute = (
  listAttribute: ListAttribute,
  savedValue: AttributeValue,
  { attributes, ...restOptions }: FormatOptions = {}
): ListAttributeValue => {
  if (!isArray(savedValue)) {
    throw new DynamoDBToolboxError('formatter.invalidAttribute', {
      message: `Invalid attribute in saved item: ${listAttribute.path}. Should be a ${listAttribute.type}.`,
      path: listAttribute.path,
      payload: {
        received: savedValue,
        expected: listAttribute.type
      }
    })
  }

  // We don't need isProjected:
  // - Either whole list is projected and we already know => projectedAttributes undefined
  // - Either some elements are projected => childrenAttributes undefined
  // - Either projection is nested => childrenAttributes defined
  const { childrenAttributes } = matchProjection(/\[\d+\]/, attributes)

  const parsedValues: ListAttributeValue = []
  for (const savedElement of savedValue) {
    const parsedElement = formatSavedAttribute(listAttribute.elements, savedElement, {
      attributes: childrenAttributes,
      ...restOptions
    })

    if (parsedElement !== undefined) {
      parsedValues.push(parsedElement)
    }
  }

  return parsedValues
}
