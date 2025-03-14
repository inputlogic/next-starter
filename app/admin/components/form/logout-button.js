'use client';

import { axiosClient } from 'util/axios-client';
import { queryClient } from 'util/query-client';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'components/form/util/use-form';
import { Form } from 'components/form/form';

export const AdminLogoutButton = (props) => {
  const router = useRouter();
  
  const methods = useForm({
    onSubmit: async () => {
      await axiosClient.post('/user/logout');
      queryClient.resetQueries({
        predicate: query => query.queryKey[0]?.includes('is-logged-in')
      });
      router.push('/admin/login');
    }
  });

  return (
    <Form methods={methods}>
      <Button type="submit" color="red" variant="soft" {...props}>
        Log out
      </Button>
    </Form>
  );
};