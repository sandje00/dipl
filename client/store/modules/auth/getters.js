import get from 'lodash/get';

export const isActive = state => get(state, 'user.active');
