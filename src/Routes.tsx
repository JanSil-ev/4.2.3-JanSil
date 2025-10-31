import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import JodPage from './components/job';
import VacanciesPage from './components/Vacancies';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<JodPage />}></Route>
        {/* <Route path="/about" element={''}></Route> */}
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/vacancies/:id" element={<VacanciesPage />} />
      </Routes>
    </>
  );
}
