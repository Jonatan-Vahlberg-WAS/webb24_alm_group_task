const { User, Accommodation } = require('../../src/models');
const sequelize = require('../../src/config/database');

describe('Accommodation Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Accommodation.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe('CASCADE-radering', () => {
    it('ska radera alla boenden när en användare raderas', async () => {
      // Skapa en användare
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        profilePicture: 'https://example.com/profile.jpg'
      });

      // Skapa två boenden för användaren
      const accommodation1 = await Accommodation.create({
        address: 'Testgatan 1',
        city: 'Stockholm',
        country: 'Sverige',
        postalCode: '12345',
        rent: 10000,
        rooms: 3,
        userId: user.id
      });

      const accommodation2 = await Accommodation.create({
        address: 'Testgatan 2',
        city: 'Göteborg',
        country: 'Sverige',
        postalCode: '54321',
        rent: 8000,
        rooms: 2,
        userId: user.id
      });

      // Radera användaren
      await user.destroy();

      // Kontrollera att båda boendena har raderats
      const remainingAccommodations = await Accommodation.findAll({
        where: { userId: user.id }
      });
      expect(remainingAccommodations).toHaveLength(0);
    });
  });

  describe('Validering av boendefält', () => {
    it('ska validera att alla obligatoriska fält är korrekt ifyllda', async () => {
      // Skapa en användare först
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        profilePicture: 'https://example.com/profile.jpg'
      });

      // Testa att skapa ett boende med ogiltiga värden
      const invalidAccommodation = {
        address: '',  // Tom adress
        city: '',     // Tom stad
        country: '',  // Tomt land
        postalCode: '', // Tomt postnummer
        rent: -1000,  // Negativ hyra
        rooms: 0,     // 0 rum
        userId: user.id
      };

      // Förvänta sig att skapandet misslyckas
      await expect(Accommodation.create(invalidAccommodation))
        .rejects
        .toThrow();

      // Testa att skapa ett boende med giltiga värden
      const validAccommodation = {
        address: 'Testgatan 1',
        city: 'Stockholm',
        country: 'Sverige',
        postalCode: '12345',
        rent: 10000,
        rooms: 3,
        userId: user.id
      };

      const accommodation = await Accommodation.create(validAccommodation);
      expect(accommodation).toBeDefined();
      expect(accommodation.address).toBe(validAccommodation.address);
      expect(Number(accommodation.rent)).toBe(validAccommodation.rent);
    });
  });
}); 