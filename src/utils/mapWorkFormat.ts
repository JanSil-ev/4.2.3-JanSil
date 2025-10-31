import { WorkFormat, WorkFormatList } from '@/types';

export function mapWorkFormatList(list?: WorkFormatList): WorkFormatList {
  if (!list) return [];

  return list.map((format) => {
    switch (format.id) {
      case 'REMOTE':
        return { ...format, name: 'Удалённо' };
      case 'HYBRID':
        return { ...format, name: 'Гибрид' };
      case 'ON_SITE':
        return { ...format, name: 'Офис' };
      default:
        return format;
    }
  });
}
