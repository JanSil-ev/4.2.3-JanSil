import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Center, Loader, Paper, Stack, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobById } from '@/store/slice/JobSlice';
import JobCard from '../JobCart';
import styles from './styles.module.css';

export default function VacancyPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data, selectedVacancy, isLoading, error } = useAppSelector((state) => state.job);

  const vacancy = useMemo(() => {
    if (!id) return undefined;
    const found = data?.items?.find((item) => String(item.id) === String(id));
    return found || selectedVacancy;
  }, [data?.items, selectedVacancy, id]);

  useEffect(() => {
    if (id && !vacancy?.description) {
      dispatch(fetchJobById(id));
    }
  }, [id, vacancy?.description, dispatch]);

  if (error) {
    return (
      <Center h="80vh">
        <Text c="red" fw={500} size="lg">
          Ошибка загрузки{error}
        </Text>
      </Center>
    );
  }

  if (!vacancy) {
    return (
      <Center h="80vh">
        {isLoading ? <Loader size="lg"role="progressbar" /> : <Text>Вакансия не найдена</Text>}
      </Center>
    );
  }

  return (
    <Center py="xl">
      <Paper shadow="md" radius="lg" p="xl" withBorder className={styles.wrapper}>
        <Stack gap="md">
          <JobCard {...vacancy} />

          <h2 className={styles.sectionTitle}>О компании</h2>

          {vacancy.description ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            />
          ) : isLoading ? (
            <Center>
              <Loader size="sm" role="progressbar"/>
            </Center>
          ) : (
            <Text size="sm" c="dimmed">
              Описание недоступно
            </Text>
          )}

          {vacancy.alternate_url && (
            <Button
              component="a"
              href={vacancy.alternate_url}
              target="_blank"
              variant="filled"
              color="dark"
              radius="md"
              size="md"
              fullWidth
            >
              Перейти на hh.ru
            </Button>
          )}
        </Stack>
      </Paper>
    </Center>
  );
}
