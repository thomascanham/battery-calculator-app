import styled from 'styled-components';
import { Container, Title } from '@mantine/core';

export default function Header() {
  return (
    <HeaderCustomStyles>
      <Container>
        <Title order={1}>Battery Calculator</Title>
      </Container>
    </HeaderCustomStyles>
  )
}

const HeaderCustomStyles = styled.header`
  padding: 30px 0;
  color: white;
  background-color: var(--blue);
`;
