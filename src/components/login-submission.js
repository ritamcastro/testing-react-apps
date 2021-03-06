// http://localhost:3000/login-submission
//
// The <LoginSubmission /> component uses our <Login /> component and actually
// submits the formData to /api/login and redirects the user or shows an error
// message if the request failed.
//
// NOTE: that while this is calling `fetch`, we're actually NOT making a real
// HTTP call in this app. If you checkout `hack-fetch.js` you'll notice that
// we're overriding fetch to serve a fake response for the purposes of our demo
// app.
// 🚨  In the app you can simulate a failure by using "fail" as the password.
//     (this does not apply to the tests however).

import React from 'react'
import Login from './login'

function formSubmissionReducer(state, action) {
  switch (action.type) {
    case 'START': {
      return {status: 'pending', responseData: null, errorMessage: null}
    }
    case 'RESOLVE': {
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      }
    }
    case 'REJECT': {
      console.log(action)
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error.errors[0],
      }
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

function useFormSubmission({endpoint, data}) {
  const [state, dispatch] = React.useReducer(formSubmissionReducer, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  })

  const fetchBody = data ? JSON.stringify(data) : null

  React.useEffect(() => {
    if (fetchBody) {
      dispatch({type: 'START'})
      window
        .fetch(endpoint, {
          method: 'POST',
          body: fetchBody,
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(r => r.json())
        .then(
          responseData => {
            dispatch({type: 'RESOLVE', responseData})
          },
          error => {
            dispatch({type: 'REJECT', error})
          },
        )
    }
  }, [fetchBody, endpoint])

  return state
}

function Spinner() {
  return (
    <div className="lds-ripple" aria-label="loading...">
      <div />
      <div />
    </div>
  )
}

function LoginSubmission() {
  const [formData, setFormData] = React.useState(null)
  const {status, responseData, errorMessage} = useFormSubmission({
    endpoint: '/api/login',
    data: formData,
  })

  const token = responseData?.token
  React.useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token)
    }
  }, [token])

  if (status === 'resolved') {
    // TODO: navigate away on submission success
    return null
  }

  return (
    <>
      <Login onSubmit={data => setFormData(data)} />
      {status === 'pending' ? <Spinner /> : null}
      {errorMessage}
    </>
  )
}

export default LoginSubmission
