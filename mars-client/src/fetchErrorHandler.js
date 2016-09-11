// This function accepts a promise from a fetch call  and if the
// status of that call is not 200, it throws an error that
// is caught by the catch function at the end of the promise chain.
// Reference MDM's docs on the Fetch API

export default function handleErrors(response) {
  if (!response.ok) throw Error(response.status)
  return response
}
