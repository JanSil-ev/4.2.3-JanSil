import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Button, Loader, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJob } from '@/store/slice/JobSlice';
import classes from './styles.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.job);
  const { city } = useAppSelector((state) => state.filters);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchJob({ query: '', city: 'all' }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchJob({ query: query.trim(), city }));

    const newSearchParams = new URLSearchParams(searchParams);

    if (query.trim()) {
      newSearchParams.set('query', query.trim());
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      dispatch(fetchJob({ query: queryParam }));
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={classes.container}>
      <TextInput
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={16} />}
        radius="md"
        size="md"
        className={classes.input}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        rightSection={isLoading ? <Loader size="xs" /> : null}
      />
      <Button
        radius="md"
        size="md"
        className={classes.button}
        onClick={handleSearch}
        loading={isLoading}
      >
        Найти
      </Button>
    </div>
  );
}
