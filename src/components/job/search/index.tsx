import { TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react"; // иконки из tabler

export default function Search() {
  return (
    <div style={{ display: "flex", gap: "10px", maxWidth: "500px" }}>
      <TextInput
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={16} />}
        radius="md"
        size="md"
        style={{ flex: 1 }}
      />
      <Button radius="md" size="md" color="#4263EB">
        Найти
      </Button>
    </div>
  );
};