import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { Button, Card, Container, Group, NumberInput, Text, ActionIcon } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconBattery2, IconBatteryCharging, IconSettings } from '@tabler/icons-react';

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

    const Ts = baseValues.Ts;
    const Is = form.getInputProps('Is').value;
    const Ta = baseValues.Ta;
    const Ia = form.getInputProps('Ia').value;

    const temp1 = Ts * Is;
    const temp2 = Ta * Ia;
    const res = baseValues.fiddleFactor * (temp1 + temp2);
    setResults(roundNumber(res));
  }

  const FormulaDisplay = () => (
    <Card className="formula-card" shadow="lg" mb="lg">
      <Text size="xs" fw={600} tt="uppercase" c="rgba(255,255,255,0.8)" mb="xs">
        Formula
      </Text>
      <Text size="lg" fw={500} c="white">
        {baseValues.fiddleFactor} × [ ( {baseValues.Ts} × {form.getInputProps('Is').value || 'Is'} ) + ( {baseValues.Ta} × {form.getInputProps('Ia').value || 'Ia'} ) ]
      </Text>
    </Card>
  );

  if (!results) {
    return (
      <CalculatorCustomStyles>
        <Container size="xs">
          <Group justify="flex-end" mb="md">
            <ActionIcon
              variant="light"
              color="gray"
              size="lg"
              onClick={openSettings}
              aria-label="Settings"
            >
              <IconSettings size={20} />
            </ActionIcon>
          </Group>

          <FormulaDisplay />

          <form onSubmit={(event) => handleFormSubmit(event)}>
            <Card shadow="md" mb="md" className="input-card">
              <Group gap="sm" mb="xs">
                <IconBattery2 size={20} color="#0097d5" />
                <Text fw={600} size="sm">Quiescent Current</Text>
              </Group>
              <NumberInput
                placeholder="Enter current (A)"
                withAsterisk
                suffix=' A'
                key={form.key('Is')}
                {...form.getInputProps('Is')}
                min={0}
                inputMode='decimal'
                step="0.1"
                size="md"
                styles={{
                  input: {
                    fontSize: '18px',
                    fontWeight: 500,
                  }
                }}
              />
            </Card>

            <Card shadow="md" mb="lg" className="input-card">
              <Group gap="sm" mb="xs">
                <IconBatteryCharging size={20} color="#0097d5" />
                <Text fw={600} size="sm">Alarm Current</Text>
              </Group>
              <NumberInput
                placeholder="Enter current (A)"
                withAsterisk
                suffix=' A'
                key={form.key('Ia')}
                {...form.getInputProps('Ia')}
                min={0}
                inputMode='decimal'
                step="0.1"
                size="md"
                styles={{
                  input: {
                    fontSize: '18px',
                    fontWeight: 500,
                  }
                }}
              />
            </Card>

            <Button
              fullWidth
              type="submit"
              disabled={!form.isValid()}
              size="lg"
              className="calculate-button"
            >
              Calculate Battery Size
            </Button>
          </form>

          <Text size="xs" c="dimmed" ta="center" mt="xl" className="credit">
            Created by Tom Canham
          </Text>
        </Container>
      </CalculatorCustomStyles>
    )
  }

  return (
    <CalculatorCustomStyles>
      <Container size="xs">
        <FormulaDisplay />

        <ResultsCard result={results} />

        <Button
          onClick={() => restInputs()}
          fullWidth
          size="lg"
          variant="outline"
          color="dark"
          className="reset-button"
        >
          Calculate Again
        </Button>
      </Container>
    </CalculatorCustomStyles>
  )
}

Calculator.propTypes = {
  baseValues: PropTypes.shape({
    fiddleFactor: PropTypes.number.isRequired,
    Ts: PropTypes.number.isRequired,
    Ta: PropTypes.number.isRequired,
  }).isRequired,
  openSettings: PropTypes.func.isRequired,
}

const CalculatorCustomStyles = styled.div`
  min-height: calc(100vh - 100px);
  padding: 24px 0 40px;

  .formula-card {
    background: linear-gradient(135deg, #0097d5 0%, #006a9e 100%);
    border: none;
  }

  .input-card {
    background: white;
    border: 1px solid #e9ecef;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:focus-within {
      box-shadow: 0 8px 24px rgba(0, 151, 213, 0.15);
      transform: translateY(-2px);
    }
  }

  .calculate-button {
    background: linear-gradient(135deg, #0097d5 0%, #006a9e 100%);
    border: none;
    font-weight: 600;
    font-size: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 151, 213, 0.3);
    }

    &:disabled {
      background: #e9ecef;
      color: #adb5bd;
    }
  }

  .reset-button {
    font-weight: 600;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .credit {
    opacity: 0.5;
  }
`;
