import type { TransactWriteCommandInput } from '@aws-sdk/lib-dynamodb'

import type { EntityV2 } from 'v1/entity'
import type { KeyInput } from 'v1/operations/types'
import { parsePrimaryKey } from 'v1/operations/utils/parsePrimaryKey'
import { Parser } from 'v1/schema/actions/parse'

import type { DeleteItemTransactionOptions } from '../options'

import { parseDeleteItemTransactionOptions } from './parseDeleteItemOptions'

export type TransactDeleteItemParams = NonNullable<
  NonNullable<TransactWriteCommandInput['TransactItems']>[number]['Delete']
>

export const transactDeleteItemParams = <
  ENTITY extends EntityV2,
  OPTIONS extends DeleteItemTransactionOptions<ENTITY>
>(
  entity: ENTITY,
  input: KeyInput<ENTITY>,
  deleteItemTransactionOptions: OPTIONS = {} as OPTIONS
): TransactDeleteItemParams => {
  const workflow = entity.schema.build(Parser).workflow(input, {
    fill: 'key',
    transform: true,
    filters: { key: true },
    requiringOptions: new Set(['always'])
  })

  workflow.next() // defaulted
  workflow.next() // linked
  const validKeyInput = workflow.next().value
  const transformedInput = workflow.next().value

  const keyInput = entity.computeKey ? entity.computeKey(validKeyInput) : transformedInput
  const primaryKey = parsePrimaryKey(entity, keyInput)

  const options = parseDeleteItemTransactionOptions(entity, deleteItemTransactionOptions)

  return {
    TableName: entity.table.getName(),
    Key: primaryKey,
    ...options
  }
}
