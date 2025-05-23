const { Accommodation } = require("../test-setup");
const { User } = require("../test-setup");

describe("Accommodation CASCADE on delete test", () => {
    it("Should delete accommodation when user is deleted", async () => {
        const user = await User.create({
            username: "TestUser1",
            email: "testUser1@mail.com",
        });

        await Accommodation.create({
            adress: "Storängsvägen 22",
            city: "Stockholm",
            country: "Sverige",
            zipcode: 12345,
            rent: 167999,
            room: 5,
            userId: user.id,
        });

        const found = await Accommodation.findOne({ where: { userId: user.id } });
        expect(found).toBeDefined();

        await user.destroy();

        const gone = await Accommodation.findOne({ where: { userId: user.id } });
        expect(gone).toBeNull();
    });
});
