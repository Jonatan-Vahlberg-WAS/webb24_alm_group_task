const sequelize = require('../../src/config/database');
const Accomodation = require('../../src/models/Accomodation');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Accomodation Model', () => {
  it('ska kunna skapa en accomodation med alla fält', async () => {
    const acc = await Accomodation.create({
      adress: 'Nybroplan 60',
      stad: 'Stockholm',
      land: 'Sverige',
      postnummer: '12459',
      hyra: 8500,
      rum: 2
    });

    expect(acc.adress).toBe('Nybroplan 60');
    expect(acc.hyra).toBe(8500);
  });

  it('ska inte tillåta att address saknas', async () => {
    await expect(
      Accomodation.create({
        stad: 'Göteborg',
        land: 'Sverige',
        postnummer: '12345',
        hyra: 5500,
        rum: 1
      })
    ).rejects.toThrow();
  });

  it('ska kunna ha en userId', async () => {
    const acc = await Accomodation.create({
      adress: 'Uservägen 9',
      stad: 'Malmö',
      land: 'Sverige',
      postnummer: '15358',
      hyra: 12000,
      rum: 4,
      userId: 1
    });

    expect(acc.userId).toBe(1);
  });
});
