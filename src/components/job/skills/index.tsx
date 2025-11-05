import { useEffect, useState } from 'react';
import { IconMapPin, IconPlus } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { ActionIcon, Pill, PillGroup, Select, Stack, Text, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity } from '@/store/slice/filtersSlice';
import { addSkill, removeSkill, setSkills } from '@/store/slice/skillsSlice';
import classes from './styles.module.css';

export default function Skills() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.skills.skills);
  const city = useAppSelector((state) => state.filters.city);
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddSkill = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const trimmed = inputValue.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    const updated = [...skills, trimmed];
    newSearchParams.set('skills', updated.toString());
    setSearchParams(newSearchParams);
    dispatch(addSkill(trimmed));
    setInputValue('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    const newSearchParams = new URLSearchParams(searchParams);
    console.log(skills);
    if (skills.length === 1) {
      newSearchParams.delete('skills');
    } else {
      newSearchParams.set('skills', updated.toString());
    }
    setSearchParams(newSearchParams);
    dispatch(removeSkill(skill));
  };

  useEffect(() => {
    const queryParam = searchParams.get('skills');
    if (queryParam) {
      dispatch(setSkills(queryParam.split(',')));
    }
  }, []);

  const handleCityChange = (value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('city', value as string);
    dispatch(setCity(value as string));
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const queryParam = searchParams.get('city');
    if (queryParam) {
      dispatch(setCity(queryParam));
    }
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <Text className={classes.sectionTitle}>Ключевые навыки</Text>
        <div className={classes.inputRow}>
          <TextInput
            placeholder="Навык"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            classNames={{ input: classes.textInput }}
          />
          <ActionIcon data-testid="add" className={classes.addButton} onClick={handleAddSkill}>
            <IconPlus size={18} />
          </ActionIcon>
        </div>

        <PillGroup className={classes.pillGroup}>
          {skills.map((skill) => (
            <Pill
              data-testid={skill}
              className={classes.skills}
              key={skill}
              withRemoveButton
              onRemove={() => handleRemoveSkill(skill)}
            >
              {skill}
            </Pill>
          ))}
        </PillGroup>
      </div>

      <div className={classes.container}>
        <Select
          allowDeselect={false}
          role="combobox"
          placeholder="Все города"
          value={city}
          onChange={handleCityChange}
          data={[
            { value: 'all', label: 'Все города' },
            { value: '1', label: 'Москва' },
            { value: '2', label: 'Санкт-Петербург' },
          ]}
          leftSection={<IconMapPin size={16} />}
        />
      </div>
    </div>
  );
}
