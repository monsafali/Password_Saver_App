import { useLocation, useNavigate } from 'react-router-dom'

function JsonPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const passwords = location.state?.passwords || []

  return (
    <div className="p-4">
      <button
        onClick={() => navigate('/')}
        className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-36"
      >
        Go to Home
      </button>
      <h1 className="text-2xl font-bold mb-4">Passwords JSON</h1>
      <pre
        style={{
          fontFamily: 'Arial, sans-serif',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
      >
        {JSON.stringify(passwords, null, 2)}
      </pre>
    </div>
  )
}

export default JsonPage
