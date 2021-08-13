import _ from 'lodash';

const extractFileName = (uri: string) => {
  return _.last(uri.split('/')) ?? '';
};

export default extractFileName;
