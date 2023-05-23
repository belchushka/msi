export const validators = {
  isNotEmpty: {
    name: 'isNotEmpty',
    validator: (val: string) => val.trim().length > 0,
  },
  isNotNull: {
    name: 'isNotNull',
    validator: (val: any) => val !== null,
  },
  isEmail: {
    name: 'isEmail',
    validator: (val: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val),
  },
  minLength: (len: number) => {
    return {
      name: 'minLength',
      validator: (val: string) => val.trim().length >= len,
    };
  },
  maxLength: (len: number) => {
    return {
      name: 'maxLength',
      validator: (val: string) => val.trim().length <= len,
    };
  },
  minValue: (len: number) => {
    return {
      name: 'minLength',
      validator: (val: number) => val >= len,
    };
  },
  maxValue: (len: number) => {
    return {
      name: 'maxLength',
      validator: (val: number) => val <= len,
    };
  },
};
