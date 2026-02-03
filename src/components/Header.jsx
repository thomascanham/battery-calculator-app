import styled from 'styled-components';
import { Container, Title, Text, Group } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';

export default function Header() {
  return (
    <HeaderCustomStyles>
      <Container>
        <Group gap="xs" justify="center">
          <IconBolt size={32} stroke={2} />
          <Title order={1}>Battery Calculator</Title>
        </Group>
        <Text size="sm" mt="xs" c="rgba(255,255,255,0.85)">
          BS5839-1:2025 Compliant
        </Text>
      </Container>
    </HeaderCustomStyles>
  )
}

const HeaderCustomStyles = styled.header`
  padding: 24px 0;
  color: white;
  background: linear-gradient(135deg, #0097d5 0%, #006a9e 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;
