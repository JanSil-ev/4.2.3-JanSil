import { useState } from "react";
import { Pill, PillGroup, TextInput, ActionIcon, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Skills () {
  const [skills, setSkills] = useState<string[]>(["TypeScript", "React", "Redux"]);
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
    }
    setInputValue("");
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };


  return (
    <Stack gap="xs">
      <Text fw={500}>Ключевые навыки</Text>

      <div style={{ display: "flex", gap: "8px" }}>
        <TextInput
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
        <ActionIcon color="blue" variant="filled" onClick={handleAddSkill}>
          <IconPlus size={18} />
        </ActionIcon>
      </div>

      <PillGroup>
        {skills.map((skill) => (
          <Pill key={skill} withRemoveButton onRemove={() => handleRemoveSkill(skill)}>
            {skill}
          </Pill>
        ))}
      </PillGroup>
    </Stack>
  );
};