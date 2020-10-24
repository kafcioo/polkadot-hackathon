import React, { useEffect, useState } from 'react';
import { Grid, Modal, Button, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main (props) {
  const { api } = useSubstrate();
  const [latestBlock, setLatestBlock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const getLatestBlock = async () => {
        try {
          const block = await api.rpc.chain.getBlock();
          setLatestBlock(block)
        } catch (e) {
          console.error(e);
        }
      };
      getLatestBlock();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>Latest Block</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Modal trigger={<Button>Show Information</Button>}>
            <Modal.Header>Latest Block</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <pre>
                  <code>{JSON.stringify(latestBlock, null, 2)}</code>
                </pre>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default function LatestBlock (props) {
  const { api } = useSubstrate();
  return api.rpc && api.rpc.chain && api.rpc.chain.getBlock ? (
    <Main {...props} />
  ) : null;
}

