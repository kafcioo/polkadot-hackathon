import React, { useState } from 'react'
import { Form, Grid, Label, Table, Icon, Message } from 'semantic-ui-react'

import { useSubstrate } from './substrate-lib'

function Main () {
  const { api } = useSubstrate()
  const [blockInfo, setBlockInfo] = useState()
  const [blockhash, setBlockhash] = useState()

  const getBlockInfo = async (blockhash) => {
    try {
      const blockInfo = await api.rpc.chain.getHeader(blockhash)

      setBlockInfo(blockInfo)
    } catch (e) {
      console.error(e)
    }
  }

  console.log('blockhash', !!blockhash)
  console.log('block-info', blockInfo && blockInfo.hash.toHuman())

  return (
    <Grid.Column textAlign = 'center'>
      <Message info>
        <p>Find the block</p>
      </Message>
      <Form
        onSubmit={async (e, { value }) => await getBlockInfo(blockhash)}
        size='small'
      >
        <Form.Group widths={12}>
          <Form.Input
            size='large'
            width={10}
            placeholder={'Enter block to get block information'}
            onChange={(e, { value }) => setBlockhash(value)}
          />
          {blockhash && <Form.Button content={<Icon name='search' />} />}
        </Form.Group>
      </Form>
      {blockInfo && blockInfo.number && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Info</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Block</Table.Cell>
              <Table.Cell>{blockInfo.number.toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ParentHash</Table.Cell>
              <Table.Cell>{blockInfo.parentHash.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State Root</Table.Cell>
              <Table.Cell>{blockInfo.stateRoot.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Extrinsics Root</Table.Cell>
              <Table.Cell>{blockInfo.extrinsicsRoot.toHuman()}</Table.Cell>
            </Table.Row>
          </Table.Body>

          {/* <Table.Footer>Block information with block hash</Table.Footer> */}
        </Table>
      )}
    </Grid.Column>
  )
}

export default function BlockInfoBySeach (props) {
  const { api } = useSubstrate()
  return api.rpc && api.rpc.chain.getHeader ? <Main {...props} /> : null
}
