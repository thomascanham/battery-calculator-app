import PropTypes from 'prop-types';
import { NumberInput, Button, Group, Stack, Text } from "@mantine/core"
import { useForm } from "@mantine/form"

export default function Settings({ baseValues, resetValues, updateBaseValues }) {
  const form = useForm({
    initialValues: {
      fiddleFactor: baseValues.fiddleFactor,
      standby: baseValues.Ts,
      alarm: baseValues.Ta,
    },
    validate: {
      fiddleFactor: (value) => (value === '' || value === 0) ? 'Must be greater than 0' : null,
      standby: (value) => (value === '' || value === 0) ? 'Must be greater than 0' : null,
      alarm: (value) => (value === '' || value === 0) ? 'Must be greater than 0' : null,
    }
  })

  function handleSubmit(event) {
    event.preventDefault();

    updateBaseValues({
      fiddleFactor: form.getInputProps('fiddleFactor').value,
      Ts: form.getInputProps('standby').value,
      Ta: form.getInputProps('alarm').value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Text size="sm" c="dimmed" mb="lg">
        Adjust the values used in the battery calculation formula.
      </Text>

      <Stack gap="lg">
        <NumberInput
          label="Deterioration Factor"
          description="Safety multiplier (default: 1.25)"
          inputMode='decimal'
          step={0.01}
          min={0.01}
          decimalScale={2}
          {...form.key('fiddleFactor')}
          {...form.getInputProps('fiddleFactor')}
        />

        <NumberInput
          label="Standby Time"
          description="Hours in standby mode"
          inputMode='decimal'
          step={1}
          min={0.1}
          suffix=" hrs"
          {...form.key('standby')}
          {...form.getInputProps('standby')}
        />

        <NumberInput
          label="Alarm Time"
          description="Hours in alarm state"
          inputMode='decimal'
          step={0.1}
          min={0.1}
          suffix=" hrs"
          {...form.key('alarm')}
          {...form.getInputProps('alarm')}
        />
      </Stack>

      <Group mt="xl" grow>
        <Button type='submit' disabled={!form.isValid()}>
          Save
        </Button>
        <Button variant='light' color="gray" onClick={() => resetValues()}>
          Reset
        </Button>
      </Group>
    </form>
  )
}

Settings.propTypes = {
  baseValues: PropTypes.object,
  updateBaseValues: PropTypes.func,
  resetValues: PropTypes.func,
}
