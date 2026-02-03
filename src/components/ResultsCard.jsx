import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Text, Stack } from '@mantine/core';
import { IconBattery4 } from '@tabler/icons-react';

export default function ResultsCard({ result }) {
  return (
    <ResultsCardStyles>
      <Card shadow="lg" mb="lg" className="results-card">
        <Stack align="center" gap="md" py="lg">
          <div className="result-icon">
            <IconBattery4 size={32} stroke={2} />
          </div>
          <Text size="sm" fw={600} tt="uppercase" c="dimmed">
            Required Battery Size
          </Text>
          <div className="result-value">
            <Text component="span" className="result-number">
              {result}
            </Text>
            <Text component="span" className="result-unit">
              AmpHr
            </Text>
          </div>
          <Text size="sm" c="dimmed" ta="center" maw={280}>
            Based on your quiescent and alarm current readings
          </Text>
        </Stack>
      </Card>
    </ResultsCardStyles>
  )
}

ResultsCard.propTypes = {
  result: PropTypes.number,
}

const ResultsCardStyles = styled.div`
  .results-card {
    background: linear-gradient(135deg, #e6f7fc 0%, #b3e6f5 100%);
    border: 2px solid #0097d5;
  }

  .result-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0097d5 0%, #006a9e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .result-value {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .result-number {
    font-size: 56px;
    font-weight: 700;
    color: #0097d5;
    line-height: 1;
  }

  .result-unit {
    font-size: 20px;
    font-weight: 600;
    color: #64748b;
  }
`;
