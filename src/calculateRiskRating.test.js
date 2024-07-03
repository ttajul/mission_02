import { calculateRiskRating } from './calculateRiskRating';

describe('calculateRiskRating', () => {
  it('should return risk rating 1 when claim history is empty', () => {
    const req = {
      body: {
        claim_history: '',
      },
    };
    const res = {
      json: jest.fn((data) => {
        expect(data).toEqual({ risk_rating: 1 });
      }),
    };

    calculateRiskRating(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should return risk rating 2 when claim history contains "crash" and "bump"', () => {
    const req = {
      body: {
        claim_history: 'I had a crash and a bump',
      },
    };
    const res = {
      json: jest.fn((data) => {
        expect(data).toEqual({ risk_rating: 2 });
      }),
    };

    calculateRiskRating(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should return risk rating 5 when claim history contains all keywords', () => {
    const req = {
      body: {
        claim_history: 'I collided, crashed, scratched, bumped, and smashed',
      },
    };
    const res = {
      json: jest.fn((data) => {
        expect(data).toEqual({ risk_rating: 5 });
      }),
    };

    calculateRiskRating(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  
});
