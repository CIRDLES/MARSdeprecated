
export const getLocalState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(err) {
    return undefined
  }
}

export const setLocalState = (state) => {
  try {
    if (!state) {
      return
    }
    else {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    }
  } catch (err) {
    console.error('Error writing state to localStorage')
  }
}
