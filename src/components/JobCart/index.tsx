import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { JobCardProps } from '@/types';
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
  const formatColorClass = (formatName: string) => {
    const lower = formatName.toLowerCase();
    if (lower === 'офис') return styles.badgeOffice;
    if (lower === 'удалённо') return styles.badgeRemote;
    if (lower === 'гибрид') return styles.badgeHybrid;
    return styles.badgeDefault;
  };

  return (
    <Card className={styles.card} withBorder radius="md" id={id}>
      <Stack gap={6}>
        <Text className={styles.title}>{name}</Text>

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

        {employer.name && <Text className={styles.employer}>{employer.name}</Text>}

        {Array.isArray(work_format) && work_format.length > 0 && (
          <Group gap={8} className={styles.badgeGroup}>
            {work_format.map((format) => (
              <Badge
                key={format.id}
                variant="light"
                radius="sm"
                size="sm"
                className={`${styles.badge} ${formatColorClass(format.name)}`}
              >
                {format.name.toUpperCase()}
              </Badge>
            ))}
          </Group>
        )}

        {address?.city && <Text className={styles.location}>{address.city}</Text>}

        <Group gap={8} mt={8} className={styles.buttonGroup}>
          <Button component="a" href={alternate_url} target="_blank" className={styles.viewButton}>
            Смотреть вакансию
          </Button>
          <Button variant="default" className={styles.replyButton}>
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
