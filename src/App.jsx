import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import styled from 'styled-components';

import Header from './components/Header';
import Calculator from './components/Calculator';
import Settings from './components/Settings';

export default function App() {
  const [opened, { open, close }] = useDisclosure(false);

  const [baseValues, setBasevalues] = useState({
    fiddleFactor: 1.25,
    Ts: 24,
    Ta: 0.5,
  })

  function updateBaseValues(inputs) {
    setBasevalues({
      fiddleFactor: inputs.fiddleFactor,
      Ts: inputs.Ts,
      Ta: inputs.Ta,
    });

    close();

    notifications.show({
      title: 'Settings',
      message: 'Your settings have been updated',
      color: 'lime',
      withBorder: true,
      withCloseButton: true,
      autoClose: 2000,
    })
  }

  function resetBaseValues() {
    setBasevalues({
      fiddleFactor: 1.25,
      Ts: 24,
      Ta: 0.5,
    })

    close();

    notifications.show({
      title: 'Settings',
      message: 'Settings restored to default',
      withBorder: true,
      withCloseButton: true,
      autoClose: 2000,
    })
  }

  return (
    <MainAppStyles>
      <Header />
      <Calculator baseValues={baseValues} setBaseValues={setBasevalues} openSettings={open} />
      <Drawer opened={opened} onClose={close} title="Settings">
        <Settings baseValues={baseValues} resetValues={resetBaseValues} updateBaseValues={updateBaseValues} />
      </Drawer>
    </MainAppStyles>
  )
}

const MainAppStyles = styled.div`
  max-height: 100%;
  height: 100%;
`;
