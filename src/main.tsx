import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes';
import { RouterProvider } from 'react-router';
import { ContextProvider } from './context';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	</StrictMode>
);
