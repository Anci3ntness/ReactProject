import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore'

export const Context = createContext()

const context = {
	user: new UserStore(),
	device: new DeviceStore(),
}

function AppWithProvider() {
	return (
		<Context.Provider value={context}>
			<App />
		</Context.Provider>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWithProvider />)
