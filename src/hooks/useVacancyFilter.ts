import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity } from '@/store/slice/filtersSlice';
import { setSkills } from '@/store/slice/skillsSlice';

export function useVacancyFilters() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const city = useAppSelector((state) => state.filters.city);
  const skills = useAppSelector((state) => state.skills.skills);

  useEffect(() => {
    const urlCity = searchParams.get('city');
    const urlSkills = searchParams.get('skills')?.split(',') || [];

    if (urlCity) dispatch(setCity(urlCity));
    if (urlSkills.length > 0) dispatch(setSkills(urlSkills));
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (city && city !== 'all') params.city = city;
    if (skills.length > 0) params.skills = skills.join(',');

    setSearchParams(params);
  }, [city, skills, setSearchParams]);
}
