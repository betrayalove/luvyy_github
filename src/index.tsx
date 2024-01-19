import React from 'react';
import {createRoot} from 'react-dom/client';
import AppRouter from "./router";
import './index.css';
import './assets/input.css'

const rootElement = document.querySelector("#root");
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
                <AppRouter/>
        </React.StrictMode>
);
}