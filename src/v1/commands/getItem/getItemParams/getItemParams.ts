import { GetItemCommandInput } from '@aws-sdk/client-dynamodb'

import { EntityV2, KeyInput } from 'v1'
import { marshall } from 'v1/utils/marshall'
import { parseEntityKeyInput } from 'v1/commands/utils/parseKeyInput'
import { parsePrimaryKey } from 'v1/commands/utils/parsePrimaryKey'
import { renameSavedAsAttributes } from 'v1/commands/utils/renameSavedAsAttributes'

/**
 * Builds a GET Item command input for a given Entity
 *
 * @param entity Entity
 * @param input Input
 * @return GetItemCommandInput
 */
export const getItemParams = <ENTITY extends EntityV2>(
  entity: ENTITY,
  input: KeyInput<ENTITY>
): GetItemCommandInput => {
  const validKeyInput = parseEntityKeyInput<ENTITY>(entity, input)

  // Important to do it before renaming as validKeyInput is muted (to improve?)
  let keyInput = entity.computeKey ? entity.computeKey(validKeyInput) : undefined

  const renamedInput = renameSavedAsAttributes(entity.item, validKeyInput)

  const primaryKey = parsePrimaryKey(entity, keyInput ?? renamedInput)

  return {
    TableName: entity.table.name,
    Key: marshall(primaryKey)
  }
}