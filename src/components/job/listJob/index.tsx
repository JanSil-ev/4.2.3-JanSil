import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Center, Loader, Pagination, Stack, Text } from '@mantine/core';
import JobCard from '@/components/JobCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity } from '@/store/slice/filtersSlice';
import { fetchJob } from '@/store/slice/JobSlice';

export default function ListJob() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.job);
  const { city } = useAppSelector((state) => state.filters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const text = searchParams.get('text') || '';

  useEffect(() => {
    const urlCity = searchParams.get('city') || 'all';
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlCity !== city) dispatch(setCity(urlCity));
    if (urlPage !== page) setPage(urlPage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) params.set('page', String(page));
    setSearchParams(params);
    dispatch(fetchJob({ query: text, city, page }));
  }, [page, dispatch]);

  if (isLoading)
    return (
      <Center py="xl">
        <Loader data-testid="loader" size="md" />
      </Center>
    );

  if (error)
    return (
      <Center py="xl">
        <Text c="red">{error}</Text>
      </Center>
    );

  if (!data?.items?.length)
    return (
      <Center py="xl">
        <Text>Вакансии не найдены</Text>
      </Center>
    );

  const totalPages = data.pages ?? Math.ceil((data.found || 0) / 10);

  return (
    <Stack gap="md">
      {data.items.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}

      {totalPages > 1 && (
        <Center mt="md">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            color="brand"
            size="md"
            radius="md"
          />
        </Center>
      )}
    </Stack>
  );
}
