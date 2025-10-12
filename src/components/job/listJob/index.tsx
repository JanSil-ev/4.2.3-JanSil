import { useEffect } from 'react';
import JobCard from '@/components/JobCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJob } from '@/store/slice/JobSlice';

export default function ListJod() {
  const { data, isLoading, error } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchJob());
  }, [dispatch]);
  return (
    <>

       {Array.isArray(data?.items) && data?.items?.map((p) => (
            <JobCard key={p.id} {...p} />
          ))}
    </>
  );
}
