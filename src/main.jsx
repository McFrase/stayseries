import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { UiProvider } from '@/context/UiContext';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UiProvider>
      <RouterProvider router={router} />
    </UiProvider>
  </React.StrictMode>,
);
