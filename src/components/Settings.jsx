import PropTypes from 'prop-types';
import { NumberInput, Button, Group } from "@mantine/core"
import { useForm } from "@mantine/form"

export default function Settings({ baseValues, resetValues, updateBaseValues}) {
  const form = useForm({
    initialValues: {
      fiddleFactor: baseValues.fiddleFactor,
      standby: baseValues.Ts,
      alarm: baseValues.Ta,
    },
    validate: {
      fiddleFactor: (value) => (value === '' || value === 0) ? 'Fiddle Factor must be greater than 0' : null,
      standby: (value) => (value === '' || value === 0) ? 'Standby time must be greater than 0' : null,
      alarm: (value) => (value === '' || value === 0) ? 'Alarm time must be greater than 0' : null,
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();

    const inputs = {
      fiddleFactor: form.getInputProps('fiddleFactor').value,
      Ts: form.getInputProps('standby').value,
      Ta: form.getInputProps('alarm').value,
    }

    updateBaseValues(inputs);
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <NumberInput 
          inputMode='decimal' 
          step="0.01" 
          label="Deteriation Factor" 
          placeholder="Testing" 
          {...form.key('fiddleFactor')} 
          {...form.getInputProps('fiddleFactor')}
        />

        <NumberInput 
          inputMode='decimal' 
          step="1" 
          label="Time in standby" 
          placeholder="24" mt={'lg'} 
          {...form.key('standby')} 
          {...form.getInputProps('standby')}
        />
        
        <NumberInput 
          inputMode='decimal' 
          step="0.1" 
          label="Time in alarm" 
          placeholder="0.5" 
          mt={'lg'} 
          {...form.key('alarm')} 
          {...form.getInputProps('alarm')}
        />
        
        <Group mt={'lg'} >
          <Button type='submit' disabled={!form.isValid()}>Save</Button>
          <Button variant='outline' onClick={() => resetValues()} >Reset to default</Button>
        </Group>
      </form>
    </>
  )
}

Settings.propTypes = {
  baseValues: PropTypes.object,
  updateBaseValues: PropTypes.func,
  resetValues: PropTypes.func,
}