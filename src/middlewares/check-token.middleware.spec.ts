import { CheckTokenMiddleware } from './check-token.middleware';

describe('CheckTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckTokenMiddleware()).toBeDefined();
  });
});
