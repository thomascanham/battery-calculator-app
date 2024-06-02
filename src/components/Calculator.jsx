import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { Button, Card, Container, Group, NumberInput, Text } from "@mantine/core";
import { useForm } from '@mantine/form';

import ResultsCard from './ResultsCard';
import { notifications } from '@mantine/notifications';

export default function Calculator({ baseValues, openSettings }) {
  const [results, setResults] = useState(null);

  const form = useForm({
    initialValues: {
      Is: null,
      Ia: null,
    },
    validate: {
      Ia: (value) => value === 0 || value === null ? 'Please enter your reading' : null,
      Is: (value) => value === 0 || value === null ? 'Please enter your reading' : null,
    }
  })

  function roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  
  function restInputs() {
    form.reset();
    setResults(null);

    notifications.show({
      message: 'Your values have been reset',
      withBorder: true,
      withCloseButton: true,
      autoClose: 2000,
    })
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    form.validate();

    // check Ahr of batteries = 1.25 x [(Ts x Is) + (Ta x Ia)];
    const Ts = baseValues.Ts;
    const Is = form.getInputProps('Is').value;
    const Ta = baseValues.Ta;
    const Ia = form.getInputProps('Ia').value;

    console.log(`${baseValues.fiddleFactor} x [(${Ts} + ${Is}) + (${Ta} x ${Ia})]`);

    const temp1 = Ts * Is;
    const temp2 = Ta * Ia;
    const res = 1.25 * (temp1 + temp2);
    setResults(roundNumber(res));
  }

  if (!results) {
    return (
      <CalculatorCustomStyles>
        <Container>
          <Card shadow='xs' withBorder>
            <Text>
              {baseValues.fiddleFactor} x [ ( {baseValues.Ts} x {form.getInputProps('Is').value ? form.getInputProps('Is').value : 'Is'} ) + ( {baseValues.Ta} x {form.getInputProps('Ia').value ? form.getInputProps('Ia').value : 'Ia'} ) ] 
            </Text>
          </Card>

          <form onSubmit={(event) => handleFormSubmit(event)}>
            <NumberInput
              label="Battery In Quiescent"
              placeholder="0A"
              withAsterisk
              suffix='A'
              key={form.key('Is')}
              {...form.getInputProps('Is')}
              min={0}
              inputMode='decimal'
              step="0.1"
              mt='lg'
            />

            <NumberInput
              label="Battery In Alarm"
              placeholder='0A'
              withAsterisk
              suffix='A'
              key={form.key('Ia')}
              {...form.getInputProps('Ia')}
              min={0}
              inputMode='decimal'
              step="0.1"
              mt='lg'
            />

            <Button mt="lg" fullWidth type="submit" disabled={!form.isValid()} >
              Calculate
            </Button>

            <Group>
              <Button mt='lg' color='gray' size='xs' variant='outline' onClick={openSettings}>Settings</Button>
            </Group>
          </form>

          <div className="info">
            <Text size='sm' >Created by: Tom Canham</Text>
          </div>
        </Container>
      </CalculatorCustomStyles>
    )
  }

  if (results) {
    return (
      <CalculatorCustomStyles>
        <Container>
          <ResultsCard result={results} />
          <Button onClick={() => restInputs()}>Reset</Button>
        </Container> 
      </CalculatorCustomStyles>
    )
  }
}

Calculator.propTypes = {
  baseValues: PropTypes.object,
  openSettings: PropTypes.any,
}

const CalculatorCustomStyles = styled.div`
  width: 100vw;
  height: 80vh;
  background: white;
  padding: 30px 0;
  .info {
    padding-top: 180px;
    text-align: center;
    font-size: 10px;
    opacity: 0.15;
  }
`;