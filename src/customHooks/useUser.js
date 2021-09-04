import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useUser = () => {
  const { data, error } = useSWR('/api/user/userdoc', fetcher, { revalidateOnMount: true });
  return {
    user: data?.userDoc,
    isLoading: !error && !data,
    isError: error,
  };
};

export {
  useUser,
};
