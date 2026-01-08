export const ORG_TYPES = [
  {
    value: 1,
    label: '党委',
  },
  {
    value: 2,
    label: '党支部',
  },
  {
    value: 11,
    label: '内部办公室',
  },
];

export const getOrgTypeItem = (value: number) => {
  return ORG_TYPES.find(item => item.value === value);
};