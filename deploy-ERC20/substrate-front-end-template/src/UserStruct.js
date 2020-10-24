import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [currentUsername, setCurrentUsername] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [formCity, setFormCity] = useState('');
  const [currenttwitId, setcurrenttwitId] = useState('');
  const [formtwitId, setFormtwitId] = useState('');
  const [currentActive, setCurrentActive] = useState(false);
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    let unsubscribe;
    api.query.templateModule.user(newValue => {
      if (newValue.isNone) {
        setCurrentUsername('<None>');
        setCurrentCity('<None>');
        setcurrenttwitId('<None>');
        setCurrentActive(false);
      } else {
        console.log(newValue);
        setCurrentUsername(newValue.Username.toHuman());
        setCurrentCity(newValue.City.toHuman());
        setcurrenttwitId(newValue.Twitter.toHuman());
        setCurrentActive(newValue.Active);
      }
    }).then(unsub => {
      unsubscribe = unsub;
    })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.templateModule]);

  return (
    <Grid.Column width={8}>
      <h1>UserStruct</h1>
      <Card centered>
        <Card.Content textAlign='center'>
          <Card.Header content={`Username: ${currentUsername}`} />
          <Statistic
            label='City'
            value={currentCity}
          />
          <Statistic
            label='Twitter'
            value={currenttwitId}
          />
        </Card.Content>
        <Card.Content extra>Active? {currentActive.toString()}</Card.Content>
      </Card>
      <Form>
        <Form.Field>
          <Input
            label='Username'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormUsername(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='City'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormCity(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Twitter'
            state='newValue'
            type='string'
            onChange={(_, { value }) => setFormtwitId(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Active'
            state='newValue'
            type='checkbox'
            onChange={(e) => setFormActive(e.target.checked)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Save'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'doUser',
              inputParams: [{ Username: formUsername, City: formCity, Twitter: formtwitId, Active: formActive }],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function UserStruct (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.user
    ? <Main {...props} /> : null);
}
