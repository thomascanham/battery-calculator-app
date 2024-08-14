import PropTypes from 'prop-types';
import { Card, Text } from '@mantine/core';

export default function ResultsCard({ result }) {
  return (
      <Card shadow="md" px="lg"  mb="xl" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="sm">
          Results
        </Card.Section>

        <Card.Section inheritPadding py="xl">
          <Text>You need a <strong>{result}</strong> AmpHr battery</Text>
        </Card.Section>
      </Card>
  )
}

ResultsCard.propTypes = {
  result: PropTypes.number,
}