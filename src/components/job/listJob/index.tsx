import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Center, Loader, Pagination, Stack, Text } from '@mantine/core';
import JobCard from '@/components/JobCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJob } from '@/store/slice/JobSlice';

export default function ListJob() {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useAppSelector((state) => state.job);
  const { city } = useAppSelector((state) => state.filters);
  const { query } = useAppSelector((state) => state.search);
  const { skills } = useAppSelector((state) => state.skills);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchJob({
        query: (searchParams.get('query') as string)
          ? (searchParams.get('query') as string)
          : query,
        city: (searchParams.get('city') as string) ? (searchParams.get('city') as string) : city,
        page: page,
        skills: searchParams.get('skills') ? searchParams.get('skills')?.split(',') : skills,
      })
    );
  }, [city, query, skills, page]);

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

  const totalPages = data?.pages ?? Math.ceil((data.found || 0) / 10);

  return (
    <Stack gap="md">
      {data?.items?.map((job) => (
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
