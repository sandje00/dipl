import {
  required,
  email,
  between,
  min,
  max,
  confirmed
} from '@vee-validate/rules';
import { defineRule } from 'vee-validate';

const rules = [
  { name: 'required', rule: required },
  { name: 'between', rule: between },
  { name: 'email', rule: email },
  { name: 'min', rule: min },
  { name: 'max', rule: max },
  { name: 'confirmed', rule: confirmed }
];

export const defineRules = () => {
  rules.forEach(({ name, rule }) => defineRule(name, rule));
};
