import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { JobCardProps } from '@/types';

export default function JobCard({
  id,
  name,
  salary_range,
  experience,
  employment_form,
  employer,
  address,
}: JobCardProps) {
  return (
    <Card shadow="xs" padding="md" radius="md" withBorder>
      <Stack gap={8}>
        {/* Заголовок */}
        <Text
          fw={600}
          size="lg"
          c="#1c7ed6"
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {name}
        </Text>

        {/* Зарплата и опыт */}
        <Group gap="xs">
          <Text fw={500} size="sm">
            {`${salary_range?.from} - ${salary_range?.to}`}
          </Text>
          <Text size="sm" c="dimmed">
            {experience?.name}
          </Text>
        </Group>

        <Group gap="xs">
          <Badge color="gray" variant="light" size="sm">
            {employment_form?.name}
          </Badge>
          <Text size="sm">{address?.city}</Text>
        </Group>

        <Group mt="xs" gap="sm">
          <Button color="dark" radius="sm">
            Смотреть вакансию
          </Button>
          <Button color="gray" variant="filled" radius="sm">
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
