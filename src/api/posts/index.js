import _ from 'lodash';
import axios from 'axios';
import { useQuery } from 'react-query';

export const usePostsFetch = () => {
  return useQuery([_.constant('postItems')], () => axios.get('/api/posts'), {
    select: _.property('data.posts')
  }
  );
};