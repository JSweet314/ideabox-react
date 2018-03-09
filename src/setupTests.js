import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
  items: {},
  getItem: jest.fn(key => {
    return localStorageMock.items[key];
  }),
  setItem: jest.fn((key, string) => {
    localStorageMock.items[key] = string;
  }),
  clear: jest.fn(() => {
    localStorageMock.items = {};
  })
};

global.localStorage = localStorageMock;