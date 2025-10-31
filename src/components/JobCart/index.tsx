import { Link, useLocation } from 'react-router-dom';
import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { JobCardProps } from '@/types';
import { mapWorkFormatList } from '@/utils/mapWorkFormat';
import styles from './styles.module.css';

export default function JobCard({
  id,
  name,
  salary_range,
  experience,
  employer,
  work_format,
  address,
  alternate_url,
}: JobCardProps) {
  const location = useLocation();
  const isVacancyPage = location.pathname.includes('/vacancies/');

  const mappedFormats = mapWorkFormatList(work_format);

  const formatColorClass = (formatName: string) => {
    const lower = formatName.toLowerCase();
    if (lower.includes('офис')) return styles.badgeOffice;
    if (lower.includes('удал')) return styles.badgeRemote;
    if (lower.includes('гибрид')) return styles.badgeHybrid;
    return '';
  };

  return (
    <Card withBorder radius="lg" className={styles.card}>
      <Stack gap={6}>
        <Stack gap={0}>
          {isVacancyPage ? (
            <Text className={styles.title}>{name}</Text>
          ) : (
            <Link to={`/vacancies/${id}`} className={styles.title}>
              {name}
            </Link>
          )}

          <Group gap={8} align="center" className={styles.salaryGroup}>
            <Text className={styles.salary}>
              {salary_range?.from && salary_range?.to
                ? `${salary_range.from} – ${salary_range.to} ₽`
                : salary_range?.from
                  ? `от ${salary_range.from} ₽`
                  : salary_range?.to
                    ? `до ${salary_range.to} ₽`
                    : 'Зарплата не указана'}
            </Text>
            <Text className={styles.experience}>{experience?.name || 'Без опыта'}</Text>
          </Group>
        </Stack>

        <Stack gap={0}>
          {employer?.name && <Text className={styles.employer}>{employer.name}</Text>}

          {mappedFormats.length > 0 && (
            <Group gap={8} className={styles.badgeGroup}>
              {mappedFormats.map((format) => (
                <Badge
                  key={format.id}
                  variant="light"
                  radius="sm"
                  size="xs"
                  className={`${styles.badge} ${formatColorClass(format.name)}`}
                >
                  {format.name.toUpperCase()}
                </Badge>
              ))}
            </Group>
          )}

          {address?.city && <Text className={styles.location}>{address.city}</Text>}
        </Stack>

        <Group gap={8} mt={8}>
          {!isVacancyPage && (
            <Button
              component={Link}
              to={`/vacancies/${id}`}
              variant="filled"
              className={styles.viewButton}
            >
              Смотреть вакансию
            </Button>
          )}

          <Button
            component="a"
            href={alternate_url}
            target="_blank"
            variant="filled"
            className={isVacancyPage ? styles.viewButton : styles.replyButton}
          >
            {isVacancyPage ? 'Откликнуться на hh.ru' : 'Откликнуться'}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
