import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import Layout from "./Layout/Navigation";

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {routes.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;