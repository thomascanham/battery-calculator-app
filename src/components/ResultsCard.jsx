import PropTypes from 'prop-types';
import { Card, Text } from '@mantine/core';

export default function ResultsCard({ result }) {
  return (
    <Card shadow="md" px="lg" py="xl" mb="xl" radius="md" withBorder>
      <Text>You need a <strong>{result}</strong> AmpHr battery</Text>
    </Card>
  )
}

ResultsCard.propTypes = {
  result: PropTypes.number,
}