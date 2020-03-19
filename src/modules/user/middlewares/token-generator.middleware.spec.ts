import { TokenGeneratorMiddleware } from './token-generator.middleware';

describe('TokenGeneratorMiddleware', () => {
  it('should be defined', () => {
    expect(new TokenGeneratorMiddleware()).toBeDefined();
  });
});
