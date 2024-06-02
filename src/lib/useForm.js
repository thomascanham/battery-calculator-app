import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  async function handleInputChange(event) {
    event.preventDefault();

    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }

  return { inputs, handleInputChange }
}